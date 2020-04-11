
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/lobby/playerIcon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7c5b0PM5GxL454wtQ2uJEdQ', 'playerIcon');
// common/lobby/playerIcon.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    playerSprite: {
      "default": null,
      type: cc.Sprite
    }
  },
  setData: function setData(userInfo) {
    this.userInfo = userInfo;
    this.playerId = userInfo.id ? userInfo.id : userInfo.userId;
    this.playerSprite.node.active = true;
    clientEvent.on(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
    Game.GameManager.userInfoReq(this.playerId);
  },
  userInfoSet: function userInfoSet(recvMsg) {
    if (recvMsg.account == this.playerId) {
      if (recvMsg.headIcon && recvMsg.headIcon !== "-") {
        cc.loader.load({
          url: recvMsg.headIcon,
          type: 'png'
        }, function (err, texture) {
          var spriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));

          if (this.playerSprite) {
            this.playerSprite.spriteFrame = spriteFrame;
          }
        }.bind(this));
      }
    }
  },
  onDestroy: function onDestroy() {
    clientEvent.off(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vbG9iYnkvYXNzZXRzL2NvbW1vbi9sb2JieS9wbGF5ZXJJY29uLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwicGxheWVyU3ByaXRlIiwidHlwZSIsIlNwcml0ZSIsInNldERhdGEiLCJ1c2VySW5mbyIsInBsYXllcklkIiwiaWQiLCJ1c2VySWQiLCJub2RlIiwiYWN0aXZlIiwiY2xpZW50RXZlbnQiLCJvbiIsImV2ZW50VHlwZSIsInBsYXllckFjY291bnRHZXQiLCJ1c2VySW5mb1NldCIsIkdhbWUiLCJHYW1lTWFuYWdlciIsInVzZXJJbmZvUmVxIiwicmVjdk1zZyIsImFjY291bnQiLCJoZWFkSWNvbiIsImxvYWRlciIsImxvYWQiLCJ1cmwiLCJlcnIiLCJ0ZXh0dXJlIiwic3ByaXRlRnJhbWUiLCJTcHJpdGVGcmFtZSIsIlJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImJpbmQiLCJvbkRlc3Ryb3kiLCJvZmYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxZQUFZLEVBQUU7QUFDVixpQkFBUyxJQURDO0FBRVZDLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZDO0FBRE4sR0FIUDtBQVNMQyxFQUFBQSxPQUFPLEVBQUUsaUJBQVNDLFFBQVQsRUFBbUI7QUFDeEIsU0FBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCRCxRQUFRLENBQUNFLEVBQVQsR0FBY0YsUUFBUSxDQUFDRSxFQUF2QixHQUE0QkYsUUFBUSxDQUFDRyxNQUFyRDtBQUNBLFNBQUtQLFlBQUwsQ0FBa0JRLElBQWxCLENBQXVCQyxNQUF2QixHQUFnQyxJQUFoQztBQUNBQyxJQUFBQSxXQUFXLENBQUNDLEVBQVosQ0FBZUQsV0FBVyxDQUFDRSxTQUFaLENBQXNCQyxnQkFBckMsRUFBdUQsS0FBS0MsV0FBNUQsRUFBeUUsSUFBekU7QUFDQUMsSUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCQyxXQUFqQixDQUE2QixLQUFLWixRQUFsQztBQUNILEdBZkk7QUFpQkxTLEVBQUFBLFdBQVcsRUFBRSxxQkFBU0ksT0FBVCxFQUFrQjtBQUMzQixRQUFJQSxPQUFPLENBQUNDLE9BQVIsSUFBbUIsS0FBS2QsUUFBNUIsRUFBc0M7QUFDbEMsVUFBSWEsT0FBTyxDQUFDRSxRQUFSLElBQW9CRixPQUFPLENBQUNFLFFBQVIsS0FBcUIsR0FBN0MsRUFBa0Q7QUFDOUN4QixRQUFBQSxFQUFFLENBQUN5QixNQUFILENBQVVDLElBQVYsQ0FBZTtBQUFDQyxVQUFBQSxHQUFHLEVBQUVMLE9BQU8sQ0FBQ0UsUUFBZDtBQUF3Qm5CLFVBQUFBLElBQUksRUFBRTtBQUE5QixTQUFmLEVBQXFELFVBQVN1QixHQUFULEVBQWNDLE9BQWQsRUFBdUI7QUFDeEUsY0FBSUMsV0FBVyxHQUFHLElBQUk5QixFQUFFLENBQUMrQixXQUFQLENBQW1CRixPQUFuQixFQUE0QjdCLEVBQUUsQ0FBQ2dDLElBQUgsQ0FBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjSCxPQUFPLENBQUNJLEtBQXRCLEVBQTZCSixPQUFPLENBQUNLLE1BQXJDLENBQTVCLENBQWxCOztBQUNBLGNBQUcsS0FBSzlCLFlBQVIsRUFBc0I7QUFDbEIsaUJBQUtBLFlBQUwsQ0FBa0IwQixXQUFsQixHQUFnQ0EsV0FBaEM7QUFDSDtBQUNKLFNBTG9ELENBS25ESyxJQUxtRCxDQUs5QyxJQUw4QyxDQUFyRDtBQU1IO0FBQ0o7QUFDSixHQTVCSTtBQThCTEMsRUFBQUEsU0E5QkssdUJBOEJPO0FBQ1J0QixJQUFBQSxXQUFXLENBQUN1QixHQUFaLENBQWdCdkIsV0FBVyxDQUFDRSxTQUFaLENBQXNCQyxnQkFBdEMsRUFBd0QsS0FBS0MsV0FBN0QsRUFBMEUsSUFBMUU7QUFDSDtBQWhDSSxDQUFUIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vbG9iYnkiLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBwbGF5ZXJTcHJpdGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgc2V0RGF0YTogZnVuY3Rpb24odXNlckluZm8pIHtcbiAgICAgICAgdGhpcy51c2VySW5mbyA9IHVzZXJJbmZvO1xuICAgICAgICB0aGlzLnBsYXllcklkID0gdXNlckluZm8uaWQgPyB1c2VySW5mby5pZCA6IHVzZXJJbmZvLnVzZXJJZDtcbiAgICAgICAgdGhpcy5wbGF5ZXJTcHJpdGUubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUucGxheWVyQWNjb3VudEdldCwgdGhpcy51c2VySW5mb1NldCwgdGhpcyk7XG4gICAgICAgIEdhbWUuR2FtZU1hbmFnZXIudXNlckluZm9SZXEodGhpcy5wbGF5ZXJJZCk7XG4gICAgfSxcblxuICAgIHVzZXJJbmZvU2V0OiBmdW5jdGlvbihyZWN2TXNnKSB7XG4gICAgICAgIGlmIChyZWN2TXNnLmFjY291bnQgPT0gdGhpcy5wbGF5ZXJJZCkge1xuICAgICAgICAgICAgaWYgKHJlY3ZNc2cuaGVhZEljb24gJiYgcmVjdk1zZy5oZWFkSWNvbiAhPT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZCh7dXJsOiByZWN2TXNnLmhlYWRJY29uLCB0eXBlOiAncG5nJ30sIGZ1bmN0aW9uKGVyciwgdGV4dHVyZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4dHVyZSwgY2MuUmVjdCgwLCAwLCB0ZXh0dXJlLndpZHRoLCB0ZXh0dXJlLmhlaWdodCkpO1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLnBsYXllclNwcml0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJTcHJpdGUuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLnBsYXllckFjY291bnRHZXQsIHRoaXMudXNlckluZm9TZXQsIHRoaXMpO1xuICAgIH1cbn0pO1xuIl19