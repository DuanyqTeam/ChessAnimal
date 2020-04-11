
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/updateScore.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '94d9eukNMtCj7RlWUUQhCfK', 'updateScore');
// common/script/updateScore.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {},
  init: function init(pool) {
    this.animation = this.node.getComponent(cc.Animation);
    this.animation.on('finished', this.finished, this);
    this.pool = pool;
    this.animation.play();
  },
  finished: function finished() {
    this.pool.put(this.node);
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VwZGF0ZVNjb3JlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwic3RhcnQiLCJpbml0IiwicG9vbCIsImFuaW1hdGlvbiIsIm5vZGUiLCJnZXRDb21wb25lbnQiLCJBbmltYXRpb24iLCJvbiIsImZpbmlzaGVkIiwicGxheSIsInB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTDtBQUVBQyxFQUFBQSxNQVRLLG9CQVNLLENBQUUsQ0FUUDtBQVdMQyxFQUFBQSxLQVhLLG1CQVdJLENBRVIsQ0FiSTtBQWNMQyxFQUFBQSxJQWRLLGdCQWNDQyxJQWRELEVBY087QUFDUixTQUFLQyxTQUFMLEdBQWlCLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QlYsRUFBRSxDQUFDVyxTQUExQixDQUFqQjtBQUNBLFNBQUtILFNBQUwsQ0FBZUksRUFBZixDQUFrQixVQUFsQixFQUE4QixLQUFLQyxRQUFuQyxFQUE2QyxJQUE3QztBQUNBLFNBQUtOLElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLFNBQUwsQ0FBZU0sSUFBZjtBQUNILEdBbkJJO0FBb0JMRCxFQUFBQSxRQXBCSyxzQkFvQk87QUFDUixTQUFLTixJQUFMLENBQVVRLEdBQVYsQ0FBYyxLQUFLTixJQUFuQjtBQUNILEdBdEJJLENBdUJMOztBQXZCSyxDQUFUIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0Iiwic291cmNlc0NvbnRlbnQiOlsiXG5cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuICAgIGluaXQgKHBvb2wpIHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLm9uKCdmaW5pc2hlZCcsIHRoaXMuZmluaXNoZWQsIHRoaXMpO1xuICAgICAgICB0aGlzLnBvb2wgPSBwb29sO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5wbGF5KCk7XG4gICAgfSxcbiAgICBmaW5pc2hlZCAoKSB7XG4gICAgICAgIHRoaXMucG9vbC5wdXQodGhpcy5ub2RlKTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==