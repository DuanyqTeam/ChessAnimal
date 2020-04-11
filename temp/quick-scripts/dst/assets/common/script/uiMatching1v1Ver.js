
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiMatching1v1Ver.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '705085fc89PIavCo9Cf1kbp', 'uiMatching1v1Ver');
// common/script/uiMatching1v1Ver.js

"use strict";

var uiPanel = require("uiPanel");

var mvs = require("Matchvs");

var GLB = require("Glb");

cc.Class({
  "extends": uiPanel,
  properties: {
    playerIcons: [cc.Node]
  },
  onLoad: function onLoad() {
    this._super();

    this.nodeDict["quit"].on("click", this.leaveRoom, this);
    clientEvent.on(clientEvent.eventType.joinRoomResponse, this.joinRoomResponse, this);
    clientEvent.on(clientEvent.eventType.joinRoomNotify, this.joinRoomNotify, this);
    clientEvent.on(clientEvent.eventType.leaveRoomResponse, this.leaveRoomResponse, this);
    clientEvent.on(clientEvent.eventType.leaveRoomNotify, this.leaveRoomNotify, this);
    clientEvent.on(clientEvent.eventType.joinOverResponse, this.joinOverResponse, this); // this.playerNodeInit()
  },
  playerNodeInit: function playerNodeInit() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.playerIcons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var val = _step.value;
        val.active = false;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  },
  joinRandomRoom: function joinRandomRoom() {
    var result = null;

    if (GLB.matchType === GLB.RANDOM_MATCH) {
      result = mvs.engine.joinRandomRoom(GLB.MAX_PLAYER_COUNT, '');

      if (result !== 0) {
        console.log('进入房间失败,错误码:' + result);
      }
    } else if (GLB.matchType === GLB.PROPERTY_MATCH) {
      var matchinfo = new mvs.MatchInfo();
      matchinfo.maxPlayer = GLB.MAX_PLAYER_COUNT;
      matchinfo.mode = 0;
      matchinfo.canWatch = 0;
      matchinfo.tags = GLB.tagsInfo;
      result = mvs.engine.joinRoomWithProperties(matchinfo, "joinRoomWithProperties");

      if (result !== 0) {
        console.log('进入房间失败,错误码:' + result);
      }
    }
  },
  startGame: function startGame() {
    console.log('游戏即将开始');
    cc.director.loadScene('game');
  },
  joinRoomResponse: function joinRoomResponse(data) {
    if (data.status !== 200) {
      console.log('进入房间失败,异步回调错误码: ' + data.status);
    } else {
      console.log('进入房间成功');
      console.log('房间号: ' + data.roomInfo.roomID);
    }

    GLB.roomId = data.roomInfo.roomID;
    var userIds = [GLB.userInfo.id];
    console.log('房间用户: ' + userIds);
    var playerIcon = null;

    for (var j = 0; j < data.roomUserInfoList.length; j++) {
      playerIcon = this.playerIcons[j].getComponent('playerIcon');

      if (playerIcon && !playerIcon.userInfo) {
        playerIcon.setData(data.roomUserInfoList[j]);

        if (GLB.userInfo.id !== data.roomUserInfoList[j].userId) {
          userIds.push(data.roomUserInfoList[j].userId);
        }
      }
    }

    for (var i = 0; i < this.playerIcons.length; i++) {
      playerIcon = this.playerIcons[i].getComponent('playerIcon');

      if (playerIcon && !playerIcon.userInfo) {
        // this.playerIcons[i].active = true;
        playerIcon.setData(GLB.userInfo);
        break;
      }
    }

    GLB.playerUserIds = userIds;

    if (userIds.length >= GLB.MAX_PLAYER_COUNT) {
      var result = mvs.engine.joinOver("");
      console.log("发出关闭房间的通知");

      if (result !== 0) {
        console.log("关闭房间失败，错误码：", result);
      }

      GLB.playerUserIds = userIds;
    }
  },
  joinRoomNotify: function joinRoomNotify(data) {
    console.log("joinRoomNotify, roomUserInfo:" + JSON.stringify(data.roomUserInfo));
    var playerIcon = null;

    for (var j = 0; j < this.playerIcons.length; j++) {
      playerIcon = this.playerIcons[j].getComponent('playerIcon');

      if (playerIcon && !playerIcon.userInfo) {
        // this.playerIcons[j].active = true;
        playerIcon.setData(data.roomUserInfo);
        break;
      }
    }
  },
  leaveRoom: function leaveRoom() {
    mvs.engine.leaveRoom("");
    uiFunc.closeUI(this.node.name);
    this.node.destroy();
  },
  leaveRoomNotify: function leaveRoomNotify(data) {
    if (GLB.roomId === data.leaveRoomInfo.roomID) {
      for (var i = 0; i < this.playerIcons.length; i++) {
        var playerIcon = this.playerIcons[i].getComponent('playerIcon');

        if (playerIcon && playerIcon.userInfo && playerIcon.playerId === data.leaveRoomInfo.userId) {
          playerIcon.init();
          break;
        }
      }
    }
  },
  leaveRoomResponse: function leaveRoomResponse(data) {
    if (data.leaveRoomRsp.status === 200) {
      console.log("离开房间成功");

      for (var i = 0; i < this.playerIcons.length; i++) {
        var playerIcon = this.playerIcons[i].getComponent('playerIcon');

        if (playerIcon) {
          playerIcon.init();
          break;
        }
      }

      uiFunc.closeUI(this.node.name);
      this.node.destroy();
    } else {
      console.log("离开房间失败");
    }
  },
  joinOverResponse: function joinOverResponse(data) {
    if (data.joinOverRsp.status === 200) {
      console.log("关闭房间成功");
      this.notifyGameStart();
    } else {
      console.log("关闭房间失败，回调通知错误码：", data.joinOverRsp.status);
    }
  },
  notifyGameStart: function notifyGameStart() {
    GLB.isRoomOwner = true;
    var msg = {
      action: GLB.GAME_START_EVENT,
      userIds: GLB.playerUserIds
    };
    Game.GameManager.sendEventEx(msg);
  },
  onDestroy: function onDestroy() {
    clientEvent.off(clientEvent.eventType.joinRoomResponse, this.joinRoomResponse, this);
    clientEvent.off(clientEvent.eventType.joinRoomNotify, this.joinRoomNotify, this);
    clientEvent.off(clientEvent.eventType.leaveRoomResponse, this.leaveRoomResponse, this);
    clientEvent.off(clientEvent.eventType.leaveRoomNotify, this.leaveRoomNotify, this);
    clientEvent.off(clientEvent.eventType.joinOverResponse, this.joinOverResponse, this);
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpTWF0Y2hpbmcxdjFWZXIuanMiXSwibmFtZXMiOlsidWlQYW5lbCIsInJlcXVpcmUiLCJtdnMiLCJHTEIiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsInBsYXllckljb25zIiwiTm9kZSIsIm9uTG9hZCIsIl9zdXBlciIsIm5vZGVEaWN0Iiwib24iLCJsZWF2ZVJvb20iLCJjbGllbnRFdmVudCIsImV2ZW50VHlwZSIsImpvaW5Sb29tUmVzcG9uc2UiLCJqb2luUm9vbU5vdGlmeSIsImxlYXZlUm9vbVJlc3BvbnNlIiwibGVhdmVSb29tTm90aWZ5Iiwiam9pbk92ZXJSZXNwb25zZSIsInBsYXllck5vZGVJbml0IiwidmFsIiwiYWN0aXZlIiwiam9pblJhbmRvbVJvb20iLCJyZXN1bHQiLCJtYXRjaFR5cGUiLCJSQU5ET01fTUFUQ0giLCJlbmdpbmUiLCJNQVhfUExBWUVSX0NPVU5UIiwiY29uc29sZSIsImxvZyIsIlBST1BFUlRZX01BVENIIiwibWF0Y2hpbmZvIiwiTWF0Y2hJbmZvIiwibWF4UGxheWVyIiwibW9kZSIsImNhbldhdGNoIiwidGFncyIsInRhZ3NJbmZvIiwiam9pblJvb21XaXRoUHJvcGVydGllcyIsInN0YXJ0R2FtZSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiZGF0YSIsInN0YXR1cyIsInJvb21JbmZvIiwicm9vbUlEIiwicm9vbUlkIiwidXNlcklkcyIsInVzZXJJbmZvIiwiaWQiLCJwbGF5ZXJJY29uIiwiaiIsInJvb21Vc2VySW5mb0xpc3QiLCJsZW5ndGgiLCJnZXRDb21wb25lbnQiLCJzZXREYXRhIiwidXNlcklkIiwicHVzaCIsImkiLCJwbGF5ZXJVc2VySWRzIiwiam9pbk92ZXIiLCJKU09OIiwic3RyaW5naWZ5Iiwicm9vbVVzZXJJbmZvIiwidWlGdW5jIiwiY2xvc2VVSSIsIm5vZGUiLCJuYW1lIiwiZGVzdHJveSIsImxlYXZlUm9vbUluZm8iLCJwbGF5ZXJJZCIsImluaXQiLCJsZWF2ZVJvb21Sc3AiLCJqb2luT3ZlclJzcCIsIm5vdGlmeUdhbWVTdGFydCIsImlzUm9vbU93bmVyIiwibXNnIiwiYWN0aW9uIiwiR0FNRV9TVEFSVF9FVkVOVCIsIkdhbWUiLCJHYW1lTWFuYWdlciIsInNlbmRFdmVudEV4Iiwib25EZXN0cm95Iiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0EsSUFBSUMsR0FBRyxHQUFHRCxPQUFPLENBQUMsU0FBRCxDQUFqQjs7QUFDQSxJQUFJRSxHQUFHLEdBQUdGLE9BQU8sQ0FBQyxLQUFELENBQWpCOztBQUNBRyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNMLE9BREo7QUFFTE0sRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBRSxDQUFDSCxFQUFFLENBQUNJLElBQUo7QUFETCxHQUZQO0FBTUxDLEVBQUFBLE1BTkssb0JBTUk7QUFDTCxTQUFLQyxNQUFMOztBQUNBLFNBQUtDLFFBQUwsQ0FBYyxNQUFkLEVBQXNCQyxFQUF0QixDQUF5QixPQUF6QixFQUFrQyxLQUFLQyxTQUF2QyxFQUFrRCxJQUFsRDtBQUVBQyxJQUFBQSxXQUFXLENBQUNGLEVBQVosQ0FBZUUsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxnQkFBckMsRUFBdUQsS0FBS0EsZ0JBQTVELEVBQThFLElBQTlFO0FBQ0FGLElBQUFBLFdBQVcsQ0FBQ0YsRUFBWixDQUFlRSxXQUFXLENBQUNDLFNBQVosQ0FBc0JFLGNBQXJDLEVBQXFELEtBQUtBLGNBQTFELEVBQTBFLElBQTFFO0FBQ0FILElBQUFBLFdBQVcsQ0FBQ0YsRUFBWixDQUFlRSxXQUFXLENBQUNDLFNBQVosQ0FBc0JHLGlCQUFyQyxFQUF3RCxLQUFLQSxpQkFBN0QsRUFBZ0YsSUFBaEY7QUFDQUosSUFBQUEsV0FBVyxDQUFDRixFQUFaLENBQWVFLFdBQVcsQ0FBQ0MsU0FBWixDQUFzQkksZUFBckMsRUFBc0QsS0FBS0EsZUFBM0QsRUFBNEUsSUFBNUU7QUFDQUwsSUFBQUEsV0FBVyxDQUFDRixFQUFaLENBQWVFLFdBQVcsQ0FBQ0MsU0FBWixDQUFzQkssZ0JBQXJDLEVBQXVELEtBQUtBLGdCQUE1RCxFQUE4RSxJQUE5RSxFQVJLLENBU0w7QUFDSCxHQWhCSTtBQWtCTEMsRUFBQUEsY0FsQkssNEJBa0JhO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ2QsMkJBQWlCLEtBQUtkLFdBQXRCLDhIQUFtQztBQUFBLFlBQXpCZSxHQUF5QjtBQUMvQkEsUUFBQUEsR0FBRyxDQUFDQyxNQUFKLEdBQWEsS0FBYjtBQUNIO0FBSGE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlqQixHQXRCSTtBQXdCTEMsRUFBQUEsY0FBYyxFQUFFLDBCQUFXO0FBQ3ZCLFFBQUlDLE1BQU0sR0FBRyxJQUFiOztBQUNBLFFBQUl0QixHQUFHLENBQUN1QixTQUFKLEtBQWtCdkIsR0FBRyxDQUFDd0IsWUFBMUIsRUFBd0M7QUFDcENGLE1BQUFBLE1BQU0sR0FBR3ZCLEdBQUcsQ0FBQzBCLE1BQUosQ0FBV0osY0FBWCxDQUEwQnJCLEdBQUcsQ0FBQzBCLGdCQUE5QixFQUFnRCxFQUFoRCxDQUFUOztBQUNBLFVBQUlKLE1BQU0sS0FBSyxDQUFmLEVBQWtCO0FBQ2RLLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFnQk4sTUFBNUI7QUFDSDtBQUNKLEtBTEQsTUFLTyxJQUFJdEIsR0FBRyxDQUFDdUIsU0FBSixLQUFrQnZCLEdBQUcsQ0FBQzZCLGNBQTFCLEVBQTBDO0FBQzdDLFVBQUlDLFNBQVMsR0FBRyxJQUFJL0IsR0FBRyxDQUFDZ0MsU0FBUixFQUFoQjtBQUNBRCxNQUFBQSxTQUFTLENBQUNFLFNBQVYsR0FBc0JoQyxHQUFHLENBQUMwQixnQkFBMUI7QUFDQUksTUFBQUEsU0FBUyxDQUFDRyxJQUFWLEdBQWlCLENBQWpCO0FBQ0FILE1BQUFBLFNBQVMsQ0FBQ0ksUUFBVixHQUFxQixDQUFyQjtBQUNBSixNQUFBQSxTQUFTLENBQUNLLElBQVYsR0FBaUJuQyxHQUFHLENBQUNvQyxRQUFyQjtBQUNBZCxNQUFBQSxNQUFNLEdBQUd2QixHQUFHLENBQUMwQixNQUFKLENBQVdZLHNCQUFYLENBQWtDUCxTQUFsQyxFQUE2Qyx3QkFBN0MsQ0FBVDs7QUFDQSxVQUFJUixNQUFNLEtBQUssQ0FBZixFQUFrQjtBQUNkSyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBZ0JOLE1BQTVCO0FBQ0g7QUFDSjtBQUNKLEdBMUNJO0FBNENMZ0IsRUFBQUEsU0FBUyxFQUFFLHFCQUFXO0FBQ2xCWCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaO0FBQ0EzQixJQUFBQSxFQUFFLENBQUNzQyxRQUFILENBQVlDLFNBQVosQ0FBc0IsTUFBdEI7QUFDSCxHQS9DSTtBQWlETDNCLEVBQUFBLGdCQUFnQixFQUFFLDBCQUFTNEIsSUFBVCxFQUFlO0FBQzdCLFFBQUlBLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixHQUFwQixFQUF5QjtBQUNyQmYsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVkscUJBQXFCYSxJQUFJLENBQUNDLE1BQXRDO0FBQ0gsS0FGRCxNQUVPO0FBQ0hmLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVo7QUFDQUQsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksVUFBVWEsSUFBSSxDQUFDRSxRQUFMLENBQWNDLE1BQXBDO0FBQ0g7O0FBQ0Q1QyxJQUFBQSxHQUFHLENBQUM2QyxNQUFKLEdBQWFKLElBQUksQ0FBQ0UsUUFBTCxDQUFjQyxNQUEzQjtBQUNBLFFBQUlFLE9BQU8sR0FBRyxDQUFDOUMsR0FBRyxDQUFDK0MsUUFBSixDQUFhQyxFQUFkLENBQWQ7QUFDQXJCLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVdrQixPQUF2QjtBQUVBLFFBQUlHLFVBQVUsR0FBRyxJQUFqQjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdULElBQUksQ0FBQ1UsZ0JBQUwsQ0FBc0JDLE1BQTFDLEVBQWtERixDQUFDLEVBQW5ELEVBQXVEO0FBQ25ERCxNQUFBQSxVQUFVLEdBQUcsS0FBSzdDLFdBQUwsQ0FBaUI4QyxDQUFqQixFQUFvQkcsWUFBcEIsQ0FBaUMsWUFBakMsQ0FBYjs7QUFDQSxVQUFJSixVQUFVLElBQUksQ0FBQ0EsVUFBVSxDQUFDRixRQUE5QixFQUF3QztBQUNwQ0UsUUFBQUEsVUFBVSxDQUFDSyxPQUFYLENBQW1CYixJQUFJLENBQUNVLGdCQUFMLENBQXNCRCxDQUF0QixDQUFuQjs7QUFDQSxZQUFJbEQsR0FBRyxDQUFDK0MsUUFBSixDQUFhQyxFQUFiLEtBQW9CUCxJQUFJLENBQUNVLGdCQUFMLENBQXNCRCxDQUF0QixFQUF5QkssTUFBakQsRUFBeUQ7QUFDckRULFVBQUFBLE9BQU8sQ0FBQ1UsSUFBUixDQUFhZixJQUFJLENBQUNVLGdCQUFMLENBQXNCRCxDQUF0QixFQUF5QkssTUFBdEM7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsU0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtyRCxXQUFMLENBQWlCZ0QsTUFBckMsRUFBNkNLLENBQUMsRUFBOUMsRUFBa0Q7QUFDOUNSLE1BQUFBLFVBQVUsR0FBRyxLQUFLN0MsV0FBTCxDQUFpQnFELENBQWpCLEVBQW9CSixZQUFwQixDQUFpQyxZQUFqQyxDQUFiOztBQUNBLFVBQUlKLFVBQVUsSUFBSSxDQUFDQSxVQUFVLENBQUNGLFFBQTlCLEVBQXdDO0FBQ3BDO0FBQ0FFLFFBQUFBLFVBQVUsQ0FBQ0ssT0FBWCxDQUFtQnRELEdBQUcsQ0FBQytDLFFBQXZCO0FBQ0E7QUFDSDtBQUNKOztBQUNEL0MsSUFBQUEsR0FBRyxDQUFDMEQsYUFBSixHQUFvQlosT0FBcEI7O0FBQ0EsUUFBSUEsT0FBTyxDQUFDTSxNQUFSLElBQWtCcEQsR0FBRyxDQUFDMEIsZ0JBQTFCLEVBQTRDO0FBQ3hDLFVBQUlKLE1BQU0sR0FBR3ZCLEdBQUcsQ0FBQzBCLE1BQUosQ0FBV2tDLFFBQVgsQ0FBb0IsRUFBcEIsQ0FBYjtBQUNBaEMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWjs7QUFDQSxVQUFJTixNQUFNLEtBQUssQ0FBZixFQUFrQjtBQUNkSyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxhQUFaLEVBQTJCTixNQUEzQjtBQUNIOztBQUVEdEIsTUFBQUEsR0FBRyxDQUFDMEQsYUFBSixHQUFvQlosT0FBcEI7QUFDSDtBQUNKLEdBekZJO0FBMkZMaEMsRUFBQUEsY0FBYyxFQUFFLHdCQUFTMkIsSUFBVCxFQUFlO0FBQzNCZCxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQ0FBa0NnQyxJQUFJLENBQUNDLFNBQUwsQ0FBZXBCLElBQUksQ0FBQ3FCLFlBQXBCLENBQTlDO0FBQ0EsUUFBSWIsVUFBVSxHQUFHLElBQWpCOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLOUMsV0FBTCxDQUFpQmdELE1BQXJDLEVBQTZDRixDQUFDLEVBQTlDLEVBQWtEO0FBQzlDRCxNQUFBQSxVQUFVLEdBQUcsS0FBSzdDLFdBQUwsQ0FBaUI4QyxDQUFqQixFQUFvQkcsWUFBcEIsQ0FBaUMsWUFBakMsQ0FBYjs7QUFDQSxVQUFJSixVQUFVLElBQUksQ0FBQ0EsVUFBVSxDQUFDRixRQUE5QixFQUF3QztBQUNwQztBQUNBRSxRQUFBQSxVQUFVLENBQUNLLE9BQVgsQ0FBbUJiLElBQUksQ0FBQ3FCLFlBQXhCO0FBQ0E7QUFDSDtBQUNKO0FBQ0osR0F0R0k7QUF3R0xwRCxFQUFBQSxTQUFTLEVBQUUscUJBQVc7QUFDbEJYLElBQUFBLEdBQUcsQ0FBQzBCLE1BQUosQ0FBV2YsU0FBWCxDQUFxQixFQUFyQjtBQUNBcUQsSUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWUsS0FBS0MsSUFBTCxDQUFVQyxJQUF6QjtBQUNBLFNBQUtELElBQUwsQ0FBVUUsT0FBVjtBQUNILEdBNUdJO0FBOEdMbkQsRUFBQUEsZUFBZSxFQUFFLHlCQUFTeUIsSUFBVCxFQUFlO0FBQzVCLFFBQUl6QyxHQUFHLENBQUM2QyxNQUFKLEtBQWVKLElBQUksQ0FBQzJCLGFBQUwsQ0FBbUJ4QixNQUF0QyxFQUE4QztBQUMxQyxXQUFLLElBQUlhLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3JELFdBQUwsQ0FBaUJnRCxNQUFyQyxFQUE2Q0ssQ0FBQyxFQUE5QyxFQUFrRDtBQUM5QyxZQUFJUixVQUFVLEdBQUcsS0FBSzdDLFdBQUwsQ0FBaUJxRCxDQUFqQixFQUFvQkosWUFBcEIsQ0FBaUMsWUFBakMsQ0FBakI7O0FBQ0EsWUFBSUosVUFBVSxJQUFJQSxVQUFVLENBQUNGLFFBQXpCLElBQXFDRSxVQUFVLENBQUNvQixRQUFYLEtBQXdCNUIsSUFBSSxDQUFDMkIsYUFBTCxDQUFtQmIsTUFBcEYsRUFBNEY7QUFDeEZOLFVBQUFBLFVBQVUsQ0FBQ3FCLElBQVg7QUFDQTtBQUNIO0FBQ0o7QUFDSjtBQUNKLEdBeEhJO0FBMEhMdkQsRUFBQUEsaUJBQWlCLEVBQUUsMkJBQVMwQixJQUFULEVBQWU7QUFDOUIsUUFBSUEsSUFBSSxDQUFDOEIsWUFBTCxDQUFrQjdCLE1BQWxCLEtBQTZCLEdBQWpDLEVBQXNDO0FBQ2xDZixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaOztBQUNBLFdBQUssSUFBSTZCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3JELFdBQUwsQ0FBaUJnRCxNQUFyQyxFQUE2Q0ssQ0FBQyxFQUE5QyxFQUFrRDtBQUM5QyxZQUFJUixVQUFVLEdBQUcsS0FBSzdDLFdBQUwsQ0FBaUJxRCxDQUFqQixFQUFvQkosWUFBcEIsQ0FBaUMsWUFBakMsQ0FBakI7O0FBQ0EsWUFBSUosVUFBSixFQUFnQjtBQUNaQSxVQUFBQSxVQUFVLENBQUNxQixJQUFYO0FBQ0E7QUFDSDtBQUNKOztBQUNEUCxNQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZSxLQUFLQyxJQUFMLENBQVVDLElBQXpCO0FBQ0EsV0FBS0QsSUFBTCxDQUFVRSxPQUFWO0FBQ0gsS0FYRCxNQVdPO0FBQ0h4QyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaO0FBQ0g7QUFDSixHQXpJSTtBQTJJTFgsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVN3QixJQUFULEVBQWU7QUFDN0IsUUFBSUEsSUFBSSxDQUFDK0IsV0FBTCxDQUFpQjlCLE1BQWpCLEtBQTRCLEdBQWhDLEVBQXFDO0FBQ2pDZixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsV0FBSzZDLGVBQUw7QUFDSCxLQUhELE1BR087QUFDSDlDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGlCQUFaLEVBQStCYSxJQUFJLENBQUMrQixXQUFMLENBQWlCOUIsTUFBaEQ7QUFDSDtBQUNKLEdBbEpJO0FBb0pMK0IsRUFBQUEsZUFBZSxFQUFFLDJCQUFXO0FBQ3hCekUsSUFBQUEsR0FBRyxDQUFDMEUsV0FBSixHQUFrQixJQUFsQjtBQUNBLFFBQUlDLEdBQUcsR0FBRztBQUNOQyxNQUFBQSxNQUFNLEVBQUU1RSxHQUFHLENBQUM2RSxnQkFETjtBQUVOL0IsTUFBQUEsT0FBTyxFQUFFOUMsR0FBRyxDQUFDMEQ7QUFGUCxLQUFWO0FBSUFvQixJQUFBQSxJQUFJLENBQUNDLFdBQUwsQ0FBaUJDLFdBQWpCLENBQTZCTCxHQUE3QjtBQUNILEdBM0pJO0FBNkpMTSxFQUFBQSxTQTdKSyx1QkE2Sk07QUFDUHRFLElBQUFBLFdBQVcsQ0FBQ3VFLEdBQVosQ0FBZ0J2RSxXQUFXLENBQUNDLFNBQVosQ0FBc0JDLGdCQUF0QyxFQUF3RCxLQUFLQSxnQkFBN0QsRUFBK0UsSUFBL0U7QUFDQUYsSUFBQUEsV0FBVyxDQUFDdUUsR0FBWixDQUFnQnZFLFdBQVcsQ0FBQ0MsU0FBWixDQUFzQkUsY0FBdEMsRUFBc0QsS0FBS0EsY0FBM0QsRUFBMkUsSUFBM0U7QUFDQUgsSUFBQUEsV0FBVyxDQUFDdUUsR0FBWixDQUFnQnZFLFdBQVcsQ0FBQ0MsU0FBWixDQUFzQkcsaUJBQXRDLEVBQXlELEtBQUtBLGlCQUE5RCxFQUFpRixJQUFqRjtBQUNBSixJQUFBQSxXQUFXLENBQUN1RSxHQUFaLENBQWdCdkUsV0FBVyxDQUFDQyxTQUFaLENBQXNCSSxlQUF0QyxFQUF1RCxLQUFLQSxlQUE1RCxFQUE2RSxJQUE3RTtBQUNBTCxJQUFBQSxXQUFXLENBQUN1RSxHQUFaLENBQWdCdkUsV0FBVyxDQUFDQyxTQUFaLENBQXNCSyxnQkFBdEMsRUFBd0QsS0FBS0EsZ0JBQTdELEVBQStFLElBQS9FO0FBRUg7QUFwS0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9hc3NldHMvY29tbW9uL3NjcmlwdCIsInNvdXJjZXNDb250ZW50IjpbInZhciB1aVBhbmVsID0gcmVxdWlyZShcInVpUGFuZWxcIik7XG52YXIgbXZzID0gcmVxdWlyZShcIk1hdGNodnNcIik7XG52YXIgR0xCID0gcmVxdWlyZShcIkdsYlwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiB1aVBhbmVsLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcGxheWVySWNvbnM6IFtjYy5Ob2RlXVxuICAgIH0sXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIHRoaXMubm9kZURpY3RbXCJxdWl0XCJdLm9uKFwiY2xpY2tcIiwgdGhpcy5sZWF2ZVJvb20sIHRoaXMpO1xuXG4gICAgICAgIGNsaWVudEV2ZW50Lm9uKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5qb2luUm9vbVJlc3BvbnNlLCB0aGlzLmpvaW5Sb29tUmVzcG9uc2UsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUuam9pblJvb21Ob3RpZnksIHRoaXMuam9pblJvb21Ob3RpZnksIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUubGVhdmVSb29tUmVzcG9uc2UsIHRoaXMubGVhdmVSb29tUmVzcG9uc2UsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUubGVhdmVSb29tTm90aWZ5LCB0aGlzLmxlYXZlUm9vbU5vdGlmeSwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9uKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5qb2luT3ZlclJlc3BvbnNlLCB0aGlzLmpvaW5PdmVyUmVzcG9uc2UsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLnBsYXllck5vZGVJbml0KClcbiAgICB9LFxuXG4gICAgcGxheWVyTm9kZUluaXQgKCkge1xuICAgICAgICBmb3IoY29uc3QgdmFsIG9mIHRoaXMucGxheWVySWNvbnMpIHtcbiAgICAgICAgICAgIHZhbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBqb2luUmFuZG9tUm9vbTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgICBpZiAoR0xCLm1hdGNoVHlwZSA9PT0gR0xCLlJBTkRPTV9NQVRDSCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbXZzLmVuZ2luZS5qb2luUmFuZG9tUm9vbShHTEIuTUFYX1BMQVlFUl9DT1VOVCwgJycpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfov5vlhaXmiL/pl7TlpLHotKUs6ZSZ6K+v56CBOicgKyByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKEdMQi5tYXRjaFR5cGUgPT09IEdMQi5QUk9QRVJUWV9NQVRDSCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5mbyA9IG5ldyBtdnMuTWF0Y2hJbmZvKCk7XG4gICAgICAgICAgICBtYXRjaGluZm8ubWF4UGxheWVyID0gR0xCLk1BWF9QTEFZRVJfQ09VTlQ7XG4gICAgICAgICAgICBtYXRjaGluZm8ubW9kZSA9IDA7XG4gICAgICAgICAgICBtYXRjaGluZm8uY2FuV2F0Y2ggPSAwO1xuICAgICAgICAgICAgbWF0Y2hpbmZvLnRhZ3MgPSBHTEIudGFnc0luZm87XG4gICAgICAgICAgICByZXN1bHQgPSBtdnMuZW5naW5lLmpvaW5Sb29tV2l0aFByb3BlcnRpZXMobWF0Y2hpbmZvLCBcImpvaW5Sb29tV2l0aFByb3BlcnRpZXNcIik7XG4gICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+i/m+WFpeaIv+mXtOWksei0pSzplJnor6/noIE6JyArIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RhcnRHYW1lOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+a4uOaIj+WNs+WwhuW8gOWniycpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2dhbWUnKTtcbiAgICB9LFxuXG4gICAgam9pblJvb21SZXNwb25zZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+i/m+WFpeaIv+mXtOWksei0pSzlvILmraXlm57osIPplJnor6/noIE6ICcgKyBkYXRhLnN0YXR1cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6L+b5YWl5oi/6Ze05oiQ5YqfJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5oi/6Ze05Y+3OiAnICsgZGF0YS5yb29tSW5mby5yb29tSUQpO1xuICAgICAgICB9XG4gICAgICAgIEdMQi5yb29tSWQgPSBkYXRhLnJvb21JbmZvLnJvb21JRDtcbiAgICAgICAgdmFyIHVzZXJJZHMgPSBbR0xCLnVzZXJJbmZvLmlkXVxuICAgICAgICBjb25zb2xlLmxvZygn5oi/6Ze055So5oi3OiAnICsgdXNlcklkcyk7XG5cbiAgICAgICAgdmFyIHBsYXllckljb24gPSBudWxsO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRhdGEucm9vbVVzZXJJbmZvTGlzdC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgcGxheWVySWNvbiA9IHRoaXMucGxheWVySWNvbnNbal0uZ2V0Q29tcG9uZW50KCdwbGF5ZXJJY29uJyk7XG4gICAgICAgICAgICBpZiAocGxheWVySWNvbiAmJiAhcGxheWVySWNvbi51c2VySW5mbykge1xuICAgICAgICAgICAgICAgIHBsYXllckljb24uc2V0RGF0YShkYXRhLnJvb21Vc2VySW5mb0xpc3Rbal0pO1xuICAgICAgICAgICAgICAgIGlmIChHTEIudXNlckluZm8uaWQgIT09IGRhdGEucm9vbVVzZXJJbmZvTGlzdFtqXS51c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkcy5wdXNoKGRhdGEucm9vbVVzZXJJbmZvTGlzdFtqXS51c2VySWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJJY29ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcGxheWVySWNvbiA9IHRoaXMucGxheWVySWNvbnNbaV0uZ2V0Q29tcG9uZW50KCdwbGF5ZXJJY29uJyk7XG4gICAgICAgICAgICBpZiAocGxheWVySWNvbiAmJiAhcGxheWVySWNvbi51c2VySW5mbykge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMucGxheWVySWNvbnNbaV0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwbGF5ZXJJY29uLnNldERhdGEoR0xCLnVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBHTEIucGxheWVyVXNlcklkcyA9IHVzZXJJZHM7XG4gICAgICAgIGlmICh1c2VySWRzLmxlbmd0aCA+PSBHTEIuTUFYX1BMQVlFUl9DT1VOVCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG12cy5lbmdpbmUuam9pbk92ZXIoXCJcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWPkeWHuuWFs+mXreaIv+mXtOeahOmAmuefpVwiKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWFs+mXreaIv+mXtOWksei0pe+8jOmUmeivr+egge+8mlwiLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBHTEIucGxheWVyVXNlcklkcyA9IHVzZXJJZHM7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgam9pblJvb21Ob3RpZnk6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJqb2luUm9vbU5vdGlmeSwgcm9vbVVzZXJJbmZvOlwiICsgSlNPTi5zdHJpbmdpZnkoZGF0YS5yb29tVXNlckluZm8pKTtcbiAgICAgICAgdmFyIHBsYXllckljb24gPSBudWxsO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMucGxheWVySWNvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHBsYXllckljb24gPSB0aGlzLnBsYXllckljb25zW2pdLmdldENvbXBvbmVudCgncGxheWVySWNvbicpO1xuICAgICAgICAgICAgaWYgKHBsYXllckljb24gJiYgIXBsYXllckljb24udXNlckluZm8pIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnBsYXllckljb25zW2pdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcGxheWVySWNvbi5zZXREYXRhKGRhdGEucm9vbVVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsZWF2ZVJvb206IGZ1bmN0aW9uKCkge1xuICAgICAgICBtdnMuZW5naW5lLmxlYXZlUm9vbShcIlwiKTtcbiAgICAgICAgdWlGdW5jLmNsb3NlVUkodGhpcy5ub2RlLm5hbWUpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgIH0sXG5cbiAgICBsZWF2ZVJvb21Ob3RpZnk6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgaWYgKEdMQi5yb29tSWQgPT09IGRhdGEubGVhdmVSb29tSW5mby5yb29tSUQpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJJY29ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJJY29uID0gdGhpcy5wbGF5ZXJJY29uc1tpXS5nZXRDb21wb25lbnQoJ3BsYXllckljb24nKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVySWNvbiAmJiBwbGF5ZXJJY29uLnVzZXJJbmZvICYmIHBsYXllckljb24ucGxheWVySWQgPT09IGRhdGEubGVhdmVSb29tSW5mby51c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVySWNvbi5pbml0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsZWF2ZVJvb21SZXNwb25zZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5sZWF2ZVJvb21Sc3Auc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi56a75byA5oi/6Ze05oiQ5YqfXCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllckljb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBsYXllckljb24gPSB0aGlzLnBsYXllckljb25zW2ldLmdldENvbXBvbmVudCgncGxheWVySWNvbicpO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJJY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllckljb24uaW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1aUZ1bmMuY2xvc2VVSSh0aGlzLm5vZGUubmFtZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLnprvlvIDmiL/pl7TlpLHotKVcIik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgam9pbk92ZXJSZXNwb25zZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5qb2luT3ZlclJzcC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlhbPpl63miL/pl7TmiJDlip9cIik7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeUdhbWVTdGFydCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlhbPpl63miL/pl7TlpLHotKXvvIzlm57osIPpgJrnn6XplJnor6/noIHvvJpcIiwgZGF0YS5qb2luT3ZlclJzcC5zdGF0dXMpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG5vdGlmeUdhbWVTdGFydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIEdMQi5pc1Jvb21Pd25lciA9IHRydWU7XG4gICAgICAgIHZhciBtc2cgPSB7XG4gICAgICAgICAgICBhY3Rpb246IEdMQi5HQU1FX1NUQVJUX0VWRU5ULFxuICAgICAgICAgICAgdXNlcklkczogR0xCLnBsYXllclVzZXJJZHNcbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5zZW5kRXZlbnRFeChtc2cpO1xuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3koKXtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5qb2luUm9vbVJlc3BvbnNlLCB0aGlzLmpvaW5Sb29tUmVzcG9uc2UsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLmpvaW5Sb29tTm90aWZ5LCB0aGlzLmpvaW5Sb29tTm90aWZ5LCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5sZWF2ZVJvb21SZXNwb25zZSwgdGhpcy5sZWF2ZVJvb21SZXNwb25zZSwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUubGVhdmVSb29tTm90aWZ5LCB0aGlzLmxlYXZlUm9vbU5vdGlmeSwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUuam9pbk92ZXJSZXNwb25zZSwgdGhpcy5qb2luT3ZlclJlc3BvbnNlLCB0aGlzKTtcblxuICAgIH1cbn0pO1xuIl19