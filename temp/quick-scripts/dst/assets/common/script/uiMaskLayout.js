
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiMaskLayout.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a8513vdGlRFfJKr4zQ5ud97', 'uiMaskLayout');
// common/script/uiMaskLayout.js

"use strict";

var uiPanel = require("uiPanel");

cc.Class({
  "extends": uiPanel,
  // LIFE-CYCLE CALLBACKS:
  start: function start() {
    clientEvent.on(clientEvent.eventType.openUI, this.uiOperateCallBack, this);
    clientEvent.on(clientEvent.eventType.closeUI, this.uiOperateCallBack, this);
    this.isUseMask = false;
    this.node.active = false;
  },
  uiOperateCallBack: function uiOperateCallBack() {
    // 最后一个需要使用mask的panel
    var lastMaskIndex = -1;

    for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
      var ui = uiFunc.uiList[i];
      var panel = ui.getComponent("uiPanel");

      if (panel && panel.isUseMask) {
        lastMaskIndex = i;
        break;
      }
    }

    if (lastMaskIndex >= 0) {
      this.node.active = true;

      for (var j = lastMaskIndex; j < uiFunc.uiList.length; j++) {
        var targetUI = uiFunc.uiList[j];

        if (targetUI) {
          this.node.setSiblingIndex(Number.MAX_SAFE_INTEGER);
          targetUI.setSiblingIndex(Number.MAX_SAFE_INTEGER);
        } else {
          console.log("current show ui is null!");
        }
      }
    } else {
      this.node.active = false;
      return;
    }
  },
  refresh: function refresh() {
    // 最后一个需要使用mask的panel
    var lastMaskIndex = -1;

    for (var i = uiFunc.uiList.length - 1; i >= 0; i--) {
      var ui = uiFunc.uiList[i];
      var panel = ui.getComponent("uiPanel");

      if (panel.isUseMask) {
        lastMaskIndex = i;
        break;
      }
    }

    if (lastMaskIndex >= 0) {
      this.node.active = true;

      for (var j = lastMaskIndex; j < uiFunc.uiList.length; j++) {
        var targetUI = uiFunc.uiList[j];

        if (targetUI) {
          this.node.setSiblingIndex(Number.MAX_SAFE_INTEGER);
          targetUI.setSiblingIndex(Number.MAX_SAFE_INTEGER);
        } else {
          console.log("current show ui is null!");
        }
      }
    } else {
      this.node.active = false;
      return;
    }
  },
  onDestroy: function onDestroy() {
    clientEvent.off(clientEvent.eventType.openUI, this.uiOperateCallBack, this);
    clientEvent.off(clientEvent.eventType.closeUI, this.uiOperateCallBack, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpTWFza0xheW91dC5qcyJdLCJuYW1lcyI6WyJ1aVBhbmVsIiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJzdGFydCIsImNsaWVudEV2ZW50Iiwib24iLCJldmVudFR5cGUiLCJvcGVuVUkiLCJ1aU9wZXJhdGVDYWxsQmFjayIsImNsb3NlVUkiLCJpc1VzZU1hc2siLCJub2RlIiwiYWN0aXZlIiwibGFzdE1hc2tJbmRleCIsImkiLCJ1aUZ1bmMiLCJ1aUxpc3QiLCJsZW5ndGgiLCJ1aSIsInBhbmVsIiwiZ2V0Q29tcG9uZW50IiwiaiIsInRhcmdldFVJIiwic2V0U2libGluZ0luZGV4IiwiTnVtYmVyIiwiTUFYX1NBRkVfSU5URUdFUiIsImNvbnNvbGUiLCJsb2ciLCJyZWZyZXNoIiwib25EZXN0cm95Iiwib2ZmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBQ0FDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0gsT0FESjtBQUVMO0FBQ0FJLEVBQUFBLEtBSEssbUJBR0c7QUFDSkMsSUFBQUEsV0FBVyxDQUFDQyxFQUFaLENBQWVELFdBQVcsQ0FBQ0UsU0FBWixDQUFzQkMsTUFBckMsRUFBNkMsS0FBS0MsaUJBQWxELEVBQXFFLElBQXJFO0FBQ0FKLElBQUFBLFdBQVcsQ0FBQ0MsRUFBWixDQUFlRCxXQUFXLENBQUNFLFNBQVosQ0FBc0JHLE9BQXJDLEVBQThDLEtBQUtELGlCQUFuRCxFQUFzRSxJQUF0RTtBQUNBLFNBQUtFLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsS0FBbkI7QUFDSCxHQVJJO0FBVUxKLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFXO0FBQzFCO0FBQ0EsUUFBSUssYUFBYSxHQUFH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S0FBS0MsaUJBQW5ELEVBQXNFLElBQXRFO0FBQ0FKLElBQUFBLFdBQVcsQ0FBQzBCLEdBQVosQ0FBZ0IxQixXQUFXLENBQUNFLFNBQVosQ0FBc0JHLE9BQXRDLEVBQStDLEtBQUtELGlCQUFwRCxFQUF1RSxJQUF2RTtBQUNIO0FBckVJLENBQVQiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdWlQYW5lbCA9IHJlcXVpcmUoXCJ1aVBhbmVsXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IHVpUGFuZWwsXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9uKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5vcGVuVUksIHRoaXMudWlPcGVyYXRlQ2FsbEJhY2ssIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUuY2xvc2VVSSwgdGhpcy51aU9wZXJhdGVDYWxsQmFjaywgdGhpcyk7XG4gICAgICAgIHRoaXMuaXNVc2VNYXNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgdWlPcGVyYXRlQ2FsbEJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDmnIDlkI7kuIDkuKrpnIDopoHkvb/nlKhtYXNr55qEcGFuZWxcbiAgICAgICAgdmFyIGxhc3RNYXNrSW5kZXggPSAtMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHVpRnVuYy51aUxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciB1aSA9IHVpRnVuYy51aUxpc3RbaV07XG4gICAgICAgICAgICB2YXIgcGFuZWwgPSB1aS5nZXRDb21wb25lbnQoXCJ1aVBhbmVsXCIpO1xuICAgICAgICAgICAgaWYgKHBhbmVsICYmIHBhbmVsLmlzVXNlTWFzaykge1xuICAgICAgICAgICAgICAgIGxhc3RNYXNrSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0TWFza0luZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IGxhc3RNYXNrSW5kZXg7IGogPCB1aUZ1bmMudWlMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldFVJID0gdWlGdW5jLnVpTGlzdFtqXTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0VUkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFNpYmxpbmdJbmRleChOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFVJLnNldFNpYmxpbmdJbmRleChOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50IHNob3cgdWkgaXMgbnVsbCFcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyDmnIDlkI7kuIDkuKrpnIDopoHkvb/nlKhtYXNr55qEcGFuZWxcbiAgICAgICAgdmFyIGxhc3RNYXNrSW5kZXggPSAtMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHVpRnVuYy51aUxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciB1aSA9IHVpRnVuYy51aUxpc3RbaV07XG4gICAgICAgICAgICB2YXIgcGFuZWwgPSB1aS5nZXRDb21wb25lbnQoXCJ1aVBhbmVsXCIpO1xuICAgICAgICAgICAgaWYgKHBhbmVsLmlzVXNlTWFzaykge1xuICAgICAgICAgICAgICAgIGxhc3RNYXNrSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0TWFza0luZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IGxhc3RNYXNrSW5kZXg7IGogPCB1aUZ1bmMudWlMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldFVJID0gdWlGdW5jLnVpTGlzdFtqXTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0VUkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFNpYmxpbmdJbmRleChOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFVJLnNldFNpYmxpbmdJbmRleChOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjdXJyZW50IHNob3cgdWkgaXMgbnVsbCFcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUub3BlblVJLCB0aGlzLnVpT3BlcmF0ZUNhbGxCYWNrLCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5jbG9zZVVJLCB0aGlzLnVpT3BlcmF0ZUNhbGxCYWNrLCB0aGlzKTtcbiAgICB9XG59KTtcbiJdfQ==