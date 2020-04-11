
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/MatchvsEngine.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a5d4d0RpP1Mwpu2OZcb21jB', 'MatchvsEngine');
// common/script/basic/MatchvsEngine.js

"use strict";

function MatchvsEngine() {
  console.log('MatchvsEngine init');
}

MatchvsEngine.prototype.init = function (matchVSResponses, channel, platform, gameid) {
  this.responses = matchVSResponses;
  return 0;
};

MatchvsEngine.prototype.registerUser = function () {
  this._forEachResponse(function (res) {
    setTimeout(function () {
      var userInfo = {
        userID: 10086,
        token: 'jkfldjalfkdjaljfs',
        name: '张三',
        avatar: 'http://d3819ii77zvwic.cloudfront.net/wp-content/uploads/2015/02/child-fist-pump.jpg'
      };
      res.registerUserResponse && res.registerUserResponse(userInfo);
    }, 100);
  });

  return 0;
};

MatchvsEngine.prototype.login = function (userID, token, gameid, gameVersion, appkey, secret, deviceID, gatewayid) {
  return 0;
};

MatchvsEngine.prototype.joinRandomRoom = function () {
  this._forEachResponse(function (res) {
    setTimeout(function () {
      var roomInfo = {
        status: 0,
        userInfoList: [{
          userID: 10086,
          userProfile: '张三'
        }, {
          userID: 10087,
          userProfile: '李四'
        }, {
          userID: 10088,
          userProfile: '王五'
        }],
        roomInfo: {
          rootID: 1028374,
          rootProperty: "好房间",
          owner: 10086
        }
      };
      res && res.roomJoinResponse(roomInfo);
    }, 100);
  });

  return 0;
};

MatchvsEngine.prototype._forEachResponse = function (func) {
  if (this.responses) {
    for (var i = 0; i < this.responses.length; i++) {
      this.responses[i] && func(this.responses[i]);
    }
  }
};

MatchvsEngine.prototype.joinOver = function () {
  return 0;
};

MatchvsEngine.prototype.sendEvent = function (event) {
  var mockEventId = new Date().getTime();

  this._forEachResponse(function (res) {
    setTimeout(function () {
      res.sendEventRsp && res.sendEventRsp({
        "status": 0,
        "seq": mockEventId
      });
    }, 100);
  });

  return {
    status: 0,
    seq: mockEventId
  };
};

module.exports = MatchvsEngine;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL01hdGNodnNFbmdpbmUuanMiXSwibmFtZXMiOlsiTWF0Y2h2c0VuZ2luZSIsImNvbnNvbGUiLCJsb2ciLCJwcm90b3R5cGUiLCJpbml0IiwibWF0Y2hWU1Jlc3BvbnNlcyIsImNoYW5uZWwiLCJwbGF0Zm9ybSIsImdhbWVpZCIsInJlc3BvbnNlcyIsInJlZ2lzdGVyVXNlciIsIl9mb3JFYWNoUmVzcG9uc2UiLCJyZXMiLCJzZXRUaW1lb3V0IiwidXNlckluZm8iLCJ1c2VySUQiLCJ0b2tlbiIsIm5hbWUiLCJhdmF0YXIiLCJyZWdpc3RlclVzZXJSZXNwb25zZSIsImxvZ2luIiwiZ2FtZVZlcnNpb24iLCJhcHBrZXkiLCJzZWNyZXQiLCJkZXZpY2VJRCIsImdhdGV3YXlpZCIsImpvaW5SYW5kb21Sb29tIiwicm9vbUluZm8iLCJzdGF0dXMiLCJ1c2VySW5mb0xpc3QiLCJ1c2VyUHJvZmlsZSIsInJvb3RJRCIsInJvb3RQcm9wZXJ0eSIsIm93bmVyIiwicm9vbUpvaW5SZXNwb25zZSIsImZ1bmMiLCJpIiwibGVuZ3RoIiwiam9pbk92ZXIiLCJzZW5kRXZlbnQiLCJldmVudCIsIm1vY2tFdmVudElkIiwiRGF0ZSIsImdldFRpbWUiLCJzZW5kRXZlbnRSc3AiLCJzZXEiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLGFBQVQsR0FBeUI7QUFDckJDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9CQUFaO0FBQ0g7O0FBRURGLGFBQWEsQ0FBQ0csU0FBZCxDQUF3QkMsSUFBeEIsR0FBK0IsVUFBU0MsZ0JBQVQsRUFBMkJDLE9BQTNCLEVBQW9DQyxRQUFwQyxFQUE4Q0MsTUFBOUMsRUFBcUQ7QUFDaEYsT0FBS0MsU0FBTCxHQUFpQkosZ0JBQWpCO0FBQ0EsU0FB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QUFKLENBQWlCO0FBQUMsa0JBQVUsQ0FBWDtBQUFjLGVBQU9IO0FBQXJCLE9BQWpCLENBQXBCO0FBQ0gsS0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUdILEdBSkQ7O0FBS0EsU0FBTztBQUFDYixJQUFBQSxNQUFNLEVBQUUsQ0FBVDtBQUFZaUIsSUFBQUEsR0FBRyxFQUFFSjtBQUFqQixHQUFQO0FBQ0gsQ0FSRDs7QUFVQUssTUFBTSxDQUFDQyxPQUFQLEdBQWlCL0MsYUFBakIiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQvYmFzaWMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBNYXRjaHZzRW5naW5lKCkge1xyXG4gICAgY29uc29sZS5sb2coJ01hdGNodnNFbmdpbmUgaW5pdCcpO1xyXG59XHJcblxyXG5NYXRjaHZzRW5naW5lLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24obWF0Y2hWU1Jlc3BvbnNlcywgY2hhbm5lbCwgcGxhdGZvcm0sIGdhbWVpZCl7XHJcbiAgICB0aGlzLnJlc3BvbnNlcyA9IG1hdGNoVlNSZXNwb25zZXM7XHJcbiAgICByZXR1cm4gMDtcclxufTtcclxuXHJcbk1hdGNodnNFbmdpbmUucHJvdG90eXBlLnJlZ2lzdGVyVXNlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5fZm9yRWFjaFJlc3BvbnNlKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHVzZXJJbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgdXNlcklEOiAxMDA4NixcclxuICAgICAgICAgICAgICAgIHRva2VuOiAnamtmbGRqYWxma2RqYWxqZnMnLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+W8oOS4iScsXHJcbiAgICAgICAgICAgICAgICBhdmF0YXI6ICdodHRwOi8vZDM4MTlpaTc3enZ3aWMuY2xvdWRmcm9udC5uZXQvd3AtY29udGVudC91cGxvYWRzLzIwMTUvMDIvY2hpbGQtZmlzdC1wdW1wLmpwZydcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVzLnJlZ2lzdGVyVXNlclJlc3BvbnNlICYmIHJlcy5yZWdpc3RlclVzZXJSZXNwb25zZSh1c2VySW5mbyk7XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIDA7XHJcbn07XHJcblxyXG5NYXRjaHZzRW5naW5lLnByb3RvdHlwZS5sb2dpbiA9IGZ1bmN0aW9uKHVzZXJJRCx0b2tlbixnYW1laWQsZ2FtZVZlcnNpb24sYXBwa2V5LCBzZWNyZXQsZGV2aWNlSUQsZ2F0ZXdheWlkKXtcclxuICAgIHJldHVybiAwO1xyXG59O1xyXG5cclxuTWF0Y2h2c0VuZ2luZS5wcm90b3R5cGUuam9pblJhbmRvbVJvb20gPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5fZm9yRWFjaFJlc3BvbnNlKGZ1bmN0aW9uKHJlcykge1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHJvb21JbmZvID0ge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAwLFxyXG4gICAgICAgICAgICAgICAgdXNlckluZm9MaXN0OiBbXHJcbiAgICAgICAgICAgICAgICAgICAge3VzZXJJRDogMTAwODYsdXNlclByb2ZpbGU6ICflvKDkuIknfSxcclxuICAgICAgICAgICAgICAgICAgICB7dXNlcklEOiAxMDA4Nyx1c2VyUHJvZmlsZTogJ+adjuWbmyd9LFxyXG4gICAgICAgICAgICAgICAgICAgIHt1c2VySUQ6IDEwMDg4LHVzZXJQcm9maWxlOiAn546L5LqUJ30sXHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgcm9vbUluZm86IHtcclxuICAgICAgICAgICAgICAgICAgICByb290SUQ6IDEwMjgzNzQsXHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdFByb3BlcnR5OiBcIuWlveaIv+mXtFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG93bmVyOiAxMDA4NixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmVzICYmIHJlcy5yb29tSm9pblJlc3BvbnNlKHJvb21JbmZvKTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gMDtcclxufTtcclxuXHJcbk1hdGNodnNFbmdpbmUucHJvdG90eXBlLl9mb3JFYWNoUmVzcG9uc2UgPSBmdW5jdGlvbihmdW5jKSB7XHJcbiAgICBpZiAodGhpcy5yZXNwb25zZXMpIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpPHRoaXMucmVzcG9uc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2VzW2ldICYmIGZ1bmModGhpcy5yZXNwb25zZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbk1hdGNodnNFbmdpbmUucHJvdG90eXBlLmpvaW5PdmVyID0gZnVuY3Rpb24oKXtcclxuICAgIHJldHVybiAwO1xyXG59O1xyXG5cclxuTWF0Y2h2c0VuZ2luZS5wcm90b3R5cGUuc2VuZEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgdmFyIG1vY2tFdmVudElkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICB0aGlzLl9mb3JFYWNoUmVzcG9uc2UoZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHJlcy5zZW5kRXZlbnRSc3AgJiYgcmVzLnNlbmRFdmVudFJzcCh7XCJzdGF0dXNcIjogMCwgXCJzZXFcIjogbW9ja0V2ZW50SWR9KTtcclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge3N0YXR1czogMCwgc2VxOiBtb2NrRXZlbnRJZH07XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGNodnNFbmdpbmU7Il19