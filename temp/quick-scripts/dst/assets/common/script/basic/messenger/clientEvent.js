
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/messenger/clientEvent.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '771d9tmDfZB9b/EtuKXDtNa', 'clientEvent');
// common/script/basic/messenger/clientEvent.js

"use strict";

window.clientEvent = {
  eventType: {
    openUI: "openUI",
    closeUI: "closeUI",
    gameStart: "gameStart",
    gameOver: "gameOver",
    roundStart: "roundStart",
    time: "time",
    score: "score",
    playerAccountGet: "playerAccountGet",
    initResponse: "initResponse",
    errorResponse: "errorResponse",
    joinRoomResponse: "joinRoomResponse",
    joinRoomNotify: "joinRoomNotify",
    leaveRoomResponse: "leaveRoomResponse",
    leaveRoomNotify: "leaveRoomNotify",
    joinOverResponse: "joinOverResponse",
    createRoomResponse: "createRoomResponse",
    getRoomListResponse: "getRoomListResponse",
    getRoomDetailResponse: "getRoomDetailResponse",
    getRoomListExResponse: "getRoomListExResponse",
    kickPlayerResponse: "kickPlayerResponse",
    kickPlayerNotify: "kickPlayerNotify",
    leaveRoomMedNotify: "leaveRoomMedNotify",
    updateTime: "updateTime",
    eatForChess: "eatForChess",
    checkMoveDirection: "checkMoveDirection",
    openChessPiece: "openChessPiece",
    isGameOver: "isGameOver",
    mapInit: "mapInit",
    countTime: "countTime",
    changeFlag: "changeFlag",
    openForOther: "openForOther",
    eatForOther: "eatForOther",
    getMap: "getMap",
    stopTimeWarnAnim: "stopTimeWarnAnim",
    clearChess: "clearChess"
  },
  eventListener: null
};

clientEvent.init = function () {
  clientEvent.eventListener = eventListener.create();
};

clientEvent.on = function (eventName, handler, target) {
  if (typeof eventName !== "string") {
    return;
  }

  clientEvent.eventListener.on(eventName, handler, target);
};

clientEvent.off = function (eventName, handler, target) {
  if (typeof eventName !== "string") {
    return;
  }

  clientEvent.eventListener.off(eventName, handler, target);
};

clientEvent.clear = function (target) {
  clientEvent.eventListener.clear(target);
};

clientEvent.dispatch = function (eventName, data) {
  if (typeof eventName !== "string") {
    return;
  }

  clientEvent.eventListener.dispatch(eventName, data);
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL21lc3Nlbmdlci9hc3NldHMvY29tbW9uL3NjcmlwdC9iYXNpYy9tZXNzZW5nZXIvY2xpZW50RXZlbnQuanMiXSwibmFtZXMiOlsid2luZG93IiwiY2xpZW50RXZlbnQiLCJldmVudFR5cGUiLCJvcGVuVUkiLCJjbG9zZVVJIiwiZ2FtZVN0YXJ0IiwiZ2FtZU92ZXIiLCJyb3VuZFN0YXJ0IiwidGltZSIsInNjb3JlIiwicGxheWVyQWNjb3VudEdldCIsImluaXRSZXNwb25zZSIsImVycm9yUmVzcG9uc2UiLCJqb2luUm9vbVJlc3BvbnNlIiwiam9pblJvb21Ob3RpZnkiLCJsZWF2ZVJvb21SZXNwb25zZSIsImxlYXZlUm9vbU5vdGlmeSIsImpvaW5PdmVyUmVzcG9uc2UiLCJjcmVhdGVSb29tUmVzcG9uc2UiLCJnZXRSb29tTGlzdFJlc3BvbnNlIiwiZ2V0Um9vbURldGFpbFJlc3BvbnNlIiwiZ2V0Um9vbUxpc3RFeFJlc3BvbnNlIiwia2lja1BsYXllclJlc3BvbnNlIiwia2lja1BsYXllck5vdGlmeSIsImxlYXZlUm9vbU1lZE5vdGlmeSIsInVwZGF0ZVRpbWUiLCJlYXRGb3JDaGVzcyIsImNoZWNrTW92ZURpcmVjdGlvbiIsIm9wZW5DaGVzc1BpZWNlIiwiaXNHYW1lT3ZlciIsIm1hcEluaXQiLCJjb3VudFRpbWUiLCJjaGFuZ2VGbGFnIiwib3BlbkZvck90aGVyIiwiZWF0Rm9yT3RoZXIiLCJnZXRNYXAiLCJzdG9wVGltZVdhcm5BbmltIiwiY2xlYXJDaGVzcyIsImV2ZW50TGlzdGVuZXIiLCJpbml0IiwiY3JlYXRlIiwib24iLCJldmVudE5hbWUiLCJoYW5kbGVyIiwidGFyZ2V0Iiwib2ZmIiwiY2xlYXIiLCJkaXNwYXRjaCIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsV0FBUCxHQUFxQjtBQUNqQkMs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LEVBQTBCO0FBQzdDLE1BQUksT0FBT04sU0FBUCxLQUFxQixRQUF6QixFQUFtQztBQUMvQjtBQUNIOztBQUNEekMsRUFBQUEsV0FBVyxDQUFDcUMsYUFBWixDQUEwQlMsUUFBMUIsQ0FBbUNMLFNBQW5DLEVBQThDTSxJQUE5QztBQUNILENBTEQiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQvYmFzaWMvbWVzc2VuZ2VyIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93LmNsaWVudEV2ZW50ID0ge1xuICAgIGV2ZW50VHlwZToge1xuICAgICAgICBvcGVuVUk6IFwib3BlblVJXCIsXG4gICAgICAgIGNsb3NlVUk6IFwiY2xvc2VVSVwiLFxuICAgICAgICBnYW1lU3RhcnQ6IFwiZ2FtZVN0YXJ0XCIsXG4gICAgICAgIGdhbWVPdmVyOiBcImdhbWVPdmVyXCIsXG4gICAgICAgIHJvdW5kU3RhcnQ6IFwicm91bmRTdGFydFwiLFxuICAgICAgICB0aW1lOiBcInRpbWVcIixcbiAgICAgICAgc2NvcmU6IFwic2NvcmVcIixcblxuICAgICAgICBwbGF5ZXJBY2NvdW50R2V0OiBcInBsYXllckFjY291bnRHZXRcIixcbiAgICAgICAgaW5pdFJlc3BvbnNlOiBcImluaXRSZXNwb25zZVwiLFxuICAgICAgICBlcnJvclJlc3BvbnNlOiBcImVycm9yUmVzcG9uc2VcIixcbiAgICAgICAgam9pblJvb21SZXNwb25zZTogXCJqb2luUm9vbVJlc3BvbnNlXCIsXG4gICAgICAgIGpvaW5Sb29tTm90aWZ5OiBcImpvaW5Sb29tTm90aWZ5XCIsXG4gICAgICAgIGxlYXZlUm9vbVJlc3BvbnNlOiBcImxlYXZlUm9vbVJlc3BvbnNlXCIsXG4gICAgICAgIGxlYXZlUm9vbU5vdGlmeTogXCJsZWF2ZVJvb21Ob3RpZnlcIixcbiAgICAgICAgam9pbk92ZXJSZXNwb25zZTogXCJqb2luT3ZlclJlc3BvbnNlXCIsXG4gICAgICAgIGNyZWF0ZVJvb21SZXNwb25zZTogXCJjcmVhdGVSb29tUmVzcG9uc2VcIixcbiAgICAgICAgZ2V0Um9vbUxpc3RSZXNwb25zZTogXCJnZXRSb29tTGlzdFJlc3BvbnNlXCIsXG4gICAgICAgIGdldFJvb21EZXRhaWxSZXNwb25zZTogXCJnZXRSb29tRGV0YWlsUmVzcG9uc2VcIixcbiAgICAgICAgZ2V0Um9vbUxpc3RFeFJlc3BvbnNlOiBcImdldFJvb21MaXN0RXhSZXNwb25zZVwiLFxuICAgICAgICBraWNrUGxheWVyUmVzcG9uc2U6IFwia2lja1BsYXllclJlc3BvbnNlXCIsXG4gICAgICAgIGtpY2tQbGF5ZXJOb3RpZnk6IFwia2lja1BsYXllck5vdGlmeVwiLFxuICAgICAgICBsZWF2ZVJvb21NZWROb3RpZnk6XCJsZWF2ZVJvb21NZWROb3RpZnlcIixcblxuICAgICAgICB1cGRhdGVUaW1lOiBcInVwZGF0ZVRpbWVcIixcbiAgICAgICAgZWF0Rm9yQ2hlc3M6IFwiZWF0Rm9yQ2hlc3NcIixcbiAgICAgICAgY2hlY2tNb3ZlRGlyZWN0aW9uOiBcImNoZWNrTW92ZURpcmVjdGlvblwiLFxuICAgICAgICBvcGVuQ2hlc3NQaWVjZTogXCJvcGVuQ2hlc3NQaWVjZVwiLFxuICAgICAgICBpc0dhbWVPdmVyOiBcImlzR2FtZU92ZXJcIixcbiAgICAgICAgbWFwSW5pdDogXCJtYXBJbml0XCIsXG4gICAgICAgIGNvdW50VGltZTogXCJjb3VudFRpbWVcIixcbiAgICAgICAgY2hhbmdlRmxhZzogXCJjaGFuZ2VGbGFnXCIsXG4gICAgICAgIG9wZW5Gb3JPdGhlcjogXCJvcGVuRm9yT3RoZXJcIixcbiAgICAgICAgZWF0Rm9yT3RoZXI6IFwiZWF0Rm9yT3RoZXJcIixcbiAgICAgICAgZ2V0TWFwOiBcImdldE1hcFwiLFxuICAgICAgICBzdG9wVGltZVdhcm5BbmltOiBcInN0b3BUaW1lV2FybkFuaW1cIixcbiAgICAgICAgY2xlYXJDaGVzczogXCJjbGVhckNoZXNzXCIsXG4gICAgfSxcbiAgICBldmVudExpc3RlbmVyOiBudWxsXG59XG5cbmNsaWVudEV2ZW50LmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBjbGllbnRFdmVudC5ldmVudExpc3RlbmVyID0gZXZlbnRMaXN0ZW5lci5jcmVhdGUoKTtcbn07XG5cbmNsaWVudEV2ZW50Lm9uID0gZnVuY3Rpb24oZXZlbnROYW1lLCBoYW5kbGVyLCB0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNsaWVudEV2ZW50LmV2ZW50TGlzdGVuZXIub24oZXZlbnROYW1lLCBoYW5kbGVyLCB0YXJnZXQpO1xufTtcblxuY2xpZW50RXZlbnQub2ZmID0gZnVuY3Rpb24oZXZlbnROYW1lLCBoYW5kbGVyLCB0YXJnZXQpIHtcbiAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNsaWVudEV2ZW50LmV2ZW50TGlzdGVuZXIub2ZmKGV2ZW50TmFtZSwgaGFuZGxlciwgdGFyZ2V0KTtcbn07XG5cbmNsaWVudEV2ZW50LmNsZWFyID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gICAgY2xpZW50RXZlbnQuZXZlbnRMaXN0ZW5lci5jbGVhcih0YXJnZXQpO1xufTtcblxuY2xpZW50RXZlbnQuZGlzcGF0Y2ggPSBmdW5jdGlvbihldmVudE5hbWUsIGRhdGEpIHtcbiAgICBpZiAodHlwZW9mIGV2ZW50TmFtZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNsaWVudEV2ZW50LmV2ZW50TGlzdGVuZXIuZGlzcGF0Y2goZXZlbnROYW1lLCBkYXRhKTtcbn07Il19