"use strict";
cc._RF.push(module, '054f28zHrVNarrKSgsJYxGq', 'chess');
// common/script/chess.js

"use strict";

var GLB = require("Glb");

cc.Class({
  "extends": cc.Component,
  properties: {
    bgColor: [cc.SpriteFrame],
    blueChessPiecesArr: [cc.SpriteFrame],
    redChessPiecesArr: [cc.SpriteFrame]
  },
  onLoad: function onLoad() {
    this.chessNode = this.node.getChildByName('chessNode');
    this.yanwuNode = this.node.getChildByName('yanwu');
    this.backImgNode = this.node.getChildByName('backImg');
    this.leftNode = this.node.getChildByName('left');
    this.rightNode = this.node.getChildByName('right');
    this.upNode = this.node.getChildByName('up');
    this.downNode = this.node.getChildByName('down'); // clientEvent.on(clientEvent.eventType.openChessPiece, function (tag) {
    //     if (this.node.tag !== tag) return;
    //     this.openChessPiece();
    // }.bind(this))

    clientEvent.on(clientEvent.eventType.openChessPiece, this.openChessPieceEvent, this);
    this.leftNode.active = false;
    this.rightNode.active = false;
    this.upNode.active = false;
    this.downNode.active = false;
    this.yanwuNode.active = false;
    this.isOpen = false;
    this.isMoving = false;
  },
  setChessType: function setChessType(type, index) {
    this.chessPieceNode = this.node.getChildByName('chessNode').getChildByName('chessPiece'); // if (index % 10 === 8) {
    //     this.chessPieceNode.x += 10;
    //     this.chessPieceNode.y += 20;
    // } else if (index % 10 === 7) {
    //     this.chessPieceNode.x -= 5;
    //     this.chessPieceNode.y += 20;
    // } else if (index % 10 === 6) {
    //     this.chessPieceNode.y += 12;
    // } else if (index % 10 === 5) {
    //     this.chessPieceNode.y += 15;
    // }

    if (type === GLB.PLAYER_FLAG.BLUE) {
      this.chessPieceNode.setScale(1);
      this.chessPieceNode.getComponent(cc.Sprite).spriteFrame = this.blueChessPiecesArr[index - 1];
    } else if (type === GLB.PLAYER_FLAG.RED) {
      this.chessPieceNode.setScale(1);
      this.chessPieceNode.getComponent(cc.Sprite).spriteFrame = this.redChessPiecesArr[index - 10 - 1];
    }

    this.type = type;
    this.index = index - 1;
  },
  openChessPieceEvent: function openChessPieceEvent(tag) {
    if (this.node.sign !== tag) return;
    this.openChessPiece();
  },
  openChessPiece: function openChessPiece() {
    //  播放音乐
    user.setAudio(this.index % 10);
    user.stepIfEatOrOpen(2);
    this.backImgNode.getComponent(cc.Animation).play("openAnm").on("finished", function () {
      this.backImgNode.active = false;
      this.chessNode.active = true;
      this.yanwuNode.active = true;
      this.yanwuNode.getComponent(cc.Animation).play("yanwu");
    }.bind(this)); // TODO 第一次翻棋
    // if (user.fristFilpChess === 1) {//第一次翻棋
    //     if (this.index <= 10) {
    //         user.isBlue = true;
    //     } else {
    //         user.isBlue = false;
    //     }
    //     user.fristFilpChess = 0;
    //     clientEvent.dispatchEvent("changeColor", user.isBlue);
    //     user.sendGameData(user.gameDataProto.firstFlipChess, {isBlue:user.isBlue});
    // }

    setTimeout(function () {
      clientEvent.dispatch("isGameOver");
    }.bind(this), 1000);
  },
  setPosition: function setPosition(x, y) {
    this.node.setPosition.apply(this.node, arguments);
  },
  getPosition: function getPosition() {
    return this.node.getPosition();
  },
  getNode: function getNode() {
    return this.node;
  },
  getIndex: function getIndex() {
    return this.index + 1;
  },
  getAnimateStep: function getAnimateStep() {
    if (this.pickUp) {
      if (this.pickUp.isPlaying === true) {
        return true;
      }
    }

    if (this.putDown) {
      if (this.putDown.isPlaying === true) {
        return true;
      }
    }

    return false;
  },
  clearDirection: function clearDirection() {
    // this.leftNode = this.node.getChildByName('left');
    // this.rightNode = this.node.getChildByName('right');
    // this.upNode = this.node.getChildByName('up');
    // this.downNode = this.node.getChildByName('down');
    this.node.zIndex = 0;
    this.leftNode.active = false;
    this.rightNode.active = false;
    this.upNode.active = false;
    this.downNode.active = false;
  },
  setMoveDirection: function setMoveDirection(data, cb) {
    this.pickUp = this.chessNode.getComponent(cc.Animation).play("pickUp"); // this.leftNode = this.node.getChildByName('left');
    // this.rightNode = this.node.getChildByName('right');
    // this.upNode = this.node.getChildByName('up');
    // this.downNode = this.node.getChildByName('down');

    this.node.zIndex = 100;

    if (data.left) {
      this.leftNode.active = data.left;

      if (data.largeThanleft) {
        this.leftNode.color = new cc.color("#FFFFFF"); // this.widget["left"].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(canDownUrl));
      } else {
        this.leftNode.color = new cc.color("#FF4E4E"); // this.widget["left"].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(notDownUrl));
      }
    }

    if (data.right) {
      this.rightNode.active = data.right;

      if (data.largeThanright) {
        this.rightNode.color = new cc.color("#FFFFFF"); // this.widget["right"].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(canDownUrl));
      } else {
        this.rightNode.color = new cc.color("#FF4E4E"); // this.widget["right"].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(notDownUrl));
      }
    }

    if (data.up) {
      this.upNode.active = data.up;

      if (data.largeThanup) {
        this.upNode.color = new cc.color("#FFFFFF"); // this.widget["up"].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(canDownUrl));
      } else {
        this.upNode.color = new cc.color("#FF4E4E"); // this.widget["up"].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(notDownUrl));
      }
    }

    if (data.down) {
      this.downNode.active = data.down;

      if (data.largeThandown) {
        this.downNode.color = new cc.color("#FFFFFF"); // this.widget["down"].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(canDownUrl));
      } else {
        this.downNode.color = new cc.color("#FF4E4E"); // this.widget["down"].getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(notDownUrl));
      }
    }

    if (cb) {
      cb();
    }
  },
  animatPutDown: function animatPutDown(cb, parm) {
    if (this.chessNode.scale === 1.2) {
      this.putDown = this.chessNode.getComponent(cc.Animation).play("putDown").once("finished", function () {
        if (parm) {
          cb();
          return;
        }

        if (!cb) {
          return;
        }

        this.yanwuNode.active = true;
        this.yanwuNode.getComponent(cc.Animation).play("yanwu").once("finished", function () {
          this.yanwuNode.active = false;

          if (cb) {
            cb();
          }
        }.bind(this));
      }.bind(this));
    } else {
      if (cb) {
        cb();
      }
    }
  },
  setDestory: function setDestory() {
    this.node.active = false;
  },
  start: function start() {},
  onDestroy: function onDestroy() {
    clientEvent.off(clientEvent.eventType.openChessPiece, this.openChessPieceEvent, this);
  } // update (dt) {},

});

cc._RF.pop();