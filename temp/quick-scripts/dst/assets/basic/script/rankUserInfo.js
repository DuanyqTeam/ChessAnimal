
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/basic/script/rankUserInfo.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd3f88VVzr9Fk587sigdmFVb', 'rankUserInfo');
// basic/script/rankUserInfo.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    rankCntLb: cc.Label,
    userNameLb: cc.Label,
    userIcon: cc.Sprite,
    userScoreLb: cc.Label
  },
  setData: function setData(data) {
    if (this.rankCntLb) {
      this.rankCntLb.string = data.rank;
    }

    this.userNameLb.string = data.userName;

    if (data.headIcon && data.headIcon !== "-") {
      cc.loader.load({
        url: data.headIcon,
        type: 'png'
      }, function (err, texture) {
        // Use texture to create sprite frame
        var spriteFrame = new cc.SpriteFrame(texture, cc.Rect(0, 0, texture.width, texture.height));

        if (this.userIcon) {
          this.userIcon.spriteFrame = spriteFrame;
        }
      }.bind(this));
    }

    this.userScoreLb.string = data.score;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9iYXNpYy9zY3JpcHQvYXNzZXRzL2Jhc2ljL3NjcmlwdC9yYW5rVXNlckluZm8uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJyYW5rQ250TGIiLCJMYWJlbCIsInVzZXJOYW1lTGIiLCJ1c2VySWNvbiIsIlNwcml0ZSIsInVzZXJTY29yZUxiIiwic2V0RGF0YSIsImRhdGEiLCJzdHJpbmciLCJyYW5rIiwidXNlck5hbWUiLCJoZWFkSWNvbiIsImxvYWRlciIsImxvYWQiLCJ1cmwiLCJ0eXBlIiwiZXJyIiwidGV4dHVyZSIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJiaW5kIiwic2NvcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0ssS0FETjtBQUVSQyxJQUFBQSxVQUFVLEVBQUVOLEVBQUUsQ0FBQ0ssS0FGUDtBQUdSRSxJQUFBQSxRQUFRLEVBQUVQLEVBQUUsQ0FBQ1EsTUFITDtBQUlSQyxJQUFBQSxXQUFXLEVBQUVULEVBQUUsQ0FBQ0s7QUFKUixHQUhQO0FBVUxLLEVBQUFBLE9BVkssbUJBVUdDLElBVkgsRUFVUztBQUNWLFFBQUksS0FBS1AsU0FBVCxFQUFvQjtBQUNoQixXQUFLQSxTQUFMLENBQWVRLE1BQWYsR0FBd0JELElBQUksQ0FBQ0UsSUFBN0I7QUFDSDs7QUFDRCxTQUFLUCxVQUFMLENBQWdCTSxNQUFoQixHQUF5QkQsSUFBSSxDQUFDRyxRQUE5Qjs7QUFDQSxRQUFJSCxJQUFJLENBQUNJLFFBQUwsSUFBaUJKLElBQUksQ0FBQ0ksUUFBTCxLQUFrQixHQUF2QyxFQUE0QztBQUN4Q2YsTUFBQUEsRUFBRSxDQUFDZ0IsTUFBSCxDQUFVQyxJQUFWLENBQWU7QUFBQ0MsUUFBQUEsR0FBRyxFQUFFUCxJQUFJLENBQUNJLFFBQVg7QUFBcUJJLFFBQUFBLElBQUksRUFBRTtBQUEzQixPQUFmLEVBQWtELFVBQVNDLEdBQVQsRUFBY0MsT0FBZCxFQUF1QjtBQUNyRTtBQUNBLFlBQUlDLFdBQVcsR0FBRyxJQUFJdEIsRUFBRSxDQUFDdUIsV0FBUCxDQUFtQkYsT0FBbkIsRUFBNEJyQixFQUFFLENBQUN3QixJQUFILENBQVEsQ0FBUixFQUFXLENBQVgsRUFBY0gsT0FBTyxDQUFDSSxLQUF0QixFQUE2QkosT0FBTyxDQUFDSyxNQUFyQyxDQUE1QixDQUFsQjs7QUFDQSxZQUFHLEtBQUtuQixRQUFSLEVBQWtCO0FBQ2QsZUFBS0EsUUFBTCxDQUFjZSxXQUFkLEdBQTRCQSxXQUE1QjtBQUNIO0FBQ0osT0FOaUQsQ0FNaERLLElBTmdELENBTTNDLElBTjJDLENBQWxEO0FBT0g7O0FBQ0QsU0FBS2xCLFdBQUwsQ0FBaUJHLE1BQWpCLEdBQTBCRCxJQUFJLENBQUNpQixLQUEvQjtBQUNIO0FBekJJLENBQVQiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2Jhc2ljL3NjcmlwdCIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJhbmtDbnRMYjogY2MuTGFiZWwsXG4gICAgICAgIHVzZXJOYW1lTGI6IGNjLkxhYmVsLFxuICAgICAgICB1c2VySWNvbjogY2MuU3ByaXRlLFxuICAgICAgICB1c2VyU2NvcmVMYjogY2MuTGFiZWxcbiAgICB9LFxuXG4gICAgc2V0RGF0YShkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnJhbmtDbnRMYikge1xuICAgICAgICAgICAgdGhpcy5yYW5rQ250TGIuc3RyaW5nID0gZGF0YS5yYW5rO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXNlck5hbWVMYi5zdHJpbmcgPSBkYXRhLnVzZXJOYW1lO1xuICAgICAgICBpZiAoZGF0YS5oZWFkSWNvbiAmJiBkYXRhLmhlYWRJY29uICE9PSBcIi1cIikge1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWQoe3VybDogZGF0YS5oZWFkSWNvbiwgdHlwZTogJ3BuZyd9LCBmdW5jdGlvbihlcnIsIHRleHR1cmUpIHtcbiAgICAgICAgICAgICAgICAvLyBVc2UgdGV4dHVyZSB0byBjcmVhdGUgc3ByaXRlIGZyYW1lXG4gICAgICAgICAgICAgICAgdmFyIHNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRleHR1cmUsIGNjLlJlY3QoMCwgMCwgdGV4dHVyZS53aWR0aCwgdGV4dHVyZS5oZWlnaHQpKTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnVzZXJJY29uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlckljb24uc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXNlclNjb3JlTGIuc3RyaW5nID0gZGF0YS5zY29yZTtcbiAgICB9XG59KTtcbiJdfQ==