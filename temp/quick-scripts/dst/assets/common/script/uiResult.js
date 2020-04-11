
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiResult.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f36ab+a3uVHprGY+tE/xnl0', 'uiResult');
// common/script/uiResult.js

"use strict";

var uiPanel = require("uiPanel");

cc.Class({
  "extends": uiPanel,
  properties: {},
  start: function start() {
    this.player1 = this.nodeDict["player1"].getComponent("resultPlayerIcon");
    this.player1.node.active = false;
    this.player2 = this.nodeDict["player2"].getComponent("resultPlayerIcon");
    this.player2.node.active = false;
    this.player3 = this.nodeDict["player3"].getComponent("resultPlayerIcon");
    this.player3.node.active = false;
  },
  setData: function setData() {}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpUmVzdWx0LmpzIl0sIm5hbWVzIjpbInVpUGFuZWwiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJzdGFydCIsInBsYXllcjEiLCJub2RlRGljdCIsImdldENvbXBvbmVudCIsIm5vZGUiLCJhY3RpdmUiLCJwbGF5ZXIyIiwicGxheWVyMyIsInNldERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTSCxPQURKO0FBR0xJLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBS0xDLEVBQUFBLEtBTEssbUJBS0c7QUFDSixTQUFLQyxPQUFMLEdBQWUsS0FBS0MsUUFBTCxDQUFjLFNBQWQsRUFBeUJDLFlBQXpCLENBQXNDLGtCQUF0QyxDQUFmO0FBQ0EsU0FBS0YsT0FBTCxDQUFhRyxJQUFiLENBQWtCQyxNQUFsQixHQUEyQixLQUEzQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxLQUFLSixRQUFMLENBQWMsU0FBZCxFQUF5QkMsWUFBekIsQ0FBc0Msa0JBQXRDLENBQWY7QUFDQSxTQUFLRyxPQUFMLENBQWFGLElBQWIsQ0FBa0JDLE1BQWxCLEdBQTJCLEtBQTNCO0FBQ0EsU0FBS0UsT0FBTCxHQUFlLEtBQUtMLFFBQUwsQ0FBYyxTQUFkLEVBQXlCQyxZQUF6QixDQUFzQyxrQkFBdEMsQ0FBZjtBQUNBLFNBQUtJLE9BQUwsQ0FBYUgsSUFBYixDQUFrQkMsTUFBbEIsR0FBMkIsS0FBM0I7QUFDSCxHQVpJO0FBY0xHLEVBQUFBLE9BQU8sRUFBRSxtQkFBVyxDQUVuQjtBQWhCSSxDQUFUIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVpUGFuZWwgPSByZXF1aXJlKFwidWlQYW5lbFwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiB1aVBhbmVsLFxuXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIxID0gdGhpcy5ub2RlRGljdFtcInBsYXllcjFcIl0uZ2V0Q29tcG9uZW50KFwicmVzdWx0UGxheWVySWNvblwiKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIxLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVyMiA9IHRoaXMubm9kZURpY3RbXCJwbGF5ZXIyXCJdLmdldENvbXBvbmVudChcInJlc3VsdFBsYXllckljb25cIik7XG4gICAgICAgIHRoaXMucGxheWVyMi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsYXllcjMgPSB0aGlzLm5vZGVEaWN0W1wicGxheWVyM1wiXS5nZXRDb21wb25lbnQoXCJyZXN1bHRQbGF5ZXJJY29uXCIpO1xuICAgICAgICB0aGlzLnBsYXllcjMubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgc2V0RGF0YTogZnVuY3Rpb24oKSB7XG5cbiAgICB9XG59KTtcbiJdfQ==