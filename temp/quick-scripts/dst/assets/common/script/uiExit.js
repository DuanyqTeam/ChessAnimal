
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiExit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a7381zzskBJ4bDJQ9ArBMyG', 'uiExit');
// common/script/uiExit.js

"use strict";

var uiPanel = require("uiPanel");

var mvs = require("Matchvs");

var GLB = require("Glb");

cc.Class({
  "extends": uiPanel,
  properties: {},
  onLoad: function onLoad() {
    this._super();

    this.nodeDict["sure"].on("click", this.sure, this);
    this.nodeDict["close"].on("click", this.close, this);
  },
  close: function close() {
    uiFunc.closeUI(this.node.name);
    this.node.destroy();
  },
  sure: function sure() {
    // var winFlag;
    // if (GLB.isRoomOwner) {
    //     winFlag = GLB.PLAYER_FLAG.BLUE;
    // } else {
    //     winFlag = GLB.PLAYER_FLAG.RED;
    // }
    // var msg = {
    //     action: GLB.GAME_OVER_EVENT,
    //     winFlag: winFlag
    // }
    // Game.GameManager.sendEvent(msg);
    Game.GameManager.gameState = GameState.Over;
    var msg = {
      action: GLB.EXIT
    };
    Game.GameManager.sendEvent(msg); // 不进入结算页面，进入大厅

    clientEvent.dispatch(clientEvent.eventType.gameOver); // 这里不先close就会destroy

    var gamePanel = uiFunc.findUI("uiGamePanel");

    if (gamePanel) {
      uiFunc.closeUI("uiGamePanel");
      gamePanel.destroy();
    }

    mvs.engine.leaveRoom("");
    Game.GameManager.isLoadGame = false;
    Game.GameManager.lobbyShow();
    uiFunc.closeUI(this.node.name);
    this.node.destroy();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpRXhpdC5qcyJdLCJuYW1lcyI6WyJ1aVBhbmVsIiwicmVxdWlyZSIsIm12cyIsIkdMQiIsImNjIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwiX3N1cGVyIiwibm9kZURpY3QiLCJvbiIsInN1cmUiLCJjbG9zZSIsInVpRnVuYyIsImNsb3NlVUkiLCJub2RlIiwibmFtZSIsImRlc3Ryb3kiLCJHYW1lIiwiR2FtZU1hbmFnZXIiLCJnYW1lU3RhdGUiLCJHYW1lU3RhdGUiLCJPdmVyIiwibXNnIiwiYWN0aW9uIiwiRVhJVCIsInNlbmRFdmVudCIsImNsaWVudEV2ZW50IiwiZGlzcGF0Y2giLCJldmVudFR5cGUiLCJnYW1lT3ZlciIsImdhbWVQYW5lbCIsImZpbmRVSSIsImVuZ2luZSIsImxlYXZlUm9vbSIsImlzTG9hZEdhbWUiLCJsb2JieVNob3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQSxJQUFJQyxHQUFHLEdBQUdELE9BQU8sQ0FBQyxTQUFELENBQWpCOztBQUNBLElBQUlFLEdBQUcsR0FBR0YsT0FBTyxDQUFDLEtBQUQsQ0FBakI7O0FBQ0FHLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0wsT0FESjtBQUVMTSxFQUFBQSxVQUFVLEVBQUUsRUFGUDtBQUlMQyxFQUFBQSxNQUpLLG9CQUlJO0FBQ0wsU0FBS0MsTUFBTDs7QUFDQSxTQUFLQyxRQUFMLENBQWMsTUFBZCxFQUFzQkMsRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsS0FBS0MsSUFBdkMsRUFBNkMsSUFBN0M7QUFDQSxTQUFLRixRQUFMLENBQWMsT0FBZCxFQUF1QkMsRUFBdkIsQ0FBMEIsT0FBMUIsRUFBbUMsS0FBS0UsS0FBeEMsRUFBK0MsSUFBL0M7QUFDSCxHQVJJO0FBVUxBLEVBQUFBLEtBVkssbUJBVUc7QUFDSkMsSUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWUsS0FBS0MsSUFBTCxDQUFVQyxJQUF6QjtBQUNBLFNBQUtELElBQUwsQ0FBVUUsT0FBVjtBQUNILEdBYkk7QUFlTE4sRUFBQUEsSUFmSyxrQkFlRTtBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQU8sSUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCQyxTQUFqQixHQUE2QkMsU0FBUyxDQUFDQyxJQUF2QztBQUNBLFFBQUlDLEdBQUcsR0FBRztBQUNOQyxNQUFBQSxNQUFNLEVBQUVyQixHQUFHLENBQUNzQjtBQUROLEtBQVY7QUFHQVAsSUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCTyxTQUFqQixDQUEyQkgsR0FBM0IsRUFuQkcsQ0FvQkg7O0FBQ0FJLElBQUFBLFdBQVcsQ0FBQ0MsUUFBWixDQUFxQkQsV0FBVyxDQUFDRSxTQUFaLENBQXNCQyxRQUEzQyxFQXJCRyxDQXVCSDs7QUFDQSxRQUFJQyxTQUFTLEdBQUdsQixNQUFNLENBQUNtQixNQUFQLENBQWMsYUFBZCxDQUFoQjs7QUFDQSxRQUFJRCxTQUFKLEVBQWU7QUFDWGxCLE1BQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlLGFBQWY7QUFDQWlCLE1BQUFBLFNBQVMsQ0FBQ2QsT0FBVjtBQUNIOztBQUNEZixJQUFBQSxHQUFHLENBQUMrQixNQUFKLENBQVdDLFNBQVgsQ0FBcUIsRUFBckI7QUFDQWhCLElBQUFBLElBQUksQ0FBQ0MsV0FBTCxDQUFpQmdCLFVBQWpCLEdBQThCLEtBQTlCO0FBQ0FqQixJQUFBQSxJQUFJLENBQUNDLFdBQUwsQ0FBaUJpQixTQUFqQjtBQUNBdkIsSUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWUsS0FBS0MsSUFBTCxDQUFVQyxJQUF6QjtBQUNBLFNBQUtELElBQUwsQ0FBVUUsT0FBVjtBQUVIO0FBbERJLENBQVQiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdWlQYW5lbCA9IHJlcXVpcmUoXCJ1aVBhbmVsXCIpO1xudmFyIG12cyA9IHJlcXVpcmUoXCJNYXRjaHZzXCIpO1xudmFyIEdMQiA9IHJlcXVpcmUoXCJHbGJcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogdWlQYW5lbCxcbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlRGljdFtcInN1cmVcIl0ub24oXCJjbGlja1wiLCB0aGlzLnN1cmUsIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGVEaWN0W1wiY2xvc2VcIl0ub24oXCJjbGlja1wiLCB0aGlzLmNsb3NlLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHVpRnVuYy5jbG9zZVVJKHRoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9LFxuXG4gICAgc3VyZSgpIHtcblxuICAgICAgICAvLyB2YXIgd2luRmxhZztcbiAgICAgICAgLy8gaWYgKEdMQi5pc1Jvb21Pd25lcikge1xuICAgICAgICAvLyAgICAgd2luRmxhZyA9IEdMQi5QTEFZRVJfRkxBRy5CTFVFO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgd2luRmxhZyA9IEdMQi5QTEFZRVJfRkxBRy5SRUQ7XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyB2YXIgbXNnID0ge1xuICAgICAgICAvLyAgICAgYWN0aW9uOiBHTEIuR0FNRV9PVkVSX0VWRU5ULFxuICAgICAgICAvLyAgICAgd2luRmxhZzogd2luRmxhZ1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIEdhbWUuR2FtZU1hbmFnZXIuc2VuZEV2ZW50KG1zZyk7XG5cbiAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5nYW1lU3RhdGUgPSBHYW1lU3RhdGUuT3ZlcjtcbiAgICAgICAgdmFyIG1zZyA9IHtcbiAgICAgICAgICAgIGFjdGlvbjogR0xCLkVYSVRcbiAgICAgICAgfVxuICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLnNlbmRFdmVudChtc2cpO1xuICAgICAgICAvLyDkuI3ov5vlhaXnu5PnrpfpobXpnaLvvIzov5vlhaXlpKfljoVcbiAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmdhbWVPdmVyKTtcblxuICAgICAgICAvLyDov5nph4zkuI3lhYhjbG9zZeWwseS8mmRlc3Ryb3lcbiAgICAgICAgdmFyIGdhbWVQYW5lbCA9IHVpRnVuYy5maW5kVUkoXCJ1aUdhbWVQYW5lbFwiKTtcbiAgICAgICAgaWYgKGdhbWVQYW5lbCkge1xuICAgICAgICAgICAgdWlGdW5jLmNsb3NlVUkoXCJ1aUdhbWVQYW5lbFwiKTtcbiAgICAgICAgICAgIGdhbWVQYW5lbC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgbXZzLmVuZ2luZS5sZWF2ZVJvb20oXCJcIik7XG4gICAgICAgIEdhbWUuR2FtZU1hbmFnZXIuaXNMb2FkR2FtZSA9IGZhbHNlO1xuICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLmxvYmJ5U2hvdygpO1xuICAgICAgICB1aUZ1bmMuY2xvc2VVSSh0aGlzLm5vZGUubmFtZSk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG5cbiAgICB9XG59KTtcbiJdfQ==