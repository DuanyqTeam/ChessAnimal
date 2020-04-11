
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiTip.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7960fhCqglNqaW5JWJ8/Tdi', 'uiTip');
// common/script/uiTip.js

"use strict";

var uiPanel = require("uiPanel");

cc.Class({
  "extends": uiPanel,
  properties: {},
  onLoad: function onLoad() {
    this._super();

    setTimeout(function () {
      if (this && this.node) {
        uiFunc.closeUI(this.node.name);
        this.node.destroy();
      }
    }.bind(this), 2000);
  },
  setData: function setData(content) {
    this.nodeDict["tipLb"].getComponent(cc.Label).string = content;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpVGlwLmpzIl0sIm5hbWVzIjpbInVpUGFuZWwiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJvbkxvYWQiLCJfc3VwZXIiLCJzZXRUaW1lb3V0Iiwibm9kZSIsInVpRnVuYyIsImNsb3NlVUkiLCJuYW1lIiwiZGVzdHJveSIsImJpbmQiLCJzZXREYXRhIiwiY29udGVudCIsIm5vZGVEaWN0IiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHQyxPQUFPLENBQUMsU0FBRCxDQUFyQjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTSCxPQURKO0FBRUxJLEVBQUFBLFVBQVUsRUFBRSxFQUZQO0FBSUxDLEVBQUFBLE1BSkssb0JBSUk7QUFDTCxTQUFLQyxNQUFMOztBQUNBQyxJQUFBQSxVQUFVLENBQUMsWUFBVztBQUNsQixVQUFJLFFBQVEsS0FBS0MsSUFBakIsRUFBdUI7QUFDbkJDLFFBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlLEtBQUtGLElBQUwsQ0FBVUcsSUFBekI7QUFDQSxhQUFLSCxJQUFMLENBQVVJLE9BQVY7QUFDSDtBQUNKLEtBTFUsQ0FLVEMsSUFMUyxDQUtKLElBTEksQ0FBRCxFQUtJLElBTEosQ0FBVjtBQU1ILEdBWkk7QUFjTEMsRUFBQUEsT0FkSyxtQkFjR0MsT0FkSCxFQWNXO0FBQ1osU0FBS0MsUUFBTCxDQUFjLE9BQWQsRUFBdUJDLFlBQXZCLENBQW9DZixFQUFFLENBQUNnQixLQUF2QyxFQUE4Q0MsTUFBOUMsR0FBdURKLE9BQXZEO0FBQ0g7QUFoQkksQ0FBVCIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi9hc3NldHMvY29tbW9uL3NjcmlwdCIsInNvdXJjZXNDb250ZW50IjpbInZhciB1aVBhbmVsID0gcmVxdWlyZShcInVpUGFuZWxcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogdWlQYW5lbCxcbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzICYmIHRoaXMubm9kZSkge1xuICAgICAgICAgICAgICAgIHVpRnVuYy5jbG9zZVVJKHRoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyksIDIwMDApO1xuICAgIH0sXG5cbiAgICBzZXREYXRhKGNvbnRlbnQpe1xuICAgICAgICB0aGlzLm5vZGVEaWN0W1widGlwTGJcIl0uZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBjb250ZW50O1xuICAgIH1cbn0pO1xuIl19