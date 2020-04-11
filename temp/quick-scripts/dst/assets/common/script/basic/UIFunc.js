
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/UIFunc.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e27ea/SQDlKEYCLkAX9GkJg', 'UIFunc');
// common/script/basic/UIFunc.js

"use strict";

/*
    create by hao.c 2018/04/10

    desc: 游戏显示相关操作逻辑
 */
window.uiFunc = {
  uiList: [],
  cacheUIList: []
};

uiFunc.openUI = function (uiName, callBack) {
  // 缓存--
  for (var i = 0; i < uiFunc.cacheUIList.length; i++) {
    var temp = uiFunc.cacheUIList[i];

    if (temp && temp.name === uiName) {
      temp.active = true;
      temp.parent = cc.Canvas.instance.node;
      uiFunc.uiList.push(temp);
      uiFunc.cacheUIList.splice(i, 1);
      var panel = temp.getComponent("uiPanel");

      if (panel) {
        panel.show();
      } // event--


      if (callBack) {
        callBack(temp);
      }

      clientEvent.dispatch(clientEvent.eventType.openUI);
      return;
    }
  } // 非缓存--


  cc.loader.loadRes('ui/' + uiName, function (err, prefab) {
    if (err) {
      cc.error(err.message || err);
      return;
    }

    var temp = cc.instantiate(prefab);
    temp.parent = cc.Canvas.instance.node;
    uiFunc.uiList.push(temp);
    var panel = temp.getComponent("uiPanel");

    if (panel) {
      panel.show();
    } // event--


    if (callBack) {
      callBack(temp);
    }

    clientEvent.dispatch(clientEvent.eventType.openUI);
  });
};

uiFunc.closeUI = function (uiName, callBack) {
  for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
    var temp = uiFunc.uiList[i];

    if (temp && temp.name === uiName) {
      temp.active = false;
      temp.removeFromParent(true);
      uiFunc.cacheUIList.push(temp);
      uiFunc.uiList.splice(i, 1);
      var panel = temp.getComponent("uiPanel");

      if (panel) {
        panel.hide();
      }

      clientEvent.dispatch(clientEvent.eventType.closeUI);

      if (callBack) {
        callBack();
      }

      return;
    }
  }
};

uiFunc.findUI = function (uiName) {
  for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
    var temp = uiFunc.uiList[i];

    if (temp && temp.name === uiName) {
      return temp;
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL1VJRnVuYy5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJ1aUZ1bmMiLCJ1aUxpc3QiLCJjYWNoZVVJTGlzdCIsIm9wZW5VSSIsInVpTmFtZSIsImNhbGxCYWNrIiwiaSIsImxlbmd0aCIsInRlbXAiLCJuYW1lIiwiYWN0aXZlIiwicGFyZW50IiwiY2MiLCJDYW52YXMiLCJpbnN0YW5jZSIsIm5vZGUiLCJwdXNoIiwic3BsaWNlIiwicGFuZWwiLCJnZXRDb21wb25lbnQiLCJzaG93IiwiY2xpZW50RXZlbnQiLCJkaXNwYXRjaCIsImV2ZW50VHlwZSIsImxvYWRlciIsImxvYWRSZXMiLCJlcnIiLCJwcmVmYWIiLCJlcnJvciIsIm1lc3NhZ2UiLCJpbnN0YW50aWF0ZSIsImNsb3NlVUkiLCJyZW1vdmVGcm9tUGFyZW50IiwiaGlkZSIsImZpbmRVSSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFNQUEsTUFBTSxDQUFDQyxNQUFQLEdBQWdCO0FBQ1pDLEVBQUFBLE1BQU0sRUFBRSxFQURJO0FBRVpDLEVBQUFBLFdBQVcsRUFBRTtBQUZELENBQWhCOztBQUtBRixNQUFNLENBQUNHLE1BQVAsR0FBZ0IsVUFBU0MsTUFBVCxFQUFpQkMsUUFBakIsRUFBMkI7QUFDdkM7QUFDQSxPQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdOLE1BQU0sQ0FBQ0UsV0FBUCxDQUFtQkssTUFBdkMsRUFBK0NELENBQUMsRUFBaEQsRUFBb0Q7QUFDaEQsUUFBSUUsSUFBSSxHQUFHUixNQUFNLENBQUNFLFdBQVAsQ0FBbUJJLENBQW5CLENBQVg7O0FBQ0EsUUFBSUUsSUFBSSxJQUFJQSxJQUFJLENBQUNDLElBQUwsS0FBY0wsTUFBMUIsRUFBa0M7QUFDOUJJLE1BQUFBLElBQUksQ0FBQ0UsTUFBTCxHQUFjLElBQWQ7QUFDQUYsTUFBQUEsSUFBSSxDQUFDRyxNQUFMLEdBQWNDLEVBQUUsQ0FBQ0MsTUFBSCxDQUFVQyxRQUFWLENBQW1CQyxJQUFqQztBQUNBZixNQUFBQSxNQUFNLENBQUNDLE1BQVAsQ0FBY2UsSUFBZCxDQUFtQlIsSUFBbkI7QUFDQVIsTUFBQUEsTUFBTSxDQUFDRSxXQUFQLENBQW1CZSxNQUFuQixDQUEwQlgsQ0FBMUIsRUFBNkIsQ0FBN0I7QUFFQSxVQUFJWSxLQUFLLEdBQUdWLElBQUksQ0FBQ1csWUFBTCxDQUFrQixTQUFsQixDQUFaOztBQUNBLFVBQUlELEtBQUosRUFBVztBQUNQQSxRQUFBQSxLQUFLLENBQUNFLElBQU47QUFDSCxPQVQ2QixDQVc5Qjs7O0FBQ0EsVUFBSWYsUUFBSixFQUFjO0FBQ1ZBLFFBQUFBLFFBQVEsQ0FBQ0csSUFBRCxDQUFSO0FBQ0g7O0FBQ0RhLE1BQUFBLFdBQVcsQ0FBQ0MsUUFBWixDQUFxQkQsV0FBVyxDQUFDRSxTQUFaLENBQXNCcEIsTUFBM0M7QUFDQTtBQUNIO0FBQ0osR0F0QnNDLENBdUJ2Qzs7O0FBQ0FTLEVBQUFBLEVBQUUsQ0FBQ1ksTUFBSCxDQUFVQyxPQUFWLENBQWtCLFFBQVFyQixNQUExQixFQUFrQyxVQUFTc0IsR0FBVCxFQUFjQyxNQUFkLEVBQXNCO0FBQ3BELFFBQUlELEdBQUosRUFBUztBQUNMZCxNQUFBQSxFQUFFLENBQUNnQixLQUFILENBQVNGLEdBQUcsQ0FBQ0csT0FBSixJQUFlSCxHQUF4QjtBQUNBO0FBQ0g7O0FBRUQsUUFBSWxCLElBQUksR0FBR0ksRUFBRSxDQUFDa0IsV0FBSCxDQUFlSCxNQUFmLENBQVg7QUFDQW5CLElBQUFBLElBQUksQ0FBQ0csTUFBTCxHQUFjQyxFQUFFLENBQUNDLE1BQUgsQ0FBVUMsUUFBVixDQUFtQkMsSUFBakM7QUFDQWYsSUFBQUEsTUFBTSxDQUFDQyxNQUFQLENBQWNlLElBQWQsQ0FBbUJSLElBQW5CO0FBRUEsUUFBSVUsS0FBSyxHQUFHVixJQUFJLENBQUNXLFlBQUwsQ0FBa0IsU0FBbEIsQ0FBWjs7QUFDQSxRQUFJRCxLQUFKLEVBQVc7QUFDUEEsTUFBQUEsS0FBSyxDQUFDRSxJQUFOO0FBQ0gsS0FibUQsQ0FlcEQ7OztBQUNBLFFBQUlmLFFBQUosRUFBYztBQUNWQSxNQUFBQSxRQUFRLENBQUNHLElBQUQsQ0FBUjtBQUNIOztBQUNEYSxJQUFBQSxXQUFXLENBQUNDLFFBQVosQ0FBcUJELFdBQVcsQ0FBQ0UsU0FBWixDQUFzQnBCLE1BQTNDO0FBQ0gsR0FwQkQ7QUFxQkgsQ0E3Q0Q7O0FBK0NBSCxNQUFNLENBQUMrQixPQUFQLEdBQWlCLFVBQVMzQixNQUFULEVBQWlCQyxRQUFqQixFQUEyQjtBQUN4QyxPQUFLLElBQUlDLENBQUMsR0FBR04sTUFBTSxDQUFDQyxNQUFQLENBQWNNLE1BQWQsR0FBdUIsQ0FBcEMsRUFBdUNELENBQUMsSUFBSSxDQUE1QyxFQUErQ0EsQ0FBQyxFQUFoRCxFQUFvRDtBQUNoRCxRQUFJRSxJQUFJLEdBQUdSLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjSyxDQUFkLENBQVg7O0FBQ0EsUUFBSUUsSUFBSSxJQUFJQSxJQUFJLENBQUNDLElBQUwsS0FBY0wsTUFBMUIsRUFBa0M7QUFDOUJJLE1BQUFBLElBQUksQ0FBQ0UsTUFBTCxHQUFjLEtBQWQ7QUFDQUYsTUFBQUEsSUFBSSxDQUFDd0IsZ0JBQUwsQ0FBc0IsSUFBdEI7QUFDQWhDLE1BQUFBLE1BQU0sQ0FBQ0UsV0FBUCxDQUFtQmMsSUFBbkIsQ0FBd0JSLElBQXhCO0FBQ0FSLE1BQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjZ0IsTUFBZCxDQUFxQlgsQ0FBckIsRUFBd0IsQ0FBeEI7QUFFQSxVQUFJWSxLQUFLLEdBQUdWLElBQUksQ0FBQ1csWUFBTCxDQUFrQixTQUFsQixDQUFaOztBQUNBLFVBQUlELEtBQUosRUFBVztBQUNQQSxRQUFBQSxLQUFLLENBQUNlLElBQU47QUFDSDs7QUFFRFosTUFBQUEsV0FBVyxDQUFDQyxRQUFaLENBQXFCRCxXQUFXLENBQUNFLFNBQVosQ0FBc0JRLE9BQTNDOztBQUNBLFVBQUkxQixRQUFKLEVBQWM7QUFDVkEsUUFBQUEsUUFBUTtBQUNYOztBQUNEO0FBQ0g7QUFDSjtBQUNKLENBckJEOztBQXVCQUwsTUFBTSxDQUFDa0MsTUFBUCxHQUFnQixVQUFTOUIsTUFBVCxFQUFpQjtBQUM3QixPQUFLLElBQUlFLENBQUMsR0FBR04sTUFBTSxDQUFDQyxNQUFQLENBQWNNLE1BQWQsR0FBdUIsQ0FBcEMsRUFBdUNELENBQUMsSUFBSSxDQUE1QyxFQUErQ0EsQ0FBQyxFQUFoRCxFQUFvRDtBQUNoRCxRQUFJRSxJQUFJLEdBQUdSLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjSyxDQUFkLENBQVg7O0FBQ0EsUUFBSUUsSUFBSSxJQUFJQSxJQUFJLENBQUNDLElBQUwsS0FBY0wsTUFBMUIsRUFBa0M7QUFDOUIsYUFBT0ksSUFBUDtBQUNIO0FBQ0o7QUFDSixDQVBEIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICBjcmVhdGUgYnkgaGFvLmMgMjAxOC8wNC8xMFxuXG4gICAgZGVzYzog5ri45oiP5pi+56S655u45YWz5pON5L2c6YC76L6RXG4gKi9cblxud2luZG93LnVpRnVuYyA9IHtcbiAgICB1aUxpc3Q6IFtdLFxuICAgIGNhY2hlVUlMaXN0OiBbXVxufTtcblxudWlGdW5jLm9wZW5VSSA9IGZ1bmN0aW9uKHVpTmFtZSwgY2FsbEJhY2spIHtcbiAgICAvLyDnvJPlrZgtLVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdWlGdW5jLmNhY2hlVUlMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0ZW1wID0gdWlGdW5jLmNhY2hlVUlMaXN0W2ldO1xuICAgICAgICBpZiAodGVtcCAmJiB0ZW1wLm5hbWUgPT09IHVpTmFtZSkge1xuICAgICAgICAgICAgdGVtcC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGVtcC5wYXJlbnQgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZTtcbiAgICAgICAgICAgIHVpRnVuYy51aUxpc3QucHVzaCh0ZW1wKVxuICAgICAgICAgICAgdWlGdW5jLmNhY2hlVUlMaXN0LnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgdmFyIHBhbmVsID0gdGVtcC5nZXRDb21wb25lbnQoXCJ1aVBhbmVsXCIpO1xuICAgICAgICAgICAgaWYgKHBhbmVsKSB7XG4gICAgICAgICAgICAgICAgcGFuZWwuc2hvdygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBldmVudC0tXG4gICAgICAgICAgICBpZiAoY2FsbEJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsQmFjayh0ZW1wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5vcGVuVUkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIOmdnue8k+WtmC0tXG4gICAgY2MubG9hZGVyLmxvYWRSZXMoJ3VpLycgKyB1aU5hbWUsIGZ1bmN0aW9uKGVyciwgcHJlZmFiKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlIHx8IGVycik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdGVtcCA9IGNjLmluc3RhbnRpYXRlKHByZWZhYik7XG4gICAgICAgIHRlbXAucGFyZW50ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGU7XG4gICAgICAgIHVpRnVuYy51aUxpc3QucHVzaCh0ZW1wKVxuXG4gICAgICAgIHZhciBwYW5lbCA9IHRlbXAuZ2V0Q29tcG9uZW50KFwidWlQYW5lbFwiKTtcbiAgICAgICAgaWYgKHBhbmVsKSB7XG4gICAgICAgICAgICBwYW5lbC5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBldmVudC0tXG4gICAgICAgIGlmIChjYWxsQmFjaykge1xuICAgICAgICAgICAgY2FsbEJhY2sodGVtcCk7XG4gICAgICAgIH1cbiAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLm9wZW5VSSk7XG4gICAgfSk7XG59O1xuXG51aUZ1bmMuY2xvc2VVSSA9IGZ1bmN0aW9uKHVpTmFtZSwgY2FsbEJhY2spIHtcbiAgICBmb3IgKHZhciBpID0gdWlGdW5jLnVpTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgdGVtcCA9IHVpRnVuYy51aUxpc3RbaV07XG4gICAgICAgIGlmICh0ZW1wICYmIHRlbXAubmFtZSA9PT0gdWlOYW1lKSB7XG4gICAgICAgICAgICB0ZW1wLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGVtcC5yZW1vdmVGcm9tUGFyZW50KHRydWUpO1xuICAgICAgICAgICAgdWlGdW5jLmNhY2hlVUlMaXN0LnB1c2godGVtcCk7XG4gICAgICAgICAgICB1aUZ1bmMudWlMaXN0LnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgdmFyIHBhbmVsID0gdGVtcC5nZXRDb21wb25lbnQoXCJ1aVBhbmVsXCIpO1xuICAgICAgICAgICAgaWYgKHBhbmVsKSB7XG4gICAgICAgICAgICAgICAgcGFuZWwuaGlkZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuY2xvc2VVSSk7XG4gICAgICAgICAgICBpZiAoY2FsbEJhY2spIHtcbiAgICAgICAgICAgICAgICBjYWxsQmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxufVxuXG51aUZ1bmMuZmluZFVJID0gZnVuY3Rpb24odWlOYW1lKSB7XG4gICAgZm9yICh2YXIgaSA9IHVpRnVuYy51aUxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgdmFyIHRlbXAgPSB1aUZ1bmMudWlMaXN0W2ldO1xuICAgICAgICBpZiAodGVtcCAmJiB0ZW1wLm5hbWUgPT09IHVpTmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRlbXA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=