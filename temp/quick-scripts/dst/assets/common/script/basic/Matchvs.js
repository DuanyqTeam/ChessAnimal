
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/Matchvs.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '11173/l/0JMUr5XExiaAUn8', 'Matchvs');
// common/script/basic/Matchvs.js

"use strict";

var engine;
var response = {};
var MsMatchInfo;
var MsCreateRoomInfo;

try {
  engine = Matchvs.MatchvsEngine.getInstance();
  MsMatchInfo = Matchvs.MsMatchInfo;
  MsCreateRoomInfo = Matchvs.MsCreateRoomInfo;
} catch (e) {
  try {
    var jsMatchvs = require("matchvs.all");

    engine = new jsMatchvs.MatchvsEngine();
    response = new jsMatchvs.MatchvsResponse();
    MsMatchInfo = jsMatchvs.MsMatchInfo;
    MsCreateRoomInfo = jsMatchvs.MsCreateRoomInfo;
  } catch (e) {
    var MatchVSEngine = require('MatchvsEngine');

    engine = new MatchVSEngine();
  }
}

module.exports = {
  engine: engine,
  response: response,
  MatchInfo: MsMatchInfo,
  CreateRoomInfo: MsCreateRoomInfo
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL01hdGNodnMuanMiXSwibmFtZXMiOlsiZW5naW5lIiwicmVzcG9uc2UiLCJNc01hdGNoSW5mbyIsIk1zQ3JlYXRlUm9vbUluZm8iLCJNYXRjaHZzIiwiTWF0Y2h2c0VuZ2luZSIsImdldEluc3RhbmNlIiwiZSIsImpzTWF0Y2h2cyIsInJlcXVpcmUiLCJNYXRjaHZzUmVzcG9uc2UiLCJNYXRjaFZTRW5naW5lIiwibW9kdWxlIiwiZXhwb3J0cyIsIk1hdGNoSW5mbyIsIkNyZWF0ZVJvb21JbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQUo7QUFDQSxJQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUNBLElBQUlDLFdBQUo7QUFDQSxJQUFJQyxnQkFBSjs7QUFDQSxJQUFJO0FBQ0FILEVBQUFBLE1BQU0sR0FBR0ksT0FBTyxDQUFDQyxhQUFSLENBQXNCQyxXQUF0QixFQUFUO0FBQ0FKLEVBQUFBLFdBQVcsR0FBR0UsT0FBTyxDQUFDRixXQUF0QjtBQUNBQyxFQUFBQSxnQkFBZ0IsR0FBR0MsT0FBTyxDQUFDRCxnQkFBM0I7QUFDSCxDQUpELENBSUUsT0FBT0ksQ0FBUCxFQUFVO0FBQ1IsTUFBSTtBQUNBLFFBQUlDLFNBQVMsR0FBR0MsT0FBTyxDQUFDLGFBQUQsQ0FBdkI7O0FBQ0FULElBQUFBLE1BQU0sR0FBRyxJQUFJUSxTQUFTLENBQUNILGFBQWQsRUFBVDtBQUNBSixJQUFBQSxRQUFRLEdBQUcsSUFBSU8sU0FBUyxDQUFDRSxlQUFkLEVBQVg7QUFDQVIsSUFBQUEsV0FBVyxHQUFHTSxTQUFTLENBQUNOLFdBQXhCO0FBQ0FDLElBQUFBLGdCQUFnQixHQUFHSyxTQUFTLENBQUNMLGdCQUE3QjtBQUNILEdBTkQsQ0FNRSxPQUFPSSxDQUFQLEVBQVU7QUFDUixRQUFJSSxhQUFhLEdBQUdGLE9BQU8sQ0FBQyxlQUFELENBQTNCOztBQUNBVCxJQUFBQSxNQUFNLEdBQUcsSUFBSVcsYUFBSixFQUFUO0FBQ0g7QUFDSjs7QUFDREMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBQ2JiLEVBQUFBLE1BQU0sRUFBRUEsTUFESztBQUViQyxFQUFBQSxRQUFRLEVBQUVBLFFBRkc7QUFHYmEsRUFBQUEsU0FBUyxFQUFFWixXQUhFO0FBSWJhLEVBQUFBLGNBQWMsRUFBRVo7QUFKSCxDQUFqQiIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi8uLi9hc3NldHMvY29tbW9uL3NjcmlwdC9iYXNpYyIsInNvdXJjZXNDb250ZW50IjpbInZhciBlbmdpbmU7XHJcbnZhciByZXNwb25zZSA9IHt9O1xyXG52YXIgTXNNYXRjaEluZm87XHJcbnZhciBNc0NyZWF0ZVJvb21JbmZvO1xyXG50cnkge1xyXG4gICAgZW5naW5lID0gTWF0Y2h2cy5NYXRjaHZzRW5naW5lLmdldEluc3RhbmNlKCk7XHJcbiAgICBNc01hdGNoSW5mbyA9IE1hdGNodnMuTXNNYXRjaEluZm87XHJcbiAgICBNc0NyZWF0ZVJvb21JbmZvID0gTWF0Y2h2cy5Nc0NyZWF0ZVJvb21JbmZvO1xyXG59IGNhdGNoIChlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHZhciBqc01hdGNodnMgPSByZXF1aXJlKFwibWF0Y2h2cy5hbGxcIik7XHJcbiAgICAgICAgZW5naW5lID0gbmV3IGpzTWF0Y2h2cy5NYXRjaHZzRW5naW5lKCk7XHJcbiAgICAgICAgcmVzcG9uc2UgPSBuZXcganNNYXRjaHZzLk1hdGNodnNSZXNwb25zZSgpO1xyXG4gICAgICAgIE1zTWF0Y2hJbmZvID0ganNNYXRjaHZzLk1zTWF0Y2hJbmZvO1xyXG4gICAgICAgIE1zQ3JlYXRlUm9vbUluZm8gPSBqc01hdGNodnMuTXNDcmVhdGVSb29tSW5mbztcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB2YXIgTWF0Y2hWU0VuZ2luZSA9IHJlcXVpcmUoJ01hdGNodnNFbmdpbmUnKTtcclxuICAgICAgICBlbmdpbmUgPSBuZXcgTWF0Y2hWU0VuZ2luZSgpO1xyXG4gICAgfVxyXG59XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgZW5naW5lOiBlbmdpbmUsXHJcbiAgICByZXNwb25zZTogcmVzcG9uc2UsXHJcbiAgICBNYXRjaEluZm86IE1zTWF0Y2hJbmZvLFxyXG4gICAgQ3JlYXRlUm9vbUluZm86IE1zQ3JlYXRlUm9vbUluZm8sXHJcbn07Il19