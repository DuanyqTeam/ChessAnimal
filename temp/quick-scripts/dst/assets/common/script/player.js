
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'baf50XihDRFIaBGw0Wxvakp', 'player');
// common/script/player.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    ID: {
      "default": 0
    }
  },
  onLoad: function onLoad() {
    this.gameManager = cc.find('Canvas').getComponent('gameManager');
    this.animation = this.node.getComponent(cc.Animation);
    this.animation.on('finished', this._finished, this);
    this.hitAnimName = 'beat1';
    this.beHitedAnimName = 'beingBeaten';
    this.standUpAnimName = 'bescold';
    this.complacentAnimName = 'dese';
    this.sitDownAnimName = 'lunges';
    this.playerState = Player_State.None;
    clientEvent.on(clientEvent.eventType.hitEvent, this.hitEvent, this);
    clientEvent.on(clientEvent.eventType.standUpEventMed, this.standUpEvent, this);
    clientEvent.on(clientEvent.eventType.complacentEvent, this.complacentEvent, this);
    clientEvent.on(clientEvent.eventType.sitDown, this.sitDown, this);
  },
  complacentEvent: function complacentEvent(param) {
    if (param.ID === this.ID) {
      this.complacent();
    }
  },
  standUpEvent: function standUpEvent(param) {
    if (param.ID === this.ID) {
      this.standUp();
    }
  },
  sitDown: function sitDown() {
    this.playerState = Player_State.SitDown;
    this.animation.play(this.sitDownAnimName);
  },
  hitEvent: function hitEvent(param) {
    if (param.ID === this.ID) {
      this.hit();
    } else {
      this.beingHit();
    }
  },
  hit: function hit() {
    this.node.setSiblingIndex(999);
    this.playerState = Player_State.Hit;
    this.animation.play(this.hitAnimName);
  },
  beingHit: function beingHit() {
    this.node.setSiblingIndex(0);
    this.playerState = Player_State.BeingHit;
    this.animation.play(this.beHitedAnimName);
  },
  standUp: function standUp() {
    this.playerState = Player_State.StandUp;
    this.animation.play(this.standUpAnimName);
  },
  complacent: function complacent() {
    this.playerState = Player_State.Complacent;
    this.animation.play(this.complacentAnimName);
  },
  _finished: function _finished(event) {
    this.playerState = Player_State.none;
  },
  onDestroy: function onDestroy() {
    this.animation.off('finished', this._finished, this);
    clientEvent.off(clientEvent.eventType.hitEvent, this.hitEvent, this);
    clientEvent.off(clientEvent.eventType.standUpEventMed, this.standUpEvent, this);
    clientEvent.off(clientEvent.eventType.complacentEvent, this.complacentEvent, this);
    clientEvent.off(clientEvent.eventType.sitDown, this.sitDown, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3BsYXllci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIklEIiwib25Mb2FkIiwiZ2FtZU1hbmFnZXIiLCJmaW5kIiwiZ2V0Q29tcG9uZW50IiwiYW5pbWF0aW9uIiwibm9kZSIsIkFuaW1hdGlvbiIsIm9uIiwiX2ZpbmlzaGVkIiwiaGl0QW5pbU5hbWUiLCJiZUhpdGVkQW5pbU5hbWUiLCJzdGFuZFVwQW5pbU5hbWUiLCJjb21wbGFjZW50QW5pbU5hbWUiLCJzaXREb3duQW5pbU5hbWUiLCJwbGF5ZXJTdGF0ZSIsIlBsYXllcl9TdGF0ZSIsIk5vbmUiLCJjbGllbnRFdmVudCIsImV2ZW50VHlwZSIsImhpdEV2ZW50Iiwic3RhbmRVcEV2ZW50TWVkIiwic3RhbmRVcEV2ZW50IiwiY29tcGxhY2VudEV2ZW50Iiwic2l0RG93biIsInBhcmFtIiwiY29tcGxhY2VudCIsInN0YW5kVXAiLCJTaXREb3duIiwicGxheSIsImhpdCIsImJlaW5nSGl0Iiwic2V0U2libGluZ0luZGV4IiwiSGl0IiwiQmVpbmdIaXQiLCJTdGFuZFVwIiwiQ29tcGxhY2VudCIsImV2ZW50Iiwibm9uZSIsIm9uRGVzdHJveSIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLEVBQUUsRUFBRTtBQUNBLGlCQUFTO0FBRFQ7QUFESSxHQUhQO0FBU0xDLEVBQUFBLE1BVEssb0JBU0k7QUFDTCxTQUFLQyxXQUFMLEdBQW1CTixFQUFFLENBQUNPLElBQUgsQ0FBUSxRQUFSLEVBQWtCQyxZQUFsQixDQUErQixhQUEvQixDQUFuQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBS0MsSUFBTCxDQUFVRixZQUFWLENBQXVCUixFQUFFLENBQUNXLFNBQTFCLENBQWpCO0FBQ0EsU0FBS0YsU0FBTCxDQUFlRyxFQUFmLENBQWtCLFVBQWxCLEVBQThCLEtBQUtDLFNBQW5DLEVBQThDLElBQTlDO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixPQUFuQjtBQUNBLFNBQUtDLGVBQUwsR0FBdUIsYUFBdkI7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLFNBQXZCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEIsTUFBMUI7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLFFBQXZCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQkMsWUFBWSxDQUFDQyxJQUFoQztBQUNBQyxJQUFBQSxXQUFXLENBQUNWLEVBQVosQ0FBZVUsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxRQUFyQyxFQUErQyxLQUFLQSxRQUFwRCxFQUE4RCxJQUE5RDtBQUNBRixJQUFBQSxXQUFXLENBQUNWLEVBQVosQ0FBZVUsV0FBVyxDQUFDQyxTQUFaLENBQXNCRSxlQUFyQyxFQUFzRCxLQUFLQyxZQUEzRCxFQUF5RSxJQUF6RTtBQUNBSixJQUFBQSxXQUFXLENBQUNWLEVBQVosQ0FBZVUsV0FBVyxDQUFDQyxTQUFaLENBQXNCSSxlQUFyQyxFQUFzRCxLQUFLQSxlQUEzRCxFQUE0RSxJQUE1RTtBQUNBTCxJQUFBQSxXQUFXLENBQUNWLEVBQVosQ0FBZVUsV0FBVyxDQUFDQyxTQUFaLENBQXNCSyxPQUFyQyxFQUE4QyxLQUFLQSxPQUFuRCxFQUE0RCxJQUE1RDtBQUNILEdBdkJJO0FBd0JMRCxFQUFBQSxlQXhCSywyQkF3QldFLEtBeEJYLEVBd0JrQjtBQUNuQixRQUFJQSxLQUFLLENBQUN6QixFQUFOLEtBQWEsS0FBS0EsRUFBdEIsRUFBMEI7QUFDdEIsV0FBSzBCLFVBQUw7QUFDSDtBQUNKLEdBNUJJO0FBNkJMSixFQUFBQSxZQTdCSyx3QkE2QlFHLEtBN0JSLEVBNkJlO0FBQ2hCLFFBQUlBLEtBQUssQ0FBQ3pCLEVBQU4sS0FBYSxLQUFLQSxFQUF0QixFQUEwQjtBQUN0QixXQUFLMkIsT0FBTDtBQUNIO0FBQ0osR0FqQ0k7QUFrQ0xILEVBQUFBLE9BbENLLHFCQWtDSztBQUNOLFNBQUtULFdBQUwsR0FBbUJDLFlBQVksQ0FBQ1ksT0FBaEM7QUFDQSxTQUFLdkIsU0FBTCxDQUFld0IsSUFBZixDQUFvQixLQUFLZixlQUF6QjtBQUNILEdBckNJO0FBc0NMTSxFQUFBQSxRQXRDSyxvQkFzQ0lLLEtBdENKLEVBc0NXO0FBQ1osUUFBSUEsS0FBSyxDQUFDekIsRUFBTixLQUFhLEtBQUtBLEVBQXRCLEVBQTBCO0FBQ3RCLFdBQUs4QixHQUFMO0FBRUgsS0FIRCxNQUdPO0FBQ0gsV0FBS0MsUUFBTDtBQUNIO0FBQ0osR0E3Q0k7QUE4Q0xELEVBQUFBLEdBOUNLLGlCQThDQztBQUNGLFNBQUt4QixJQUFMLENBQVUwQixlQUFWLENBQTBCLEdBQTFCO0FBQ0EsU0FBS2pCLFdBQUwsR0FBbUJDLFlBQVksQ0FBQ2lCLEdBQWhDO0FBQ0EsU0FBSzVCLFNBQUwsQ0FBZXdCLElBQWYsQ0FBb0IsS0FBS25CLFdBQXpCO0FBQ0gsR0FsREk7QUFtRExxQixFQUFBQSxRQW5ESyxzQkFtRE07QUFDUCxTQUFLekIsSUFBTCxDQUFVMEIsZUFBVixDQUEwQixDQUExQjtBQUNBLFNBQUtqQixXQUFMLEdBQW1CQyxZQUFZLENBQUNrQixRQUFoQztBQUNBLFNBQUs3QixTQUFMLENBQWV3QixJQUFmLENBQW9CLEtBQUtsQixlQUF6QjtBQUNILEdBdkRJO0FBd0RMZ0IsRUFBQUEsT0F4REsscUJBd0RLO0FBQ04sU0FBS1osV0FBTCxHQUFtQkMsWUFBWSxDQUFDbUIsT0FBaEM7QUFDQSxTQUFLOUIsU0FBTCxDQUFld0IsSUFBZixDQUFvQixLQUFLakIsZUFBekI7QUFDSCxHQTNESTtBQTRETGMsRUFBQUEsVUE1REssd0JBNERRO0FBQ1QsU0FBS1gsV0FBTCxHQUFtQkMsWUFBWSxDQUFDb0IsVUFBaEM7QUFDQSxTQUFLL0IsU0FBTCxDQUFld0IsSUFBZixDQUFvQixLQUFLaEIsa0JBQXpCO0FBQ0gsR0EvREk7QUFnRUxKLEVBQUFBLFNBaEVLLHFCQWdFSzRCLEtBaEVMLEVBZ0VZO0FBQ2IsU0FBS3RCLFdBQUwsR0FBbUJDLFlBQVksQ0FBQ3NCLElBQWhDO0FBQ0gsR0FsRUk7QUFtRUxDLEVBQUFBLFNBbkVLLHVCQW1FTztBQUNSLFNBQUtsQyxTQUFMLENBQWVtQyxHQUFmLENBQW1CLFVBQW5CLEVBQStCLEtBQUsvQixTQUFwQyxFQUErQyxJQUEvQztBQUVBUyxJQUFBQSxXQUFXLENBQUNzQixHQUFaLENBQWdCdEIsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxRQUF0QyxFQUFnRCxLQUFLQSxRQUFyRCxFQUErRCxJQUEvRDtBQUNBRixJQUFBQSxXQUFXLENBQUNzQixHQUFaLENBQWdCdEIsV0FBVyxDQUFDQyxTQUFaLENBQXNCRSxlQUF0QyxFQUF1RCxLQUFLQyxZQUE1RCxFQUEwRSxJQUExRTtBQUNBSixJQUFBQSxXQUFXLENBQUNzQixHQUFaLENBQWdCdEIsV0FBVyxDQUFDQyxTQUFaLENBQXNCSSxlQUF0QyxFQUF1RCxLQUFLQSxlQUE1RCxFQUE2RSxJQUE3RTtBQUNBTCxJQUFBQSxXQUFXLENBQUNzQixHQUFaLENBQWdCdEIsV0FBVyxDQUFDQyxTQUFaLENBQXNCSyxPQUF0QyxFQUErQyxLQUFLQSxPQUFwRCxFQUE2RCxJQUE3RDtBQUNIO0FBMUVJLENBQVQiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQiLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBJRDoge1xuICAgICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5nYW1lTWFuYWdlciA9IGNjLmZpbmQoJ0NhbnZhcycpLmdldENvbXBvbmVudCgnZ2FtZU1hbmFnZXInKTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLm9uKCdmaW5pc2hlZCcsIHRoaXMuX2ZpbmlzaGVkLCB0aGlzKTtcbiAgICAgICAgdGhpcy5oaXRBbmltTmFtZSA9ICdiZWF0MSdcbiAgICAgICAgdGhpcy5iZUhpdGVkQW5pbU5hbWUgPSAnYmVpbmdCZWF0ZW4nO1xuICAgICAgICB0aGlzLnN0YW5kVXBBbmltTmFtZSA9ICdiZXNjb2xkJztcbiAgICAgICAgdGhpcy5jb21wbGFjZW50QW5pbU5hbWUgPSAnZGVzZSc7XG4gICAgICAgIHRoaXMuc2l0RG93bkFuaW1OYW1lID0gJ2x1bmdlcyc7XG4gICAgICAgIHRoaXMucGxheWVyU3RhdGUgPSBQbGF5ZXJfU3RhdGUuTm9uZTtcbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLmhpdEV2ZW50LCB0aGlzLmhpdEV2ZW50LCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLnN0YW5kVXBFdmVudE1lZCwgdGhpcy5zdGFuZFVwRXZlbnQsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUuY29tcGxhY2VudEV2ZW50LCB0aGlzLmNvbXBsYWNlbnRFdmVudCwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9uKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5zaXREb3duLCB0aGlzLnNpdERvd24sIHRoaXMpO1xuICAgIH0sXG4gICAgY29tcGxhY2VudEV2ZW50KHBhcmFtKSB7XG4gICAgICAgIGlmIChwYXJhbS5JRCA9PT0gdGhpcy5JRCkge1xuICAgICAgICAgICAgdGhpcy5jb21wbGFjZW50KCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN0YW5kVXBFdmVudChwYXJhbSkge1xuICAgICAgICBpZiAocGFyYW0uSUQgPT09IHRoaXMuSUQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhbmRVcCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBzaXREb3duKCkge1xuICAgICAgICB0aGlzLnBsYXllclN0YXRlID0gUGxheWVyX1N0YXRlLlNpdERvd247XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkodGhpcy5zaXREb3duQW5pbU5hbWUpO1xuICAgIH0sXG4gICAgaGl0RXZlbnQocGFyYW0pIHtcbiAgICAgICAgaWYgKHBhcmFtLklEID09PSB0aGlzLklEKSB7XG4gICAgICAgICAgICB0aGlzLmhpdCgpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJlaW5nSGl0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGhpdCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnNldFNpYmxpbmdJbmRleCg5OTkpO1xuICAgICAgICB0aGlzLnBsYXllclN0YXRlID0gUGxheWVyX1N0YXRlLkhpdDtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSh0aGlzLmhpdEFuaW1OYW1lKTtcbiAgICB9LFxuICAgIGJlaW5nSGl0KCkge1xuICAgICAgICB0aGlzLm5vZGUuc2V0U2libGluZ0luZGV4KDApO1xuICAgICAgICB0aGlzLnBsYXllclN0YXRlID0gUGxheWVyX1N0YXRlLkJlaW5nSGl0O1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KHRoaXMuYmVIaXRlZEFuaW1OYW1lKTtcbiAgICB9LFxuICAgIHN0YW5kVXAoKSB7XG4gICAgICAgIHRoaXMucGxheWVyU3RhdGUgPSBQbGF5ZXJfU3RhdGUuU3RhbmRVcDtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ucGxheSh0aGlzLnN0YW5kVXBBbmltTmFtZSk7XG4gICAgfSxcbiAgICBjb21wbGFjZW50KCkge1xuICAgICAgICB0aGlzLnBsYXllclN0YXRlID0gUGxheWVyX1N0YXRlLkNvbXBsYWNlbnQ7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLnBsYXkodGhpcy5jb21wbGFjZW50QW5pbU5hbWUpO1xuICAgIH0sXG4gICAgX2ZpbmlzaGVkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMucGxheWVyU3RhdGUgPSBQbGF5ZXJfU3RhdGUubm9uZTtcbiAgICB9LFxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24ub2ZmKCdmaW5pc2hlZCcsIHRoaXMuX2ZpbmlzaGVkLCB0aGlzKTtcblxuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLmhpdEV2ZW50LCB0aGlzLmhpdEV2ZW50LCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5zdGFuZFVwRXZlbnRNZWQsIHRoaXMuc3RhbmRVcEV2ZW50LCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5jb21wbGFjZW50RXZlbnQsIHRoaXMuY29tcGxhY2VudEV2ZW50LCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5zaXREb3duLCB0aGlzLnNpdERvd24sIHRoaXMpO1xuICAgIH1cblxufSk7XG4iXX0=