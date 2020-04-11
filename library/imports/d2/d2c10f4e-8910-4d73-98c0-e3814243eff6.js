"use strict";
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