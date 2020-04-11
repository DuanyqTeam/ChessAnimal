
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiRoundTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd2c109OiRBNc5jA44FCQ+/2', 'uiRoundTip');
// common/script/uiRoundTip.js

"use strict";

var uiPanel = require("uiPanel");

var GLB = require("Glb");

cc.Class({
  "extends": uiPanel,
  properties: {
    otherTipTxt: cc.SpriteFrame,
    selfTipTxt: cc.SpriteFrame
  },
  onLoad: function onLoad() {
    this._super();
  },
  setData: function setData(whichOne) {
    this.node.getComponent(cc.Animation).play().on('finished', this.animationFinished.bind(this));
    var nodeSprite = this.node.getChildByName('content').getComponent(cc.Sprite);

    if (whichOne === GLB.ROUND_TIP.SELF) {
      nodeSprite.spriteFrame = this.selfTipTxt;
    } else {
      nodeSprite.spriteFrame = this.otherTipTxt;
    }
  },
  animationFinished: function animationFinished() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpUm91bmRUaXAuanMiXSwibmFtZXMiOlsidWlQYW5lbCIsInJlcXVpcmUiLCJHTEIiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsIm90aGVyVGlwVHh0IiwiU3ByaXRlRnJhbWUiLCJzZWxmVGlwVHh0Iiwib25Mb2FkIiwiX3N1cGVyIiwic2V0RGF0YSIsIndoaWNoT25lIiwibm9kZSIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsInBsYXkiLCJvbiIsImFuaW1hdGlvbkZpbmlzaGVkIiwiYmluZCIsIm5vZGVTcHJpdGUiLCJnZXRDaGlsZEJ5TmFtZSIsIlNwcml0ZSIsIlJPVU5EX1RJUCIsIlNFTEYiLCJzcHJpdGVGcmFtZSIsInVpRnVuYyIsImNsb3NlVUkiLCJuYW1lIiwiZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQUlDLEdBQUcsR0FBR0QsT0FBTyxDQUFDLEtBQUQsQ0FBakI7O0FBQ0FFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0osT0FESjtBQUVMSyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFFSCxFQUFFLENBQUNJLFdBRFI7QUFFUkMsSUFBQUEsVUFBVSxFQUFFTCxFQUFFLENBQUNJO0FBRlAsR0FGUDtBQU9MRSxFQUFBQSxNQVBLLG9CQU9JO0FBQ0wsU0FBS0MsTUFBTDtBQUNILEdBVEk7QUFXTEMsRUFBQUEsT0FYSyxtQkFXR0MsUUFYSCxFQVdZO0FBQ2IsU0FBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCWCxFQUFFLENBQUNZLFNBQTFCLEVBQXFDQyxJQUFyQyxHQUE0Q0MsRUFBNUMsQ0FBK0MsVUFBL0MsRUFBMkQsS0FBS0MsaUJBQUwsQ0FBdUJDLElBQXZCLENBQTRCLElBQTVCLENBQTNEO0FBQ0EsUUFBSUMsVUFBVSxHQUFHLEtBQUtQLElBQUwsQ0FBVVEsY0FBVixDQUF5QixTQUF6QixFQUFvQ1AsWUFBcEMsQ0FBaURYLEVBQUUsQ0FBQ21CLE1BQXBELENBQWpCOztBQUNBLFFBQUlWLFFBQVEsS0FBS1YsR0FBRyxDQUFDcUIsU0FBSixDQUFjQyxJQUEvQixFQUFxQztBQUNqQ0osTUFBQUEsVUFBVSxDQUFDSyxXQUFYLEdBQXlCLEtBQUtqQixVQUE5QjtBQUNILEtBRkQsTUFFTztBQUNIWSxNQUFBQSxVQUFVLENBQUNLLFdBQVgsR0FBeUIsS0FBS25CLFdBQTlCO0FBQ0g7QUFDSixHQW5CSTtBQXFCTFksRUFBQUEsaUJBckJLLCtCQXFCZ0I7QUFDakJRLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlLEtBQUtkLElBQUwsQ0FBVWUsSUFBekI7QUFDQSxTQUFLZixJQUFMLENBQVVnQixPQUFWO0FBQ0g7QUF4QkksQ0FBVCIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9hc3NldHMvY29tbW9uL3NjcmlwdCIsInNvdXJjZXNDb250ZW50IjpbInZhciB1aVBhbmVsID0gcmVxdWlyZShcInVpUGFuZWxcIik7XG52YXIgR0xCID0gcmVxdWlyZShcIkdsYlwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiB1aVBhbmVsLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgb3RoZXJUaXBUeHQ6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICBzZWxmVGlwVHh0OiBjYy5TcHJpdGVGcmFtZVxuICAgIH0sXG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuX3N1cGVyKCk7XG4gICAgfSxcblxuICAgIHNldERhdGEod2hpY2hPbmUpe1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgpLm9uKCdmaW5pc2hlZCcsIHRoaXMuYW5pbWF0aW9uRmluaXNoZWQuYmluZCh0aGlzKSk7XG4gICAgICAgIHZhciBub2RlU3ByaXRlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdjb250ZW50JykuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIGlmICh3aGljaE9uZSA9PT0gR0xCLlJPVU5EX1RJUC5TRUxGKSB7XG4gICAgICAgICAgICBub2RlU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zZWxmVGlwVHh0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZVNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMub3RoZXJUaXBUeHQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYW5pbWF0aW9uRmluaXNoZWQgKCkge1xuICAgICAgICB1aUZ1bmMuY2xvc2VVSSh0aGlzLm5vZGUubmFtZSk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxufSk7XG4iXX0=