
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/nextStep.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '26e86DVN+1KkoZZYO07fRJZ', 'nextStep');
// common/script/nextStep.js

"use strict";

var GLB = require("Glb");

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.isOpen = false;
    this.isMoving = false;
    this.node.on('touchend', this.touchEvent, this);
  },
  touchEvent: function touchEvent(event, cb) {
    if (Game.GameManager.gameState !== GameState.Play) return; // 别人的回合

    if (!user.isMyTurn) {
      if (!this.isTipSecond) {
        uiFunc.openUI('uiRoundTip', function (panel) {
          var uiRoundTip = panel.getComponent('uiRoundTip');
          uiRoundTip.setData(GLB.ROUND_TIP.OTHER);
        });
      }

      this.isTipSecond = true;
      setTimeout(function () {
        this.isTipSecond = false;
      }.bind(this), 2000);
      return;
    }

    if (event) {
      event.stopPropagation();
    }

    if (this.isOpen) {
      //已经翻开
      if (!GLB.isRoomOwner) {
        // 蓝色方
        if (this.type !== GLB.PLAYER_FLAG.BLUE) {
          clientEvent.dispatch(clientEvent.eventType.eatForChess, this.node);
          return;
        }
      } else {
        // 红色方
        if (this.type !== GLB.PLAYER_FLAG.RED) {
          clientEvent.dispatch(clientEvent.eventType.eatForChess, this.node);
          return;
        }
      }

      if (this.isMoving === true) {
        this.isMoving = false;
      } else {
        this.isMoving = true;
      }

      var param = {
        node: this.node,
        move: this.isMoving,
        callback: cb
      };
      clientEvent.dispatch(clientEvent.eventType.checkMoveDirection, param);
    } else {
      // 未翻开
      this.isOpen = true;
      var msg = {
        action: GLB.CHANGE_FLAG
      };
      Game.GameManager.sendEvent(msg);
      clientEvent.dispatch(clientEvent.eventType.changeFlag);
      clientEvent.dispatch(clientEvent.eventType.openChessPiece, this.node.sign);
    } // user.isMyTurn = false;
    // TODO 发送翻棋的消息


    var msg = {
      action: GLB.OPEN_FOR_OTHER,
      sign: this.node.sign
    };
    Game.GameManager.sendEvent(msg);
  },
  openChessPiece: function openChessPiece() {
    this.isOpen = true;
  },
  clearMove: function clearMove() {
    this.isMoving = false;
  },
  setChessType: function setChessType(type, index) {
    this.type = type;
    this.index = index - 1;
  },
  setDestory: function setDestory() {
    this.node.active = false;
  },
  setPosition: function setPosition(x, y) {
    this.node.setPosition.apply(this.node, arguments);
  },
  getPosition: function getPosition() {
    return this.node.getPosition();
  },
  getIsOpen: function getIsOpen() {
    return this.isOpen;
  },
  getIndex: function getIndex() {
    return this.index + 1;
  },
  getTyp: function getTyp() {
    return this.type;
  },
  getNode: function getNode() {
    return this.node;
  },
  start: function start() {},
  onDestroy: function onDestroy() {
    console.log('*****nextStepOndestroy*****'); // this.node.off('touchend', this.touchEvent, this);
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L25leHRTdGVwLmpzIl0sIm5hbWVzIjpbIkdMQiIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsImlzT3BlbiIsImlzTW92aW5nIiwibm9kZSIsIm9uIiwidG91Y2hFdmVudCIsImV2ZW50IiwiY2IiLCJHYW1lIiwiR2FtZU1hbmFnZXIiLCJnYW1lU3RhdGUiLCJHYW1lU3RhdGUiLCJQbGF5IiwidXNlciIsImlzTXlUdXJuIiwiaXNUaXBTZWNvbmQiLCJ1aUZ1bmMiLCJvcGVuVUkiLCJwYW5lbCIsInVpUm91bmRUaXAiLCJnZXRDb21wb25lbnQiLCJzZXREYXRhIiwiUk9VTkRfVElQIiwiT1RIRVIiLCJzZXRUaW1lb3V0IiwiYmluZCIsInN0b3BQcm9wYWdhdGlvbiIsImlzUm9vbU93bmVyIiwidHlwZSIsIlBMQVlFUl9GTEFHIiwiQkxVRSIsImNsaWVudEV2ZW50IiwiZGlzcGF0Y2giLCJldmVudFR5cGUiLCJlYXRGb3JDaGVzcyIsIlJFRCIsInBhcmFtIiwibW92ZSIsImNhbGxiYWNrIiwiY2hlY2tNb3ZlRGlyZWN0aW9uIiwibXNnIiwiYWN0aW9uIiwiQ0hBTkdFX0ZMQUciLCJzZW5kRXZlbnQiLCJjaGFuZ2VGbGFnIiwib3BlbkNoZXNzUGllY2UiLCJzaWduIiwiT1BFTl9GT1JfT1RIRVIiLCJjbGVhck1vdmUiLCJzZXRDaGVzc1R5cGUiLCJpbmRleCIsInNldERlc3RvcnkiLCJhY3RpdmUiLCJzZXRQb3NpdGlvbiIsIngiLCJ5IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJnZXRQb3NpdGlvbiIsImdldElzT3BlbiIsImdldEluZGV4IiwiZ2V0VHlwIiwiZ2V0Tm9kZSIsInN0YXJ0Iiwib25EZXN0cm95IiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7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QUFLdkQsSUFBTCxDQUFVdUQsV0FBVixFQUFQO0FBQ0QsR0FwR0k7QUFzR0xDLEVBQUFBLFNBQVMsRUFBQyxxQkFBVztBQUNqQixXQUFPLEtBQUsxRCxNQUFaO0FBQ0gsR0F4R0k7QUEwR0wyRCxFQUFBQSxRQUFRLEVBQUMsb0JBQVc7QUFDaEIsV0FBTyxLQUFLVixLQUFMLEdBQWEsQ0FBcEI7QUFDSCxHQTVHSTtBQThHTFcsRUFBQUEsTUFBTSxFQUFFLGtCQUFXO0FBQ2YsV0FBTyxLQUFLakMsSUFBWjtBQUNILEdBaEhJO0FBaUhMa0MsRUFBQUEsT0FBTyxFQUFDLG1CQUFVO0FBQ2QsV0FBTyxLQUFLM0QsSUFBWjtBQUNILEdBbkhJO0FBcUhMNEQsRUFBQUEsS0FySEssbUJBcUhJLENBRVIsQ0F2SEk7QUF3SExDLEVBQUFBLFNBeEhLLHVCQXdIUTtBQUNUQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSw2QkFBWixFQURTLENBRVY7QUFDRixHQTNISSxDQTZITDs7QUE3SEssQ0FBVCIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9hc3NldHMvY29tbW9uL3NjcmlwdCIsInNvdXJjZXNDb250ZW50IjpbInZhciBHTEIgPSByZXF1aXJlKFwiR2xiXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgdGhpcy50b3VjaEV2ZW50LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgdG91Y2hFdmVudCAoZXZlbnQsIGNiKSB7XG4gICAgICAgIGlmIChHYW1lLkdhbWVNYW5hZ2VyLmdhbWVTdGF0ZSAhPT0gR2FtZVN0YXRlLlBsYXkpIHJldHVybjtcbiAgICAgICAgLy8g5Yir5Lq655qE5Zue5ZCIXG4gICAgICAgIGlmKCF1c2VyLmlzTXlUdXJuKSB7XG4gICAgICAgICAgICBpZighdGhpcy5pc1RpcFNlY29uZCkge1xuICAgICAgICAgICAgICAgIHVpRnVuYy5vcGVuVUkoJ3VpUm91bmRUaXAnLCBmdW5jdGlvbiAocGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVpUm91bmRUaXAgPSBwYW5lbC5nZXRDb21wb25lbnQoJ3VpUm91bmRUaXAnKTtcbiAgICAgICAgICAgICAgICAgICAgdWlSb3VuZFRpcC5zZXREYXRhKEdMQi5ST1VORF9USVAuT1RIRVIpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmlzVGlwU2Vjb25kID0gdHJ1ZTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNUaXBTZWNvbmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgMjAwMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cblxuICAgICAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgICAgICAgIC8v5bey57uP57+75byAXG4gICAgICAgICAgICBpZighR0xCLmlzUm9vbU93bmVyKSB7XG4gICAgICAgICAgICAgICAgLy8g6JOd6Imy5pa5XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gR0xCLlBMQVlFUl9GTEFHLkJMVUUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmVhdEZvckNoZXNzLCB0aGlzLm5vZGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyDnuqLoibLmlrlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlICE9PSBHTEIuUExBWUVSX0ZMQUcuUkVEKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5lYXRGb3JDaGVzcywgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNNb3ZpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHBhcmFtID0ge1xuICAgICAgICAgICAgICAgIG5vZGU6IHRoaXMubm9kZSxcbiAgICAgICAgICAgICAgICBtb3ZlOiB0aGlzLmlzTW92aW5nLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBjYlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmNoZWNrTW92ZURpcmVjdGlvbiwgcGFyYW0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5pyq57+75byAXG4gICAgICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbXNnID0ge2FjdGlvbjogR0xCLkNIQU5HRV9GTEFHfTtcbiAgICAgICAgICAgIEdhbWUuR2FtZU1hbmFnZXIuc2VuZEV2ZW50KG1zZyk7XG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuY2hhbmdlRmxhZyk7XG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUub3BlbkNoZXNzUGllY2UsIHRoaXMubm9kZS5zaWduKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1c2VyLmlzTXlUdXJuID0gZmFsc2U7XG4gICAgICAgIC8vIFRPRE8g5Y+R6YCB57+75qOL55qE5raI5oGvXG4gICAgICAgIHZhciBtc2cgPSB7YWN0aW9uOiBHTEIuT1BFTl9GT1JfT1RIRVIsIHNpZ246IHRoaXMubm9kZS5zaWdufTtcbiAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5zZW5kRXZlbnQobXNnKTtcbiAgICB9LFxuXG4gICAgb3BlbkNoZXNzUGllY2U6ZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgfSxcblxuICAgIGNsZWFyTW92ZTpmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzZXRDaGVzc1R5cGU6ZnVuY3Rpb24gKHR5cGUsaW5kZXgpIHtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4IC0gMTtcbiAgICB9LFxuXG4gICAgc2V0RGVzdG9yeTpmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHNldFBvc2l0aW9uOiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbi5hcHBseSh0aGlzLm5vZGUsIGFyZ3VtZW50cyk7XG4gICAgfSxcblxuICAgIGdldFBvc2l0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGUuZ2V0UG9zaXRpb24oKTtcbiAgICB9LFxuXG4gICAgZ2V0SXNPcGVuOmZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc09wZW47XG4gICAgfSxcblxuICAgIGdldEluZGV4OmZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleCArIDE7XG4gICAgfSxcblxuICAgIGdldFR5cCA6ZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgfSxcbiAgICBnZXROb2RlOmZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGU7XG4gICAgfSxcblxuICAgIHN0YXJ0ICgpIHtcblxuICAgIH0sXG4gICAgb25EZXN0cm95ICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJyoqKioqbmV4dFN0ZXBPbmRlc3Ryb3kqKioqKicpXG4gICAgICAgLy8gdGhpcy5ub2RlLm9mZigndG91Y2hlbmQnLCB0aGlzLnRvdWNoRXZlbnQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=