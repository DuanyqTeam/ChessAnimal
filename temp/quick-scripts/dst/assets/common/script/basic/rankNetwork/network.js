
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/rankNetwork/network.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47321heZzRNrYNaEhxqjO8/', 'network');
// common/script/basic/rankNetwork/network.js

"use strict";

window.network = {
  initNetwork: function initNetwork() {
    this.pomeloBuildObj = pomeloBuild.create();
    this.pomelo = this.pomeloBuildObj.pomelo;
    this.isBinding = false;

    if (!this.isBinding) {
      // 主要为了让onMessage绑定this
      this.onMessage = this.onMessage.bind(this);
      this.isBinding = true;
    } // 只能被network用，其他人不能用


    this.netListener = eventListener.create("one");
    this.reset();

    this._registerNetEvent();
  },
  reset: function reset() {
    this.curMsgName = ""; // 路由管理器（暂名）重置，重置后立马刷新一次netLoading的显示

    this.routerManager = {};
  },

  /**
   内部使用的注册网络回调函数
   */
  _registerNetEvent: function _registerNetEvent() {
    this.pomelo["on"]("heartbeat timeout", function () {
      this.pomelo["disconnect"]();
      this.netListener.dispatch("reconnect timeout", {});
    }.bind(this));
    this.pomelo["on"]("heartbeat recv", function () {
      clientEvent.dispatch("updateNetworkState", "heartBeatRet");
    }.bind(this));
    this.pomelo["on"]("close", function () {
      this.pomelo["disconnect"]();
      this.netListener.dispatch("network close", {});
    }.bind(this));
    this.pomelo["on"]("onKick", function () {
      this.netListener.dispatch("kick user", {}); // 关闭网络loading动画

      this.receiveRouterFromServer('close all netLoading');
    }.bind(this));
  },
  // 网络协议都是在logic注册的，不能注销
  on: function on(route) {
    this.netListener.on.apply(this.netListener, arguments);
    pomelo["on"](route, this.onMessage);
  },
  getCurMsgName: function getCurMsgName() {
    return this.curMsgName;
  },
  connect: function connect(ip, port, cb) {
    var netConfig = {
      host: ip,
      port: port,
      log: true
    };
    this.isKicked = false;
    netConfig.wsStr = "wss://"; // 解决微信上点击会崩溃的bug,网络连接不能在放在ui层,所以用timeout包装一层

    setTimeout(function () {
      this.pomelo["init"](netConfig, function () {
        if (cb) cb();
      }.bind(this));
    }.bind(this), 0);
  },
  disconnect: function disconnect() {
    if (this.isConnected()) {
      this.pomelo["disconnect"]();
    }
  },

  /**
   *  globally-unique identifiers, 生成一个不重复的随机字符串，用于跟踪请求链
   */
  guid: function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  },
  send: function send(routeStr, dataObj) {
    if (typeof dataObj === "undefined") {
      dataObj = {};
    } // 请求参数中加入唯一标识,用于跟踪请求链。


    dataObj.uuid = this.guid();
    console.log("send route:" + routeStr + " data:" + JSON.stringify(dataObj)); // 记录路由请求

    this.addRouterToManager(routeStr);

    if (this.isConnected()) {
      this.pomelo["request"](routeStr, dataObj, this.onMessage);
    }
  },
  onMessage: function onMessage(msgOrigin) {
    var router = msgOrigin["route"];
    this.receiveRouterFromServer(router);
    console.log("receive msg from :" + JSON.stringify(msgOrigin));

    if (msgOrigin["body"]["code"] === 500) {
      cc.error("server data error, can't find the route:" + router); // pomelo异常处理都返回500，仍然需要做分发处理
      // return;
    }

    if (!router) {
      cc.error("please add the msg route in server");
      return;
    } // 空数据


    if (Object.keys(msgOrigin["body"]).length <= 0) {
      cc.error("server data error, can't response no data proto");
      return;
    }

    this.curMsgName = msgOrigin["route"];
    this.netListener.dispatch(msgOrigin["route"], msgOrigin["body"]);
  },
  setNetLoadingStatus: function setNetLoadingStatus(flag) {
    if (flag) {// clientEvent.dispatch("showPanel", "netLoadingPanel");
    } else {
      clientEvent.dispatch('hidePanel', "netLoadingPanel");
    }
  },

  /**
   * 检测 netLoading 的显示状态
   * 从 routeManager 中获取每个记录的路由的请求时间，与当前时间对比
   * 如果超出阈值就显示 netLoading
   * 注：已返回的路由就会从 routerManager 中删掉
   */
  checkNetLoadingStatus: function checkNetLoadingStatus() {
    var keys = Object.keys(this.routerManager);
    var keysLength = keys.length;

    if (keysLength <= 0) {
      this.netListener.dispatch('hidePanel', "netLoadingPanel");
      return;
    }

    var currentTime = Date.now();

    for (var key in this.routerManager) {
      if (this.routerManager.hasOwnProperty(key)) {
        var routerTime = this.routerManager[key];
        var deltaTime = currentTime - routerTime;

        if (deltaTime > this.netLoadingCheckInterval) {
          // 存在路由的请求时间超出了阈值，显示 netLoading
          // 有路由显示的话，就不再检查其他的路由
          return;
        }
      }
    }
  },

  /**
   * 将路由添加到路由管理器（暂名）
   * @param {String} router 路由名
   * 将 { 路由名 => 时间 } 作为键值对存起来，如果是已经存在的路由，则跳过
   */
  addRouterToManager: function addRouterToManager(router) {
    var keys = Object.keys(this.routerManager); // 断线重连期间，拒绝其他的路由加入

    if (keys.indexOf('connectTimeout') === -1) {
      // 断线重连时，清空路由
      if (router === 'connectTimeout') {
        this.routerManager = {};
      }

      keys = Object.keys(this.routerManager);
      var index = keys.indexOf(router);

      if (index === -1) {
        var currentTime = Date.now();
        this.routerManager[router] = currentTime;
      }
    }
  },

  /**
   * 收到网络返回，将路由管理器（暂名）中对应的路由删掉
   * @param {String} router 路由名
   */
  receiveRouterFromServer: function receiveRouterFromServer(router) {
    if (router === 'close all netLoading') {
      this.routerManager = {};
      this.checkNetLoadingStatus();
      return;
    }

    var keys = Object.keys(this.routerManager);
    var index = keys.indexOf(router);

    if (index > -1) {
      console.log(router, "cost", Date.now() - this.routerManager[router], "ms");
      delete this.routerManager[router]; // 删除之后要刷新一次 netLoading 的显示

      this.checkNetLoadingStatus();
    }
  },

  /**
   * 请客网络回调
   */
  clearCallback: function clearCallback() {
    if (this.pomelo) this.pomelo.clearCallback();
  }
};

network.isConnecting = function () {
  return this.pomelo.isConnecting();
};

network.isConnected = function () {
  return this.pomelo.isOpen();
};

network.isClosed = function () {
  return this.pomelo.isClosed();
};

network.isClosing = function () {
  return this.pomelo.isClosing();
};

network.chooseNetworkMode = function () {
  this.initNetwork();

  if (this.pomelo) {
    for (var key in this.netListener) {
      this.pomelo["on"](key, this.onMessage);
    }
  }
};

network.on = function (msgName, handler) {
  this.netListener.on(msgName, handler);
};

network.dispatch = function (msgName, msgContent) {
  this.netListener.dispatch(msgName, msgContent);
};

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL3JhbmtOZXR3b3JrL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL3JhbmtOZXR3b3JrL25ldHdvcmsuanMiXSwibmFtZXMiOlsid2luZG93IiwibmV0d29yayIsImluaXROZXR3b3JrIiwicG9tZWxvQnVpbGRPYmoiLCJwb21lbG9CdWlsZCIsImNyZWF0ZSIsInBvbWVsbyIsImlzQmluZGluZyIsIm9uTWVzc2FnZSIsImJpbmQiLCJuZXRMaXN0ZW5lciIsImV2ZW50TGlzdGVuZXIiLCJyZXNldCIsIl9yZWdpc3Rlck5ldEV2ZW50IiwiY3VyTXNnTmFtZSIsInJvdXRlck1hbmFnZXIiLCJkaXNwYXRjaCIsImNsaWVudEV2ZW50IiwicmVjZWl2ZVJvdXRlckZyb21TZXJ2ZXIiLCJvbiIsInJvdXRlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJnZXRDdXJNc2dOYW1lIiwiY29ubmVjdCIsImlwIiwicG9ydCIsImNiIiwibmV0Q29uZmlnIiwiaG9zdCIsImxvZyIsImlzS2lja2VkIiwid3NTdHIiLCJzZXRUaW1lb3V0IiwiZGlzY29ubmVjdCIsImlzQ29ubmVjdGVkIiwiZ3VpZCIsInM0IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJzdWJzdHJpbmciLCJzZW5kIiwicm91dGVTdHIiLCJkYXRhT2JqIiwidXVpZCIsImNvbnNvbGUiLCJKU09OIiwic3RyaW5naWZ5IiwiYWRkUm91dGVyVG9NYW5hZ2VyIiwibXNnT3JpZ2luIiwicm91dGVyIiwiY2MiLCJlcnJvciIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJzZXROZXRMb2FkaW5nU3RhdHVzIiwiZmxhZyIsImNoZWNrTmV0TG9hZGluZ1N0YXR1cyIsImtleXNMZW5ndGgiLCJjdXJyZW50VGltZSIsIkRhdGUiLCJub3ciLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInJvdXRlclRpbWUiLCJkZWx0YVRpbWUiLCJuZXRMb2FkaW5nQ2hlY2tJbnRlcnZhbCIsImluZGV4T2YiLCJpbmRleCIsImNsZWFyQ2FsbGJhY2siLCJpc0Nvbm5lY3RpbmciLCJpc09wZW4iLCJpc0Nsb3NlZCIsImlzQ2xvc2luZyIsImNob29zZU5ldHdvcmtNb2RlIiwibXNnTmFtZSIsImhhbmRsZXIiLCJtc2dDb250ZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDYkMsRUFBQUEsV0FBVyxFQUFFLHVCQUFXO0FBQ3BCLFNBQUtDLGNBQUwsR0FBc0JDLFdBQVcsQ0FBQ0MsTUFBWixFQUF0QjtBQUNBLFNBQUtDLE1BQUwsR0FBYyxLQUFLSCxjQUFMLENBQW9CRyxNQUFsQztBQUVBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7O0FBRUEsUUFBSSxDQUFDLEtBQUtBLFNBQVYsRUFBcUI7QUFBRTtBQUNuQixXQUFLQyxTQUFMLEdBQWlCLEtBQUtBLFNBQUwsQ0FBZUMsSUFBZixDQUFvQixJQUFwQixDQUFqQjtBQUNBLFdBQUtGLFNBQUwsR0FBaUIsSUFBakI7QUFDSCxLQVRtQixDQVdwQjs7O0FBQ0EsU0FBS0csV0FBTCxHQUFtQkMsYUFBYSxDQUFDTixNQUFkLENBQXFCLEtBQXJCLENBQW5CO0FBQ0EsU0FBS08sS0FBTDs7QUFDQSxTQUFLQyxpQkFBTDtBQUNILEdBaEJZO0FBa0JiRCxFQUFBQSxLQUFLLEVBQUUsaUJBQVc7QUFDZCxTQUFLRSxVQUFMLEdBQWtCLEVBQWxCLENBRGMsQ0FHZDs7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLEVBQXJCO0FBQ0gsR0F2Qlk7O0FBd0JiOzs7QUFHQUYsRUFBQUEsaUJBQWlCLEVBQUUsNkJBQVc7QUFDMUIsU0FBS1AsTUFBTCxDQUFZLElBQVosRUFBa0IsbUJBQWxCLEVBQXVDLFlBQVc7QUFDOUMsV0FBS0EsTUFBTCxDQUFZLFlBQVo7QUFFQSxXQUFLSSxXQUFMLENBQWlCTSxRQUFqQixDQUEwQixtQkFBMUIsRUFBK0MsRUFBL0M7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RUFBa0JDLE9BQWxCLEVBQTJCO0FBQ3BDLE9BQUtyRSxXQUFMLENBQWlCUyxFQUFqQixDQUFvQjJELE9BQXBCLEVBQTZCQyxPQUE3QjtBQUNILENBRkQ7O0FBSUE5RSxPQUFPLENBQUNlLFFBQVIsR0FBbUIsVUFBUzhELE9BQVQsRUFBa0JFLFVBQWxCLEVBQThCO0FBQzdDLE9BQUt0RSxXQUFMLENBQWlCTSxRQUFqQixDQUEwQjhELE9BQTFCLEVBQW1DRSxVQUFuQztBQUNILENBRkQiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQvYmFzaWMvcmFua05ldHdvcmsiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cubmV0d29yayA9IHtcbiAgICBpbml0TmV0d29yazogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucG9tZWxvQnVpbGRPYmogPSBwb21lbG9CdWlsZC5jcmVhdGUoKTtcbiAgICAgICAgdGhpcy5wb21lbG8gPSB0aGlzLnBvbWVsb0J1aWxkT2JqLnBvbWVsbztcblxuICAgICAgICB0aGlzLmlzQmluZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICghdGhpcy5pc0JpbmRpbmcpIHsgLy8g5Li76KaB5Li65LqG6K6pb25NZXNzYWdl57uR5a6adGhpc1xuICAgICAgICAgICAgdGhpcy5vbk1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5pc0JpbmRpbmcgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g5Y+q6IO96KKrbmV0d29ya+eUqO+8jOWFtuS7luS6uuS4jeiDveeUqFxuICAgICAgICB0aGlzLm5ldExpc3RlbmVyID0gZXZlbnRMaXN0ZW5lci5jcmVhdGUoXCJvbmVcIik7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJOZXRFdmVudCgpO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY3VyTXNnTmFtZSA9IFwiXCI7XG5cbiAgICAgICAgLy8g6Lev55Sx566h55CG5Zmo77yI5pqC5ZCN77yJ6YeN572u77yM6YeN572u5ZCO56uL6ams5Yi35paw5LiA5qyhbmV0TG9hZGluZ+eahOaYvuekulxuICAgICAgICB0aGlzLnJvdXRlck1hbmFnZXIgPSB7fTtcbiAgICB9LFxuICAgIC8qKlxuICAgICDlhoXpg6jkvb/nlKjnmoTms6jlhoznvZHnu5zlm57osIPlh73mlbBcbiAgICAgKi9cbiAgICBfcmVnaXN0ZXJOZXRFdmVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucG9tZWxvW1wib25cIl0oXCJoZWFydGJlYXQgdGltZW91dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMucG9tZWxvW1wiZGlzY29ubmVjdFwiXSgpO1xuXG4gICAgICAgICAgICB0aGlzLm5ldExpc3RlbmVyLmRpc3BhdGNoKFwicmVjb25uZWN0IHRpbWVvdXRcIiwge30pO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMucG9tZWxvW1wib25cIl0oXCJoZWFydGJlYXQgcmVjdlwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKFwidXBkYXRlTmV0d29ya1N0YXRlXCIsIFwiaGVhcnRCZWF0UmV0XCIpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMucG9tZWxvW1wib25cIl0oXCJjbG9zZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMucG9tZWxvW1wiZGlzY29ubmVjdFwiXSgpO1xuXG4gICAgICAgICAgICB0aGlzLm5ldExpc3RlbmVyLmRpc3BhdGNoKFwibmV0d29yayBjbG9zZVwiLCB7fSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5wb21lbG9bXCJvblwiXShcIm9uS2lja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMubmV0TGlzdGVuZXIuZGlzcGF0Y2goXCJraWNrIHVzZXJcIiwge30pO1xuXG4gICAgICAgICAgICAvLyDlhbPpl63nvZHnu5xsb2FkaW5n5Yqo55S7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVSb3V0ZXJGcm9tU2VydmVyKCdjbG9zZSBhbGwgbmV0TG9hZGluZycpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICAvLyDnvZHnu5zljY/orq7pg73mmK/lnKhsb2dpY+azqOWGjOeahO+8jOS4jeiDveazqOmUgFxuICAgIG9uOiBmdW5jdGlvbihyb3V0ZSkge1xuICAgICAgICB0aGlzLm5ldExpc3RlbmVyLm9uLmFwcGx5KHRoaXMubmV0TGlzdGVuZXIsIGFyZ3VtZW50cyk7XG4gICAgICAgIHBvbWVsb1tcIm9uXCJdKHJvdXRlLCB0aGlzLm9uTWVzc2FnZSk7XG4gICAgfSxcblxuICAgIGdldEN1ck1zZ05hbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJNc2dOYW1lO1xuICAgIH0sXG5cbiAgICBjb25uZWN0OiBmdW5jdGlvbihpcCwgcG9ydCwgY2IpIHtcbiAgICAgICAgdmFyIG5ldENvbmZpZyA9IHtcbiAgICAgICAgICAgIGhvc3Q6IGlwLFxuICAgICAgICAgICAgcG9ydDogcG9ydCxcbiAgICAgICAgICAgIGxvZzogdHJ1ZVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuaXNLaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgbmV0Q29uZmlnLndzU3RyID0gXCJ3c3M6Ly9cIjtcblxuICAgICAgICAvLyDop6PlhrPlvq7kv6HkuIrngrnlh7vkvJrltKnmuoPnmoRidWcs572R57uc6L+e5o6l5LiN6IO95Zyo5pS+5ZyodWnlsYIs5omA5Lul55SodGltZW91dOWMheijheS4gOWxglxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5wb21lbG9bXCJpbml0XCJdKG5ldENvbmZpZywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNiKSBjYigpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCAwKTtcbiAgICB9LFxuXG4gICAgZGlzY29ubmVjdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMucG9tZWxvW1wiZGlzY29ubmVjdFwiXSgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiAgZ2xvYmFsbHktdW5pcXVlIGlkZW50aWZpZXJzLCDnlJ/miJDkuIDkuKrkuI3ph43lpI3nmoTpmo/mnLrlrZfnrKbkuLLvvIznlKjkuo7ot5/ouKror7fmsYLpk75cbiAgICAgKi9cbiAgICBndWlkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gczQoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICAgICAgICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gICAgfSxcblxuICAgIHNlbmQ6IGZ1bmN0aW9uKHJvdXRlU3RyLCBkYXRhT2JqKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKGRhdGFPYmopID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBkYXRhT2JqID0ge307XG4gICAgICAgIH1cblxuICAgICAgICAvLyDor7fmsYLlj4LmlbDkuK3liqDlhaXllK/kuIDmoIfor4Ys55So5LqO6Lef6Liq6K+35rGC6ZO+44CCXG4gICAgICAgIGRhdGFPYmoudXVpZCA9IHRoaXMuZ3VpZCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInNlbmQgcm91dGU6XCIgKyByb3V0ZVN0ciArIFwiIGRhdGE6XCIgKyBKU09OLnN0cmluZ2lmeShkYXRhT2JqKSk7XG5cbiAgICAgICAgLy8g6K6w5b2V6Lev55Sx6K+35rGCXG4gICAgICAgIHRoaXMuYWRkUm91dGVyVG9NYW5hZ2VyKHJvdXRlU3RyKTtcblxuICAgICAgICBpZiAodGhpcy5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnBvbWVsb1tcInJlcXVlc3RcIl0ocm91dGVTdHIsIGRhdGFPYmosIHRoaXMub25NZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbk1lc3NhZ2U6IGZ1bmN0aW9uKG1zZ09yaWdpbikge1xuICAgICAgICB2YXIgcm91dGVyID0gbXNnT3JpZ2luW1wicm91dGVcIl07XG5cbiAgICAgICAgdGhpcy5yZWNlaXZlUm91dGVyRnJvbVNlcnZlcihyb3V0ZXIpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVjZWl2ZSBtc2cgZnJvbSA6XCIgKyBKU09OLnN0cmluZ2lmeShtc2dPcmlnaW4pKTtcblxuICAgICAgICBpZiAobXNnT3JpZ2luW1wiYm9keVwiXVtcImNvZGVcIl0gPT09IDUwMCkge1xuICAgICAgICAgICAgY2MuZXJyb3IoXCJzZXJ2ZXIgZGF0YSBlcnJvciwgY2FuJ3QgZmluZCB0aGUgcm91dGU6XCIgKyByb3V0ZXIpO1xuICAgICAgICAgICAgLy8gcG9tZWxv5byC5bi45aSE55CG6YO96L+U5ZueNTAw77yM5LuN54S26ZyA6KaB5YGa5YiG5Y+R5aSE55CGXG4gICAgICAgICAgICAvLyByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJvdXRlcikge1xuICAgICAgICAgICAgY2MuZXJyb3IoXCJwbGVhc2UgYWRkIHRoZSBtc2cgcm91dGUgaW4gc2VydmVyXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8g56m65pWw5o2uXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhtc2dPcmlnaW5bXCJib2R5XCJdKS5sZW5ndGggPD0gMCkge1xuICAgICAgICAgICAgY2MuZXJyb3IoXCJzZXJ2ZXIgZGF0YSBlcnJvciwgY2FuJ3QgcmVzcG9uc2Ugbm8gZGF0YSBwcm90b1wiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VyTXNnTmFtZSA9IG1zZ09yaWdpbltcInJvdXRlXCJdO1xuXG4gICAgICAgIHRoaXMubmV0TGlzdGVuZXIuZGlzcGF0Y2gobXNnT3JpZ2luW1wicm91dGVcIl0sIG1zZ09yaWdpbltcImJvZHlcIl0pO1xuICAgIH0sXG5cbiAgICBzZXROZXRMb2FkaW5nU3RhdHVzOiBmdW5jdGlvbihmbGFnKSB7XG4gICAgICAgIGlmIChmbGFnKSB7XG4gICAgICAgICAgICAvLyBjbGllbnRFdmVudC5kaXNwYXRjaChcInNob3dQYW5lbFwiLCBcIm5ldExvYWRpbmdQYW5lbFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKCdoaWRlUGFuZWwnLCBcIm5ldExvYWRpbmdQYW5lbFwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmo4DmtYsgbmV0TG9hZGluZyDnmoTmmL7npLrnirbmgIFcbiAgICAgKiDku44gcm91dGVNYW5hZ2VyIOS4reiOt+WPluavj+S4quiusOW9leeahOi3r+eUseeahOivt+axguaXtumXtO+8jOS4juW9k+WJjeaXtumXtOWvueavlFxuICAgICAqIOWmguaenOi2heWHuumYiOWAvOWwseaYvuekuiBuZXRMb2FkaW5nXG4gICAgICog5rOo77ya5bey6L+U5Zue55qE6Lev55Sx5bCx5Lya5LuOIHJvdXRlck1hbmFnZXIg5Lit5Yig5o6JXG4gICAgICovXG4gICAgY2hlY2tOZXRMb2FkaW5nU3RhdHVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnJvdXRlck1hbmFnZXIpO1xuICAgICAgICB2YXIga2V5c0xlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgICBpZiAoa2V5c0xlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm5ldExpc3RlbmVyLmRpc3BhdGNoKCdoaWRlUGFuZWwnLCBcIm5ldExvYWRpbmdQYW5lbFwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnJvdXRlck1hbmFnZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlck1hbmFnZXIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHZhciByb3V0ZXJUaW1lID0gdGhpcy5yb3V0ZXJNYW5hZ2VyW2tleV07XG4gICAgICAgICAgICAgICAgdmFyIGRlbHRhVGltZSA9IGN1cnJlbnRUaW1lIC0gcm91dGVyVGltZTtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFUaW1lID4gdGhpcy5uZXRMb2FkaW5nQ2hlY2tJbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgICAgICAvLyDlrZjlnKjot6/nlLHnmoTor7fmsYLml7bpl7TotoXlh7rkuobpmIjlgLzvvIzmmL7npLogbmV0TG9hZGluZ1xuICAgICAgICAgICAgICAgICAgICAvLyDmnInot6/nlLHmmL7npLrnmoTor53vvIzlsLHkuI3lho3mo4Dmn6Xlhbbku5bnmoTot6/nlLFcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDlsIbot6/nlLHmt7vliqDliLDot6/nlLHnrqHnkIblmajvvIjmmoLlkI3vvIlcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcm91dGVyIOi3r+eUseWQjVxuICAgICAqIOWwhiB7IOi3r+eUseWQjSA9PiDml7bpl7QgfSDkvZzkuLrplK7lgLzlr7nlrZjotbfmnaXvvIzlpoLmnpzmmK/lt7Lnu4/lrZjlnKjnmoTot6/nlLHvvIzliJnot7Pov4dcbiAgICAgKi9cbiAgICBhZGRSb3V0ZXJUb01hbmFnZXI6IGZ1bmN0aW9uKHJvdXRlcikge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucm91dGVyTWFuYWdlcik7XG5cbiAgICAgICAgLy8g5pat57q/6YeN6L+e5pyf6Ze077yM5ouS57ud5YW25LuW55qE6Lev55Sx5Yqg5YWlXG4gICAgICAgIGlmIChrZXlzLmluZGV4T2YoJ2Nvbm5lY3RUaW1lb3V0JykgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyDmlq3nur/ph43ov57ml7bvvIzmuIXnqbrot6/nlLFcbiAgICAgICAgICAgIGlmIChyb3V0ZXIgPT09ICdjb25uZWN0VGltZW91dCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlck1hbmFnZXIgPSB7fTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucm91dGVyTWFuYWdlcik7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBrZXlzLmluZGV4T2Yocm91dGVyKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyTWFuYWdlcltyb3V0ZXJdID0gY3VycmVudFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5pS25Yiw572R57uc6L+U5Zue77yM5bCG6Lev55Sx566h55CG5Zmo77yI5pqC5ZCN77yJ5Lit5a+55bqU55qE6Lev55Sx5Yig5o6JXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHJvdXRlciDot6/nlLHlkI1cbiAgICAgKi9cbiAgICByZWNlaXZlUm91dGVyRnJvbVNlcnZlcjogZnVuY3Rpb24ocm91dGVyKSB7XG4gICAgICAgIGlmIChyb3V0ZXIgPT09ICdjbG9zZSBhbGwgbmV0TG9hZGluZycpIHtcbiAgICAgICAgICAgIHRoaXMucm91dGVyTWFuYWdlciA9IHt9O1xuICAgICAgICAgICAgdGhpcy5jaGVja05ldExvYWRpbmdTdGF0dXMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucm91dGVyTWFuYWdlcik7XG4gICAgICAgIHZhciBpbmRleCA9IGtleXMuaW5kZXhPZihyb3V0ZXIpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocm91dGVyLCBcImNvc3RcIiwgRGF0ZS5ub3coKSAtIHRoaXMucm91dGVyTWFuYWdlcltyb3V0ZXJdLCBcIm1zXCIpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMucm91dGVyTWFuYWdlcltyb3V0ZXJdO1xuXG4gICAgICAgICAgICAvLyDliKDpmaTkuYvlkI7opoHliLfmlrDkuIDmrKEgbmV0TG9hZGluZyDnmoTmmL7npLpcbiAgICAgICAgICAgIHRoaXMuY2hlY2tOZXRMb2FkaW5nU3RhdHVzKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8qKlxuICAgICAqIOivt+Wuoue9kee7nOWbnuiwg1xuICAgICAqL1xuICAgIGNsZWFyQ2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wb21lbG8pIHRoaXMucG9tZWxvLmNsZWFyQ2FsbGJhY2soKTtcbiAgICB9XG59O1xuXG5uZXR3b3JrLmlzQ29ubmVjdGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvbWVsby5pc0Nvbm5lY3RpbmcoKTtcbn07XG5cbm5ldHdvcmsuaXNDb25uZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb21lbG8uaXNPcGVuKCk7XG59O1xuXG5uZXR3b3JrLmlzQ2xvc2VkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9tZWxvLmlzQ2xvc2VkKCk7XG59O1xuXG5uZXR3b3JrLmlzQ2xvc2luZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvbWVsby5pc0Nsb3NpbmcoKTtcbn07XG5cbm5ldHdvcmsuY2hvb3NlTmV0d29ya01vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmluaXROZXR3b3JrKCk7XG4gICAgaWYgKHRoaXMucG9tZWxvKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLm5ldExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLnBvbWVsb1tcIm9uXCJdKGtleSwgdGhpcy5vbk1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxubmV0d29yay5vbiA9IGZ1bmN0aW9uKG1zZ05hbWUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLm5ldExpc3RlbmVyLm9uKG1zZ05hbWUsIGhhbmRsZXIpO1xufTtcblxubmV0d29yay5kaXNwYXRjaCA9IGZ1bmN0aW9uKG1zZ05hbWUsIG1zZ0NvbnRlbnQpIHtcbiAgICB0aGlzLm5ldExpc3RlbmVyLmRpc3BhdGNoKG1zZ05hbWUsIG1zZ0NvbnRlbnQpO1xufTtcbiJdfQ==