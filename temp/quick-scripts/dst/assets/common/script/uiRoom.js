
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiRoom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '72f2f1cYGZOhIZyqvev+rWy', 'uiRoom');
// common/script/uiRoom.js

"use strict";

var uiPanel = require("uiPanel");

var mvs = require("Matchvs");

var GLB = require("Glb");

cc.Class({
  "extends": uiPanel,
  properties: {},
  onLoad: function onLoad() {
    this._super();

    this.players = [];
    this.roomId = 0;
    this.roomInfo = null;
    this.owner = 0;
    this.playerPrefab = this.nodeDict["player"];
    this.playerPrefab.active = false;
    this.nodeDict["quit"].on("click", this.quit, this);
    this.nodeDict["startGame"].on("click", this.startGame, this);
    clientEvent.on(clientEvent.eventType.joinRoomNotify, this.joinRoomNotify, this);
    clientEvent.on(clientEvent.eventType.leaveRoomResponse, this.leaveRoomResponse, this);
    clientEvent.on(clientEvent.eventType.leaveRoomNotify, this.leaveRoomNotify, this);
    clientEvent.on(clientEvent.eventType.kickPlayerResponse, this.kickPlayerResponse, this);
    clientEvent.on(clientEvent.eventType.kickPlayerNotify, this.kickPlayerNotify, this);
    clientEvent.on(clientEvent.eventType.leaveRoomMedNotify, this.leaveRoomMedNotify, this);

    for (var i = 0; i < GLB.MAX_PLAYER_COUNT; i++) {
      var temp = cc.instantiate(this.playerPrefab);
      temp.active = true;
      temp.parent = this.nodeDict["layout"];
      var roomUserInfo = temp.getComponent('roomUserInfo');
      roomUserInfo.init();
      this.players.push(roomUserInfo);
    }
  },
  kickPlayerResponse: function kickPlayerResponse(data) {
    for (var j = 0; j < this.players.length; j++) {
      if (this.players[j].userId === data.kickPlayerRsp.userID) {
        this.players[j].init();
        break;
      }
    }

    if (GLB.userInfo.id === data.kickPlayerRsp.userID) {
      GLB.isRoomOwner = false;
      uiFunc.closeUI(this.node.name);
      this.node.destroy();
    }
  },
  kickPlayerNotify: function kickPlayerNotify(data) {
    for (var j = 0; j < this.players.length; j++) {
      if (this.players[j].userId === data.kickPlayerNotify.userId) {
        this.players[j].init();
        break;
      }
    }

    if (GLB.userInfo.id === data.kickPlayerNotify.userId) {
      GLB.isRoomOwner = false;
      uiFunc.closeUI(this.node.name);
      this.node.destroy();
    }
  },
  joinRoomNotify: function joinRoomNotify(data) {
    for (var j = 0; j < this.players.length; j++) {
      if (this.players[j].userId === 0) {
        this.players[j].setData(data.roomUserInfo.userId, this.ownerId);
        break;
      }
    }
  },
  leaveRoomResponse: function leaveRoomResponse(data) {
    if (data.leaveRoomRsp.status === 200) {
      console.log("离开房间成功！");
    } else {
      console.log("离开房间失败");
    }

    GLB.isRoomOwner = false;
    uiFunc.closeUI(this.node.name);
    this.node.destroy();
  },
  leaveRoomMedNotify: function leaveRoomMedNotify(data) {
    for (var j = 0; j < this.players.length; j++) {
      if (this.players[j].userId === data.userID) {
        this.players[j].init();
        break;
      }
    }

    this.ownerId = data.owner;

    if (this.ownerId === GLB.userInfo.id) {
      GLB.isRoomOwner = true;
    }

    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].userId !== 0) {
        this.players[i].setData(this.players[i].userId, this.ownerId);
      }
    }

    this.refreshStartBtn();
  },
  leaveRoomNotify: function leaveRoomNotify(data) {
    for (var j = 0; j < this.players.length; j++) {
      if (this.players[j].userId === data.leaveRoomInfo.userId) {
        this.players[j].init();
        break;
      }
    }

    this.ownerId = data.leaveRoomInfo.owner;

    if (this.ownerId === GLB.userInfo.id) {
      GLB.isRoomOwner = true;
    }

    for (var i = 0; i < this.players.length; i++) {
      if (this.players[i].userId !== 0) {
        this.players[i].setData(this.players[i].userId, this.ownerId);
      }
    }

    this.refreshStartBtn();
  },
  refreshStartBtn: function refreshStartBtn() {
    var spNode = this.nodeDict["startGame"];
    var btn = this.nodeDict["startGame"].getComponent(cc.Button);

    if (GLB.isRoomOwner) {
      spNode.color = cc.Color.WHITE;
      btn.enabled = true;
    } else {
      spNode.color = cc.Color.BLACK;
      btn.enabled = false;
    }
  },
  quit: function quit() {
    mvs.engine.leaveRoom("");
  },
  startGame: function startGame() {
    if (!GLB.isRoomOwner) {
      uiFunc.openUI("uiTip", function (obj) {
        var uiTip = obj.getComponent("uiTip");

        if (uiTip) {
          uiTip.setData("等待房主开始游戏");
        }
      }.bind(this));
      return;
    }

    var userIds = [];
    var playerCnt = 0;

    for (var j = 0; j < this.players.length; j++) {
      if (this.players[j].userId !== 0) {
        playerCnt++;
        userIds.push(this.players[j].userId);
      }
    }

    if (playerCnt === GLB.MAX_PLAYER_COUNT) {
      var result = mvs.engine.joinOver("");
      console.log("发出关闭房间的通知");

      if (result !== 0) {
        console.log("关闭房间失败，错误码：", result);
      }

      GLB.playerUserIds = userIds;
      var msg = {
        action: GLB.GAME_START_EVENT,
        userIds: userIds
      };
      Game.GameManager.sendEventEx(msg);
    } else {
      uiFunc.openUI("uiTip", function (obj) {
        var uiTip = obj.getComponent("uiTip");

        if (uiTip) {
          uiTip.setData("房间人数不足");
        }
      }.bind(this));
    }
  },
  createRoomInit: function createRoomInit(rsp) {
    this.roomId = rsp.roomID;
    this.ownerId = rsp.owner;
    this.players[0].setData(this.ownerId, this.ownerId);
    GLB.isRoomOwner = true;
    this.refreshStartBtn();
  },
  joinRoomInit: function joinRoomInit(roomUserInfoList, roomInfo) {
    roomUserInfoList.sort(function (a, b) {
      if (roomInfo.ownerId === b.userId) {
        return 1;
      }

      return 0;
    });
    this.ownerId = roomInfo.ownerId;

    for (var j = 0; j < roomUserInfoList.length; j++) {
      this.players[j].setData(roomUserInfoList[j].userId, this.ownerId);
    }

    this.refreshStartBtn();
  },
  onDestroy: function onDestroy() {
    clientEvent.off(clientEvent.eventType.joinRoomNotify, this.joinRoomNotify, this);
    clientEvent.off(clientEvent.eventType.leaveRoomResponse, this.leaveRoomResponse, this);
    clientEvent.off(clientEvent.eventType.leaveRoomNotify, this.leaveRoomNotify, this);
    clientEvent.off(clientEvent.eventType.kickPlayerResponse, this.kickPlayerResponse, this);
    clientEvent.off(clientEvent.eventType.kickPlayerNotify, this.kickPlayerNotify, this);
    clientEvent.off(clientEvent.eventType.leaveRoomMedNotify, this.leaveRoomMedNotify, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpUm9vbS5qcyJdLCJuYW1lcyI6WyJ1aVBhbmVsIiwicmVxdWlyZSIsIm12cyIsIkdMQiIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwiX3N1cGVyIiwicGxheWVycyIsInJvb21JZCIsInJvb21JbmZvIiwib3duZXIiLCJwbGF5ZXJQcmVmYWIiLCJub2RlRGljdCIsImFjdGl2ZSIsIm9uIiwicXVpdCIsInN0YXJ0R2FtZSIsImNsaWVudEV2ZW50IiwiZXZlbnRUeXBlIiwiam9pblJvb21Ob3RpZnkiLCJsZWF2ZVJvb21SZXNwb25zZSIsImxlYXZlUm9vbU5vdGlmeSIsImtpY2tQbGF5ZXJSZXNwb25zZSIsImtpY2tQbGF5ZXJOb3RpZnkiLCJsZWF2ZVJvb21NZWROb3RpZnkiLCJpIiwiTUFYX1BMQVlFUl9DT1VOVCIsInRlbXAiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInJvb21Vc2VySW5mbyIsImdldENvbXBvbmVudCIsImluaXQiLCJwdXNoIiwiZGF0YSIsImoiLCJsZW5ndGgiLCJ1c2VySWQiLCJraWNrUGxheWVyUnNwIiwidXNlcklEIiwidXNlckluZm8iLCJpZCIsImlzUm9vbU93bmVyIiwidWlGdW5jIiwiY2xvc2VVSSIsIm5vZGUiLCJuYW1lIiwiZGVzdHJveSIsInNldERhdGEiLCJvd25lcklkIiwibGVhdmVSb29tUnNwIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyIsInJlZnJlc2hTdGFydEJ0biIsImxlYXZlUm9vbUluZm8iLCJzcE5vZGUiLCJidG4iLCJCdXR0b24iLCJjb2xvciIsIkNvbG9yIiwiV0hJVEUiLCJlbmFibGVkIiwiQkxBQ0siLCJlbmdpbmUiLCJsZWF2ZVJvb20iLCJvcGVuVUkiLCJvYmoiLCJ1aVRpcCIsImJpbmQiLCJ1c2VySWRzIiwicGxheWVyQ250IiwicmVzdWx0Iiwiam9pbk92ZXIiLCJwbGF5ZXJVc2VySWRzIiwibXNnIiwiYWN0aW9uIiwiR0FNRV9TVEFSVF9FVkVOVCIsIkdhbWUiLCJHYW1lTWFuYWdlciIsInNlbmRFdmVudEV4IiwiY3JlYXRlUm9vbUluaXQiLCJyc3AiLCJyb29tSUQiLCJqb2luUm9vbUluaXQiLCJyb29tVXNlckluZm9MaXN0Iiwic29ydCIsImEiLCJiIiwib25EZXN0cm95Iiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0EsSUFBSUMsR0FBRyxHQUFHRCxPQUFPLENBQUMsU0FBRCxDQUFqQjs7QUFDQSxJQUFJRSxHQUFHLEdBQUdGLE9BQU8sQ0FBQyxLQUFELENBQWpCOztBQUNBRyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNMLE9BREo7QUFFTE0sRUFBQUEsVUFBVSxFQUFFLEVBRlA7QUFJTEMsRUFBQUEsTUFKSyxvQkFJSTtBQUNMLFNBQUtDLE1BQUw7O0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxTQUFLQyxNQUFMLEdBQWMsQ0FBZDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUtDLFlBQUwsR0FBb0IsS0FBS0MsUUFBTCxDQUFjLFFBQWQsQ0FBcEI7QUFDQSxTQUFLRCxZQUFMLENBQWtCRSxNQUFsQixHQUEyQixLQUEzQjtBQUNBLFNBQUtELFFBQUwsQ0FBYyxNQUFkLEVBQXNCRSxFQUF0QixDQUF5QixPQUF6QixFQUFrQyxLQUFLQyxJQUF2QyxFQUE2QyxJQUE3QztBQUNBLFNBQUtILFFBQUwsQ0FBYyxXQUFkLEVBQTJCRSxFQUEzQixDQUE4QixPQUE5QixFQUF1QyxLQUFLRSxTQUE1QyxFQUF1RCxJQUF2RDtBQUdBQyxJQUFBQSxXQUFXLENBQUNILEVBQVosQ0FBZUcsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxjQUFyQyxFQUFxRCxLQUFLQSxjQUExRCxFQUEw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dEMsRUFBd0QsS0FBS0EsZ0JBQTdELEVBQStFLElBQS9FO0FBQ0FOLElBQUFBLFdBQVcsQ0FBQ3lFLEdBQVosQ0FBZ0J6RSxXQUFXLENBQUNDLFNBQVosQ0FBc0JNLGtCQUF0QyxFQUEwRCxLQUFLQSxrQkFBL0QsRUFBbUYsSUFBbkY7QUFFSDtBQWpOSSxDQUFUIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVpUGFuZWwgPSByZXF1aXJlKFwidWlQYW5lbFwiKTtcbnZhciBtdnMgPSByZXF1aXJlKFwiTWF0Y2h2c1wiKTtcbnZhciBHTEIgPSByZXF1aXJlKFwiR2xiXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IHVpUGFuZWwsXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgICAgIHRoaXMucGxheWVycyA9IFtdO1xuICAgICAgICB0aGlzLnJvb21JZCA9IDA7XG4gICAgICAgIHRoaXMucm9vbUluZm8gPSBudWxsO1xuICAgICAgICB0aGlzLm93bmVyID0gMDtcbiAgICAgICAgdGhpcy5wbGF5ZXJQcmVmYWIgPSB0aGlzLm5vZGVEaWN0W1wicGxheWVyXCJdO1xuICAgICAgICB0aGlzLnBsYXllclByZWZhYi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlRGljdFtcInF1aXRcIl0ub24oXCJjbGlja1wiLCB0aGlzLnF1aXQsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGVEaWN0W1wic3RhcnRHYW1lXCJdLm9uKFwiY2xpY2tcIiwgdGhpcy5zdGFydEdhbWUsIHRoaXMpO1xuXG5cbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLmpvaW5Sb29tTm90aWZ5LCB0aGlzLmpvaW5Sb29tTm90aWZ5LCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLmxlYXZlUm9vbVJlc3BvbnNlLCB0aGlzLmxlYXZlUm9vbVJlc3BvbnNlLCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLmxlYXZlUm9vbU5vdGlmeSwgdGhpcy5sZWF2ZVJvb21Ob3RpZnksIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUua2lja1BsYXllclJlc3BvbnNlLCB0aGlzLmtpY2tQbGF5ZXJSZXNwb25zZSwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9uKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5raWNrUGxheWVyTm90aWZ5LCB0aGlzLmtpY2tQbGF5ZXJOb3RpZnksIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUubGVhdmVSb29tTWVkTm90aWZ5LCB0aGlzLmxlYXZlUm9vbU1lZE5vdGlmeSwgdGhpcyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBHTEIuTUFYX1BMQVlFUl9DT1VOVDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdGVtcCA9IGNjLmluc3RhbnRpYXRlKHRoaXMucGxheWVyUHJlZmFiKTtcbiAgICAgICAgICAgIHRlbXAuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRlbXAucGFyZW50ID0gdGhpcy5ub2RlRGljdFtcImxheW91dFwiXTtcbiAgICAgICAgICAgIHZhciByb29tVXNlckluZm8gPSB0ZW1wLmdldENvbXBvbmVudCgncm9vbVVzZXJJbmZvJyk7XG4gICAgICAgICAgICByb29tVXNlckluZm8uaW5pdCgpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzLnB1c2gocm9vbVVzZXJJbmZvKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBraWNrUGxheWVyUmVzcG9uc2U6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnBsYXllcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcnNbal0udXNlcklkID09PSBkYXRhLmtpY2tQbGF5ZXJSc3AudXNlcklEKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW2pdLmluaXQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoR0xCLnVzZXJJbmZvLmlkID09PSBkYXRhLmtpY2tQbGF5ZXJSc3AudXNlcklEKSB7XG4gICAgICAgICAgICBHTEIuaXNSb29tT3duZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHVpRnVuYy5jbG9zZVVJKHRoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAga2lja1BsYXllck5vdGlmeTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMucGxheWVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyc1tqXS51c2VySWQgPT09IGRhdGEua2lja1BsYXllck5vdGlmeS51c2VySWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbal0uaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKEdMQi51c2VySW5mby5pZCA9PT0gZGF0YS5raWNrUGxheWVyTm90aWZ5LnVzZXJJZCkge1xuICAgICAgICAgICAgR0xCLmlzUm9vbU93bmVyID0gZmFsc2U7XG4gICAgICAgICAgICB1aUZ1bmMuY2xvc2VVSSh0aGlzLm5vZGUubmFtZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGpvaW5Sb29tTm90aWZ5OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5wbGF5ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJzW2pdLnVzZXJJZCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyc1tqXS5zZXREYXRhKGRhdGEucm9vbVVzZXJJbmZvLnVzZXJJZCwgdGhpcy5vd25lcklkKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsZWF2ZVJvb21SZXNwb25zZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5sZWF2ZVJvb21Sc3Auc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi56a75byA5oi/6Ze05oiQ5Yqf77yBXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLnprvlvIDmiL/pl7TlpLHotKVcIik7XG4gICAgICAgIH1cbiAgICAgICAgR0xCLmlzUm9vbU93bmVyID0gZmFsc2U7XG4gICAgICAgIHVpRnVuYy5jbG9zZVVJKHRoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgbGVhdmVSb29tTWVkTm90aWZ5OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5wbGF5ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJzW2pdLnVzZXJJZCA9PT0gZGF0YS51c2VySUQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbal0uaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3duZXJJZCA9IGRhdGEub3duZXI7XG4gICAgICAgIGlmICh0aGlzLm93bmVySWQgPT09IEdMQi51c2VySW5mby5pZCkge1xuICAgICAgICAgICAgR0xCLmlzUm9vbU93bmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyc1tpXS51c2VySWQgIT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbaV0uc2V0RGF0YSh0aGlzLnBsYXllcnNbaV0udXNlcklkLCB0aGlzLm93bmVySWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXJ0QnRuKCk7XG4gICAgfSxcblxuICAgIGxlYXZlUm9vbU5vdGlmeTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMucGxheWVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyc1tqXS51c2VySWQgPT09IGRhdGEubGVhdmVSb29tSW5mby51c2VySWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnNbal0uaW5pdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub3duZXJJZCA9IGRhdGEubGVhdmVSb29tSW5mby5vd25lcjtcbiAgICAgICAgaWYgKHRoaXMub3duZXJJZCA9PT0gR0xCLnVzZXJJbmZvLmlkKSB7XG4gICAgICAgICAgICBHTEIuaXNSb29tT3duZXIgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJzW2ldLnVzZXJJZCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyc1tpXS5zZXREYXRhKHRoaXMucGxheWVyc1tpXS51c2VySWQsIHRoaXMub3duZXJJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZyZXNoU3RhcnRCdG4oKTtcbiAgICB9LFxuXG4gICAgcmVmcmVzaFN0YXJ0QnRuKCkge1xuICAgICAgICB2YXIgc3BOb2RlID0gdGhpcy5ub2RlRGljdFtcInN0YXJ0R2FtZVwiXTtcbiAgICAgICAgdmFyIGJ0biA9IHRoaXMubm9kZURpY3RbXCJzdGFydEdhbWVcIl0uZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgICAgIGlmIChHTEIuaXNSb29tT3duZXIpIHtcbiAgICAgICAgICAgIHNwTm9kZS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xuICAgICAgICAgICAgYnRuLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNwTm9kZS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLO1xuICAgICAgICAgICAgYnRuLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBxdWl0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgbXZzLmVuZ2luZS5sZWF2ZVJvb20oXCJcIik7XG4gICAgfSxcblxuICAgIHN0YXJ0R2FtZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghR0xCLmlzUm9vbU93bmVyKSB7XG4gICAgICAgICAgICB1aUZ1bmMub3BlblVJKFwidWlUaXBcIiwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVpVGlwID0gb2JqLmdldENvbXBvbmVudChcInVpVGlwXCIpO1xuICAgICAgICAgICAgICAgIGlmICh1aVRpcCkge1xuICAgICAgICAgICAgICAgICAgICB1aVRpcC5zZXREYXRhKFwi562J5b6F5oi/5Li75byA5aeL5ri45oiPXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHVzZXJJZHMgPSBbXTtcbiAgICAgICAgdmFyIHBsYXllckNudCA9IDA7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5wbGF5ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXJzW2pdLnVzZXJJZCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIHBsYXllckNudCsrO1xuICAgICAgICAgICAgICAgIHVzZXJJZHMucHVzaCh0aGlzLnBsYXllcnNbal0udXNlcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwbGF5ZXJDbnQgPT09IEdMQi5NQVhfUExBWUVSX0NPVU5UKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbXZzLmVuZ2luZS5qb2luT3ZlcihcIlwiKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5Y+R5Ye65YWz6Zet5oi/6Ze055qE6YCa55+lXCIpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5YWz6Zet5oi/6Ze05aSx6LSl77yM6ZSZ6K+v56CB77yaXCIsIHJlc3VsdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEdMQi5wbGF5ZXJVc2VySWRzID0gdXNlcklkcztcblxuICAgICAgICAgICAgdmFyIG1zZyA9IHtcbiAgICAgICAgICAgICAgICBhY3Rpb246IEdMQi5HQU1FX1NUQVJUX0VWRU5ULFxuICAgICAgICAgICAgICAgIHVzZXJJZHM6IHVzZXJJZHNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLnNlbmRFdmVudEV4KG1zZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1aUZ1bmMub3BlblVJKFwidWlUaXBcIiwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVpVGlwID0gb2JqLmdldENvbXBvbmVudChcInVpVGlwXCIpO1xuICAgICAgICAgICAgICAgIGlmICh1aVRpcCkge1xuICAgICAgICAgICAgICAgICAgICB1aVRpcC5zZXREYXRhKFwi5oi/6Ze05Lq65pWw5LiN6LazXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY3JlYXRlUm9vbUluaXQocnNwKSB7XG4gICAgICAgIHRoaXMucm9vbUlkID0gcnNwLnJvb21JRDtcbiAgICAgICAgdGhpcy5vd25lcklkID0gcnNwLm93bmVyO1xuICAgICAgICB0aGlzLnBsYXllcnNbMF0uc2V0RGF0YSh0aGlzLm93bmVySWQsIHRoaXMub3duZXJJZCk7XG4gICAgICAgIEdMQi5pc1Jvb21Pd25lciA9IHRydWU7XG4gICAgICAgIHRoaXMucmVmcmVzaFN0YXJ0QnRuKCk7XG4gICAgfSxcblxuICAgIGpvaW5Sb29tSW5pdChyb29tVXNlckluZm9MaXN0LCByb29tSW5mbykge1xuICAgICAgICByb29tVXNlckluZm9MaXN0LnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgaWYgKHJvb21JbmZvLm93bmVySWQgPT09IGIudXNlcklkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3duZXJJZCA9IHJvb21JbmZvLm93bmVySWQ7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcm9vbVVzZXJJbmZvTGlzdC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzW2pdLnNldERhdGEocm9vbVVzZXJJbmZvTGlzdFtqXS51c2VySWQsIHRoaXMub3duZXJJZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZWZyZXNoU3RhcnRCdG4oKTtcbiAgICB9LFxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLmpvaW5Sb29tTm90aWZ5LCB0aGlzLmpvaW5Sb29tTm90aWZ5LCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5sZWF2ZVJvb21SZXNwb25zZSwgdGhpcy5sZWF2ZVJvb21SZXNwb25zZSwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUubGVhdmVSb29tTm90aWZ5LCB0aGlzLmxlYXZlUm9vbU5vdGlmeSwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUua2lja1BsYXllclJlc3BvbnNlLCB0aGlzLmtpY2tQbGF5ZXJSZXNwb25zZSwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUua2lja1BsYXllck5vdGlmeSwgdGhpcy5raWNrUGxheWVyTm90aWZ5LCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5sZWF2ZVJvb21NZWROb3RpZnksIHRoaXMubGVhdmVSb29tTWVkTm90aWZ5LCB0aGlzKTtcblxuICAgIH1cbn0pO1xuIl19