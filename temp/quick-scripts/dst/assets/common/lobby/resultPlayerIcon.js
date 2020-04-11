
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/lobby/resultPlayerIcon.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '38706mPQDBCcq8qjMuqQHVj', 'resultPlayerIcon');
// common/lobby/resultPlayerIcon.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    icon: {
      "default": null,
      type: cc.Sprite
    },
    nameLb: {
      "default": null,
      type: cc.Label
    }
  },
  setData: function setData(id) {
    this.playerId = id;
    clientEvent.on(clientEvent.eventType.playerAccountGet, this.userInfoSet, this);
    Game.GameManager.userInfoReq(this.playerId);
  },
  userInfoSet: function userInfoSet(recvMsg) {
    if (recvMsg.account == this.playerId) {
      this.nameLb.string = recvMsg.userName;

      if (recvMsg.headIcon && recvMsg.headIcon !== "-") {
        cc.loader.load({
          url: recvMsg.headIcon,
          type: 'png'
        }, function (err, texture) {
          var spriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));

          if (this.icon) {
            this.icon.spriteFrame = spriteFrame;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vbG9iYnkvYXNzZXRzL2NvbW1vbi9sb2JieS9yZXN1bHRQbGF5ZXJJY29uLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaWNvbiIsInR5cGUiLCJTcHJpdGUiLCJuYW1lTGIiLCJMYWJlbCIsInNldERhdGEiLCJpZCIsInBsYXllcklkIiwiY2xpZW50RXZlbnQiLCJvbiIsImV2ZW50VHlwZSIsInBsYXllckFjY291bnRHZXQiLCJ1c2VySW5mb1NldCIsIkdhbWUiLCJHYW1lTWFuYWdlciIsInVzZXJJbmZvUmVxIiwicmVjdk1zZyIsImFjY291bnQiLCJzdHJpbmciLCJ1c2VyTmFtZSIsImhlYWRJY29uIiwibG9hZGVyIiwibG9hZCIsInVybCIsImVyciIsInRleHR1cmUiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwiUmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwiYmluZCIsIm9uRGVzdHJveSIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLElBQUksRUFBRTtBQUNGLGlCQUFTLElBRFA7QUFFRkMsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNNO0FBRlAsS0FERTtBQU1SQyxJQUFBQSxNQUFNLEVBQUU7QUFDSixpQkFBUyxJQURMO0FBRUpGLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDUTtBQUZMO0FBTkEsR0FIUDtBQWVMQyxFQUFBQSxPQUFPLEVBQUUsaUJBQVNDLEVBQVQsRUFBYTtBQUNsQixTQUFLQyxRQUFMLEdBQWdCRCxFQUFoQjtBQUNBRSxJQUFBQSxXQUFXLENBQUNDLEVBQVosQ0FBZUQsV0FBVyxDQUFDRSxTQUFaLENBQXNCQyxnQkFBckMsRUFBdUQsS0FBS0MsV0FBNUQsRUFBeUUsSUFBekU7QUFDQUMsSUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCQyxXQUFqQixDQUE2QixLQUFLUixRQUFsQztBQUNILEdBbkJJO0FBcUJMSyxFQUFBQSxXQUFXLEVBQUUscUJBQVNJLE9BQVQsRUFBa0I7QUFDM0IsUUFBSUEsT0FBTyxDQUFDQyxPQUFSLElBQW1CLEtBQUtWLFFBQTVCLEVBQXNDO0FBQ2xDLFdBQUtKLE1BQUwsQ0FBWWUsTUFBWixHQUFxQkYsT0FBTyxDQUFDRyxRQUE3Qjs7QUFDQSxVQUFJSCxPQUFPLENBQUNJLFFBQVIsSUFBb0JKLE9BQU8sQ0FBQ0ksUUFBUixLQUFxQixHQUE3QyxFQUFrRDtBQUM5Q3hCLFFBQUFBLEVBQUUsQ0FBQ3lCLE1BQUgsQ0FBVUMsSUFBVixDQUFlO0FBQUNDLFVBQUFBLEdBQUcsRUFBRVAsT0FBTyxDQUFDSSxRQUFkO0FBQXdCbkIsVUFBQUEsSUFBSSxFQUFFO0FBQTlCLFNBQWYsRUFBcUQsVUFBU3VCLEdBQVQsRUFBY0MsT0FBZCxFQUF1QjtBQUN4RSxjQUFJQyxXQUFXLEdBQUcsSUFBSTlCLEVBQUUsQ0FBQytCLFdBQVAsQ0FBbUJGLE9BQW5CLEVBQTRCN0IsRUFBRSxDQUFDZ0MsSUFBSCxDQUFRLENBQVIsRUFBVyxDQUFYLEVBQWNILE9BQU8sQ0FBQ0ksS0FBdEIsRUFBNkJKLE9BQU8sQ0FBQ0ssTUFBckMsQ0FBNUIsQ0FBbEI7O0FBQ0EsY0FBRyxLQUFLOUIsSUFBUixFQUFjO0FBQ1YsaUJBQUtBLElBQUwsQ0FBVTBCLFdBQVYsR0FBd0JBLFdBQXhCO0FBQ0g7QUFDSixTQUxvRCxDQUtuREssSUFMbUQsQ0FLOUMsSUFMOEMsQ0FBckQ7QUFNSDtBQUNKO0FBQ0osR0FqQ0k7QUFtQ0xDLEVBQUFBLFNBbkNLLHVCQW1DTztBQUNSeEIsSUFBQUEsV0FBVyxDQUFDeUIsR0FBWixDQUFnQnpCLFdBQVcsQ0FBQ0UsU0FBWixDQUFzQkMsZ0JBQXRDLEVBQXdELEtBQUtDLFdBQTdELEVBQTBFLElBQTFFO0FBQ0g7QUFyQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9hc3NldHMvY29tbW9uL2xvYmJ5Iiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gY2MuQ2xhc3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuXG4gICAgICAgIG5hbWVMYjoge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0RGF0YTogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXJJZCA9IGlkO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUucGxheWVyQWNjb3VudEdldCwgdGhpcy51c2VySW5mb1NldCwgdGhpcyk7XG4gICAgICAgIEdhbWUuR2FtZU1hbmFnZXIudXNlckluZm9SZXEodGhpcy5wbGF5ZXJJZCk7XG4gICAgfSxcblxuICAgIHVzZXJJbmZvU2V0OiBmdW5jdGlvbihyZWN2TXNnKSB7XG4gICAgICAgIGlmIChyZWN2TXNnLmFjY291bnQgPT0gdGhpcy5wbGF5ZXJJZCkge1xuICAgICAgICAgICAgdGhpcy5uYW1lTGIuc3RyaW5nID0gcmVjdk1zZy51c2VyTmFtZTtcbiAgICAgICAgICAgIGlmIChyZWN2TXNnLmhlYWRJY29uICYmIHJlY3ZNc2cuaGVhZEljb24gIT09IFwiLVwiKSB7XG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoe3VybDogcmVjdk1zZy5oZWFkSWNvbiwgdHlwZTogJ3BuZyd9LCBmdW5jdGlvbihlcnIsIHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUsIGNjLlJlY3QoMCwgMCwgdGV4dHVyZS53aWR0aCwgdGV4dHVyZS5oZWlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pY29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmljb24uc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLnBsYXllckFjY291bnRHZXQsIHRoaXMudXNlckluZm9TZXQsIHRoaXMpO1xuICAgIH0sXG5cbn0pO1xuIl19