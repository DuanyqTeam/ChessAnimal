
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/gameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '71befhMjOZLK4kQqOY4yNmZ', 'gameManager');
// common/script/gameManager.js

"use strict";

var mvs = require("Matchvs");

var GLB = require("Glb");

cc.Class({
  "extends": cc.Component,
  blockInput: function blockInput() {
    Game.GameManager.getComponent(cc.BlockInputEvents).enabled = true;
    setTimeout(function () {
      Game.GameManager.node.getComponent(cc.BlockInputEvents).enabled = false;
    }, 1000);
  },
  onLoad: function onLoad() {
    Game.GameManager = this;
    cc.game.addPersistRootNode(this.node);
    clientEvent.init();
    dataFunc.loadConfigs();
    cc.view.enableAutoFullScreen(false);
    clientEvent.on(clientEvent.eventType.gameOver, this.gameOver, this);
    clientEvent.on(clientEvent.eventType.leaveRoomNotify, this.leaveRoom, this);
    this.network = window.network;
    this.network.chooseNetworkMode();
    this.getRankDataListener();
    this.findPlayerByAccountListener(); // if(window.wx) {
    //     wx.login({
    //         success: function() {
    //             wx.getUserInfo({
    //                 fail: function(res) {
    //                     // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
    //                     if (res.errMsg.indexOf('auth deny') > -1 || res.errMsg.indexOf('auth denied') > -1) {
    //                         // 处理用户拒绝授权的情况
    //                     }
    //                 },
    //                 success: function(res) {
    //                     Game.GameManager.nickName = res.userInfo.nickName;
    //                     Game.GameManager.avatarUrl = res.userInfo.avatarUrl;
    //                     console.log('success', Game.GameManager.nickName);
    //                 }
    //             });
    //         }
    //     });
    // }
  },
  leaveRoom: function leaveRoom(data) {
    // 离开房间--
    if (this.gameState === GameState.Play) {
      if (GLB.userInfo.id !== data.leaveRoomInfo.userId) {
        GLB.isRoomOwner = true; // var gamePanel = uiFunc.findUI("uiGamePanel");
        // if (gamePanel) {
        //     var gamePanelScript = gamePanel.getComponent("uiGamePanel");
        //     gamePanelScript.otherScore = 0;
        //     this.gameOver();
        // }
      } else {
        Game.GameManager.gameState = GameState.Over;
      }
    }
  },
  gameOver: function gameOver(winFlag) {
    var gamePanel = uiFunc.findUI("uiGamePanel");

    if (gamePanel && Game.GameManager.gameState !== GameState.Over) {
      Game.GameManager.gameState = GameState.Over;
    } else return;

    this.isLoadGame = false; // mvs.engine.leaveRoom();

    setTimeout(function () {
      uiFunc.openUI("uiVsResultVer", function (panel) {
        var panelScript = panel.getComponent('uiVsResult');
        panelScript.setData(winFlag);
      }.bind(this));
    }.bind(this), 1000);
  },
  matchVsInit: function matchVsInit() {
    mvs.response.initResponse = this.initResponse.bind(this);
    mvs.response.errorResponse = this.errorResponse.bind(this);
    mvs.response.joinRoomResponse = this.joinRoomResponse.bind(this);
    mvs.response.joinRoomNotify = this.joinRoomNotify.bind(this);
    mvs.response.leaveRoomResponse = this.leaveRoomResponse.bind(this);
    mvs.response.leaveRoomNotify = this.leaveRoomNotify.bind(this);
    mvs.response.joinOverResponse = this.joinOverResponse.bind(this);
    mvs.response.createRoomResponse = this.createRoomResponse.bind(this);
    mvs.response.getRoomListResponse = this.getRoomListResponse.bind(this);
    mvs.response.getRoomDetailResponse = this.getRoomDetailResponse.bind(this);
    mvs.response.getRoomListExResponse = this.getRoomListExResponse.bind(this);
    mvs.response.kickPlayerResponse = this.kickPlayerResponse.bind(this);
    mvs.response.kickPlayerNotify = this.kickPlayerNotify.bind(this);
    mvs.response.registerUserResponse = this.registerUserResponse.bind(this);
    mvs.response.loginResponse = this.loginResponse.bind(this); // 用户登录之后的回调

    mvs.response.logoutResponse = this.logoutResponse.bind(this); // 用户登录之后的回调

    mvs.response.sendEventNotify = this.sendEventNotify.bind(this);
    mvs.response.networkStateNotify = this.networkStateNotify.bind(this); // var result = mvs.engine.init(mvs.response, GLB.channel, GLB.platform, GLB.gameId);

    var result = mvs.engine.init(mvs.response, GLB.channel, GLB.platform, GLB.gameId, GLB.appKey, GLB.gameVersion);

    if (result !== 0) {
      console.log('初始化失败,错误码:' + result);
    }

    Game.GameManager.blockInput();
  },
  networkStateNotify: function networkStateNotify(netNotify) {
    console.log("netNotify");
    console.log("netNotify.owner:" + netNotify.owner);
    console.log("玩家：" + netNotify.userID + " state:" + netNotify.state); // if (Game.GameManager.gameState === GameState.Over) return;

    if (netNotify.userID !== GLB.userInfo.id && Game.GameManager.gameState === GameState.Play) {
      uiFunc.openUI("uiTip", function (obj) {
        var uiTip = obj.getComponent("uiTip");

        if (uiTip) {
          uiTip.setData("对方已退出");
        }
      });
      var winFlag;

      if (GLB.isRoomOwner) {
        winFlag = GLB.PLAYER_FLAG.RED;
      } else {
        winFlag = GLB.PLAYER_FLAG.BLUE;
      } // Game.GameManager.gameState = GameState.Over;


      clientEvent.dispatch(clientEvent.eventType.gameOver, winFlag);
    }

    clientEvent.dispatch(clientEvent.eventType.leaveRoomMedNotify, netNotify);
  },
  kickPlayerNotify: function kickPlayerNotify(_kickPlayerNotify) {
    var data = {
      kickPlayerNotify: _kickPlayerNotify
    };
    clientEvent.dispatch(clientEvent.eventType.kickPlayerNotify, data);
  },
  kickPlayerResponse: function kickPlayerResponse(kickPlayerRsp) {
    if (kickPlayerRsp.status !== 200) {
      console.log("失败kickPlayerRsp:" + kickPlayerRsp);
      return;
    }

    var data = {
      kickPlayerRsp: kickPlayerRsp
    };
    clientEvent.dispatch(clientEvent.eventType.kickPlayerResponse, data);
  },
  getRoomListExResponse: function getRoomListExResponse(rsp) {
    if (rsp.status !== 200) {
      console.log("失败 rsp:" + rsp);
      return;
    }

    var data = {
      rsp: rsp
    };
    clientEvent.dispatch(clientEvent.eventType.getRoomListExResponse, data);
  },
  getRoomDetailResponse: function getRoomDetailResponse(rsp) {
    if (rsp.status !== 200) {
      console.log("失败 rsp:" + rsp);
      return;
    }

    var data = {
      rsp: rsp
    };
    clientEvent.dispatch(clientEvent.eventType.getRoomDetailResponse, data);
  },
  getRoomListResponse: function getRoomListResponse(status, roomInfos) {
    if (status !== 200) {
      console.log("失败 status:" + status);
      return;
    }

    var data = {
      status: status,
      roomInfos: roomInfos
    };
    clientEvent.dispatch(clientEvent.eventType.getRoomListResponse, data);
  },
  createRoomResponse: function createRoomResponse(rsp) {
    if (rsp.status !== 200) {
      console.log("失败 createRoomResponse:" + rsp);
      return;
    }

    var data = {
      rsp: rsp
    };
    clientEvent.dispatch(clientEvent.eventType.createRoomResponse, data);
  },
  joinOverResponse: function joinOverResponse(joinOverRsp) {
    if (joinOverRsp.status !== 200) {
      console.log("失败 joinOverRsp:" + joinOverRsp);
      return;
    }

    var data = {
      joinOverRsp: joinOverRsp
    };
    clientEvent.dispatch(clientEvent.eventType.joinOverResponse, data);
  },
  joinRoomResponse: function joinRoomResponse(status, roomUserInfoList, roomInfo) {
    if (status !== 200) {
      console.log("失败 joinRoomResponse:" + status);
      return;
    }

    var data = {
      status: status,
      roomUserInfoList: roomUserInfoList,
      roomInfo: roomInfo
    };
    clientEvent.dispatch(clientEvent.eventType.joinRoomResponse, data);
  },
  joinRoomNotify: function joinRoomNotify(roomUserInfo) {
    var data = {
      roomUserInfo: roomUserInfo
    };
    clientEvent.dispatch(clientEvent.eventType.joinRoomNotify, data);
  },
  leaveRoomResponse: function leaveRoomResponse(leaveRoomRsp) {
    if (leaveRoomRsp.status !== 200) {
      console.log("失败 leaveRoomRsp:" + leaveRoomRsp);
      return;
    }

    var data = {
      leaveRoomRsp: leaveRoomRsp
    };
    clientEvent.dispatch(clientEvent.eventType.leaveRoomResponse, data);
  },
  leaveRoomNotify: function leaveRoomNotify(leaveRoomInfo) {
    var data = {
      leaveRoomInfo: leaveRoomInfo
    };
    clientEvent.dispatch(clientEvent.eventType.leaveRoomNotify, data);
  },
  logoutResponse: function logoutResponse(status) {
    Game.GameManager.network.disconnect();
    cc.game.removePersistRootNode(this.node);
    cc.director.loadScene('lobby');
  },
  errorResponse: function errorResponse(error, msg) {
    if (error === 1001 || error === 0) {
      uiFunc.openUI("uiTip", function (obj) {
        var uiTip = obj.getComponent("uiTip");

        if (uiTip) {
          uiTip.setData("网络断开连接");
        }
      });
      setTimeout(function () {
        mvs.engine.logout("");
        cc.game.removePersistRootNode(this.node);
        cc.director.loadScene('lobby');
      }.bind(this), 2500);
    }

    console.log("错误信息：" + error);
    console.log("错误信息：" + msg);
  },
  initResponse: function initResponse() {
    console.log('初始化成功，开始注册用户');
    var result = mvs.engine.registerUser();

    if (result !== 0) {
      console.log('注册用户失败，错误码:' + result);
    } else {
      console.log('注册用户成功');
    }
  },
  registerUserResponse: function registerUserResponse(userInfo) {
    var deviceId = 'abcdef';
    var gatewayId = 0;
    GLB.userInfo = userInfo;
    console.log('开始登录,用户Id:' + userInfo.id);
    /* var result = mvs.engine.login(
        userInfo.id, userInfo.token,
        GLB.gameId, GLB.gameVersion,
        GLB.appKey, GLB.secret,
        deviceId, gatewayId
    ); */

    var result = mvs.engine.login(userInfo.id, userInfo.token, deviceId);

    if (result !== 0) {
      console.log('登录失败,错误码:' + result);
    }
  },
  loginResponse: function loginResponse(info) {
    if (info.status !== 200) {
      console.log('登录失败,异步回调错误码:' + info.status);
    } else {
      console.log('登录成功');
      this.lobbyShow();
    }
  },
  lobbyShow: function lobbyShow() {
    this.gameState = GameState.None; // cc.director.loadScene('lobby')

    if (cc.Canvas.instance.designResolution.height > cc.Canvas.instance.designResolution.width) {
      uiFunc.openUI("uiLobbyPanelVer");
    } else {
      uiFunc.openUI("uiLobbyPanel");
    }
  },
  // 收到的消息
  sendEventNotify: function sendEventNotify(info) {
    console.log(info);
    var cpProto = JSON.parse(info.cpProto);

    if (info.cpProto.indexOf(GLB.GAME_START_EVENT) >= 0) {
      GLB.playerUserIds = [GLB.userInfo.id];
      var remoteUserIds = JSON.parse(info.cpProto).userIds;
      remoteUserIds.forEach(function (id) {
        if (GLB.userInfo.id !== id) {
          GLB.playerUserIds.push(id);
        }
      });
      this.startGame();
    }

    if (info.cpProto.indexOf(GLB.GAME_OVER_EVENT) >= 0) {
      console.log('********收到了游戏结束的消息********');
      var winFlag = JSON.parse(info.cpProto).winFlag;
      clientEvent.dispatch(clientEvent.eventType.gameOver, winFlag); // this.gameOver(winFlag);
    }

    if (info.cpProto.indexOf(GLB.EXIT) >= 0) {
      // if(info.srcUserId == GLB.userInfo.id) {
      //     console.log('我退出了游戏')
      //     this.isLoadGame = false;
      //     return;
      // }
      console.log('********对方退出了游戏********');
      uiFunc.openUI("uiTip", function (obj) {
        var uiTip = obj.getComponent("uiTip");

        if (uiTip) {
          uiTip.setData("对方已退出");
        }
      });
      var winFlag;

      if (GLB.isRoomOwner) {
        winFlag = GLB.PLAYER_FLAG.RED;
      } else {
        winFlag = GLB.PLAYER_FLAG.BLUE;
      }

      clientEvent.dispatch(clientEvent.eventType.gameOver, winFlag);
    }

    if (info.cpProto.indexOf(GLB.READY) >= 0) {
      this.readyCnt++;

      if (GLB.isRoomOwner && this.readyCnt >= GLB.playerUserIds.length) {
        this.sendRoundStartMsg();
      }
    }

    if (info.cpProto.indexOf(GLB.ROUND_START) >= 0) {
      // setTimeout(function() {
      //     Game.GameManager.gameState = GameState.Play;
      // }.bind(this), 2000);
      console.log('------dispatch roundStart------');
      clientEvent.dispatch(clientEvent.eventType.roundStart);
    }

    if (info.cpProto.indexOf(GLB.COUNT_TIME) >= 0) {
      clientEvent.dispatch(clientEvent.eventType.updateTime, JSON.parse(info.cpProto));
    }

    if (info.cpProto.indexOf(GLB.CHANGE_FLAG) >= 0) {
      clientEvent.dispatch(clientEvent.eventType.changeFlag);
    } // if (info.cpProto.indexOf(GLB.CLEAR_CHESS) >= 0) {
    //     clientEvent.dispatch(clientEvent.eventType.clearChess);
    // }


    if (info.cpProto.indexOf(GLB.SEND_MAP_INFO) >= 0) {
      var param = JSON.parse(info.cpProto);
      clientEvent.dispatch(clientEvent.eventType.mapInit, param);
    }

    if (info.cpProto.indexOf(GLB.OPEN_FOR_OTHER) >= 0) {
      if (info.srcUserId == GLB.userInfo.id) return;
      var tag = JSON.parse(info.cpProto).sign;
      clientEvent.dispatch(clientEvent.eventType.openForOther, tag);
    }

    if (info.cpProto.indexOf(GLB.EAT_FOR_OTHER) >= 0) {
      if (info.srcUserId == GLB.userInfo.id) return;
      var eatInfo = JSON.parse(info.cpProto).eatInfo;
      clientEvent.dispatch(clientEvent.eventType.eatForOther, eatInfo);
    }
  },
  sendReadyMsg: function sendReadyMsg() {
    var msg = {
      action: GLB.READY
    };
    this.sendEventEx(msg);
  },
  sendRoundStartMsg: function sendRoundStartMsg() {
    var msg = {
      action: GLB.ROUND_START
    };
    this.sendEventEx(msg);
  },
  sendEventEx: function sendEventEx(msg) {
    var result = mvs.engine.sendEventEx(0, JSON.stringify(msg), 0, GLB.playerUserIds);

    if (result.result !== 0) {
      console.log(msg.action, result.result);
    }
  },
  sendEvent: function sendEvent(msg) {
    var result = mvs.engine.sendEvent(JSON.stringify(msg));

    if (result.result !== 0) {
      console.log(msg.action, result.result);
    }
  },
  startGame: function startGame() {
    console.log('-----startGame-----');
    if (this.isLoadGame) return;
    this.isLoadGame = true;
    this.readyCnt = 0;
    cc.director.loadScene('game', function () {
      clientEvent.dispatch(clientEvent.eventType.clearChess);
      uiFunc.openUI("uiGamePanel", function (panel) {
        panel.getComponent("uiGamePanel").timeLabelInit();
        this.sendReadyMsg();
      }.bind(this));
    }.bind(this));
  },
  getRankDataListener: function getRankDataListener() {
    this.network.on("connector.rankHandler.getRankData", function (recvMsg) {
      uiFunc.openUI("uiRankPanelVer", function (obj) {
        var uiRankPanel = obj.getComponent("uiRankPanel");
        uiRankPanel.setData(recvMsg.rankArray);
      });
    }.bind(this));
  },
  findPlayerByAccountListener: function findPlayerByAccountListener() {
    this.network.on("connector.entryHandler.findPlayerByAccount", function (recvMsg) {
      clientEvent.dispatch(clientEvent.eventType.playerAccountGet, recvMsg);
    });
  },
  loginServer: function loginServer() {
    if (!this.network.isConnected()) {
      this.network.connect(GLB.IP, GLB.PORT, function () {
        this.network.send("connector.entryHandler.login", {
          "account": GLB.userInfo.id + "",
          "channel": "0",
          "userName": Game.GameManager.nickName ? Game.GameManager.nickName : GLB.userInfo.id + "",
          "headIcon": Game.GameManager.avatarUrl ? Game.GameManager.avatarUrl : "-"
        });
        setTimeout(function () {
          this.network.send("connector.rankHandler.updateScore", {
            "account": GLB.userInfo.id + "",
            "game": "game8"
          });
        }.bind(this), 500);
      }.bind(this));
    } else {
      this.network.send("connector.rankHandler.updateScore", {
        "account": GLB.userInfo.id + "",
        "game": "game8"
      });
    }
  },
  userInfoReq: function userInfoReq(userId) {
    if (!Game.GameManager.network.isConnected()) {
      Game.GameManager.network.connect(GLB.IP, GLB.PORT, function () {
        Game.GameManager.network.send("connector.entryHandler.login", {
          "account": GLB.userInfo.id + "",
          "channel": "0",
          "userName": Game.GameManager.nickName ? Game.GameManager.nickName : GLB.userInfo.id + "",
          "headIcon": Game.GameManager.avatarUrl ? Game.GameManager.avatarUrl : "-"
        });
        setTimeout(function () {
          Game.GameManager.network.send("connector.entryHandler.findPlayerByAccount", {
            "account": userId + ""
          });
        }, 200);
      });
    } else {
      Game.GameManager.network.send("connector.entryHandler.findPlayerByAccount", {
        "account": userId + ""
      });
    }
  },
  onDestroy: function onDestroy() {
    clientEvent.off(clientEvent.eventType.gameOver, this.gameOver, this);
    clientEvent.off(clientEvent.eventType.leaveRoomNotify, this.leaveRoom, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L2dhbWVNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbIm12cyIsInJlcXVpcmUiLCJHTEIiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwiYmxvY2tJbnB1dCIsIkdhbWUiLCJHYW1lTWFuYWdlciIsImdldENvbXBvbmVudCIsIkJsb2NrSW5wdXRFdmVudHMiLCJlbmFibGVkIiwic2V0VGltZW91dCIsIm5vZGUiLCJvbkxvYWQiLCJnYW1lIiwiYWRkUGVyc2lzdFJvb3ROb2RlIiwiY2xpZW50RXZlbnQiLCJpbml0IiwiZGF0YUZ1bmMiLCJsb2FkQ29uZmlncyIsInZpZXciLCJlbmFibGVBdXRvRnVsbFNjcmVlbiIsIm9uIiwiZXZlbnRUeXBlIiwiZ2FtZU92ZXIiLCJsZWF2ZVJvb21Ob3RpZnkiLCJsZWF2ZVJvb20iLCJuZXR3b3JrIiwid2luZG93IiwiY2hvb3NlTmV0d29ya01vZGUiLCJnZXRSYW5rRGF0YUxpc3RlbmVyIiwiZmluZFBsYXllckJ5QWNjb3VudExpc3RlbmVyIiwiZGF0YSIsImdhbWVTdGF0ZSIsIkdhbWVTdGF0ZSIsIlBsYXkiLCJ1c2VySW5mbyIsImlkIiwibGVhdmVSb29tSW5mbyIsInVzZXJJZCIsImlzUm9vbU93bmVyIiwiT3ZlciIsIndpbkZsYWciLCJnYW1lUGFuZWwiLCJ1aUZ1bmMiLCJmaW5kVUkiLCJpc0xvYWRHYW1lIiwib3BlblVJIiwicGFuZWwiLCJwYW5lbFNjcmlwdCIsInNldERhdGEiLCJiaW5kIiwibWF0Y2hWc0luaXQiLCJyZXNwb25zZSIsImluaXRSZXNwb25zZSIsImVycm9yUmVzcG9uc2UiLCJqb2luUm9vbVJlc3BvbnNlIiwiam9pblJvb21Ob3RpZnkiLCJsZWF2ZVJvb21SZXNwb25zZSIsImpvaW5PdmVyUmVzcG9uc2UiLCJjcmVhdGVSb29tUmVzcG9uc2UiLCJnZXRSb29tTGlzdFJlc3BvbnNlIiwiZ2V0Um9vbURldGFpbFJlc3BvbnNlIiwiZ2V0Um9vbUxpc3RFeFJlc3BvbnNlIiwia2lja1BsYXllclJlc3BvbnNlIiwia2lja1BsYXllck5vdGlmeSIsInJlZ2lzdGVyVXNlclJlc3BvbnNlIiwibG9naW5SZXNwb25zZSIsImxvZ291dFJlc3BvbnNlIiwic2VuZEV2ZW50Tm90aWZ5IiwibmV0d29ya1N0YXRlTm90aWZ5IiwicmVzdWx0IiwiZW5naW5lIiwiY2hhbm5lbCIsInBsYXRmb3JtIiwiZ2FtZUlkIiwiYXBwS2V5IiwiZ2FtZVZlcnNpb24iLCJjb25zb2xlIiwibG9nIiwibmV0Tm90aWZ5Iiwib3duZXIiLCJ1c2VySUQiLCJzdGF0ZSIsIm9iaiIsInVpVGlwIiwiUExBWUVSX0ZMQUciLCJSRUQiLCJCTFVFIiwiZGlzcGF0Y2giLCJsZWF2ZVJvb21NZWROb3RpZnkiLCJraWNrUGxheWVyUnNwIiwic3RhdHVzIiwicnNwIiwicm9vbUluZm9zIiwiam9pbk92ZXJSc3AiLCJyb29tVXNlckluZm9MaXN0Iiwicm9vbUluZm8iLCJyb29tVXNlckluZm8iLCJsZWF2ZVJvb21Sc3AiLCJkaXNjb25uZWN0IiwicmVtb3ZlUGVyc2lzdFJvb3ROb2RlIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJlcnJvciIsIm1zZyIsImxvZ291dCIsInJlZ2lzdGVyVXNlciIsImRldmljZUlkIiwiZ2F0ZXdheUlkIiwibG9naW4iLCJ0b2tlbiIsImluZm8iLCJsb2JieVNob3ciLCJOb25lIiwiQ2FudmFzIiwiaW5zdGFuY2UiLCJkZXNpZ25SZXNvbHV0aW9uIiwiaGVpZ2h0Iiwid2lkdGgiLCJjcFByb3RvIiwiSlNPTiIsInBhcnNlIiwiaW5kZXhPZiIsIkdBTUVfU1RBUlRfRVZFTlQiLCJwbGF5ZXJVc2VySWRzIiwicmVtb3RlVXNlcklkcyIsInVzZXJJZHMiLCJmb3JFYWNoIiwicHVzaCIsInN0YXJ0R2FtZSIsIkdBTUVfT1ZFUl9FVkVOVCIsIkVYSVQiLCJSRUFEWSIsInJlYWR5Q250IiwibGVuZ3RoIiwic2VuZFJvdW5kU3RhcnRNc2ciLCJST1VORF9TVEFSVCIsInJvdW5kU3RhcnQiLCJDT1VOVF9USU1FIiwidXBkYXRlVGltZSIsIkNIQU5HRV9GTEFHIiwiY2hhbmdlRmxhZyIsIlNFTkRfTUFQX0lORk8iLCJwYXJhbSIsIm1hcEluaXQiLCJPUEVOX0ZPUl9PVEhFUiIsInNyY1VzZXJJZCIsInRhZyIsInNpZ24iLCJvcGVuRm9yT3RoZXIiLCJFQVRfRk9SX09USEVSIiwiZWF0SW5mbyIsImVhdEZvck90aGVyIiwic2VuZFJlYWR5TXNnIiwiYWN0aW9uIiwic2VuZEV2ZW50RXgiLCJzdHJpbmdpZnkiLCJzZW5kRXZlbnQiLCJjbGVhckNoZXNzIiwidGltZUxhYmVsSW5pdCIsInJlY3ZNc2ciLCJ1aVJhbmtQYW5lbCIsInJhbmtBcnJheSIsInBsYXllckFjY291bnRHZXQiLCJsb2dpblNlcnZlciIsImlzQ29ubmVjdGVkIiwiY29ubmVjdCIsIklQIiwiUE9SVCIsInNlbmQiLCJuaWNrTmFtZSIsImF2YXRhclVybCIsInVzZXJJbmZvUmVxIiwib25EZXN0cm95Iiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEdBQUcsR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBakI7O0FBQ0EsSUFBSUMsR0FBRyxHQUFHRCxPQUFPLENBQUMsS0FBRCxDQUFqQjs7QUFFQUUsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFFTEMsRUFBQUEsVUFGSyx3QkFFUTtBQUNUQyxJQUFBQSxJQUFJLENBQUNDLFdBQUwsQ0FBaUJDLFlBQWpCLENBQThCTixFQUFFLENBQUNPLGdCQUFqQyxFQUFtREMsT0FBbkQsR0FBNkQsSUFBN0Q7QUFDQUMsSUFBQUEsVUFBVSxDQUFDLFlBQVc7QUFDbEJMLE1BQUFBLElBQUksQ0FBQ0MsV0FBTCxDQUFpQkssSUFBakIsQ0FBc0JKLFlBQXRCLENBQW1DTixFQUFFLENBQUNPLGdCQUF0QyxFQUF3REMsT0FBeEQsR0FBa0UsS0FBbEU7QUFD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QUFzQkUsZUFBdEMsRUFBdUQsS0FBS0MsU0FBNUQsRUFBdUUsSUFBdkU7QUFDSDtBQTVmSSxDQUFUIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIG12cyA9IHJlcXVpcmUoXCJNYXRjaHZzXCIpO1xudmFyIEdMQiA9IHJlcXVpcmUoXCJHbGJcIik7XG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG4gICAgYmxvY2tJbnB1dCgpIHtcbiAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5nZXRDb21wb25lbnQoY2MuQmxvY2tJbnB1dEV2ZW50cykuZW5hYmxlZCA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJsb2NrSW5wdXRFdmVudHMpLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSxcbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIEdhbWUuR2FtZU1hbmFnZXIgPSB0aGlzO1xuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xuICAgICAgICBjbGllbnRFdmVudC5pbml0KCk7XG4gICAgICAgIGRhdGFGdW5jLmxvYWRDb25maWdzKCk7XG4gICAgICAgIGNjLnZpZXcuZW5hYmxlQXV0b0Z1bGxTY3JlZW4oZmFsc2UpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUuZ2FtZU92ZXIsIHRoaXMuZ2FtZU92ZXIsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUubGVhdmVSb29tTm90aWZ5LCB0aGlzLmxlYXZlUm9vbSwgdGhpcyk7XG4gICAgICAgIHRoaXMubmV0d29yayA9IHdpbmRvdy5uZXR3b3JrO1xuICAgICAgICB0aGlzLm5ldHdvcmsuY2hvb3NlTmV0d29ya01vZGUoKTtcbiAgICAgICAgdGhpcy5nZXRSYW5rRGF0YUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuZmluZFBsYXllckJ5QWNjb3VudExpc3RlbmVyKCk7XG5cbiAgICAgICAgLy8gaWYod2luZG93Lnd4KSB7XG4gICAgICAgIC8vICAgICB3eC5sb2dpbih7XG4gICAgICAgIC8vICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIC8vIGlPUyDlkowgQW5kcm9pZCDlr7nkuo7mi5Lnu53mjojmnYPnmoTlm57osIMgZXJyTXNnIOayoeaciee7n+S4gO+8jOmcgOimgeWBmuS4gOS4i+WFvOWuueWkhOeQhlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuZXJyTXNnLmluZGV4T2YoJ2F1dGggZGVueScpID4gLTEgfHwgcmVzLmVyck1zZy5pbmRleE9mKCdhdXRoIGRlbmllZCcpID4gLTEpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8g5aSE55CG55So5oi35ouS57ud5o6I5p2D55qE5oOF5Ya1XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIEdhbWUuR2FtZU1hbmFnZXIubmlja05hbWUgPSByZXMudXNlckluZm8ubmlja05hbWU7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5hdmF0YXJVcmwgPSByZXMudXNlckluZm8uYXZhdGFyVXJsO1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzdWNjZXNzJywgR2FtZS5HYW1lTWFuYWdlci5uaWNrTmFtZSk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIGxlYXZlUm9vbTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvLyDnprvlvIDmiL/pl7QtLVxuICAgICAgICBpZiAodGhpcy5nYW1lU3RhdGUgPT09IEdhbWVTdGF0ZS5QbGF5KSB7XG4gICAgICAgICAgICBpZiAoR0xCLnVzZXJJbmZvLmlkICE9PSBkYXRhLmxlYXZlUm9vbUluZm8udXNlcklkKSB7XG4gICAgICAgICAgICAgICAgR0xCLmlzUm9vbU93bmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyB2YXIgZ2FtZVBhbmVsID0gdWlGdW5jLmZpbmRVSShcInVpR2FtZVBhbmVsXCIpO1xuICAgICAgICAgICAgICAgIC8vIGlmIChnYW1lUGFuZWwpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgdmFyIGdhbWVQYW5lbFNjcmlwdCA9IGdhbWVQYW5lbC5nZXRDb21wb25lbnQoXCJ1aUdhbWVQYW5lbFwiKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgZ2FtZVBhbmVsU2NyaXB0Lm90aGVyU2NvcmUgPSAwO1xuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLmdhbWVPdmVyKCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5nYW1lU3RhdGUgPSBHYW1lU3RhdGUuT3ZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnYW1lT3ZlcjogZnVuY3Rpb24od2luRmxhZykge1xuICAgICAgICB2YXIgZ2FtZVBhbmVsID0gdWlGdW5jLmZpbmRVSShcInVpR2FtZVBhbmVsXCIpO1xuICAgICAgICBpZiAoZ2FtZVBhbmVsICYmIEdhbWUuR2FtZU1hbmFnZXIuZ2FtZVN0YXRlICE9PSBHYW1lU3RhdGUuT3Zlcikge1xuICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5nYW1lU3RhdGUgPSBHYW1lU3RhdGUuT3ZlclxuICAgICAgICB9IGVsc2UgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzTG9hZEdhbWUgPSBmYWxzZTtcbiAgICAgICAgLy8gbXZzLmVuZ2luZS5sZWF2ZVJvb20oKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHVpRnVuYy5vcGVuVUkoXCJ1aVZzUmVzdWx0VmVyXCIsIGZ1bmN0aW9uIChwYW5lbCkge1xuICAgICAgICAgICAgICAgIHZhciBwYW5lbFNjcmlwdCA9IHBhbmVsLmdldENvbXBvbmVudCgndWlWc1Jlc3VsdCcpO1xuICAgICAgICAgICAgICAgIHBhbmVsU2NyaXB0LnNldERhdGEod2luRmxhZyk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB9LmJpbmQodGhpcyksIDEwMDApO1xuICAgIH0sXG5cbiAgICBtYXRjaFZzSW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIG12cy5yZXNwb25zZS5pbml0UmVzcG9uc2UgPSB0aGlzLmluaXRSZXNwb25zZS5iaW5kKHRoaXMpO1xuICAgICAgICBtdnMucmVzcG9uc2UuZXJyb3JSZXNwb25zZSA9IHRoaXMuZXJyb3JSZXNwb25zZS5iaW5kKHRoaXMpO1xuICAgICAgICBtdnMucmVzcG9uc2Uuam9pblJvb21SZXNwb25zZSA9IHRoaXMuam9pblJvb21SZXNwb25zZS5iaW5kKHRoaXMpO1xuICAgICAgICBtdnMucmVzcG9uc2Uuam9pblJvb21Ob3RpZnkgPSB0aGlzLmpvaW5Sb29tTm90aWZ5LmJpbmQodGhpcyk7XG4gICAgICAgIG12cy5yZXNwb25zZS5sZWF2ZVJvb21SZXNwb25zZSA9IHRoaXMubGVhdmVSb29tUmVzcG9uc2UuYmluZCh0aGlzKTtcbiAgICAgICAgbXZzLnJlc3BvbnNlLmxlYXZlUm9vbU5vdGlmeSA9IHRoaXMubGVhdmVSb29tTm90aWZ5LmJpbmQodGhpcyk7XG4gICAgICAgIG12cy5yZXNwb25zZS5qb2luT3ZlclJlc3BvbnNlID0gdGhpcy5qb2luT3ZlclJlc3BvbnNlLmJpbmQodGhpcyk7XG4gICAgICAgIG12cy5yZXNwb25zZS5jcmVhdGVSb29tUmVzcG9uc2UgPSB0aGlzLmNyZWF0ZVJvb21SZXNwb25zZS5iaW5kKHRoaXMpO1xuICAgICAgICBtdnMucmVzcG9uc2UuZ2V0Um9vbUxpc3RSZXNwb25zZSA9IHRoaXMuZ2V0Um9vbUxpc3RSZXNwb25zZS5iaW5kKHRoaXMpO1xuICAgICAgICBtdnMucmVzcG9uc2UuZ2V0Um9vbURldGFpbFJlc3BvbnNlID0gdGhpcy5nZXRSb29tRGV0YWlsUmVzcG9uc2UuYmluZCh0aGlzKTtcbiAgICAgICAgbXZzLnJlc3BvbnNlLmdldFJvb21MaXN0RXhSZXNwb25zZSA9IHRoaXMuZ2V0Um9vbUxpc3RFeFJlc3BvbnNlLmJpbmQodGhpcyk7XG4gICAgICAgIG12cy5yZXNwb25zZS5raWNrUGxheWVyUmVzcG9uc2UgPSB0aGlzLmtpY2tQbGF5ZXJSZXNwb25zZS5iaW5kKHRoaXMpO1xuICAgICAgICBtdnMucmVzcG9uc2Uua2lja1BsYXllck5vdGlmeSA9IHRoaXMua2lja1BsYXllck5vdGlmeS5iaW5kKHRoaXMpO1xuICAgICAgICBtdnMucmVzcG9uc2UucmVnaXN0ZXJVc2VyUmVzcG9uc2UgPSB0aGlzLnJlZ2lzdGVyVXNlclJlc3BvbnNlLmJpbmQodGhpcyk7XG4gICAgICAgIG12cy5yZXNwb25zZS5sb2dpblJlc3BvbnNlID0gdGhpcy5sb2dpblJlc3BvbnNlLmJpbmQodGhpcyk7IC8vIOeUqOaIt+eZu+W9leS5i+WQjueahOWbnuiwg1xuICAgICAgICBtdnMucmVzcG9uc2UubG9nb3V0UmVzcG9uc2UgPSB0aGlzLmxvZ291dFJlc3BvbnNlLmJpbmQodGhpcyk7IC8vIOeUqOaIt+eZu+W9leS5i+WQjueahOWbnuiwg1xuICAgICAgICBtdnMucmVzcG9uc2Uuc2VuZEV2ZW50Tm90aWZ5ID0gdGhpcy5zZW5kRXZlbnROb3RpZnkuYmluZCh0aGlzKTtcbiAgICAgICAgbXZzLnJlc3BvbnNlLm5ldHdvcmtTdGF0ZU5vdGlmeSA9IHRoaXMubmV0d29ya1N0YXRlTm90aWZ5LmJpbmQodGhpcyk7XG5cbiAgICAgICAgLy8gdmFyIHJlc3VsdCA9IG12cy5lbmdpbmUuaW5pdChtdnMucmVzcG9uc2UsIEdMQi5jaGFubmVsLCBHTEIucGxhdGZvcm0sIEdMQi5nYW1lSWQpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbXZzLmVuZ2luZS5pbml0KG12cy5yZXNwb25zZSwgR0xCLmNoYW5uZWwsIEdMQi5wbGF0Zm9ybSwgR0xCLmdhbWVJZCxcbiAgICAgICAgICAgIEdMQi5hcHBLZXksIEdMQi5nYW1lVmVyc2lvbik7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliJ3lp4vljJblpLHotKUs6ZSZ6K+v56CBOicgKyByZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIEdhbWUuR2FtZU1hbmFnZXIuYmxvY2tJbnB1dCgpO1xuXG4gICAgfSxcblxuICAgIG5ldHdvcmtTdGF0ZU5vdGlmeTogZnVuY3Rpb24obmV0Tm90aWZ5KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibmV0Tm90aWZ5XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIm5ldE5vdGlmeS5vd25lcjpcIiArIG5ldE5vdGlmeS5vd25lcik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi546p5a6277yaXCIgKyBuZXROb3RpZnkudXNlcklEICsgXCIgc3RhdGU6XCIgKyBuZXROb3RpZnkuc3RhdGUpO1xuICAgICAgICAvLyBpZiAoR2FtZS5HYW1lTWFuYWdlci5nYW1lU3RhdGUgPT09IEdhbWVTdGF0ZS5PdmVyKSByZXR1cm47XG4gICAgICAgIGlmIChuZXROb3RpZnkudXNlcklEICE9PSBHTEIudXNlckluZm8uaWQgJiYgR2FtZS5HYW1lTWFuYWdlci5nYW1lU3RhdGUgPT09IEdhbWVTdGF0ZS5QbGF5KSB7XG4gICAgICAgICAgICB1aUZ1bmMub3BlblVJKFwidWlUaXBcIiwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVpVGlwID0gb2JqLmdldENvbXBvbmVudChcInVpVGlwXCIpO1xuICAgICAgICAgICAgICAgIGlmICh1aVRpcCkge1xuICAgICAgICAgICAgICAgICAgICB1aVRpcC5zZXREYXRhKFwi5a+55pa55bey6YCA5Ye6XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIHZhciB3aW5GbGFnO1xuICAgICAgICAgICAgaWYgKEdMQi5pc1Jvb21Pd25lcikge1xuICAgICAgICAgICAgICAgIHdpbkZsYWcgPSBHTEIuUExBWUVSX0ZMQUcuUkVEO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5GbGFnID0gR0xCLlBMQVlFUl9GTEFHLkJMVUU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBHYW1lLkdhbWVNYW5hZ2VyLmdhbWVTdGF0ZSA9IEdhbWVTdGF0ZS5PdmVyO1xuICAgICAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmdhbWVPdmVyLCB3aW5GbGFnKTtcblxuICAgICAgICB9XG4gICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5sZWF2ZVJvb21NZWROb3RpZnksIG5ldE5vdGlmeSk7XG4gICAgfSxcblxuICAgIGtpY2tQbGF5ZXJOb3RpZnk6IGZ1bmN0aW9uKGtpY2tQbGF5ZXJOb3RpZnkpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBraWNrUGxheWVyTm90aWZ5OiBraWNrUGxheWVyTm90aWZ5XG4gICAgICAgIH1cbiAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmtpY2tQbGF5ZXJOb3RpZnksIGRhdGEpO1xuICAgIH0sXG5cbiAgICBraWNrUGxheWVyUmVzcG9uc2U6IGZ1bmN0aW9uKGtpY2tQbGF5ZXJSc3ApIHtcbiAgICAgICAgaWYgKGtpY2tQbGF5ZXJSc3Auc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5aSx6LSla2lja1BsYXllclJzcDpcIiArIGtpY2tQbGF5ZXJSc3ApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAga2lja1BsYXllclJzcDoga2lja1BsYXllclJzcFxuICAgICAgICB9XG4gICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5raWNrUGxheWVyUmVzcG9uc2UsIGRhdGEpO1xuICAgIH0sXG5cbiAgICBnZXRSb29tTGlzdEV4UmVzcG9uc2U6IGZ1bmN0aW9uKHJzcCkge1xuICAgICAgICBpZiAocnNwLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWksei0pSByc3A6XCIgKyByc3ApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgcnNwOiByc3BcbiAgICAgICAgfVxuICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuZ2V0Um9vbUxpc3RFeFJlc3BvbnNlLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgZ2V0Um9vbURldGFpbFJlc3BvbnNlOiBmdW5jdGlvbihyc3ApIHtcbiAgICAgICAgaWYgKHJzcC5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlpLHotKUgcnNwOlwiICsgcnNwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHJzcDogcnNwXG4gICAgICAgIH1cbiAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmdldFJvb21EZXRhaWxSZXNwb25zZSwgZGF0YSk7XG4gICAgfSxcblxuICAgIGdldFJvb21MaXN0UmVzcG9uc2U6IGZ1bmN0aW9uKHN0YXR1cywgcm9vbUluZm9zKSB7XG4gICAgICAgIGlmIChzdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlpLHotKUgc3RhdHVzOlwiICsgc3RhdHVzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIHN0YXR1czogc3RhdHVzLFxuICAgICAgICAgICAgcm9vbUluZm9zOiByb29tSW5mb3NcbiAgICAgICAgfVxuICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuZ2V0Um9vbUxpc3RSZXNwb25zZSwgZGF0YSk7XG4gICAgfSxcblxuICAgIGNyZWF0ZVJvb21SZXNwb25zZTogZnVuY3Rpb24ocnNwKSB7XG4gICAgICAgIGlmIChyc3Auc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5aSx6LSlIGNyZWF0ZVJvb21SZXNwb25zZTpcIiArIHJzcCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICByc3A6IHJzcFxuICAgICAgICB9XG4gICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5jcmVhdGVSb29tUmVzcG9uc2UsIGRhdGEpO1xuICAgIH0sXG5cbiAgICBqb2luT3ZlclJlc3BvbnNlOiBmdW5jdGlvbihqb2luT3ZlclJzcCkge1xuICAgICAgICBpZiAoam9pbk92ZXJSc3Auc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5aSx6LSlIGpvaW5PdmVyUnNwOlwiICsgam9pbk92ZXJSc3ApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgam9pbk92ZXJSc3A6IGpvaW5PdmVyUnNwXG4gICAgICAgIH1cbiAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmpvaW5PdmVyUmVzcG9uc2UsIGRhdGEpO1xuICAgIH0sXG5cbiAgICBqb2luUm9vbVJlc3BvbnNlOiBmdW5jdGlvbihzdGF0dXMsIHJvb21Vc2VySW5mb0xpc3QsIHJvb21JbmZvKSB7XG4gICAgICAgIGlmIChzdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlpLHotKUgam9pblJvb21SZXNwb25zZTpcIiArIHN0YXR1cyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICBzdGF0dXM6IHN0YXR1cyxcbiAgICAgICAgICAgIHJvb21Vc2VySW5mb0xpc3Q6IHJvb21Vc2VySW5mb0xpc3QsXG4gICAgICAgICAgICByb29tSW5mbzogcm9vbUluZm9cbiAgICAgICAgfVxuICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuam9pblJvb21SZXNwb25zZSwgZGF0YSk7XG4gICAgfSxcblxuICAgIGpvaW5Sb29tTm90aWZ5OiBmdW5jdGlvbihyb29tVXNlckluZm8pIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICByb29tVXNlckluZm86IHJvb21Vc2VySW5mb1xuICAgICAgICB9XG4gICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5qb2luUm9vbU5vdGlmeSwgZGF0YSk7XG4gICAgfSxcblxuICAgIGxlYXZlUm9vbVJlc3BvbnNlOiBmdW5jdGlvbihsZWF2ZVJvb21Sc3ApIHtcbiAgICAgICAgaWYgKGxlYXZlUm9vbVJzcC5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlpLHotKUgbGVhdmVSb29tUnNwOlwiICsgbGVhdmVSb29tUnNwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICAgIGxlYXZlUm9vbVJzcDogbGVhdmVSb29tUnNwXG4gICAgICAgIH1cbiAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmxlYXZlUm9vbVJlc3BvbnNlLCBkYXRhKTtcbiAgICB9LFxuXG4gICAgbGVhdmVSb29tTm90aWZ5OiBmdW5jdGlvbihsZWF2ZVJvb21JbmZvKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgbGVhdmVSb29tSW5mbzogbGVhdmVSb29tSW5mb1xuICAgICAgICB9XG4gICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5sZWF2ZVJvb21Ob3RpZnksIGRhdGEpO1xuICAgIH0sXG5cbiAgICBsb2dvdXRSZXNwb25zZTogZnVuY3Rpb24oc3RhdHVzKSB7XG4gICAgICAgIEdhbWUuR2FtZU1hbmFnZXIubmV0d29yay5kaXNjb25uZWN0KCk7XG4gICAgICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnbG9iYnknKTtcbiAgICB9LFxuXG4gICAgZXJyb3JSZXNwb25zZTogZnVuY3Rpb24oZXJyb3IsIG1zZykge1xuICAgICAgICBpZiAoZXJyb3IgPT09IDEwMDEgfHwgZXJyb3IgPT09IDApIHtcbiAgICAgICAgICAgIHVpRnVuYy5vcGVuVUkoXCJ1aVRpcFwiLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICB2YXIgdWlUaXAgPSBvYmouZ2V0Q29tcG9uZW50KFwidWlUaXBcIik7XG4gICAgICAgICAgICAgICAgaWYgKHVpVGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVpVGlwLnNldERhdGEoXCLnvZHnu5zmlq3lvIDov57mjqVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG12cy5lbmdpbmUubG9nb3V0KFwiXCIpO1xuICAgICAgICAgICAgICAgIGNjLmdhbWUucmVtb3ZlUGVyc2lzdFJvb3ROb2RlKHRoaXMubm9kZSk7XG4gICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdsb2JieScpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCAyNTAwKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhcIumUmeivr+S/oeaBr++8mlwiICsgZXJyb3IpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIumUmeivr+S/oeaBr++8mlwiICsgbXNnKTtcbiAgICB9LFxuXG4gICAgaW5pdFJlc3BvbnNlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+WIneWni+WMluaIkOWKn++8jOW8gOWni+azqOWGjOeUqOaItycpO1xuICAgICAgICB2YXIgcmVzdWx0ID0gbXZzLmVuZ2luZS5yZWdpc3RlclVzZXIoKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+azqOWGjOeUqOaIt+Wksei0pe+8jOmUmeivr+eggTonICsgcmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfms6jlhoznlKjmiLfmiJDlip8nKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZWdpc3RlclVzZXJSZXNwb25zZTogZnVuY3Rpb24odXNlckluZm8pIHtcbiAgICAgICAgdmFyIGRldmljZUlkID0gJ2FiY2RlZic7XG4gICAgICAgIHZhciBnYXRld2F5SWQgPSAwO1xuICAgICAgICBHTEIudXNlckluZm8gPSB1c2VySW5mbztcblxuICAgICAgICBjb25zb2xlLmxvZygn5byA5aeL55m75b2VLOeUqOaIt0lkOicgKyB1c2VySW5mby5pZClcblxuICAgICAgICAvKiB2YXIgcmVzdWx0ID0gbXZzLmVuZ2luZS5sb2dpbihcbiAgICAgICAgICAgIHVzZXJJbmZvLmlkLCB1c2VySW5mby50b2tlbixcbiAgICAgICAgICAgIEdMQi5nYW1lSWQsIEdMQi5nYW1lVmVyc2lvbixcbiAgICAgICAgICAgIEdMQi5hcHBLZXksIEdMQi5zZWNyZXQsXG4gICAgICAgICAgICBkZXZpY2VJZCwgZ2F0ZXdheUlkXG4gICAgICAgICk7ICovXG4gICAgICAgIHZhciByZXN1bHQgPSBtdnMuZW5naW5lLmxvZ2luKHVzZXJJbmZvLmlkLCB1c2VySW5mby50b2tlbiwgZGV2aWNlSWQpO1xuICAgICAgICBpZiAocmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55m75b2V5aSx6LSlLOmUmeivr+eggTonICsgcmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsb2dpblJlc3BvbnNlOiBmdW5jdGlvbihpbmZvKSB7XG4gICAgICAgIGlmIChpbmZvLnN0YXR1cyAhPT0gMjAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn55m75b2V5aSx6LSlLOW8guatpeWbnuiwg+mUmeivr+eggTonICsgaW5mby5zdGF0dXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eZu+W9leaIkOWKnycpO1xuICAgICAgICAgICAgdGhpcy5sb2JieVNob3coKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsb2JieVNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmdhbWVTdGF0ZSA9IEdhbWVTdGF0ZS5Ob25lO1xuICAgICAgICAvLyBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2xvYmJ5JylcbiAgICAgICAgaWYgKGNjLkNhbnZhcy5pbnN0YW5jZS5kZXNpZ25SZXNvbHV0aW9uLmhlaWdodCA+IGNjLkNhbnZhcy5pbnN0YW5jZS5kZXNpZ25SZXNvbHV0aW9uLndpZHRoKSB7XG4gICAgICAgICAgICB1aUZ1bmMub3BlblVJKFwidWlMb2JieVBhbmVsVmVyXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdWlGdW5jLm9wZW5VSShcInVpTG9iYnlQYW5lbFwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyDmlLbliLDnmoTmtojmga9cbiAgICBzZW5kRXZlbnROb3RpZnk6IGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgY29uc29sZS5sb2coaW5mbylcbiAgICAgICAgdmFyIGNwUHJvdG8gPSBKU09OLnBhcnNlKGluZm8uY3BQcm90byk7XG4gICAgICAgIGlmIChpbmZvLmNwUHJvdG8uaW5kZXhPZihHTEIuR0FNRV9TVEFSVF9FVkVOVCkgPj0gMCkge1xuICAgICAgICAgICAgR0xCLnBsYXllclVzZXJJZHMgPSBbR0xCLnVzZXJJbmZvLmlkXVxuICAgICAgICAgICAgdmFyIHJlbW90ZVVzZXJJZHMgPSBKU09OLnBhcnNlKGluZm8uY3BQcm90bykudXNlcklkcztcbiAgICAgICAgICAgIHJlbW90ZVVzZXJJZHMuZm9yRWFjaChmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICAgIGlmIChHTEIudXNlckluZm8uaWQgIT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIEdMQi5wbGF5ZXJVc2VySWRzLnB1c2goaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmZvLmNwUHJvdG8uaW5kZXhPZihHTEIuR0FNRV9PVkVSX0VWRU5UKSA+PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKirmlLbliLDkuobmuLjmiI/nu5PmnZ/nmoTmtojmga8qKioqKioqKicpXG4gICAgICAgICAgICB2YXIgd2luRmxhZyA9IEpTT04ucGFyc2UoaW5mby5jcFByb3RvKS53aW5GbGFnO1xuICAgICAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmdhbWVPdmVyLCB3aW5GbGFnKTtcbiAgICAgICAgICAgIC8vIHRoaXMuZ2FtZU92ZXIod2luRmxhZyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5mby5jcFByb3RvLmluZGV4T2YoR0xCLkVYSVQpID49IDApIHtcbiAgICAgICAgICAgIC8vIGlmKGluZm8uc3JjVXNlcklkID09IEdMQi51c2VySW5mby5pZCkge1xuICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCfmiJHpgIDlh7rkuobmuLjmiI8nKVxuICAgICAgICAgICAgLy8gICAgIHRoaXMuaXNMb2FkR2FtZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcqKioqKioqKuWvueaWuemAgOWHuuS6hua4uOaIjyoqKioqKioqJylcbiAgICAgICAgICAgIHVpRnVuYy5vcGVuVUkoXCJ1aVRpcFwiLCBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICAgICAgICB2YXIgdWlUaXAgPSBvYmouZ2V0Q29tcG9uZW50KFwidWlUaXBcIik7XG4gICAgICAgICAgICAgICAgaWYgKHVpVGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIHVpVGlwLnNldERhdGEoXCLlr7nmlrnlt7LpgIDlh7pcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHZhciB3aW5GbGFnO1xuICAgICAgICAgICAgaWYgKEdMQi5pc1Jvb21Pd25lcikge1xuICAgICAgICAgICAgICAgIHdpbkZsYWcgPSBHTEIuUExBWUVSX0ZMQUcuUkVEO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5GbGFnID0gR0xCLlBMQVlFUl9GTEFHLkJMVUU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuZ2FtZU92ZXIsIHdpbkZsYWcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uY3BQcm90by5pbmRleE9mKEdMQi5SRUFEWSkgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5yZWFkeUNudCsrO1xuICAgICAgICAgICAgaWYgKEdMQi5pc1Jvb21Pd25lciAmJiB0aGlzLnJlYWR5Q250ID49IEdMQi5wbGF5ZXJVc2VySWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VuZFJvdW5kU3RhcnRNc2coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmZvLmNwUHJvdG8uaW5kZXhPZihHTEIuUk9VTkRfU1RBUlQpID49IDApIHtcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyAgICAgR2FtZS5HYW1lTWFuYWdlci5nYW1lU3RhdGUgPSBHYW1lU3RhdGUuUGxheTtcbiAgICAgICAgICAgIC8vIH0uYmluZCh0aGlzKSwgMjAwMCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tZGlzcGF0Y2ggcm91bmRTdGFydC0tLS0tLScpO1xuICAgICAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLnJvdW5kU3RhcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uY3BQcm90by5pbmRleE9mKEdMQi5DT1VOVF9USU1FKSA+PSAwKSB7XG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUudXBkYXRlVGltZSwgSlNPTi5wYXJzZShpbmZvLmNwUHJvdG8pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5mby5jcFByb3RvLmluZGV4T2YoR0xCLkNIQU5HRV9GTEFHKSA+PSAwKSB7XG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuY2hhbmdlRmxhZyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgKGluZm8uY3BQcm90by5pbmRleE9mKEdMQi5DTEVBUl9DSEVTUykgPj0gMCkge1xuICAgICAgICAvLyAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLmNsZWFyQ2hlc3MpO1xuICAgICAgICAvLyB9XG4gICAgICAgIGlmIChpbmZvLmNwUHJvdG8uaW5kZXhPZihHTEIuU0VORF9NQVBfSU5GTykgPj0gMCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtID0gSlNPTi5wYXJzZShpbmZvLmNwUHJvdG8pO1xuICAgICAgICAgICAgY2xpZW50RXZlbnQuZGlzcGF0Y2goY2xpZW50RXZlbnQuZXZlbnRUeXBlLm1hcEluaXQsIHBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5mby5jcFByb3RvLmluZGV4T2YoR0xCLk9QRU5fRk9SX09USEVSKSA+PSAwKSB7XG4gICAgICAgICAgICBpZihpbmZvLnNyY1VzZXJJZCA9PSBHTEIudXNlckluZm8uaWQpIHJldHVybjtcbiAgICAgICAgICAgIHZhciB0YWcgPSBKU09OLnBhcnNlKGluZm8uY3BQcm90bykuc2lnbjtcbiAgICAgICAgICAgIGNsaWVudEV2ZW50LmRpc3BhdGNoKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5vcGVuRm9yT3RoZXIsIHRhZyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZm8uY3BQcm90by5pbmRleE9mKEdMQi5FQVRfRk9SX09USEVSKSA+PSAwKSB7XG4gICAgICAgICAgICBpZihpbmZvLnNyY1VzZXJJZCA9PSBHTEIudXNlckluZm8uaWQpIHJldHVybjtcbiAgICAgICAgICAgIHZhciBlYXRJbmZvID0gSlNPTi5wYXJzZShpbmZvLmNwUHJvdG8pLmVhdEluZm87XG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuZWF0Rm9yT3RoZXIsIGVhdEluZm8pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNlbmRSZWFkeU1zZzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtc2cgPSB7YWN0aW9uOiBHTEIuUkVBRFl9O1xuICAgICAgICB0aGlzLnNlbmRFdmVudEV4KG1zZyk7XG4gICAgfSxcblxuICAgIHNlbmRSb3VuZFN0YXJ0TXNnOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1zZyA9IHthY3Rpb246IEdMQi5ST1VORF9TVEFSVH07XG4gICAgICAgIHRoaXMuc2VuZEV2ZW50RXgobXNnKTtcbiAgICB9LFxuXG4gICAgc2VuZEV2ZW50RXg6IGZ1bmN0aW9uKG1zZykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbXZzLmVuZ2luZS5zZW5kRXZlbnRFeCgwLCBKU09OLnN0cmluZ2lmeShtc2cpLCAwLCBHTEIucGxheWVyVXNlcklkcyk7XG4gICAgICAgIGlmIChyZXN1bHQucmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cuYWN0aW9uLCByZXN1bHQucmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZW5kRXZlbnQ6IGZ1bmN0aW9uKG1zZykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbXZzLmVuZ2luZS5zZW5kRXZlbnQoSlNPTi5zdHJpbmdpZnkobXNnKSk7XG4gICAgICAgIGlmIChyZXN1bHQucmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cuYWN0aW9uLCByZXN1bHQucmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGFydEdhbWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnLS0tLS1zdGFydEdhbWUtLS0tLScpXG4gICAgICAgIGlmKHRoaXMuaXNMb2FkR2FtZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzTG9hZEdhbWUgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlYWR5Q250ID0gMDtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdnYW1lJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUuY2xlYXJDaGVzcyk7XG4gICAgICAgICAgICB1aUZ1bmMub3BlblVJKFwidWlHYW1lUGFuZWxcIiwgZnVuY3Rpb24ocGFuZWwpIHtcbiAgICAgICAgICAgICAgICBwYW5lbC5nZXRDb21wb25lbnQoXCJ1aUdhbWVQYW5lbFwiKS50aW1lTGFiZWxJbml0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRSZWFkeU1zZygpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgZ2V0UmFua0RhdGFMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubmV0d29yay5vbihcImNvbm5lY3Rvci5yYW5rSGFuZGxlci5nZXRSYW5rRGF0YVwiLCBmdW5jdGlvbihyZWN2TXNnKSB7XG4gICAgICAgICAgICB1aUZ1bmMub3BlblVJKFwidWlSYW5rUGFuZWxWZXJcIiwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVpUmFua1BhbmVsID0gb2JqLmdldENvbXBvbmVudChcInVpUmFua1BhbmVsXCIpO1xuICAgICAgICAgICAgICAgIHVpUmFua1BhbmVsLnNldERhdGEocmVjdk1zZy5yYW5rQXJyYXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIGZpbmRQbGF5ZXJCeUFjY291bnRMaXN0ZW5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubmV0d29yay5vbihcImNvbm5lY3Rvci5lbnRyeUhhbmRsZXIuZmluZFBsYXllckJ5QWNjb3VudFwiLCBmdW5jdGlvbihyZWN2TXNnKSB7XG4gICAgICAgICAgICBjbGllbnRFdmVudC5kaXNwYXRjaChjbGllbnRFdmVudC5ldmVudFR5cGUucGxheWVyQWNjb3VudEdldCwgcmVjdk1zZyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBsb2dpblNlcnZlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5uZXR3b3JrLmlzQ29ubmVjdGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMubmV0d29yay5jb25uZWN0KEdMQi5JUCwgR0xCLlBPUlQsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5ldHdvcmsuc2VuZChcImNvbm5lY3Rvci5lbnRyeUhhbmRsZXIubG9naW5cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY2NvdW50XCI6IEdMQi51c2VySW5mby5pZCArIFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoYW5uZWxcIjogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJOYW1lXCI6IEdhbWUuR2FtZU1hbmFnZXIubmlja05hbWUgPyBHYW1lLkdhbWVNYW5hZ2VyLm5pY2tOYW1lIDogR0xCLnVzZXJJbmZvLmlkICsgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVhZEljb25cIjogR2FtZS5HYW1lTWFuYWdlci5hdmF0YXJVcmwgPyBHYW1lLkdhbWVNYW5hZ2VyLmF2YXRhclVybCA6IFwiLVwiXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXR3b3JrLnNlbmQoXCJjb25uZWN0b3IucmFua0hhbmRsZXIudXBkYXRlU2NvcmVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNjb3VudFwiOiBHTEIudXNlckluZm8uaWQgKyBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZ2FtZVwiOiBcImdhbWU4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksIDUwMCk7XG5cbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5ldHdvcmsuc2VuZChcImNvbm5lY3Rvci5yYW5rSGFuZGxlci51cGRhdGVTY29yZVwiLCB7XG4gICAgICAgICAgICAgICAgXCJhY2NvdW50XCI6IEdMQi51c2VySW5mby5pZCArIFwiXCIsXG4gICAgICAgICAgICAgICAgXCJnYW1lXCI6IFwiZ2FtZThcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXNlckluZm9SZXE6IGZ1bmN0aW9uKHVzZXJJZCkge1xuICAgICAgICBpZiAoIUdhbWUuR2FtZU1hbmFnZXIubmV0d29yay5pc0Nvbm5lY3RlZCgpKSB7XG4gICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLm5ldHdvcmsuY29ubmVjdChHTEIuSVAsIEdMQi5QT1JULCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5uZXR3b3JrLnNlbmQoXCJjb25uZWN0b3IuZW50cnlIYW5kbGVyLmxvZ2luXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNjb3VudFwiOiBHTEIudXNlckluZm8uaWQgKyBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFubmVsXCI6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBHYW1lLkdhbWVNYW5hZ2VyLm5pY2tOYW1lID8gR2FtZS5HYW1lTWFuYWdlci5uaWNrTmFtZSA6IEdMQi51c2VySW5mby5pZCArIFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImhlYWRJY29uXCI6IEdhbWUuR2FtZU1hbmFnZXIuYXZhdGFyVXJsID8gR2FtZS5HYW1lTWFuYWdlci5hdmF0YXJVcmwgOiBcIi1cIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUuR2FtZU1hbmFnZXIubmV0d29yay5zZW5kKFwiY29ubmVjdG9yLmVudHJ5SGFuZGxlci5maW5kUGxheWVyQnlBY2NvdW50XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFjY291bnRcIjogdXNlcklkICsgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLm5ldHdvcmsuc2VuZChcImNvbm5lY3Rvci5lbnRyeUhhbmRsZXIuZmluZFBsYXllckJ5QWNjb3VudFwiLCB7XG4gICAgICAgICAgICAgICAgXCJhY2NvdW50XCI6IHVzZXJJZCArIFwiXCIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5nYW1lT3ZlciwgdGhpcy5nYW1lT3ZlciwgdGhpcyk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUubGVhdmVSb29tTm90aWZ5LCB0aGlzLmxlYXZlUm9vbSwgdGhpcyk7XG4gICAgfVxufSk7XG4iXX0=