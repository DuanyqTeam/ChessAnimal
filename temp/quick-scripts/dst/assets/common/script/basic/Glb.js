
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/Glb.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cef8cvciudNVpcgOCH7pFJf', 'Glb');
// common/script/basic/Glb.js

"use strict";

var obj = {
  RANDOM_MATCH: 1,
  // 随机匹配
  PROPERTY_MATCH: 2,
  // 属性匹配
  MAX_PLAYER_COUNT: 2,
  PLAYER_COUNTS: [2],
  COOPERATION: 1,
  COMPETITION: 2,
  GAME_START_EVENT: "gameStart",
  GAME_TIME: "gameTime",
  GAME_OVER_EVENT: "gameOver",
  ROUND_START: "roundStart",
  READY: "ready",
  channel: 'MatchVS',
  platform: 'alpha',
  IP: "wxrank.matchvs.com",
  PORT: "3010",
  PLAYER_FLAG: {
    RED: 1,
    BLUE: 2
  },
  ROUND_TIP: {
    OTHER: 2,
    SELF: 1
  },
  gameId: 201554,
  gameVersion: 1,
  // GAME_NAME: 'game8',
  appKey: 'd4e29d00bd3a48e2acf4f6e7a5ffe270',
  secret: 'f0f7bd601d9f43db840091ac08a17002',
  gameType: 2,
  matchType: 1,
  tagsInfo: {
    "title": "A"
  },
  userInfo: null,
  playerUserIds: [],
  playerSet: new Set(),
  isRoomOwner: false,
  events: {},
  syncFrame: false,
  FRAME_RATE: 20,
  roomId: 0,
  playertime: 180,
  isGameOver: false,
  COUNT_TIME: "countTime",
  UPDATE_TIME: "updateTime",
  SEND_MAP_INFO: "sendMapInfo",
  SHOW_CHESS_INFO: "showChessInfo",
  CHESS_BOARD_LIST: "chessBoardList",
  CHANGE_FLAG: "changeFlag",
  OPEN_FOR_OTHER: "openForOther",
  EAT_FOR_OTHER: "eatForOther",
  CLEAR_CHESS: "clearChess",
  EXIT: "exit",
  // 连着6回合 12步都没有进行吃的操作
  needStepNoEat: 12
};
module.exports = obj;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL0dsYi5qcyJdLCJuYW1lcyI6WyJvYmoiLCJSQU5ET01fTUFUQ0giLCJQUk9QRVJUWV9NQVRDSCIsIk1BWF9QTEFZRVJfQ09VTlQiLCJQTEFZRVJfQ09VTlRTIiwiQ09PUEVSQVRJT04iLCJDT01QRVRJVElPTiIsIkdBTUVfU1RBUlRfRVZFTlQiLCJHQU1FX1RJTUUiLCJHQU1FX09WRVJfRVZFTlQiLCJST1VORF9TVEFSVCIsIlJFQURZIiwiY2hhbm5lbCIsInBsYXRmb3JtIiwiSVAiLCJQT1JUIiwiUExBWUVSX0ZMQUciLCJSRUQiLCJCTFVFIiwiUk9VTkRfVElQIiwiT1RIRVIiLCJTRUxGIiwiZ2FtZUlkIiwiZ2FtZVZlcnNpb24iLCJhcHBLZXkiLCJzZWNyZXQiLCJnYW1lVHlwZSIsIm1hdGNoVHlwZSIsInRhZ3NJbmZvIiwidXNlckluZm8iLCJwbGF5ZXJVc2VySWRzIiwicGxheWVyU2V0IiwiU2V0IiwiaXNSb29tT3duZXIiLCJldmVudHMiLCJzeW5jRnJhbWUiLCJGUkFNRV9SQVRFIiwicm9vbUlkIiwicGxheWVydGltZSIsImlzR2FtZU92ZXIiLCJDT1VOVF9USU1FIiwiVVBEQVRFX1RJTUUiLCJTRU5EX01BUF9JTkZPIiwiU0hPV19DSEVTU19JTkZPIiwiQ0hFU1NfQk9BUkRfTElTVCIsIkNIQU5HRV9GTEFHIiwiT1BFTl9GT1JfT1RIRVIiLCJFQVRfRk9SX09USEVSIiwiQ0xFQVJfQ0hFU1MiLCJFWElUIiwibmVlZFN0ZXBOb0VhdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsR0FBRyxHQUFHO0FBQ05DLEVBQUFBLFlBQVksRUFBRSxDQURSO0FBQ1k7QUFDbEJDLEVBQUFBLGNBQWMsRUFBRSxDQUZWO0FBRWM7QUFDcEJDLEVBQUFBLGdCQUFnQixFQUFFLENBSFo7QUFJTkMsRUFBQUEsYUFBYSxFQUFFLENBQUMsQ0FBRCxDQUpUO0FBS05DLEVBQUFBLFdBQVcsRUFBRSxDQUxQO0FBTU5DLEVBQUFBLFdBQVcsRUFBRSxDQU5QO0FBT05DLEVBQUFBLGdCQUFnQixFQUFFLFdBUFo7QUFRTkMsRUFBQUEsU0FBUyxFQUFFLFVBUkw7QUFTTkMsRUFBQUEsZUFBZSxFQUFFLFVBVFg7QUFVTkMsRUFBQUEsV0FBVyxFQUFFLFlBVlA7QUFXTkMsRUFBQUEsS0FBSyxFQUFFLE9BWEQ7QUFZTkMsRUFBQUEsT0FBTyxFQUFFLFNBWkg7QUFhTkMsRUFBQUEsUUFBUSxFQUFFLE9BYko7QUFjTkMsRUFBQUEsRUFBRSxFQUFFLG9CQWRFO0FBZU5DLEVBQUFBLElBQUksRUFBRSxNQWZBO0FBaUJOQyxFQUFBQSxXQUFXLEVBQUU7QUFDWEMsSUFBQUEsR0FBRyxFQUFFLENBRE07QUFFWEMsSUFBQUEsSUFBSSxFQUFFO0FBRkssR0FqQlA7QUFzQk5DLEVBQUFBLFNBQVMsRUFBRTtBQUNUQyxJQUFBQSxLQUFLLEVBQUUsQ0FERTtBQUVUQyxJQUFBQSxJQUFJLEVBQUU7QUFGRyxHQXRCTDtBQTJCTkMsRUFBQUEsTUFBTSxFQUFFLE1BM0JGO0FBNEJOQyxFQUFBQSxXQUFXLEVBQUUsQ0E1QlA7QUE2Qk47QUFDQUMsRUFBQUEsTUFBTSxFQUFFLGtDQTlCRjtBQStCTkMsRUFBQUEsTUFBTSxFQUFFLGtDQS9CRjtBQWlDTkMsRUFBQUEsUUFBUSxFQUFFLENBakNKO0FBa0NOQyxFQUFBQSxTQUFTLEVBQUUsQ0FsQ0w7QUFtQ05DLEVBQUFBLFFBQVEsRUFBRTtBQUFFLGFBQVM7QUFBWCxHQW5DSjtBQW9DTkMsRUFBQUEsUUFBUSxFQUFFLElBcENKO0FBcUNOQyxFQUFBQSxhQUFhLEVBQUUsRUFyQ1Q7QUFzQ05DLEVBQUFBLFNBQVMsRUFBRSxJQUFJQyxHQUFKLEVBdENMO0FBdUNOQyxFQUFBQSxXQUFXLEVBQUUsS0F2Q1A7QUF3Q05DLEVBQUFBLE1BQU0sRUFBRSxFQXhDRjtBQTBDTkMsRUFBQUEsU0FBUyxFQUFFLEtBMUNMO0FBMkNOQyxFQUFBQSxVQUFVLEVBQUUsRUEzQ047QUE0Q05DLEVBQUFBLE1BQU0sRUFBRSxDQTVDRjtBQTZDTkMsRUFBQUEsVUFBVSxFQUFFLEdBN0NOO0FBOENOQyxFQUFBQSxVQUFVLEVBQUUsS0E5Q047QUFnRE5DLEVBQUFBLFVBQVUsRUFBRSxXQWhETjtBQWlETkMsRUFBQUEsV0FBVyxFQUFFLFlBakRQO0FBa0ROQyxFQUFBQSxhQUFhLEVBQUUsYUFsRFQ7QUFtRE5DLEVBQUFBLGVBQWUsRUFBRSxlQW5EWDtBQW9ETkMsRUFBQUEsZ0JBQWdCLEVBQUUsZ0JBcERaO0FBcUROQyxFQUFBQSxXQUFXLEVBQUUsWUFyRFA7QUFzRE5DLEVBQUFBLGNBQWMsRUFBRSxjQXREVjtBQXVETkMsRUFBQUEsYUFBYSxFQUFFLGFBdkRUO0FBd0ROQyxFQUFBQSxXQUFXLEVBQUUsWUF4RFA7QUF5RE5DLEVBQUFBLElBQUksRUFBRSxNQXpEQTtBQTJETjtBQUNBQyxFQUFBQSxhQUFhLEVBQUU7QUE1RFQsQ0FBVjtBQThEQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCcEQsR0FBakIiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQvYmFzaWMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgb2JqID0ge1xyXG4gICAgUkFORE9NX01BVENIOiAxLCAgLy8g6ZqP5py65Yy56YWNXHJcbiAgICBQUk9QRVJUWV9NQVRDSDogMiwgIC8vIOWxnuaAp+WMuemFjVxyXG4gICAgTUFYX1BMQVlFUl9DT1VOVDogMixcclxuICAgIFBMQVlFUl9DT1VOVFM6IFsyXSxcclxuICAgIENPT1BFUkFUSU9OOiAxLFxyXG4gICAgQ09NUEVUSVRJT046IDIsXHJcbiAgICBHQU1FX1NUQVJUX0VWRU5UOiBcImdhbWVTdGFydFwiLFxyXG4gICAgR0FNRV9USU1FOiBcImdhbWVUaW1lXCIsXHJcbiAgICBHQU1FX09WRVJfRVZFTlQ6IFwiZ2FtZU92ZXJcIixcclxuICAgIFJPVU5EX1NUQVJUOiBcInJvdW5kU3RhcnRcIixcclxuICAgIFJFQURZOiBcInJlYWR5XCIsXHJcbiAgICBjaGFubmVsOiAnTWF0Y2hWUycsXHJcbiAgICBwbGF0Zm9ybTogJ2FscGhhJyxcclxuICAgIElQOiBcInd4cmFuay5tYXRjaHZzLmNvbVwiLFxyXG4gICAgUE9SVDogXCIzMDEwXCIsXHJcblxyXG4gICAgUExBWUVSX0ZMQUc6IHtcclxuICAgICAgUkVEOiAxLFxyXG4gICAgICBCTFVFOiAyXHJcbiAgICB9LFxyXG5cclxuICAgIFJPVU5EX1RJUDoge1xyXG4gICAgICBPVEhFUjogMixcclxuICAgICAgU0VMRjogMSxcclxuICAgIH0sXHJcblxyXG4gICAgZ2FtZUlkOiAyMDE1NTQsXHJcbiAgICBnYW1lVmVyc2lvbjogMSxcclxuICAgIC8vIEdBTUVfTkFNRTogJ2dhbWU4JyxcclxuICAgIGFwcEtleTogJ2Q0ZTI5ZDAwYmQzYTQ4ZTJhY2Y0ZjZlN2E1ZmZlMjcwJyxcclxuICAgIHNlY3JldDogJ2YwZjdiZDYwMWQ5ZjQzZGI4NDAwOTFhYzA4YTE3MDAyJyxcclxuXHJcbiAgICBnYW1lVHlwZTogMixcclxuICAgIG1hdGNoVHlwZTogMSxcclxuICAgIHRhZ3NJbmZvOiB7IFwidGl0bGVcIjogXCJBXCIgfSxcclxuICAgIHVzZXJJbmZvOiBudWxsLFxyXG4gICAgcGxheWVyVXNlcklkczogW10sXHJcbiAgICBwbGF5ZXJTZXQ6IG5ldyBTZXQoKSxcclxuICAgIGlzUm9vbU93bmVyOiBmYWxzZSxcclxuICAgIGV2ZW50czoge30sXHJcblxyXG4gICAgc3luY0ZyYW1lOiBmYWxzZSxcclxuICAgIEZSQU1FX1JBVEU6IDIwLFxyXG4gICAgcm9vbUlkOiAwLFxyXG4gICAgcGxheWVydGltZTogMTgwLFxyXG4gICAgaXNHYW1lT3ZlcjogZmFsc2UsXHJcblxyXG4gICAgQ09VTlRfVElNRTogXCJjb3VudFRpbWVcIixcclxuICAgIFVQREFURV9USU1FOiBcInVwZGF0ZVRpbWVcIixcclxuICAgIFNFTkRfTUFQX0lORk86IFwic2VuZE1hcEluZm9cIixcclxuICAgIFNIT1dfQ0hFU1NfSU5GTzogXCJzaG93Q2hlc3NJbmZvXCIsXHJcbiAgICBDSEVTU19CT0FSRF9MSVNUOiBcImNoZXNzQm9hcmRMaXN0XCIsXHJcbiAgICBDSEFOR0VfRkxBRzogXCJjaGFuZ2VGbGFnXCIsXHJcbiAgICBPUEVOX0ZPUl9PVEhFUjogXCJvcGVuRm9yT3RoZXJcIixcclxuICAgIEVBVF9GT1JfT1RIRVI6IFwiZWF0Rm9yT3RoZXJcIixcclxuICAgIENMRUFSX0NIRVNTOiBcImNsZWFyQ2hlc3NcIixcclxuICAgIEVYSVQ6IFwiZXhpdFwiLFxyXG5cclxuICAgIC8vIOi/nuedgDblm57lkIggMTLmraXpg73msqHmnInov5vooYzlkIPnmoTmk43kvZxcclxuICAgIG5lZWRTdGVwTm9FYXQ6IDEyXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gb2JqOyJdfQ==