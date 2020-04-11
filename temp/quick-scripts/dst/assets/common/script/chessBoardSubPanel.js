
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/chessBoardSubPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9e367QybM1Onqtb9FfS7H3/', 'chessBoardSubPanel');
// common/script/chessBoardSubPanel.js

"use strict";

var GLB = require("Glb");

var pool = require("pool");

cc.Class({
  "extends": cc.Component,
  properties: {
    chess: cc.Prefab,
    nextStep: cc.Prefab
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    pool.createPrefabPool(this.chess);
    pool.createPrefabPool(this.nextStep); //
    // this.showChessArr = [];//存棋子
    // this.showStepArr = [];
    // this.chessBoardList = [
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 0, 0]
    // ];

    this.init();
    this.fPosList = [];
    this.chessBoradWidth = this.node.width;
    this.chessBoradHeight = this.node.height;
    this.rows = 4;
    this.columns = 4;
    this.longX = this.chessBoradWidth / this.columns;
    this.longY = this.chessBoradHeight / this.rows; //初始化格子坐标

    for (var x = 0; x < this.rows; x++) {
      var areaLine = [];

      for (var y = 0; y < this.columns; y++) {
        // var pos = cc.p(-this.chessBoradWidth/2 + y*this.longX + this.longX/2, this.chessBoradHeight/2 - x*this.longY - this.longY/2);
        var pos = cc.v2(-this.chessBoradWidth / 2 + y * this.longX + this.longX / 2, this.chessBoradHeight / 2 - x * this.longY - this.longY / 2 + 5);
        areaLine[y] = pos;
      }

      this.fPosList.push(areaLine);
    }

    this.playing = false; // TODO 加载声音；

    this.mapParam01 = null;
    this.mapParam02 = null;
    clientEvent.on(clientEvent.eventType.mapInit, this.mapInitEvent, this);
    clientEvent.on(clientEvent.eventType.eatForChess, this.eatForChessEvent, this);
    clientEvent.on(clientEvent.eventType.eatForOther, this.eatForOther, this);
    clientEvent.on(clientEvent.eventType.openForOther, this.openForOther, this);
    clientEvent.on(clientEvent.eventType.openChessPiece, this.openChessPieceEvent, this);
    clientEvent.on(clientEvent.eventType.checkMoveDirection, this.checkMoveDirection, this);
    clientEvent.on(clientEvent.eventType.isGameOver, this.isGameOver, this);
    clientEvent.on(clientEvent.eventType.getMap, this.getMap, this);
    clientEvent.on(clientEvent.eventType.gameOver, this.overClear, this);
    clientEvent.on(clientEvent.eventType.clearChess, this.overClear, this); // this.node.on('touchend', this.touchBoardEvent, this);
    //this.getMap();
  },
  init: function init() {
    this.showChessArr = []; //存棋子

    this.showStepArr = [];
    this.chessBoardList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  },
  overClear: function overClear() {
    this.mapParam01 = null;
    this.mapParam02 = null;
    this.oldChessNode = null;
    this.chessBoardList = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    var childrenNodes = this.node.children;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = childrenNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var val = _step.value;
        val.destroy();
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

    this.node.removeAllChildren();
  },
  touchBoardEvent: function touchBoardEvent(event) {
    if (Game.GameManager.gameState !== GameState.Play) return;
    var pos = this.node.convertToNodeSpace(event.getLocation());
    var clickPos = {
      x: pos.y / this.longY,
      y: pos.x / this.longX
    };

    if (clickPos.y % 1 < 0.25 || clickPos.y % 1 > 0.7 || clickPos.x % 1 < 0.25 || clickPos.x % 1 > 0.7) {
      console.log("在界外"); // if (this.oldChessNode) {
      //     this.oldChessNode.clearDirection(true);
      //     this.oldChessNode.animatPutDown();
      // }

      return;
    }

    var clickPos = {
      x: 3 - parseInt(clickPos.x),
      y: parseInt(clickPos.y)
    }; // var moveTag = clickPos.x * 4 + clickPos.y;

    var moveTag;

    if (this.chessMove === true) {
      moveTag = {
        x: parseInt(this.oldChess.sign / 4),
        y: parseInt(this.oldChess.sign % 4)
      };

      if (this.data.left) {
        if (moveTag.y - 1 === clickPos.y && moveTag.x === clickPos.x) {
          this.setEatfun(this.oldChess.sign, null, -1, clickPos);
          console.log("成功移动");
        }
      }

      if (this.data.right) {
        if (moveTag.y + 1 === clickPos.y && moveTag.x === clickPos.x) {
          this.setEatfun(this.oldChess.sign, null, 1, clickPos);
          console.log("成功移动");
        }
      }

      if (this.data.up) {
        if (moveTag.x - 1 === clickPos.x && moveTag.y === clickPos.y) {
          this.setEatfun(this.oldChess.sign, null, -4, clickPos);
          console.log("成功移动");
        }
      }

      if (this.data.down) {
        if (moveTag.x + 1 === clickPos.x && moveTag.y === clickPos.y) {
          this.setEatfun(this.oldChess.sign, null, 4, clickPos);
          console.log("成功移动");
        }
      }
    }
  },
  eatForChessEvent: function eatForChessEvent(stepNode) {
    if (!this.chessMove) return;
    this.eatForChess(stepNode);
  },
  openChessPieceEvent: function openChessPieceEvent(stepNode) {
    if (this.oldChessNode) {
      this.oldChessNode.clearDirection();
      this.oldChessNode.animatPutDown();
    }
  },
  mapInitEvent: function mapInitEvent(data) {
    if (data.showChessInfo) {
      this.mapParam01 = data.showChessInfo;
    } else if (data.chessBoardList) {
      this.mapParam02 = data.chessBoardList;
    }

    if (this.mapParam01 && this.mapParam02) {
      var param = {
        showChessInfo: this.mapParam01,
        chessBoardList: this.mapParam02
      };
      this.mapInit(param);
    }
  },
  mapInit: function mapInit(data) {
    console.log('*******这里是mapInit*********');
    if (GLB.isRoomOwner) return;
    this.showChessArr = [];
    this.showStepArr = [];
    var showChessInfo = data["showChessInfo"];
    this.chessBoardList = data.chessBoardList;

    for (var j = 0; j < showChessInfo.length; j++) {
      var chessNode = pool.getPrefab(this.chess.name);
      this.node.addChild(chessNode);
      chessNode.setPosition(showChessInfo[j].pos);
      chessNode.sign = showChessInfo[j].sign;
      var chessScript = chessNode.getComponent(this.chess.name);
      this.showChessArr.push(chessNode);
      chessScript.setChessType(showChessInfo[j].type, showChessInfo[j].index);
      var stepNode = pool.getPrefab(this.nextStep.name);
      var stepScrip = stepNode.getComponent(this.nextStep.name);
      this.node.addChild(stepNode);
      stepScrip.setChessType(showChessInfo[j].type, showChessInfo[j].index);
      stepNode.setPosition(showChessInfo[j].pos);
      stepNode.sign = showChessInfo[j].sign;
      this.showStepArr.push(stepNode);
    }
  },
  getMap: function getMap() {
    // 主机生成地图数据；
    if (!GLB.isRoomOwner) return; // // 先清空棋子数据（主机不会收到）；
    // var chessMsg = {
    //     action: GLB.CLEAR_CHESS,
    // }
    // Game.GameManager.sendEvent(chessMsg)

    this.showChessInfo = [];
    this.showChessArr = [];
    this.showStepArr = [];
    var blueChessPiecesArr = [1, 2, 3, 4, 5, 6, 7, 8];
    var redChessPiecesArr = [11, 12, 13, 14, 15, 16, 17, 18];

    for (var j = 0; j < this.rows; j++) {
      for (var k = 0; k < this.columns; k++) {
        var chessNode = pool.getPrefab(this.chess.name);
        this.node.addChild(chessNode);
        chessNode.setPosition(this.fPosList[j][k]);
        chessNode.sign = j * this.columns + k;
        var chessScript = chessNode.getComponent(this.chess.name);
        this.showChessArr.push(chessNode);
        var stepNode = pool.getPrefab(this.nextStep.name);
        var stepNodeScrip = stepNode.getComponent(this.nextStep.name);
        this.node.addChild(stepNode);
        stepNode.setPosition(this.fPosList[j][k]);
        stepNode.sign = j * this.columns + k;
        this.showStepArr.push(stepNode);
        var chessInfo = {
          pos: this.fPosList[j][k],
          sign: chessNode.sign
        };
        var xx = Math.random();

        if (xx >= 0.5) {
          if (blueChessPiecesArr.length == 0) {
            if (redChessPiecesArr.length == 0) {
              break;
            }

            var index = Math.floor(Math.random() * redChessPiecesArr.length);
            chessScript.setChessType(GLB.PLAYER_FLAG.RED, redChessPiecesArr[index]);
            stepNodeScrip.setChessType(GLB.PLAYER_FLAG.RED, redChessPiecesArr[index]);
            chessInfo.type = GLB.PLAYER_FLAG.RED;
            chessInfo.index = redChessPiecesArr[index];
            this.chessBoardList[j][k] = redChessPiecesArr[index];
            redChessPiecesArr.splice(index, 1);
          } else {
            var index = Math.floor(Math.random() * blueChessPiecesArr.length);
            chessScript.setChessType(GLB.PLAYER_FLAG.BLUE, blueChessPiecesArr[index]);
            stepNodeScrip.setChessType(GLB.PLAYER_FLAG.BLUE, blueChessPiecesArr[index]);
            chessInfo.type = GLB.PLAYER_FLAG.BLUE;
            chessInfo.index = blueChessPiecesArr[index];
            this.chessBoardList[j][k] = blueChessPiecesArr[index];
            blueChessPiecesArr.splice(index, 1);
          }
        } else if (xx < 0.5) {
          if (redChessPiecesArr.length == 0) {
            if (blueChessPiecesArr.length == 0) {
              break;
            }

            var index = Math.floor(Math.random() * blueChessPiecesArr.length);
            chessScript.setChessType(GLB.PLAYER_FLAG.BLUE, blueChessPiecesArr[index]);
            stepNodeScrip.setChessType(GLB.PLAYER_FLAG.BLUE, blueChessPiecesArr[index]);
            chessInfo.type = GLB.PLAYER_FLAG.BLUE;
            chessInfo.index = blueChessPiecesArr[index];
            this.chessBoardList[j][k] = blueChessPiecesArr[index];
            blueChessPiecesArr.splice(index, 1);
          } else {
            var index = Math.floor(Math.random() * redChessPiecesArr.length);
            chessScript.setChessType(GLB.PLAYER_FLAG.RED, redChessPiecesArr[index]);
            stepNodeScrip.setChessType(GLB.PLAYER_FLAG.RED, redChessPiecesArr[index]);
            chessInfo.type = GLB.PLAYER_FLAG.RED;
            chessInfo.index = redChessPiecesArr[index];
            this.chessBoardList[j][k] = redChessPiecesArr[index];
            redChessPiecesArr.splice(index, 1);
          }
        }

        this.showChessInfo.push(chessInfo);
      }
    } // TODO 派发事件


    var msg = {
      action: GLB.SEND_MAP_INFO,
      showChessInfo: this.showChessInfo // chessBoardList: this.chessBoardList
      // mapInfo: {
      //     showChessInfo: this.showChessInfo,
      //     chessBoardList: this.chessBoardList
      // }

    };
    Game.GameManager.sendEventEx(msg);
    var msg02 = {
      action: GLB.SEND_MAP_INFO,
      chessBoardList: this.chessBoardList
    };
    Game.GameManager.sendEventEx(msg02);
  },
  checkMoveDirection: function checkMoveDirection(param) {
    var stepNode = param.node;
    var move = param.move;
    var cb = param.callback;

    if (this.oldChessNode) {
      if (this.oldChessNode.getAnimateStep()) {
        stepNode.getComponent(this.nextStep.name).clearMove();
        return;
      }
    }

    this.chessMove = move; //为true时是拿起棋子

    if (this.oldTag !== stepNode.sign) {
      if (this.oldStepNode) {
        this.oldStepNode.getComponent(this.nextStep.name).clearMove();
        this.oldStepNode = null;
      }
    }

    if (this.chessMove === false) {
      console.log("放下棋子");

      if (this.oldChessNode) {
        this.oldChessNode.clearDirection();
        this.oldChessNode.animatPutDown();
        this.oldChessNode = null;
      }

      return;
    }

    var data = {
      left: false,
      right: false,
      up: false,
      down: false
    };
    this.data = data;

    if (this.oldChessNode) {
      this.oldChessNode.clearDirection(true);
      this.oldChessNode.animatPutDown();
    }

    var tag = stepNode.sign;
    this.oldTag = tag;
    var x = Math.floor(tag / this.columns);
    var y = tag % this.columns;

    if (y - 1 >= 0) {
      // this.checkLeft();
      var enemyChess = this.chessBoardList[parseInt((tag - 1) / 4)][(tag - 1) % 4];
      var ownerChess = this.chessBoardList[parseInt(tag / 4)][tag % 4];
      data = this.isCanEatChess(enemyChess, ownerChess, data, "left");
    }

    if (y + 1 <= this.columns - 1) {
      // this.checkRight();
      var enemyChess = this.chessBoardList[parseInt((tag + 1) / 4)][(tag + 1) % 4];
      var ownerChess = this.chessBoardList[parseInt(tag / 4)][tag % 4];
      data = this.isCanEatChess(enemyChess, ownerChess, data, "right");
    }

    if (x - 1 >= 0) {
      // this.checkUp();
      var enemyChess = this.chessBoardList[parseInt((tag - 4) / 4)][(tag - 4) % 4];
      var ownerChess = this.chessBoardList[parseInt(tag / 4)][tag % 4];
      data = this.isCanEatChess(enemyChess, ownerChess, data, "up");
    }

    if (x + 1 <= this.rows - 1) {
      var enemyChess = this.chessBoardList[parseInt((tag + 4) / 4)][(tag + 4) % 4];
      var ownerChess = this.chessBoardList[parseInt(tag / 4)][tag % 4];
      data = this.isCanEatChess(enemyChess, ownerChess, data, "down");
    }

    this.currentChessNode = this.getChessNodeByTag(tag);
    this.oldStepNode = this.getStepNodeByTag(tag);
    this.oldChess = this.currentChessNode;
    this.oldChessNode = this.currentChessNode.getComponent(this.currentChessNode.name);
    this.oldChessNode.setMoveDirection(data, cb);
  },
  //判断子粒大小
  isCanEatChess: function isCanEatChess(enemyChess, ownerChess, data, parm) {
    if (parseInt(enemyChess / 10) !== parseInt(ownerChess / 10) || enemyChess === 0) {
      if (enemyChess === 0) {
        data[parm] = true;
        data["largeThan" + parm] = true; //

        return data;
      }

      var tag = this.getTagByIndex(enemyChess).sign;
      var stepNode = this.getStepNodeByTag(tag);
      var stepNodeScrip = stepNode.getComponent(this.nextStep.name);

      if (!stepNodeScrip.getIsOpen()) {
        return data;
      }

      data[parm] = true;

      if (enemyChess % 10 > ownerChess % 10) {
        data["largeThan" + parm] = false; //
      } else {
        data["largeThan" + parm] = true; //
      }

      if (enemyChess % 10 === 8 && ownerChess % 10 === 1) {
        data["largeThan" + parm] = true; //
      } else if (ownerChess % 10 === 8 && enemyChess % 10 === 1) {
        data["largeThan" + parm] = false; //
      }
    }

    return data;
  },
  eatForChess: function eatForChess(isEatChess) {
    if (!this.chessMove) return;

    if (!this.oldChess) {
      return;
    }

    var oldTag = this.oldChess.sign;

    if (this.data.left) {
      if (typeof oldTag !== "undefined" && isEatChess.sign + 1 === oldTag) {
        this.setEatfun(oldTag, isEatChess.sign, -1);
      }
    }

    if (this.data.right) {
      if (typeof oldTag !== "undefined" && isEatChess.sign - 1 === oldTag) {
        this.setEatfun(oldTag, isEatChess.sign, 1);
      }
    }

    if (this.data.up) {
      if (typeof oldTag !== "undefined" && isEatChess.sign + 4 === oldTag) {
        this.setEatfun(oldTag, isEatChess.sign, -4);
      }
    }

    if (this.data.down) {
      if (typeof oldTag !== "undefined" && isEatChess.sign - 4 === oldTag) {
        this.setEatfun(oldTag, isEatChess.sign, 4);
      }
    }
  },
  eatForOther: function eatForOther(data) {
    if (data.eatTag !== null) {
      this.eatOther(data.oldTag, data.eatTag, data.sign);
      user.stepIfEatOrOpen(1);
    } else {
      this.moveToKong(data.oldTag, data.sign, data.clickPos);
      user.stepIfEatOrOpen(3);
    }
  },
  openForOther: function openForOther(tag) {
    var stepNode = this.getStepNodeByTag(tag);
    var chessNode = this.getChessNodeByTag(tag);
    var stepNodeScrip = stepNode.getComponent(this.nextStep.name);
    var chessNodeScrip = chessNode.getComponent(this.chess.name);
    if (stepNodeScrip.isOpen) return;
    stepNodeScrip.openChessPiece();
    chessNodeScrip.openChessPiece();
  },
  setEatfun: function setEatfun(oldTag, eatTag, tag, clickPos) {
    if (eatTag !== null) {
      var msg = {
        action: GLB.CHANGE_FLAG
      };
      Game.GameManager.sendEventEx(msg); // user.isMyTurn = false;

      this.eatOther(oldTag, eatTag, tag); //吃敌方

      user.stepIfEatOrOpen(1);
    } else {
      // user.isMyTurn = false;
      var msg = {
        action: GLB.CHANGE_FLAG
      };
      Game.GameManager.sendEventEx(msg);
      this.moveToKong(oldTag, tag, clickPos); //走空地
    }

    this.chessMove = false; // 发送被吃的消息
    // user.sendGameData(user.gameDataProto.eatOther, {
    //     oldTag:oldTag,eatTag:eatTag,tag:tag,clickPos:clickPos
    // });

    var msg = {
      action: GLB.EAT_FOR_OTHER,
      eatInfo: {
        oldTag: oldTag,
        eatTag: eatTag,
        sign: tag,
        clickPos: clickPos
      }
    };
    Game.GameManager.sendEvent(msg);

    if (eatTag === null) {
      user.stepIfEatOrOpen(3, true);
    }
  },
  moveToKong: function moveToKong(oldChess, addTag, clickPos) {
    this.chessBoardList[parseInt(oldChess / 4)][parseInt(oldChess % 4)] = 0;
    var oldChessNode = this.getChessNodeByTag(oldChess);
    var oldStepNode = this.getStepNodeByTag(oldChess);
    oldChessNode.sign += addTag;
    oldStepNode.sign += addTag;
    var oldChessScrip = oldChessNode.getComponent(this.chess.name);
    var oldStepNodeScrip = oldStepNode.getComponent(this.nextStep.name);
    var y = clickPos.y;
    var x = clickPos.x;
    var pos = cc.v2(-this.chessBoradWidth / 2 + y * this.longX + this.longX / 2, this.chessBoradHeight / 2 - x * this.longY - this.longY / 2); // oldChessScrip.getNode().setPosition(pos);

    oldChessScrip.getNode().stopAllActions();
    var callF = cc.callFunc(function () {
      user.setAudio("pieceClick");
      this.clearOldChessNode(function () {
        oldStepNodeScrip.getNode().setPosition(pos);
        this.chessBoardList[clickPos.x][clickPos.y] = oldChessScrip.index + 1;
        this.isGameOver();
      }.bind(this));
    }.bind(this));
    oldChessScrip.getNode().runAction(cc.sequence(cc.moveTo(0.2, pos), callF)); // oldChessScrip.getNode().runAction(cc.moveTo(0.2,pos));
  },
  eatOther: function eatOther(oldTag, eatTag, tag) {
    var isEatChess = this.getChessNodeByTag(eatTag).getComponent(this.chess.name);
    var isEatStepChess = this.getStepNodeByTag(eatTag).getComponent(this.nextStep.name);
    var ownerChess = this.getChessNodeByTag(oldTag).getComponent(this.chess.name);
    var ownerStepChess = this.getStepNodeByTag(oldTag).getComponent(this.nextStep.name);

    if (isEatChess.index % 10 > ownerChess.index % 10) {
      console.log("被吃掉");

      if (isEatChess.index % 10 + 1 === 8 && ownerChess.index % 10 + 1 === 1) {
        this.eatChangePosition(ownerChess, ownerStepChess, isEatChess, isEatStepChess, 1, tag);
      } else {
        this.eatChangePosition(ownerChess, ownerStepChess, isEatChess, isEatStepChess, -1, tag);
      }
    } else if (isEatChess.index % 10 + 1 === ownerChess.index % 10 + 1) {
      this.eatChangePosition(ownerChess, ownerStepChess, isEatChess, isEatStepChess, 0, tag);
      console.log("换掉");
      user.stepIfEatOrOpen(1);
    } else {
      if (isEatChess.index % 10 + 1 === 1 && ownerChess.index % 10 + 1 === 8) {
        this.eatChangePosition(ownerChess, ownerStepChess, isEatChess, isEatStepChess, -1, tag);
      } else {
        this.eatChangePosition(ownerChess, ownerStepChess, isEatChess, isEatStepChess, 1, tag);
      }

      console.log("吃掉对方");
    }
  },
  eatChangePosition: function eatChangePosition(ownerChess, ownerStepChess, isEatChess, isEatStepChess, parm, tag) {
    var pos = isEatChess.getPosition();
    var pos2 = isEatStepChess.getPosition();
    var ownerNode = ownerChess.getNode();

    if (parm > 0) {
      ownerNode.stopAllActions();
      ownerNode.runAction(cc.sequence(cc.moveTo(0.2, pos), cc.callFunc(function () {
        // TODO 播放音乐
        user.setAudio("eat");
        this.clearOldChessNode(function () {
          ownerNode.sign += tag;
          var ownerStepNode = ownerStepChess.getNode();
          ownerStepNode.sign += tag;
          ownerNode.stopAllActions();
          ownerNode.runAction(cc.moveTo(0.2, pos)); // ownerChess.setPosition(pos);

          ownerStepChess.setPosition(pos2);
          var index2 = isEatChess.getIndex();
          var index = ownerChess.getIndex();
          this.shiftForBoardList(index);
          this.shiftForBoardList(index2, index);
          isEatChess.setDestory();
          isEatStepChess.setDestory();
          this.chessSetDestory(null, null, isEatChess, isEatStepChess);
          this.isGameOver();
        }.bind(this));
      }.bind(this))));
    } else if (parm === 0) {
      ownerNode.zIndex = 100;
      ownerNode.stopAllActions();
      ownerNode.runAction(cc.sequence(cc.moveTo(0.2, pos), cc.callFunc(function () {
        // TODO 播放音乐
        user.setAudio("allDie");
        this.clearOldChessNode(function () {
          var index = isEatChess.getIndex();
          this.shiftForBoardList(index);
          index = ownerChess.getIndex();
          this.shiftForBoardList(index);
          isEatChess.setDestory();
          isEatStepChess.setDestory();
          ownerChess.setDestory();
          ownerStepChess.setDestory();
          this.chessSetDestory(ownerChess, ownerStepChess, isEatChess, isEatStepChess);
          this.isGameOver();
        }.bind(this), 1);
      }.bind(this))));
    } else {
      ownerNode.zIndex = 100;
      ownerNode.stopAllActions();
      ownerNode.runAction(cc.sequence(cc.moveTo(0.2, pos), cc.callFunc(function () {
        // TODO 播放音乐
        user.setAudio("eat");
        this.clearOldChessNode(function () {
          var index = ownerChess.getIndex();
          this.shiftForBoardList(index);
          ownerChess.setDestory();
          ownerStepChess.setDestory();
          this.chessSetDestory(ownerChess, ownerStepChess, null, null);
          this.isGameOver();
        }.bind(this), 1);
      }.bind(this))));
    }
  },
  isGameOver: function isGameOver() {
    var x, y;
    var arrX = [],
        arrY = [];
    var i;

    for (i = 0; i < this.chessBoardList.length; i++) {
      for (var j = 0; j < this.chessBoardList[i].length; j++) {
        if (this.chessBoardList[i][j] <= 0) {
          continue;
        } // 判断是否有未开的棋子


        var isOpen = this.getStepByIndex(this.chessBoardList[i][j]).getComponent("nextStep").getIsOpen();

        if (!isOpen) {
          return;
        } // 判断是否只有一方的棋子


        if (this.chessBoardList[i][j] >= 10) {
          // 红色
          x = true;
          arrX.push(this.chessBoardList[i][j]);
        } else if (this.chessBoardList[i][j] > 0) {
          // 蓝色
          y = true;
          arrY.push(this.chessBoardList[i][j]);
        }
      }
    } // 判断是否只剩下两个开着的子


    if (arrX.length === 1 && arrY.length === 1) {
      if (arrX[0] - 10 > arrY[0]) {
        y = false;
      } else if (arrX[0] - 10 < arrY[0]) {
        x = false;
      } else {
        x = false;
        y = false;
      }
    }

    if (!x || !y) {
      // TODO 判断输赢
      console.log('游戏结束');
      var winFlag = null;
      var userIsWin = false; // user.gameOver = true;
      // Game.GameManager.gameState = GameState.Over;

      if (!x && !y) {
        console.log("和局"); // clientEvent.dispatchEvent("resultDown","2");
      } else {
        if (!GLB.isRoomOwner && !y) {
          // 红方赢了
          console.log("你输了");
          winFlag = GLB.PLAYER_FLAG.RED; //    clientEvent.dispatchEvent("resultDown","3");
        } else if (GLB.isRoomOwner && !x) {
          // 蓝色方赢了
          console.log("你输了");
          winFlag = GLB.PLAYER_FLAG.BLUE; //    clientEvent.dispatchEvent("resultDown","3");
        } else {
          console.log("你赢了");
          var userIsWin = true; //    clientEvent.dispatchEvent("resultDown","1");
        }
      }

      if (userIsWin) {
        if (GLB.isRoomOwner) {
          winFlag = GLB.PLAYER_FLAG.RED;
        } else {
          winFlag = GLB.PLAYER_FLAG.BLUE;
        }
      }

      var msg = {
        action: GLB.GAME_OVER_EVENT,
        winFlag: winFlag
      };
      Game.GameManager.sendEventEx(msg);
      clientEvent.dispatch(clientEvent.eventType.stopTimeWarnAnim);
    }
  },
  chessSetDestory: function chessSetDestory(ownerChess, ownerStepChess, isEatChess, isEatStepChess) {
    if (ownerChess !== null && ownerStepChess !== null) {
      var ownerNode = ownerChess.getNode();
      ownerNode.sign = 100;
      var ownerStepNode = ownerStepChess.getNode();
      ownerStepNode.sign = 100;
    }

    if (isEatChess !== null && isEatStepChess !== null) {
      var isEatNode = isEatChess.getNode();
      isEatNode.sign = 100;
      var isEatStepNode = isEatStepChess.getNode();
      isEatStepNode.sign = 100;
    }
  },
  shiftForBoardList: function shiftForBoardList(index, index2) {
    for (var i = 0; i < this.chessBoardList.length; i++) {
      for (var j = 0; j < this.chessBoardList[i].length; j++) {
        if (this.chessBoardList[i][j] === index) {
          if (index === 0) {
            console.log("this.chessBoardList[i][j]出错");
          }

          if (index2) {
            this.chessBoardList[i][j] = index2;
          } else {
            this.chessBoardList[i][j] = 0;
          }
        }
      }
    }
  },
  clearOldChessNode: function clearOldChessNode(cb, parm) {
    if (this.oldStepNode) {
      this.oldStepNode.getComponent(this.nextStep.name).clearMove();
      this.oldStepNode = null;
    }

    if (this.oldChessNode) {
      this.oldChessNode.clearDirection();
      this.oldChessNode.animatPutDown(cb, parm);
    } else {
      if (cb) {
        cb();
      }
    }
  },
  getChessNodeByTag: function getChessNodeByTag(tag) {
    for (var i = 0; i < this.showChessArr.length; i++) {
      if (this.showChessArr[i].sign === tag) {
        return this.showChessArr[i];
      }
    }
  },
  getStepNodeByTag: function getStepNodeByTag(tag) {
    for (var i = 0; i < this.showStepArr.length; i++) {
      if (this.showStepArr[i].sign === tag) {
        return this.showStepArr[i];
      }
    }
  },
  getStepByIndex: function getStepByIndex(index) {
    for (var i = 0; i < this.showStepArr.length; i++) {
      var scrip = this.showStepArr[i].getComponent(this.nextStep.name);

      if (scrip.getIndex() === index) {
        return this.showStepArr[i];
      }
    }
  },
  getTagByIndex: function getTagByIndex(index) {
    for (var i = 0; i < this.showChessArr.length; i++) {
      var scrip = this.showChessArr[i].getComponent(this.chess.name);

      if (scrip.getIndex() === index) {
        return this.showChessArr[i];
      }
    }
  },
  onDestroy: function onDestroy() {
    clientEvent.off(clientEvent.eventType.mapInit, this.mapInitEvent, this);
    clientEvent.off(clientEvent.eventType.eatForChess, this.eatForChessEvent, this);
    clientEvent.off(clientEvent.eventType.eatForOther, this.eatForOther, this);
    clientEvent.off(clientEvent.eventType.openForOther, this.openForOther, this);
    clientEvent.off(clientEvent.eventType.openChessPiece, this.openChessPieceEvent, this);
    clientEvent.off(clientEvent.eventType.checkMoveDirection, this.checkMoveDirection, this);
    clientEvent.off(clientEvent.eventType.isGameOver, this.isGameOver, this);
    clientEvent.off(clientEvent.eventType.getMap, this.getMap, this);
    clientEvent.off(clientEvent.eventType.gameOver, this.overClear, this);
    clientEvent.off(clientEvent.eventType.clearChess, this.overClear, this); // this.node.off('touchend', this.touchBoardEvent, this);
  } // start () {
  //
  // },
  // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L2NoZXNzQm9hcmRTdWJQYW5lbC5qcyJdLCJuYW1lcyI6WyJHTEIiLCJyZXF1aXJlIiwicG9vbCIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY2hlc3MiLCJQcmVmYWIiLCJuZXh0U3RlcCIsIm9uTG9hZCIsImNyZWF0ZVByZWZhYlBvb2wiLCJpbml0IiwiZlBvc0xpc3QiLCJjaGVzc0JvcmFkV2lkdGgiLCJub2RlIiwid2lkdGgiLCJjaGVzc0JvcmFkSGVpZ2h0IiwiaGVpZ2h0Iiwicm93cyIsImNvbHVtbnMiLCJsb25nWCIsImxvbmdZIiwieCIsImFyZWFMaW5lIiwieSIsInBvcyIsInYyIiwicHVzaCIsInBsYXlpbmciLCJtYXBQYXJhbTAxIiwibWFwUGFyYW0wMiIsImNsaWVudEV2ZW50Iiwib24iLCJldmVudFR5cGUiLCJtYXBJbml0IiwibWFwSW5pdEV2ZW50IiwiZWF0Rm9yQ2hlc3MiLCJlYXRGb3JDaGVzc0V2ZW50IiwiZWF0Rm9yT3RoZXIiLCJvcGVuRm9yT3RoZXIiLCJvcGVuQ2hlc3NQaWVjZSIsIm9wZW5DaGVzc1BpZWNlRXZlbnQiLCJjaGVja01vdmVEaXJlY3Rpb24iLCJpc0dhbWVPdmVyIiwiZ2V0TWFwIiwiZ2FtZU92ZXIiLCJvdmVyQ2xlYXIiLCJjbGVhckNoZXNzIiwic2hvd0NoZXNzQXJyIiwic2hvd1N0ZXBBcnIiLCJjaGVzc0JvYXJkTGlzdCIsIm9sZENoZXNzTm9kZSIsImNoaWxkcmVuTm9kZXMiLCJjaGlsZHJlbiIsInZhbCIsImRlc3Ryb3kiLCJyZW1vdmVBbGxDaGlsZHJlbiIsInRvdWNoQm9hcmRFdmVudCIsImV2ZW50IiwiR2FtZSIsIkdhbWVNYW5hZ2VyIiwiZ2FtZVN0YXRlIiwiR2FtZVN0YXRlIiwiUGxheSIsImNvbnZlcnRUb05vZGVTcGFjZSIsImdldExvY2F0aW9uIiwiY2xpY2tQb3MiLCJjb25zb2xlIiwibG9nIiwicGFyc2VJbnQiLCJtb3ZlVGFnIiwiY2hlc3NNb3ZlIiwib2xkQ2hlc3MiLCJzaWduIiwiZGF0YSIsImxlZnQiLCJzZXRFYXRmdW4iLCJyaWdodCIsInVwIiwiZG93biIsInN0ZXBOb2RlIiwiY2xlYXJEaXJlY3Rpb24iLCJhbmltYXRQdXREb3duIiwic2hvd0NoZXNzSW5mbyIsInBhcmFtIiwiaXNSb29tT3duZXIiLCJqIiwibGVuZ3RoIiwiY2hlc3NOb2RlIiwiZ2V0UHJlZmFiIiwibmFtZSIsImFkZENoaWxkIiwic2V0UG9zaXRpb24iLCJjaGVzc1NjcmlwdCIsImdldENvbXBvbmVudCIsInNldENoZXNzVHlwZSIsInR5cGUiLCJpbmRleCIsInN0ZXBTY3JpcCIsImJsdWVDaGVzc1BpZWNlc0FyciIsInJlZENoZXNzUGllY2VzQXJyIiwiayIsInN0ZXBOb2RlU2NyaXAiLCJjaGVzc0luZm8iLCJ4eCIsIk1hdGgiLCJyYW5kb20iLCJmbG9vciIsIlBMQVlFUl9GTEFHIiwiUkVEIiwic3BsaWNlIiwiQkxVRSIsIm1zZyIsImFjdGlvbiIsIlNFTkRfTUFQX0lORk8iLCJzZW5kRXZlbnRFeCIsIm1zZzAyIiwibW92ZSIsImNiIiwiY2FsbGJhY2siLCJnZXRBbmltYXRlU3RlcCIsImNsZWFyTW92ZSIsIm9sZFRhZyIsIm9sZFN0ZXBOb2RlIiwidGFnIiwiZW5lbXlDaGVzcyIsIm93bmVyQ2hlc3MiLCJpc0NhbkVhdENoZXNzIiwiY3VycmVudENoZXNzTm9kZSIsImdldENoZXNzTm9kZUJ5VGFnIiwiZ2V0U3RlcE5vZGVCeVRhZyIsInNldE1vdmVEaXJlY3Rpb24iLCJwYXJtIiwiZ2V0VGFnQnlJbmRleCIsImdldElzT3BlbiIsImlzRWF0Q2hlc3MiLCJlYXRUYWciLCJlYXRPdGhlciIsInVzZXIiLCJzdGVwSWZFYXRPck9wZW4iLCJtb3ZlVG9Lb25nIiwiY2hlc3NOb2RlU2NyaXAiLCJpc09wZW4iLCJDSEFOR0VfRkxBRyIsIkVBVF9GT1JfT1RIRVIiLCJlYXRJbmZvIiwic2VuZEV2ZW50IiwiYWRkVGFnIiwib2xkQ2hlc3NTY3JpcCIsIm9sZFN0ZXBOb2RlU2NyaXAiLCJnZXROb2RlIiwic3RvcEFsbEFjdGlvbnMiLCJjYWxsRiIsImNhbGxGdW5jIiwic2V0QXVkaW8iLCJjbGVhck9sZENoZXNzTm9kZSIsImJpbmQiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsIm1vdmVUbyIsImlzRWF0U3RlcENoZXNzIiwib3duZXJTdGVwQ2hlc3MiLCJlYXRDaGFuZ2VQb3NpdGlvbiIsImdldFBvc2l0aW9uIiwicG9zMiIsIm93bmVyTm9kZSIsIm93bmVyU3RlcE5vZGUiLCJpbmRleDIiLCJnZXRJbmRleCIsInNoaWZ0Rm9yQm9hcmRMaXN0Iiwic2V0RGVzdG9yeSIsImNoZXNzU2V0RGVzdG9yeSIsInpJbmRleCIsImFyclgiLCJhcnJZIiwiaSIsImdldFN0ZXBCeUluZGV4Iiwid2luRmxhZyIsInVzZXJJc1dpbiIsIkdBTUVfT1ZFUl9FVkVOVCIsImRpc3BhdGNoIiwic3RvcFRpbWVXYXJuQW5pbSIsImlzRWF0Tm9kZSIsImlzRWF0U3RlcE5vZGUiLCJzY3JpcCIsIm9uRGVzdHJveSIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxHQUFHLEdBQUdDLE9BQU8sQ0FBQyxLQUFELENBQWpCOztBQUNBLElBQUlDLElBQUksR0FBR0QsT0FBTyxDQUFDLE1BQUQsQ0FBbEI7O0FBRUFFLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUVKLEVBQUUsQ0FBQ0ssTUFERjtBQUVSQyxJQUFBQSxRQUFRLEVBQUVOLEVBQUUsQ0FBQ0s7QUFGTCxHQUhQO0FBUUw7QUFFQUUsRUFBQUEsTUFWSyxvQkFVSztBQUNOUixJQUFBQSxJQUFJLENBQUNTLGdCQUFMLENBQXNCLEtBQUtKLEtBQTNCO0FBQ0FMLElBQUFBLElBQUksQ0FBQ1MsZ0JBQUws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QUFBLFdBQVcsQ0FBQzJKLEdBQVosQ0FBZ0IzSixXQUFXLENBQUNFLFNBQVosQ0FBc0JXLE1BQXRDLEVBQThDLEtBQUtBLE1BQW5ELEVBQTJELElBQTNEO0FBQ0FiLElBQUFBLFdBQVcsQ0FBQzJKLEdBQVosQ0FBZ0IzSixXQUFXLENBQUNFLFNBQVosQ0FBc0JZLFFBQXRDLEVBQWdELEtBQUtDLFNBQXJELEVBQWdFLElBQWhFO0FBQ0FmLElBQUFBLFdBQVcsQ0FBQzJKLEdBQVosQ0FBZ0IzSixXQUFXLENBQUNFLFNBQVosQ0FBc0JjLFVBQXRDLEVBQWtELEtBQUtELFNBQXZELEVBQWtFLElBQWxFLEVBVlMsQ0FXVDtBQUNILEdBaHlCSSxDQWl5Qkw7QUFDQTtBQUNBO0FBRUE7O0FBcnlCSyxDQUFUIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdMQiA9IHJlcXVpcmUoXCJHbGJcIik7XG52YXIgcG9vbCA9IHJlcXVpcmUoXCJwb29sXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBjaGVzczogY2MuUHJlZmFiLFxuICAgICAgICBuZXh0U3RlcDogY2MuUHJlZmFiXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgcG9vbC5jcmVhdGVQcmVmYWJQb29sKHRoaXMuY2hlc3MpO1xuICAgICAgICBwb29sLmNyZWF0ZVByZWZhYlBvb2wodGhpcy5uZXh0U3RlcCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoaXMuc2hvd0NoZXNzQXJyID0gW107Ly/lrZjmo4vlrZBcbiAgICAgICAgLy8gdGhpcy5zaG93U3RlcEFyciA9IFtdO1xuICAgICAgICAvLyB0aGlzLmNoZXNzQm9hcmRMaXN0ID0gW1xuICAgICAgICAvLyAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICAvLyAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICAvLyAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICAvLyAgICAgWzAsIDAsIDAsIDBdXG4gICAgICAgIC8vIF07XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB0aGlzLmZQb3NMaXN0ID0gW107XG5cbiAgICAgICAgdGhpcy5jaGVzc0JvcmFkV2lkdGggPSB0aGlzLm5vZGUud2lkdGg7XG4gICAgICAgIHRoaXMuY2hlc3NCb3JhZEhlaWdodCA9IHRoaXMubm9kZS5oZWlnaHQ7XG4gICAgICAgIHRoaXMucm93cyA9IDQ7XG4gICAgICAgIHRoaXMuY29sdW1ucyA9IDQ7XG4gICAgICAgIHRoaXMubG9uZ1ggPSB0aGlzLmNoZXNzQm9yYWRXaWR0aCAvIHRoaXMuY29sdW1ucztcbiAgICAgICAgdGhpcy5sb25nWSA9IHRoaXMuY2hlc3NCb3JhZEhlaWdodCAvIHRoaXMucm93cztcblxuXG4gICAgICAgIC8v5Yid5aeL5YyW5qC85a2Q5Z2Q5qCHXG4gICAgICAgIGZvcih2YXIgeCA9IDA7eCA8dGhpcy5yb3dzOyB4Kyspe1xuICAgICAgICAgICAgdmFyIGFyZWFMaW5lID0gW107XG4gICAgICAgICAgICBmb3IodmFyIHkgPSAwOyB5IDwgdGhpcy5jb2x1bW5zOyB5Kyspe1xuICAgICAgICAgICAgICAgLy8gdmFyIHBvcyA9IGNjLnAoLXRoaXMuY2hlc3NCb3JhZFdpZHRoLzIgKyB5KnRoaXMubG9uZ1ggKyB0aGlzLmxvbmdYLzIsIHRoaXMuY2hlc3NCb3JhZEhlaWdodC8yIC0geCp0aGlzLmxvbmdZIC0gdGhpcy5sb25nWS8yKTtcbiAgICAgICAgICAgICAgICB2YXIgcG9zID0gY2MudjIoLXRoaXMuY2hlc3NCb3JhZFdpZHRoLzIgKyB5KnRoaXMubG9uZ1ggKyB0aGlzLmxvbmdYLzIsIHRoaXMuY2hlc3NCb3JhZEhlaWdodC8yIC0geCp0aGlzLmxvbmdZIC0gdGhpcy5sb25nWS8yICsgNSk7XG4gICAgICAgICAgICAgICAgYXJlYUxpbmVbeV0gPSBwb3M7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZQb3NMaXN0LnB1c2goYXJlYUxpbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG5cbiAgICAgICAgLy8gVE9ETyDliqDovb3lo7Dpn7PvvJtcbiAgICAgICAgdGhpcy5tYXBQYXJhbTAxID0gbnVsbDtcbiAgICAgICAgdGhpcy5tYXBQYXJhbTAyID0gbnVsbDtcblxuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUubWFwSW5pdCwgdGhpcy5tYXBJbml0RXZlbnQsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUuZWF0Rm9yQ2hlc3MsIHRoaXMuZWF0Rm9yQ2hlc3NFdmVudCwgdGhpcylcbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLmVhdEZvck90aGVyLCB0aGlzLmVhdEZvck90aGVyLCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLm9wZW5Gb3JPdGhlciwgdGhpcy5vcGVuRm9yT3RoZXIsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUub3BlbkNoZXNzUGllY2UsIHRoaXMub3BlbkNoZXNzUGllY2VFdmVudCwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9uKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5jaGVja01vdmVEaXJlY3Rpb24sIHRoaXMuY2hlY2tNb3ZlRGlyZWN0aW9uLCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLmlzR2FtZU92ZXIsIHRoaXMuaXNHYW1lT3ZlciwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9uKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5nZXRNYXAsIHRoaXMuZ2V0TWFwLCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLmdhbWVPdmVyLCB0aGlzLm92ZXJDbGVhciwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9uKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5jbGVhckNoZXNzLCB0aGlzLm92ZXJDbGVhciwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLCB0aGlzLnRvdWNoQm9hcmRFdmVudCwgdGhpcyk7XG4gICAgICAgIC8vdGhpcy5nZXRNYXAoKTtcbiAgICB9LFxuXG4gICAgaW5pdCAoKSB7XG4gICAgICAgIHRoaXMuc2hvd0NoZXNzQXJyID0gW107Ly/lrZjmo4vlrZBcbiAgICAgICAgdGhpcy5zaG93U3RlcEFyciA9IFtdO1xuICAgICAgICB0aGlzLmNoZXNzQm9hcmRMaXN0ID0gW1xuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDAsIDBdXG4gICAgICAgIF07XG4gICAgfSxcblxuICAgIG92ZXJDbGVhciAoKSB7XG4gICAgICAgIHRoaXMubWFwUGFyYW0wMSA9IG51bGw7XG4gICAgICAgIHRoaXMubWFwUGFyYW0wMiAgPSBudWxsO1xuICAgICAgICB0aGlzLm9sZENoZXNzTm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuY2hlc3NCb2FyZExpc3QgPSBbXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMCwgMF1cbiAgICAgICAgXTtcbiAgICAgICAgdmFyIGNoaWxkcmVuTm9kZXMgPSB0aGlzLm5vZGUuY2hpbGRyZW47XG4gICAgICAgIGZvciAoY29uc3QgdmFsIG9mIGNoaWxkcmVuTm9kZXMpICB7XG4gICAgICAgICAgICB2YWwuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVBbGxDaGlsZHJlbigpO1xuXG4gICAgfSxcblxuICAgIHRvdWNoQm9hcmRFdmVudCAoZXZlbnQpIHtcbiAgICAgICAgaWYgKEdhbWUuR2FtZU1hbmFnZXIuZ2FtZVN0YXRlICE9PSBHYW1lU3RhdGUuUGxheSkgcmV0dXJuO1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZShldmVudC5nZXRMb2NhdGlvbigpKTtcbiAgICAgICAgdmFyIGNsaWNrUG9zID0ge3g6IHBvcy55L3RoaXMubG9uZ1ksXG4gICAgICAgICAgICB5OnBvcy54L3RoaXMubG9uZ1h9O1xuICAgICAgICBpZiAoY2xpY2tQb3MueSUxIDwgMC4yNSB8fCBjbGlja1Bvcy55JTEgPjAuNyB8fCBjbGlja1Bvcy54JTEgPCAwLjI1IHx8IGNsaWNrUG9zLnglMSA+MC43ICkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlnKjnlYzlpJZcIik7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5vbGRDaGVzc05vZGUpIHtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm9sZENoZXNzTm9kZS5jbGVhckRpcmVjdGlvbih0cnVlKTtcbiAgICAgICAgICAgIC8vICAgICB0aGlzLm9sZENoZXNzTm9kZS5hbmltYXRQdXREb3duKCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsaWNrUG9zID0ge3g6MyAtIHBhcnNlSW50KGNsaWNrUG9zLngpLHk6cGFyc2VJbnQoY2xpY2tQb3MueSl9O1xuICAgICAgICAvLyB2YXIgbW92ZVRhZyA9IGNsaWNrUG9zLnggKiA0ICsgY2xpY2tQb3MueTtcbiAgICAgICAgdmFyIG1vdmVUYWc7XG4gICAgICAgIGlmICh0aGlzLmNoZXNzTW92ZSA9PT0gdHJ1ZSl7XG4gICAgICAgICAgICBtb3ZlVGFnID0ge3g6cGFyc2VJbnQodGhpcy5vbGRDaGVzcy5zaWduIC8gNCkseTpwYXJzZUludCh0aGlzLm9sZENoZXNzLnNpZ24gJSA0KX07XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmxlZnQpIHtcbiAgICAgICAgICAgICAgICBpZiAobW92ZVRhZy55IC0gMSA9PT0gY2xpY2tQb3MueSAmJiBtb3ZlVGFnLnggPT09IGNsaWNrUG9zLngpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRFYXRmdW4odGhpcy5vbGRDaGVzcy5zaWduLG51bGwsLTEsY2xpY2tQb3MpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn+enu+WKqFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnJpZ2h0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vdmVUYWcueSArIDEgPT09IGNsaWNrUG9zLnkgJiYgbW92ZVRhZy54ID09PSBjbGlja1Bvcy54KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RWF0ZnVuKHRoaXMub2xkQ2hlc3Muc2lnbixudWxsLDEsY2xpY2tQb3MpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn+enu+WKqFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnVwKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vdmVUYWcueCAgLSAxID09PSBjbGlja1Bvcy54ICYmIG1vdmVUYWcueSA9PT0gY2xpY2tQb3MueSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEVhdGZ1bih0aGlzLm9sZENoZXNzLnNpZ24sbnVsbCwtNCxjbGlja1Bvcyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5oiQ5Yqf56e75YqoXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuZG93bikge1xuICAgICAgICAgICAgICAgIGlmIChtb3ZlVGFnLnggICsgMSAgPT09IGNsaWNrUG9zLnggJiYgbW92ZVRhZy55ID09PSBjbGlja1Bvcy55KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RWF0ZnVuKHRoaXMub2xkQ2hlc3Muc2lnbixudWxsLDQsY2xpY2tQb3MpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaIkOWKn+enu+WKqFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZWF0Rm9yQ2hlc3NFdmVudCAoc3RlcE5vZGUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNoZXNzTW92ZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmVhdEZvckNoZXNzKHN0ZXBOb2RlKTtcbiAgICB9LFxuXG4gICAgb3BlbkNoZXNzUGllY2VFdmVudCAoc3RlcE5vZGUpIHtcbiAgICAgICAgaWYgKHRoaXMub2xkQ2hlc3NOb2RlKSB7XG4gICAgICAgICAgICB0aGlzLm9sZENoZXNzTm9kZS5jbGVhckRpcmVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5vbGRDaGVzc05vZGUuYW5pbWF0UHV0RG93bigpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1hcEluaXRFdmVudCAoZGF0YSkge1xuICAgICAgICBpZihkYXRhLnNob3dDaGVzc0luZm8pIHtcbiAgICAgICAgICAgIHRoaXMubWFwUGFyYW0wMSA9IGRhdGEuc2hvd0NoZXNzSW5mbztcbiAgICAgICAgfSBlbHNlIGlmKGRhdGEuY2hlc3NCb2FyZExpc3Qpe1xuICAgICAgICAgICAgdGhpcy5tYXBQYXJhbTAyID0gZGF0YS5jaGVzc0JvYXJkTGlzdDtcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1hcFBhcmFtMDEgJiYgdGhpcy5tYXBQYXJhbTAyKSB7XG4gICAgICAgICAgICB2YXIgcGFyYW0gPSB7XG4gICAgICAgICAgICAgICAgc2hvd0NoZXNzSW5mbzogdGhpcy5tYXBQYXJhbTAxLFxuICAgICAgICAgICAgICAgIGNoZXNzQm9hcmRMaXN0OiB0aGlzLm1hcFBhcmFtMDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWFwSW5pdChwYXJhbSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbWFwSW5pdCAoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKui/memHjOaYr21hcEluaXQqKioqKioqKionKTtcbiAgICAgICAgaWYoR0xCLmlzUm9vbU93bmVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2hvd0NoZXNzQXJyID0gW107XG4gICAgICAgIHRoaXMuc2hvd1N0ZXBBcnIgPSBbXVxuICAgICAgICB2YXIgc2hvd0NoZXNzSW5mbyA9IGRhdGFbXCJzaG93Q2hlc3NJbmZvXCJdO1xuICAgICAgICB0aGlzLmNoZXNzQm9hcmRMaXN0ID0gZGF0YS5jaGVzc0JvYXJkTGlzdDtcbiAgICAgICAgZm9yKHZhciBqID0gMDtqIDwgc2hvd0NoZXNzSW5mby5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICB2YXIgY2hlc3NOb2RlID0gcG9vbC5nZXRQcmVmYWIodGhpcy5jaGVzcy5uYW1lKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChjaGVzc05vZGUpO1xuICAgICAgICAgICAgY2hlc3NOb2RlLnNldFBvc2l0aW9uKHNob3dDaGVzc0luZm9bal0ucG9zKTtcbiAgICAgICAgICAgIGNoZXNzTm9kZS5zaWduID0gc2hvd0NoZXNzSW5mb1tqXS5zaWduO1xuICAgICAgICAgICAgdmFyIGNoZXNzU2NyaXB0ID0gY2hlc3NOb2RlLmdldENvbXBvbmVudCh0aGlzLmNoZXNzLm5hbWUpO1xuICAgICAgICAgICAgdGhpcy5zaG93Q2hlc3NBcnIucHVzaChjaGVzc05vZGUpO1xuICAgICAgICAgICAgY2hlc3NTY3JpcHQuc2V0Q2hlc3NUeXBlKHNob3dDaGVzc0luZm9bal0udHlwZSwgc2hvd0NoZXNzSW5mb1tqXS5pbmRleCk7XG5cbiAgICAgICAgICAgIHZhciBzdGVwTm9kZSA9IHBvb2wuZ2V0UHJlZmFiKHRoaXMubmV4dFN0ZXAubmFtZSk7XG4gICAgICAgICAgICB2YXIgc3RlcFNjcmlwID0gc3RlcE5vZGUuZ2V0Q29tcG9uZW50KHRoaXMubmV4dFN0ZXAubmFtZSk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQoc3RlcE5vZGUpO1xuICAgICAgICAgICAgc3RlcFNjcmlwLnNldENoZXNzVHlwZShzaG93Q2hlc3NJbmZvW2pdLnR5cGUsIHNob3dDaGVzc0luZm9bal0uaW5kZXgpO1xuICAgICAgICAgICAgc3RlcE5vZGUuc2V0UG9zaXRpb24oc2hvd0NoZXNzSW5mb1tqXS5wb3MpO1xuICAgICAgICAgICAgc3RlcE5vZGUuc2lnbiA9IHNob3dDaGVzc0luZm9bal0uc2lnbjtcbiAgICAgICAgICAgIHRoaXMuc2hvd1N0ZXBBcnIucHVzaChzdGVwTm9kZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0TWFwICgpIHtcbiAgICAgICAgLy8g5Li75py655Sf5oiQ5Zyw5Zu+5pWw5o2u77ybXG4gICAgICAgIGlmKCFHTEIuaXNSb29tT3duZXIpIHJldHVybjtcbiAgICAgICAgLy8gLy8g5YWI5riF56m65qOL5a2Q5pWw5o2u77yI5Li75py65LiN5Lya5pS25Yiw77yJ77ybXG4gICAgICAgIC8vIHZhciBjaGVzc01zZyA9IHtcbiAgICAgICAgLy8gICAgIGFjdGlvbjogR0xCLkNMRUFSX0NIRVNTLFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIEdhbWUuR2FtZU1hbmFnZXIuc2VuZEV2ZW50KGNoZXNzTXNnKVxuXG4gICAgICAgIHRoaXMuc2hvd0NoZXNzSW5mbyA9IFtdO1xuICAgICAgICB0aGlzLnNob3dDaGVzc0FyciA9IFtdO1xuICAgICAgICB0aGlzLnNob3dTdGVwQXJyID0gW107XG4gICAgICAgIHZhciBibHVlQ2hlc3NQaWVjZXNBcnIgPSBbMSwyLDMsNCw1LDYsNyw4XTtcbiAgICAgICAgdmFyIHJlZENoZXNzUGllY2VzQXJyID0gWzExLDEyLDEzLDE0LDE1LDE2LDE3LDE4XTtcblxuICAgICAgICBmb3IodmFyIGogPSAwO2ogPHRoaXMucm93czsgaisrKXtcbiAgICAgICAgICAgIGZvcih2YXIgayA9IDA7IGsgPCB0aGlzLmNvbHVtbnM7IGsrKyl7XG4gICAgICAgICAgICAgICAgdmFyIGNoZXNzTm9kZSA9IHBvb2wuZ2V0UHJlZmFiKHRoaXMuY2hlc3MubmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGNoZXNzTm9kZSk7XG4gICAgICAgICAgICAgICAgY2hlc3NOb2RlLnNldFBvc2l0aW9uKHRoaXMuZlBvc0xpc3Rbal1ba10pO1xuICAgICAgICAgICAgICAgIGNoZXNzTm9kZS5zaWduID0gaip0aGlzLmNvbHVtbnMgKyBrO1xuICAgICAgICAgICAgICAgIHZhciBjaGVzc1NjcmlwdCA9IGNoZXNzTm9kZS5nZXRDb21wb25lbnQodGhpcy5jaGVzcy5uYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDaGVzc0Fyci5wdXNoKGNoZXNzTm9kZSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RlcE5vZGUgPSBwb29sLmdldFByZWZhYih0aGlzLm5leHRTdGVwLm5hbWUpO1xuICAgICAgICAgICAgICAgIHZhciBzdGVwTm9kZVNjcmlwID1zdGVwTm9kZS5nZXRDb21wb25lbnQodGhpcy5uZXh0U3RlcC5uYW1lKTtcblxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChzdGVwTm9kZSk7XG4gICAgICAgICAgICAgICAgc3RlcE5vZGUuc2V0UG9zaXRpb24odGhpcy5mUG9zTGlzdFtqXVtrXSk7XG4gICAgICAgICAgICAgICAgc3RlcE5vZGUuc2lnbiA9IGoqdGhpcy5jb2x1bW5zICsgaztcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTdGVwQXJyLnB1c2goc3RlcE5vZGUpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNoZXNzSW5mbyA9IHtwb3M6dGhpcy5mUG9zTGlzdFtqXVtrXSwgc2lnbjpjaGVzc05vZGUuc2lnbn07XG4gICAgICAgICAgICAgICAgdmFyIHh4ID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgICAgICAgICBpZih4eCA+PSAwLjUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihibHVlQ2hlc3NQaWVjZXNBcnIubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlZENoZXNzUGllY2VzQXJyLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnJlZENoZXNzUGllY2VzQXJyLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVzc1NjcmlwdC5zZXRDaGVzc1R5cGUoR0xCLlBMQVlFUl9GTEFHLlJFRCwgcmVkQ2hlc3NQaWVjZXNBcnJbaW5kZXhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ZXBOb2RlU2NyaXAuc2V0Q2hlc3NUeXBlKEdMQi5QTEFZRVJfRkxBRy5SRUQsIHJlZENoZXNzUGllY2VzQXJyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVzc0luZm8udHlwZSA9IEdMQi5QTEFZRVJfRkxBRy5SRUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVzc0luZm8uaW5kZXggPSByZWRDaGVzc1BpZWNlc0FycltpbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZXNzQm9hcmRMaXN0W2pdW2tdID0gcmVkQ2hlc3NQaWVjZXNBcnJbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVkQ2hlc3NQaWVjZXNBcnIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpibHVlQ2hlc3NQaWVjZXNBcnIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZXNzU2NyaXB0LnNldENoZXNzVHlwZShHTEIuUExBWUVSX0ZMQUcuQkxVRSwgYmx1ZUNoZXNzUGllY2VzQXJyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZVNjcmlwLnNldENoZXNzVHlwZShHTEIuUExBWUVSX0ZMQUcuQkxVRSwgYmx1ZUNoZXNzUGllY2VzQXJyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVzc0luZm8udHlwZSA9IEdMQi5QTEFZRVJfRkxBRy5CTFVFO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlc3NJbmZvLmluZGV4ID0gYmx1ZUNoZXNzUGllY2VzQXJyW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NCb2FyZExpc3Rbal1ba10gPSBibHVlQ2hlc3NQaWVjZXNBcnJbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmx1ZUNoZXNzUGllY2VzQXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHh4IDwgMC41KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVkQ2hlc3NQaWVjZXNBcnIubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGJsdWVDaGVzc1BpZWNlc0Fyci5sZW5ndGggPT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpibHVlQ2hlc3NQaWVjZXNBcnIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZXNzU2NyaXB0LnNldENoZXNzVHlwZShHTEIuUExBWUVSX0ZMQUcuQkxVRSwgYmx1ZUNoZXNzUGllY2VzQXJyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZVNjcmlwLnNldENoZXNzVHlwZShHTEIuUExBWUVSX0ZMQUcuQkxVRSwgYmx1ZUNoZXNzUGllY2VzQXJyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVzc0luZm8udHlwZSA9IEdMQi5QTEFZRVJfRkxBRy5CTFVFO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlc3NJbmZvLmluZGV4ID0gYmx1ZUNoZXNzUGllY2VzQXJyW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NCb2FyZExpc3Rbal1ba10gPSBibHVlQ2hlc3NQaWVjZXNBcnJbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmx1ZUNoZXNzUGllY2VzQXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpyZWRDaGVzc1BpZWNlc0Fyci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlc3NTY3JpcHQuc2V0Q2hlc3NUeXBlKEdMQi5QTEFZRVJfRkxBRy5SRUQsIHJlZENoZXNzUGllY2VzQXJyW2luZGV4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZVNjcmlwLnNldENoZXNzVHlwZShHTEIuUExBWUVSX0ZMQUcuUkVELCByZWRDaGVzc1BpZWNlc0FycltpbmRleF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlc3NJbmZvLnR5cGUgPSBHTEIuUExBWUVSX0ZMQUcuUkVEO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlc3NJbmZvLmluZGV4ID0gcmVkQ2hlc3NQaWVjZXNBcnJbaW5kZXhdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVzc0JvYXJkTGlzdFtqXVtrXSA9IHJlZENoZXNzUGllY2VzQXJyW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZENoZXNzUGllY2VzQXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnNob3dDaGVzc0luZm8ucHVzaChjaGVzc0luZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE8g5rS+5Y+R5LqL5Lu2XG4gICAgICAgIHZhciBtc2cgPSB7XG4gICAgICAgICAgICBhY3Rpb246IEdMQi5TRU5EX01BUF9JTkZPLFxuICAgICAgICAgICAgc2hvd0NoZXNzSW5mbzogdGhpcy5zaG93Q2hlc3NJbmZvLFxuICAgICAgICAgICAgLy8gY2hlc3NCb2FyZExpc3Q6IHRoaXMuY2hlc3NCb2FyZExpc3RcbiAgICAgICAgICAgIC8vIG1hcEluZm86IHtcbiAgICAgICAgICAgIC8vICAgICBzaG93Q2hlc3NJbmZvOiB0aGlzLnNob3dDaGVzc0luZm8sXG4gICAgICAgICAgICAvLyAgICAgY2hlc3NCb2FyZExpc3Q6IHRoaXMuY2hlc3NCb2FyZExpc3RcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5zZW5kRXZlbnRFeChtc2cpO1xuICAgICAgICB2YXIgbXNnMDIgPSB7XG4gICAgICAgICAgICBhY3Rpb246IEdMQi5TRU5EX01BUF9JTkZPLFxuICAgICAgICAgICAgY2hlc3NCb2FyZExpc3Q6IHRoaXMuY2hlc3NCb2FyZExpc3QsXG4gICAgICAgIH1cbiAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5zZW5kRXZlbnRFeChtc2cwMilcbiAgICB9LFxuXG4gICAgY2hlY2tNb3ZlRGlyZWN0aW9uIChwYXJhbSkge1xuICAgICAgICB2YXIgc3RlcE5vZGUgPSBwYXJhbS5ub2RlIDtcbiAgICAgICAgdmFyIG1vdmUgPSBwYXJhbS5tb3ZlO1xuICAgICAgICB2YXIgY2IgPSBwYXJhbS5jYWxsYmFjaztcbiAgICAgICAgaWYgKHRoaXMub2xkQ2hlc3NOb2RlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vbGRDaGVzc05vZGUuZ2V0QW5pbWF0ZVN0ZXAoKSkge1xuICAgICAgICAgICAgICAgIHN0ZXBOb2RlLmdldENvbXBvbmVudCh0aGlzLm5leHRTdGVwLm5hbWUpLmNsZWFyTW92ZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZXNzTW92ZSA9IG1vdmU7Ly/kuLp0cnVl5pe25piv5ou/6LW35qOL5a2QXG4gICAgICAgIGlmICh0aGlzLm9sZFRhZyAhPT0gc3RlcE5vZGUuc2lnbikge1xuICAgICAgICAgICAgaWYgKHRoaXMub2xkU3RlcE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZFN0ZXBOb2RlLmdldENvbXBvbmVudCh0aGlzLm5leHRTdGVwLm5hbWUpLmNsZWFyTW92ZSgpO1xuICAgICAgICAgICAgICAgdGhpcy5vbGRTdGVwTm9kZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY2hlc3NNb3ZlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmlL7kuIvmo4vlrZBcIik7XG4gICAgICAgICAgICBpZiAodGhpcy5vbGRDaGVzc05vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZENoZXNzTm9kZS5jbGVhckRpcmVjdGlvbigpO1xuICAgICAgICAgICAgICAgIHRoaXMub2xkQ2hlc3NOb2RlLmFuaW1hdFB1dERvd24oKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9sZENoZXNzTm9kZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGF0YSA9e2xlZnQ6ZmFsc2UscmlnaHQ6ZmFsc2UsdXA6ZmFsc2UsZG93bjpmYWxzZX07XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIGlmICh0aGlzLm9sZENoZXNzTm9kZSkge1xuICAgICAgICAgICAgdGhpcy5vbGRDaGVzc05vZGUuY2xlYXJEaXJlY3Rpb24odHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLm9sZENoZXNzTm9kZS5hbmltYXRQdXREb3duKCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHZhciB0YWcgPSBzdGVwTm9kZS5zaWduO1xuICAgICAgICB0aGlzLm9sZFRhZyA9IHRhZztcbiAgICAgICAgdmFyIHggPSBNYXRoLmZsb29yKHRhZy90aGlzLmNvbHVtbnMpO1xuICAgICAgICB2YXIgeSA9IHRhZyV0aGlzLmNvbHVtbnM7XG4gICAgICAgIGlmKHkgLSAxID49IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIHRoaXMuY2hlY2tMZWZ0KCk7XG4gICAgICAgICAgICB2YXIgZW5lbXlDaGVzcyA9IHRoaXMuY2hlc3NCb2FyZExpc3RbcGFyc2VJbnQoKHRhZyAtIDEpLzQpXVsodGFnIC0gMSklNF07XG4gICAgICAgICAgICB2YXIgb3duZXJDaGVzcyA9IHRoaXMuY2hlc3NCb2FyZExpc3RbcGFyc2VJbnQoKHRhZykvNCldWyh0YWcpJTRdO1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuaXNDYW5FYXRDaGVzcyhlbmVteUNoZXNzLG93bmVyQ2hlc3MsIGRhdGEsIFwibGVmdFwiKTtcblxuICAgICAgICB9XG4gICAgICAgIGlmKHkrMSA8PSB0aGlzLmNvbHVtbnMgLSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB0aGlzLmNoZWNrUmlnaHQoKTtcbiAgICAgICAgICAgIHZhciBlbmVteUNoZXNzID0gdGhpcy5jaGVzc0JvYXJkTGlzdFtwYXJzZUludCgodGFnICsgMSkvNCldWyh0YWcgKyAxKSU0XTtcbiAgICAgICAgICAgIHZhciBvd25lckNoZXNzID0gdGhpcy5jaGVzc0JvYXJkTGlzdFtwYXJzZUludCgodGFnKS80KV1bKHRhZyklNF07XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5pc0NhbkVhdENoZXNzKGVuZW15Q2hlc3Msb3duZXJDaGVzcywgZGF0YSxcInJpZ2h0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHgtMSA+PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyB0aGlzLmNoZWNrVXAoKTtcbiAgICAgICAgICAgIHZhciBlbmVteUNoZXNzID0gdGhpcy5jaGVzc0JvYXJkTGlzdFtwYXJzZUludCgodGFnIC0gNCkvNCldWyh0YWcgLSA0KSU0XTtcbiAgICAgICAgICAgIHZhciBvd25lckNoZXNzID0gdGhpcy5jaGVzc0JvYXJkTGlzdFtwYXJzZUludCgodGFnKS80KV1bKHRhZyklNF07XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5pc0NhbkVhdENoZXNzKGVuZW15Q2hlc3Msb3duZXJDaGVzcywgZGF0YSxcInVwXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHgrMSA8PSB0aGlzLnJvd3MgLSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZW5lbXlDaGVzcyA9IHRoaXMuY2hlc3NCb2FyZExpc3RbcGFyc2VJbnQoKHRhZyArIDQpLzQpXVsodGFnICsgNCklNF07XG4gICAgICAgICAgICB2YXIgb3duZXJDaGVzcyA9IHRoaXMuY2hlc3NCb2FyZExpc3RbcGFyc2VJbnQoKHRhZykvNCldWyh0YWcpJTRdO1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuaXNDYW5FYXRDaGVzcyhlbmVteUNoZXNzLG93bmVyQ2hlc3MsIGRhdGEsXCJkb3duXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXJyZW50Q2hlc3NOb2RlID0gdGhpcy5nZXRDaGVzc05vZGVCeVRhZyh0YWcpO1xuICAgICAgICB0aGlzLm9sZFN0ZXBOb2RlID0gdGhpcy5nZXRTdGVwTm9kZUJ5VGFnKHRhZyk7XG4gICAgICAgIHRoaXMub2xkQ2hlc3MgPSB0aGlzLmN1cnJlbnRDaGVzc05vZGU7XG4gICAgICAgIHRoaXMub2xkQ2hlc3NOb2RlID0gdGhpcy5jdXJyZW50Q2hlc3NOb2RlLmdldENvbXBvbmVudCh0aGlzLmN1cnJlbnRDaGVzc05vZGUubmFtZSk7XG4gICAgICAgIHRoaXMub2xkQ2hlc3NOb2RlLnNldE1vdmVEaXJlY3Rpb24oZGF0YSxjYik7XG4gICAgfSxcblxuICAgIC8v5Yik5pat5a2Q57KS5aSn5bCPXG4gICAgaXNDYW5FYXRDaGVzczpmdW5jdGlvbihlbmVteUNoZXNzLG93bmVyQ2hlc3MsIGRhdGEsIHBhcm0pIHtcbiAgICAgICAgaWYgKChwYXJzZUludChlbmVteUNoZXNzLzEwKSAhPT0gcGFyc2VJbnQob3duZXJDaGVzcy8xMCkpIHx8IChlbmVteUNoZXNzID09PSAwKSkge1xuICAgICAgICAgICAgaWYgKGVuZW15Q2hlc3MgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkYXRhW3Bhcm1dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkYXRhW1wibGFyZ2VUaGFuXCIgKyBwYXJtXSA9IHRydWU7Ly9cbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0YWcgPSB0aGlzLmdldFRhZ0J5SW5kZXgoZW5lbXlDaGVzcykuc2lnbjtcbiAgICAgICAgICAgIHZhciBzdGVwTm9kZSA9IHRoaXMuZ2V0U3RlcE5vZGVCeVRhZyh0YWcpO1xuICAgICAgICAgICAgdmFyIHN0ZXBOb2RlU2NyaXAgPSBzdGVwTm9kZS5nZXRDb21wb25lbnQodGhpcy5uZXh0U3RlcC5uYW1lKTtcbiAgICAgICAgICAgIGlmICghc3RlcE5vZGVTY3JpcC5nZXRJc09wZW4oKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YVtwYXJtXSA9IHRydWU7XG4gICAgICAgICAgICBpZiAoZW5lbXlDaGVzcyAlIDEwID4gb3duZXJDaGVzcyAlIDEwKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtcImxhcmdlVGhhblwiICsgcGFybV0gPSBmYWxzZTsvL1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhW1wibGFyZ2VUaGFuXCIgKyBwYXJtXSA9IHRydWU7Ly9cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVuZW15Q2hlc3MgJSAxMCA9PT0gOCAmJiBvd25lckNoZXNzICUgMTAgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkYXRhW1wibGFyZ2VUaGFuXCIgKyBwYXJtXSA9IHRydWU7Ly9cbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3duZXJDaGVzcyAlIDEwID09PSA4ICYmIGVuZW15Q2hlc3MgJSAxMCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRhdGFbXCJsYXJnZVRoYW5cIiArIHBhcm1dID0gZmFsc2U7Ly9cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG5cbiAgICBlYXRGb3JDaGVzczpmdW5jdGlvbihpc0VhdENoZXNzKSB7XG4gICAgICAgIGlmICghdGhpcy5jaGVzc01vdmUpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLm9sZENoZXNzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9sZFRhZyA9IHRoaXMub2xkQ2hlc3Muc2lnbjtcbiAgICAgICAgaWYodGhpcy5kYXRhLmxlZnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb2xkVGFnICE9PSBcInVuZGVmaW5lZFwiICYmICgoaXNFYXRDaGVzcy5zaWduICsgMSkgPT09IG9sZFRhZykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVhdGZ1bihvbGRUYWcsaXNFYXRDaGVzcy5zaWduLC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmRhdGEucmlnaHQpXG4gICAgICAgIHtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbGRUYWcgIT09IFwidW5kZWZpbmVkXCIgJiYgKGlzRWF0Q2hlc3Muc2lnbiAtIDEgPT09IG9sZFRhZykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVhdGZ1bihvbGRUYWcsaXNFYXRDaGVzcy5zaWduLDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZGF0YS51cClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbGRUYWcgIT09IFwidW5kZWZpbmVkXCIgJiYgKGlzRWF0Q2hlc3Muc2lnbiArIDQgPT09IG9sZFRhZykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVhdGZ1bihvbGRUYWcsaXNFYXRDaGVzcy5zaWduLC00KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmRhdGEuZG93bilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvbGRUYWcgIT09IFwidW5kZWZpbmVkXCIgJiYgKGlzRWF0Q2hlc3Muc2lnbiAtIDQgPT09IG9sZFRhZykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVhdGZ1bihvbGRUYWcsaXNFYXRDaGVzcy5zaWduLDQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGVhdEZvck90aGVyIChkYXRhKSB7XG4gICAgICAgIGlmIChkYXRhLmVhdFRhZyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lYXRPdGhlcihkYXRhLm9sZFRhZyxkYXRhLmVhdFRhZyxkYXRhLnNpZ24pO1xuICAgICAgICAgICAgdXNlci5zdGVwSWZFYXRPck9wZW4oMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVUb0tvbmcoZGF0YS5vbGRUYWcsZGF0YS5zaWduLGRhdGEuY2xpY2tQb3MpO1xuICAgICAgICAgICAgdXNlci5zdGVwSWZFYXRPck9wZW4oMyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb3BlbkZvck90aGVyICh0YWcpIHtcbiAgICAgICAgdmFyIHN0ZXBOb2RlID0gdGhpcy5nZXRTdGVwTm9kZUJ5VGFnKHRhZyk7XG4gICAgICAgIHZhciBjaGVzc05vZGUgPSB0aGlzLmdldENoZXNzTm9kZUJ5VGFnKHRhZyk7XG4gICAgICAgIHZhciBzdGVwTm9kZVNjcmlwID0gc3RlcE5vZGUuZ2V0Q29tcG9uZW50KHRoaXMubmV4dFN0ZXAubmFtZSk7XG4gICAgICAgIHZhciBjaGVzc05vZGVTY3JpcCA9IGNoZXNzTm9kZS5nZXRDb21wb25lbnQodGhpcy5jaGVzcy5uYW1lKTtcbiAgICAgICAgaWYoc3RlcE5vZGVTY3JpcC5pc09wZW4pIHJldHVybjtcbiAgICAgICAgc3RlcE5vZGVTY3JpcC5vcGVuQ2hlc3NQaWVjZSgpO1xuICAgICAgICBjaGVzc05vZGVTY3JpcC5vcGVuQ2hlc3NQaWVjZSgpO1xuICAgIH0sXG5cbiAgICBzZXRFYXRmdW46ZnVuY3Rpb24ob2xkVGFnLGVhdFRhZyx0YWcsY2xpY2tQb3Mpe1xuICAgICAgICBpZiAoZWF0VGFnICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIHZhciBtc2cgPSB7YWN0aW9uOiBHTEIuQ0hBTkdFX0ZMQUd9O1xuICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5zZW5kRXZlbnRFeChtc2cpO1xuICAgICAgICAgICAgLy8gdXNlci5pc015VHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lYXRPdGhlcihvbGRUYWcsZWF0VGFnLHRhZyk7Ly/lkIPmlYzmlrlcbiAgICAgICAgICAgIHVzZXIuc3RlcElmRWF0T3JPcGVuKDEpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB1c2VyLmlzTXlUdXJuID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHZhciBtc2cgPSB7YWN0aW9uOiBHTEIuQ0hBTkdFX0ZMQUd9O1xuICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5zZW5kRXZlbnRFeChtc2cpO1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG9Lb25nKG9sZFRhZyx0YWcsY2xpY2tQb3MpOy8v6LWw56m65ZywXG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hlc3NNb3ZlID0gZmFsc2U7XG5cbiAgICAgICAgLy8g5Y+R6YCB6KKr5ZCD55qE5raI5oGvXG4gICAgICAgIC8vIHVzZXIuc2VuZEdhbWVEYXRhKHVzZXIuZ2FtZURhdGFQcm90by5lYXRPdGhlciwge1xuICAgICAgICAvLyAgICAgb2xkVGFnOm9sZFRhZyxlYXRUYWc6ZWF0VGFnLHRhZzp0YWcsY2xpY2tQb3M6Y2xpY2tQb3NcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIHZhciBtc2cgPSB7XG4gICAgICAgICAgICBhY3Rpb246IEdMQi5FQVRfRk9SX09USEVSLFxuICAgICAgICAgICAgZWF0SW5mbzoge1xuICAgICAgICAgICAgICAgIG9sZFRhZzogb2xkVGFnLGVhdFRhZzogZWF0VGFnLHNpZ246IHRhZyxjbGlja1BvczogY2xpY2tQb3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5zZW5kRXZlbnQobXNnKTtcblxuICAgICAgICBpZiAoZWF0VGFnID09PSBudWxsKSB7XG4gICAgICAgICAgICB1c2VyLnN0ZXBJZkVhdE9yT3BlbigzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBtb3ZlVG9Lb25nOmZ1bmN0aW9uKG9sZENoZXNzLGFkZFRhZyxjbGlja1Bvcykge1xuICAgICAgICB0aGlzLmNoZXNzQm9hcmRMaXN0W3BhcnNlSW50KG9sZENoZXNzLzQpXVtwYXJzZUludChvbGRDaGVzcyU0KV0gPSAwO1xuICAgICAgICB2YXIgb2xkQ2hlc3NOb2RlID0gdGhpcy5nZXRDaGVzc05vZGVCeVRhZyhvbGRDaGVzcyk7XG4gICAgICAgIHZhciBvbGRTdGVwTm9kZSA9IHRoaXMuZ2V0U3RlcE5vZGVCeVRhZyhvbGRDaGVzcyk7XG4gICAgICAgIG9sZENoZXNzTm9kZS5zaWduICs9IGFkZFRhZztcbiAgICAgICAgb2xkU3RlcE5vZGUuc2lnbiArPSBhZGRUYWc7XG4gICAgICAgIHZhciBvbGRDaGVzc1NjcmlwID0gb2xkQ2hlc3NOb2RlLmdldENvbXBvbmVudCh0aGlzLmNoZXNzLm5hbWUpO1xuICAgICAgICB2YXIgb2xkU3RlcE5vZGVTY3JpcCA9IG9sZFN0ZXBOb2RlLmdldENvbXBvbmVudCh0aGlzLm5leHRTdGVwLm5hbWUpO1xuICAgICAgICBsZXQgeSA9IGNsaWNrUG9zLnk7XG4gICAgICAgIGxldCB4ID0gY2xpY2tQb3MueDtcbiAgICAgICAgdmFyIHBvcyA9IGNjLnYyKC10aGlzLmNoZXNzQm9yYWRXaWR0aC8yICsgeSp0aGlzLmxvbmdYICsgdGhpcy5sb25nWC8yLCB0aGlzLmNoZXNzQm9yYWRIZWlnaHQvMiAtIHgqdGhpcy5sb25nWSAtIHRoaXMubG9uZ1kvMik7XG4gICAgICAgIC8vIG9sZENoZXNzU2NyaXAuZ2V0Tm9kZSgpLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgIG9sZENoZXNzU2NyaXAuZ2V0Tm9kZSgpLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgIHZhciBjYWxsRiA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHVzZXIuc2V0QXVkaW8oXCJwaWVjZUNsaWNrXCIpO1xuICAgICAgICAgICAgdGhpcy5jbGVhck9sZENoZXNzTm9kZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIG9sZFN0ZXBOb2RlU2NyaXAuZ2V0Tm9kZSgpLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVzc0JvYXJkTGlzdFtjbGlja1Bvcy54XVtjbGlja1Bvcy55XSA9IG9sZENoZXNzU2NyaXAuaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIHRoaXMuaXNHYW1lT3ZlcigpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgb2xkQ2hlc3NTY3JpcC5nZXROb2RlKCkucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygwLjIscG9zKSxjYWxsRikpO1xuICAgICAgICAvLyBvbGRDaGVzc1NjcmlwLmdldE5vZGUoKS5ydW5BY3Rpb24oY2MubW92ZVRvKDAuMixwb3MpKTtcbiAgICB9LFxuXG4gICAgZWF0T3RoZXI6ZnVuY3Rpb24ob2xkVGFnLCBlYXRUYWcsdGFnKSB7XG4gICAgICAgIHZhciBpc0VhdENoZXNzID0gdGhpcy5nZXRDaGVzc05vZGVCeVRhZyhlYXRUYWcpLmdldENvbXBvbmVudCh0aGlzLmNoZXNzLm5hbWUpO1xuICAgICAgICB2YXIgaXNFYXRTdGVwQ2hlc3MgPSB0aGlzLmdldFN0ZXBOb2RlQnlUYWcoZWF0VGFnKS5nZXRDb21wb25lbnQodGhpcy5uZXh0U3RlcC5uYW1lKTtcbiAgICAgICAgdmFyIG93bmVyQ2hlc3MgPSB0aGlzLmdldENoZXNzTm9kZUJ5VGFnKG9sZFRhZykuZ2V0Q29tcG9uZW50KHRoaXMuY2hlc3MubmFtZSk7XG4gICAgICAgIHZhciBvd25lclN0ZXBDaGVzcyA9IHRoaXMuZ2V0U3RlcE5vZGVCeVRhZyhvbGRUYWcpLmdldENvbXBvbmVudCh0aGlzLm5leHRTdGVwLm5hbWUpO1xuICAgICAgICBpZiAoaXNFYXRDaGVzcy5pbmRleCAlIDEwID4gb3duZXJDaGVzcy5pbmRleCAlIDEwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuiiq+WQg+aOiVwiKTtcbiAgICAgICAgICAgIGlmICgoaXNFYXRDaGVzcy5pbmRleCAlIDEwICsgMSkgPT09IDggJiYgKG93bmVyQ2hlc3MuaW5kZXggJSAxMCArIDEpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lYXRDaGFuZ2VQb3NpdGlvbihvd25lckNoZXNzLCBvd25lclN0ZXBDaGVzcywgaXNFYXRDaGVzcywgaXNFYXRTdGVwQ2hlc3MsIDEsIHRhZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWF0Q2hhbmdlUG9zaXRpb24ob3duZXJDaGVzcywgb3duZXJTdGVwQ2hlc3MsIGlzRWF0Q2hlc3MsIGlzRWF0U3RlcENoZXNzLCAtMSwgdGFnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGlzRWF0Q2hlc3MuaW5kZXggJSAxMCArIDEgPT09IG93bmVyQ2hlc3MuaW5kZXggJSAxMCArIDEpIHtcbiAgICAgICAgICAgIHRoaXMuZWF0Q2hhbmdlUG9zaXRpb24ob3duZXJDaGVzcywgb3duZXJTdGVwQ2hlc3MsIGlzRWF0Q2hlc3MsIGlzRWF0U3RlcENoZXNzLCAwLCB0YWcpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLmjaLmjolcIik7XG4gICAgICAgICAgICB1c2VyLnN0ZXBJZkVhdE9yT3BlbigxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpc0VhdENoZXNzLmluZGV4ICUgMTAgKyAxID09PSAxICYmIG93bmVyQ2hlc3MuaW5kZXggJSAxMCArIDEgPT09IDgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVhdENoYW5nZVBvc2l0aW9uKG93bmVyQ2hlc3MsIG93bmVyU3RlcENoZXNzLCBpc0VhdENoZXNzLCBpc0VhdFN0ZXBDaGVzcywgLTEsIHRhZyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZWF0Q2hhbmdlUG9zaXRpb24ob3duZXJDaGVzcywgb3duZXJTdGVwQ2hlc3MsIGlzRWF0Q2hlc3MsIGlzRWF0U3RlcENoZXNzLCAxLCB0YWcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWQg+aOieWvueaWuVwiKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGVhdENoYW5nZVBvc2l0aW9uOmZ1bmN0aW9uKG93bmVyQ2hlc3Msb3duZXJTdGVwQ2hlc3MsaXNFYXRDaGVzcyxpc0VhdFN0ZXBDaGVzcywgcGFybSx0YWcpIHtcbiAgICAgICAgdmFyIHBvcyA9IGlzRWF0Q2hlc3MuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHBvczIgPSBpc0VhdFN0ZXBDaGVzcy5nZXRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgb3duZXJOb2RlID0gb3duZXJDaGVzcy5nZXROb2RlKCk7XG4gICAgICAgIGlmIChwYXJtID4gMCkge1xuICAgICAgICAgICAgb3duZXJOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBvd25lck5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygwLjIscG9zKSxjYy5jYWxsRnVuYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPIOaSreaUvumfs+S5kFxuICAgICAgICAgICAgICAgIHVzZXIuc2V0QXVkaW8oXCJlYXRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhck9sZENoZXNzTm9kZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBvd25lck5vZGUuc2lnbiArPSB0YWc7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvd25lclN0ZXBOb2RlID0gb3duZXJTdGVwQ2hlc3MuZ2V0Tm9kZSgpO1xuICAgICAgICAgICAgICAgICAgICBvd25lclN0ZXBOb2RlLnNpZ24gKz0gdGFnO1xuICAgICAgICAgICAgICAgICAgICBvd25lck5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgICAgICAgICAgb3duZXJOb2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC4yLHBvcykpO1xuICAgICAgICAgICAgICAgICAgICAvLyBvd25lckNoZXNzLnNldFBvc2l0aW9uKHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIG93bmVyU3RlcENoZXNzLnNldFBvc2l0aW9uKHBvczIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXgyID0gaXNFYXRDaGVzcy5nZXRJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBvd25lckNoZXNzLmdldEluZGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRGb3JCb2FyZExpc3QoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0Rm9yQm9hcmRMaXN0KGluZGV4MixpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGlzRWF0Q2hlc3Muc2V0RGVzdG9yeSgpO1xuICAgICAgICAgICAgICAgICAgICBpc0VhdFN0ZXBDaGVzcy5zZXREZXN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NTZXREZXN0b3J5KG51bGwsbnVsbCxpc0VhdENoZXNzLGlzRWF0U3RlcENoZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0dhbWVPdmVyKCk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSkpKTtcbiAgICAgICAgfSBlbHNlIGlmIChwYXJtID09PSAwKSB7XG4gICAgICAgICAgICBvd25lck5vZGUuekluZGV4ID0gMTAwO1xuICAgICAgICAgICAgb3duZXJOb2RlLnN0b3BBbGxBY3Rpb25zKCk7XG4gICAgICAgICAgICBvd25lck5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLm1vdmVUbygwLjIscG9zKSxjYy5jYWxsRnVuYyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPIOaSreaUvumfs+S5kFxuICAgICAgICAgICAgICAgIHVzZXIuc2V0QXVkaW8oXCJhbGxEaWVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhck9sZENoZXNzTm9kZShmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBpc0VhdENoZXNzLmdldEluZGV4KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpZnRGb3JCb2FyZExpc3QoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IG93bmVyQ2hlc3MuZ2V0SW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlmdEZvckJvYXJkTGlzdChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIGlzRWF0Q2hlc3Muc2V0RGVzdG9yeSgpO1xuICAgICAgICAgICAgICAgICAgICBpc0VhdFN0ZXBDaGVzcy5zZXREZXN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgIG93bmVyQ2hlc3Muc2V0RGVzdG9yeSgpO1xuICAgICAgICAgICAgICAgICAgICBvd25lclN0ZXBDaGVzcy5zZXREZXN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NTZXREZXN0b3J5KG93bmVyQ2hlc3Msb3duZXJTdGVwQ2hlc3MsaXNFYXRDaGVzcyxpc0VhdFN0ZXBDaGVzcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNHYW1lT3ZlcigpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSwxKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG93bmVyTm9kZS56SW5kZXggPSAxMDA7XG4gICAgICAgICAgICBvd25lck5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgICAgIG93bmVyTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuMixwb3MpLGNjLmNhbGxGdW5jKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyDmkq3mlL7pn7PkuZBcbiAgICAgICAgICAgICAgICB1c2VyLnNldEF1ZGlvKFwiZWF0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJPbGRDaGVzc05vZGUoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gb3duZXJDaGVzcy5nZXRJbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0Rm9yQm9hcmRMaXN0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgb3duZXJDaGVzcy5zZXREZXN0b3J5KCk7XG4gICAgICAgICAgICAgICAgICAgIG93bmVyU3RlcENoZXNzLnNldERlc3RvcnkoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGVzc1NldERlc3Rvcnkob3duZXJDaGVzcyxvd25lclN0ZXBDaGVzcyxudWxsLG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzR2FtZU92ZXIoKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIDEpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKSkpO1xuXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBpc0dhbWVPdmVyOmZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciB4LHk7XG4gICAgICAgIHZhciBhcnJYID0gW10sIGFyclkgPSBbXTtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmNoZXNzQm9hcmRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuY2hlc3NCb2FyZExpc3RbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVzc0JvYXJkTGlzdFtpXVtqXSA8PTApIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8g5Yik5pat5piv5ZCm5pyJ5pyq5byA55qE5qOL5a2QXG4gICAgICAgICAgICAgICAgdmFyIGlzT3BlbiA9IHRoaXMuZ2V0U3RlcEJ5SW5kZXgodGhpcy5jaGVzc0JvYXJkTGlzdFtpXVtqXSkuZ2V0Q29tcG9uZW50KFwibmV4dFN0ZXBcIikuZ2V0SXNPcGVuKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc09wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIOWIpOaWreaYr+WQpuWPquacieS4gOaWueeahOaji+WtkFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZXNzQm9hcmRMaXN0W2ldW2pdID49IDEwKSB7ICAgICAgLy8g57qi6ImyXG4gICAgICAgICAgICAgICAgICAgIHggPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBhcnJYLnB1c2godGhpcy5jaGVzc0JvYXJkTGlzdFtpXVtqXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZXNzQm9hcmRMaXN0W2ldW2pdID4gMCl7ICAgICAgLy8g6JOd6ImyXG4gICAgICAgICAgICAgICAgICAgIHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBhcnJZLnB1c2godGhpcy5jaGVzc0JvYXJkTGlzdFtpXVtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5Yik5pat5piv5ZCm5Y+q5Ymp5LiL5Lik5Liq5byA552A55qE5a2QXG4gICAgICAgIGlmIChhcnJYLmxlbmd0aCA9PT0gMSAmJiBhcnJZLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKGFyclhbMF0gLSAxMCA+IGFycllbMF0pIHtcbiAgICAgICAgICAgICAgICB5ID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyclhbMF0gLSAxMCA8IGFycllbMF0pIHtcbiAgICAgICAgICAgICAgICB4ID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB5ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXggfHwgIXkpIHtcbiAgICAgICAgICAgIC8vIFRPRE8g5Yik5pat6L6T6LWiXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5ri45oiP57uT5p2fJylcbiAgICAgICAgICAgIHZhciB3aW5GbGFnID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB1c2VySXNXaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIC8vIHVzZXIuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgLy8gR2FtZS5HYW1lTWFuYWdlci5nYW1lU3RhdGUgPSBHYW1lU3RhdGUuT3ZlcjtcbiAgICAgICAgICAgIGlmICgheCAmJiAheSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5ZKM5bGAXCIpO1xuICAgICAgICAgICAgICAgIC8vIGNsaWVudEV2ZW50LmRpc3BhdGNoRXZlbnQoXCJyZXN1bHREb3duXCIsXCIyXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIUdMQi5pc1Jvb21Pd25lciAmJiAheSkgeyAgLy8g57qi5pa56LWi5LqGXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5L2g6L6T5LqGXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aW5GbGFnID0gR0xCLlBMQVlFUl9GTEFHLlJFRDtcbiAgICAgICAgICAgICAgICAvLyAgICBjbGllbnRFdmVudC5kaXNwYXRjaEV2ZW50KFwicmVzdWx0RG93blwiLFwiM1wiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEdMQi5pc1Jvb21Pd25lciAmJiAheCkgeyAgLy8g6JOd6Imy5pa56LWi5LqGXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5L2g6L6T5LqGXCIpO1xuICAgICAgICAgICAgICAgICAgICB3aW5GbGFnID0gR0xCLlBMQVlFUl9GTEFHLkJMVUU7XG4gICAgICAgICAgICAgICAgLy8gICAgY2xpZW50RXZlbnQuZGlzcGF0Y2hFdmVudChcInJlc3VsdERvd25cIixcIjNcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkvaDotaLkuoZcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1c2VySXNXaW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoRXZlbnQoXCJyZXN1bHREb3duXCIsXCIxXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1c2VySXNXaW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoR0xCLmlzUm9vbU93bmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbkZsYWcgPSBHTEIuUExBWUVSX0ZMQUcuUkVEO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbkZsYWcgPSBHTEIuUExBWUVSX0ZMQUcuQkxVRTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbXNnID0ge1xuICAgICAgICAgICAgICAgIGFjdGlvbjogR0xCLkdBTUVfT1ZFUl9FVkVOVCxcbiAgICAgICAgICAgICAgICB3aW5GbGFnOiB3aW5GbGFnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLnNlbmRFdmVudEV4KG1zZyk7XG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuc3RvcFRpbWVXYXJuQW5pbSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2hlc3NTZXREZXN0b3J5OmZ1bmN0aW9uKG93bmVyQ2hlc3Msb3duZXJTdGVwQ2hlc3MsaXNFYXRDaGVzcyxpc0VhdFN0ZXBDaGVzcykge1xuICAgICAgICBpZiAob3duZXJDaGVzcyAhPT0gbnVsbCAmJiBvd25lclN0ZXBDaGVzcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIG93bmVyTm9kZSA9IG93bmVyQ2hlc3MuZ2V0Tm9kZSgpO1xuICAgICAgICAgICAgb3duZXJOb2RlLnNpZ24gPSAxMDA7XG4gICAgICAgICAgICB2YXIgb3duZXJTdGVwTm9kZSA9IG93bmVyU3RlcENoZXNzLmdldE5vZGUoKTtcbiAgICAgICAgICAgIG93bmVyU3RlcE5vZGUuc2lnbiA9IDEwMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNFYXRDaGVzcyAhPT0gbnVsbCAmJiBpc0VhdFN0ZXBDaGVzcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGlzRWF0Tm9kZSA9IGlzRWF0Q2hlc3MuZ2V0Tm9kZSgpO1xuICAgICAgICAgICAgaXNFYXROb2RlLnNpZ24gPSAxMDA7XG4gICAgICAgICAgICB2YXIgaXNFYXRTdGVwTm9kZSA9IGlzRWF0U3RlcENoZXNzLmdldE5vZGUoKTtcbiAgICAgICAgICAgIGlzRWF0U3RlcE5vZGUuc2lnbiA9IDEwMDtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaGlmdEZvckJvYXJkTGlzdDpmdW5jdGlvbihpbmRleCxpbmRleDIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNoZXNzQm9hcmRMaXN0Lmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5jaGVzc0JvYXJkTGlzdFtpXS5sZW5ndGg7aisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlc3NCb2FyZExpc3RbaV1bal0gPT09IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmNoZXNzQm9hcmRMaXN0W2ldW2pd5Ye66ZSZXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlc3NCb2FyZExpc3RbaV1bal0gPSBpbmRleDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoZXNzQm9hcmRMaXN0W2ldW2pdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY2xlYXJPbGRDaGVzc05vZGU6ZnVuY3Rpb24oY2IscGFybSkge1xuICAgICAgICBpZiAodGhpcy5vbGRTdGVwTm9kZSkge1xuICAgICAgICAgICAgdGhpcy5vbGRTdGVwTm9kZS5nZXRDb21wb25lbnQodGhpcy5uZXh0U3RlcC5uYW1lKS5jbGVhck1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMub2xkU3RlcE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm9sZENoZXNzTm9kZSkge1xuICAgICAgICAgICAgdGhpcy5vbGRDaGVzc05vZGUuY2xlYXJEaXJlY3Rpb24oKTtcbiAgICAgICAgICAgIHRoaXMub2xkQ2hlc3NOb2RlLmFuaW1hdFB1dERvd24oY2IscGFybSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY2Ipe1xuICAgICAgICAgICAgICAgIGNiKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0Q2hlc3NOb2RlQnlUYWc6ZnVuY3Rpb24gKHRhZykge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zaG93Q2hlc3NBcnIubGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2hvd0NoZXNzQXJyW2ldLnNpZ24gPT09IHRhZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93Q2hlc3NBcnJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0U3RlcE5vZGVCeVRhZzpmdW5jdGlvbiAodGFnKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLnNob3dTdGVwQXJyLmxlbmd0aDsgaSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0aGlzLnNob3dTdGVwQXJyW2ldLnNpZ24gPT09IHRhZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93U3RlcEFycltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRTdGVwQnlJbmRleDpmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHRoaXMuc2hvd1N0ZXBBcnIubGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzY3JpcCA9IHRoaXMuc2hvd1N0ZXBBcnJbaV0uZ2V0Q29tcG9uZW50KHRoaXMubmV4dFN0ZXAubmFtZSk7XG4gICAgICAgICAgICBpZihzY3JpcC5nZXRJbmRleCgpID09PSBpbmRleClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaG93U3RlcEFycltpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRUYWdCeUluZGV4OmZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5zaG93Q2hlc3NBcnIubGVuZ3RoOyBpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBzY3JpcCA9IHRoaXMuc2hvd0NoZXNzQXJyW2ldLmdldENvbXBvbmVudCh0aGlzLmNoZXNzLm5hbWUpO1xuICAgICAgICAgICAgaWYoc2NyaXAuZ2V0SW5kZXgoKSA9PT0gaW5kZXgpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0NoZXNzQXJyW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSAoKSB7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUubWFwSW5pdCwgdGhpcy5tYXBJbml0RXZlbnQsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLmVhdEZvckNoZXNzLCB0aGlzLmVhdEZvckNoZXNzRXZlbnQsIHRoaXMpXG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUuZWF0Rm9yT3RoZXIsIHRoaXMuZWF0Rm9yT3RoZXIsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLm9wZW5Gb3JPdGhlciwgdGhpcy5vcGVuRm9yT3RoZXIsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLm9wZW5DaGVzc1BpZWNlLCB0aGlzLm9wZW5DaGVzc1BpZWNlRXZlbnQsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLmNoZWNrTW92ZURpcmVjdGlvbiwgdGhpcy5jaGVja01vdmVEaXJlY3Rpb24sIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLmlzR2FtZU92ZXIsIHRoaXMuaXNHYW1lT3ZlciwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUuZ2V0TWFwLCB0aGlzLmdldE1hcCwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUuZ2FtZU92ZXIsIHRoaXMub3ZlckNsZWFyLCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5jbGVhckNoZXNzLCB0aGlzLm92ZXJDbGVhciwgdGhpcyk7XG4gICAgICAgIC8vIHRoaXMubm9kZS5vZmYoJ3RvdWNoZW5kJywgdGhpcy50b3VjaEJvYXJkRXZlbnQsIHRoaXMpO1xuICAgIH1cbiAgICAvLyBzdGFydCAoKSB7XG4gICAgLy9cbiAgICAvLyB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==