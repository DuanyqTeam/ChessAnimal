
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/lobby/roomInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c337dIMd/tPPqIUQecSSWLa', 'roomInfo');
// common/lobby/roomInfo.js

"use strict";

var mvs = require("Matchvs");

cc.Class({
  "extends": cc.Component,
  properties: {
    roomIdLb: {
      "default": null,
      type: cc.Label
    },
    roomNameLb: {
      "default": null,
      type: cc.Label
    }
  },
  start: function start() {
    this.node.on("click", this.joinRoom, this);
  },
  setData: function setData(msRoomAttribute) {
    this.msRoomAttribute = msRoomAttribute;
    this.roomIdLb.string = msRoomAttribute.roomID;
    this.roomNameLb.string = msRoomAttribute.roomName;
  },
  joinRoom: function joinRoom() {
    mvs.engine.joinRoom(this.msRoomAttribute.roomID, "joinRoomSpecial");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vbG9iYnkvYXNzZXRzL2NvbW1vbi9sb2JieS9yb29tSW5mby5qcyJdLCJuYW1lcyI6WyJtdnMiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyb29tSWRMYiIsInR5cGUiLCJMYWJlbCIsInJvb21OYW1lTGIiLCJzdGFydCIsIm5vZGUiLCJvbiIsImpvaW5Sb29tIiwic2V0RGF0YSIsIm1zUm9vbUF0dHJpYnV0ZSIsInN0cmluZyIsInJvb21JRCIsInJvb21OYW1lIiwiZW5naW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLEdBQUcsR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBakI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUU7QUFDTixpQkFBUyxJQURIO0FBRU5DLE1BQUFBLElBQUksRUFBRUwsRUFBRSxDQUFDTTtBQUZILEtBREY7QUFLUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSRixNQUFBQSxJQUFJLEVBQUVMLEVBQUUsQ0FBQ007QUFGRDtBQUxKLEdBSFA7QUFjTEUsRUFBQUEsS0FkSyxtQkFjRztBQUNKLFNBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE9BQWIsRUFBc0IsS0FBS0MsUUFBM0IsRUFBcUMsSUFBckM7QUFDSCxHQWhCSTtBQWtCTEMsRUFBQUEsT0FBTyxFQUFFLGlCQUFTQyxlQUFULEVBQTBCO0FBQy9CLFNBQUtBLGVBQUwsR0FBdUJBLGVBQXZCO0FBQ0EsU0FBS1QsUUFBTCxDQUFjVSxNQUFkLEdBQXVCRCxlQUFlLENBQUNFLE1BQXZDO0FBQ0EsU0FBS1IsVUFBTCxDQUFnQk8sTUFBaEIsR0FBeUJELGVBQWUsQ0FBQ0csUUFBekM7QUFDSCxHQXRCSTtBQXdCTEwsRUFBQUEsUUFBUSxFQUFFLG9CQUFXO0FBQ2pCYixJQUFBQSxHQUFHLENBQUNtQixNQUFKLENBQVdOLFFBQVgsQ0FBb0IsS0FBS0UsZUFBTCxDQUFxQkUsTUFBekMsRUFBaUQsaUJBQWpEO0FBQ0g7QUExQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9hc3NldHMvY29tbW9uL2xvYmJ5Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIG12cyA9IHJlcXVpcmUoXCJNYXRjaHZzXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcm9vbUlkTGI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICByb29tTmFtZUxiOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbihcImNsaWNrXCIsIHRoaXMuam9pblJvb20sIHRoaXMpO1xuICAgIH0sXG5cbiAgICBzZXREYXRhOiBmdW5jdGlvbihtc1Jvb21BdHRyaWJ1dGUpIHtcbiAgICAgICAgdGhpcy5tc1Jvb21BdHRyaWJ1dGUgPSBtc1Jvb21BdHRyaWJ1dGU7XG4gICAgICAgIHRoaXMucm9vbUlkTGIuc3RyaW5nID0gbXNSb29tQXR0cmlidXRlLnJvb21JRDtcbiAgICAgICAgdGhpcy5yb29tTmFtZUxiLnN0cmluZyA9IG1zUm9vbUF0dHJpYnV0ZS5yb29tTmFtZTtcbiAgICB9LFxuXG4gICAgam9pblJvb206IGZ1bmN0aW9uKCkge1xuICAgICAgICBtdnMuZW5naW5lLmpvaW5Sb29tKHRoaXMubXNSb29tQXR0cmlidXRlLnJvb21JRCwgXCJqb2luUm9vbVNwZWNpYWxcIik7XG4gICAgfVxufSk7XG4iXX0=