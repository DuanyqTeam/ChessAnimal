
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/uiPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '30528wp12pACamYt0bQ/BUa', 'uiPanel');
// common/script/basic/uiPanel.js

"use strict";

var PanelAnimation = cc.Enum({
  None: -1,
  ScaleAndAlpha: -1
});
cc.Class({
  "extends": cc.Component,
  properties: {
    showAnimation: {
      "default": PanelAnimation.None,
      type: PanelAnimation
    },
    hideAnimation: {
      "default": PanelAnimation.None,
      type: PanelAnimation
    },
    isUseMask: false
  },
  onLoad: function onLoad() {
    // node load --
    this.nodeDict = {};

    var linkWidget = function (self, nodeDict) {
      var children = self.children;

      for (var i = 0; i < children.length; i++) {
        var widgetName = children[i].name;

        if (widgetName && widgetName.indexOf("key_") >= 0) {
          var nodeName = widgetName.substring(4);

          if (nodeDict[nodeName]) {
            cc.error("控件名字重复!" + children[i].name);
          }

          nodeDict[nodeName] = children[i];
        }

        if (children[i].childrenCount > 0) {
          linkWidget(children[i], nodeDict);
        }
      }
    }.bind(this);

    linkWidget(this.node, this.nodeDict); // 添加动画--

    if (!this.showAnimation || !this.hideAnimation) {
      this.anim = this.getComponent(cc.Animation);

      if (!this.anim) {
        this.anim = this.addComponent(cc.Animation);
      }

      this.anim.on('finished', this.showCompleted, this);
    }
  },
  show: function show() {
    if (this.showAnimation === PanelAnimation.None) {
      this.node.active = true;
    } else {
      var clipName = PanelAnimation[this.showAnimation];
      this.anim.addClip(dataFunc.uiPanelAnimationClips[clipName]);
      this.anim.play(clipName);
    }
  },
  showCompleted: function showCompleted() {
    console.log(this.node.name + "动画播放完毕～");
  },
  hide: function hide() {
    if (this.hideAnimation === PanelAnimation.None) {
      this.node.active = false;
    } else {
      var clipName = PanelAnimation[this.hideAnimation];
      this.anim.addClip(dataFunc.uiPanelAnimationClips[clipName]);
      this.anim.play(clipName);
    } // 解除事件绑定--


    clientEvent.clear(this);
  },
  onDestroy: function onDestroy() {
    if (this.anim) {
      this.anim.off('finished', this.showCompleted, this);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL3VpUGFuZWwuanMiXSwibmFtZXMiOlsiUGFuZWxBbmltYXRpb24iLCJjYyIsIkVudW0iLCJOb25lIiwiU2NhbGVBbmRBbHBoYSIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInNob3dBbmltYXRpb24iLCJ0eXBlIiwiaGlkZUFuaW1hdGlvbiIsImlzVXNlTWFzayIsIm9uTG9hZCIsIm5vZGVEaWN0IiwibGlua1dpZGdldCIsInNlbGYiLCJjaGlsZHJlbiIsImkiLCJsZW5ndGgiLCJ3aWRnZXROYW1lIiwibmFtZSIsImluZGV4T2YiLCJub2RlTmFtZSIsInN1YnN0cmluZyIsImVycm9yIiwiY2hpbGRyZW5Db3VudCIsImJpbmQiLCJub2RlIiwiYW5pbSIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsImFkZENvbXBvbmVudCIsIm9uIiwic2hvd0NvbXBsZXRlZCIsInNob3ciLCJhY3RpdmUiLCJjbGlwTmFtZSIsImFkZENsaXAiLCJkYXRhRnVuYyIsInVpUGFuZWxBbmltYXRpb25DbGlwcyIsInBsYXkiLCJjb25zb2xlIiwibG9nIiwiaGlkZSIsImNsaWVudEV2ZW50IiwiY2xlYXIiLCJvbkRlc3Ryb3kiLCJvZmYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsY0FBYyxHQUFHQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN6QkMsRUFBQUEsSUFBSSxFQUFFLENBQUMsQ0FEa0I7QUFFekJDLEVBQUFBLGFBQWEsRUFBRSxDQUFDO0FBRlMsQ0FBUixDQUFyQjtBQUtBSCxFQUFFLENBQUNJLEtBQUgsQ0FBUztBQUNMLGFBQVNKLEVBQUUsQ0FBQ0ssU0FEUDtBQUVMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsYUFBYSxFQUFFO0FBQ1gsaUJBQVNSLGNBQWMsQ0FBQ0cs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QUExQyxFQUFnRDtBQUM1QyxXQUFLd0IsSUFBTCxDQUFVUSxNQUFWLEdBQW1CLEtBQW5CO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsVUFBSUMsUUFBUSxHQUFHcEMsY0FBYyxDQUFDLEtBQUtVLGFBQU4sQ0FBN0I7QUFDQSxXQUFLa0IsSUFBTCxDQUFVUyxPQUFWLENBQWtCQyxRQUFRLENBQUNDLHFCQUFULENBQStCSCxRQUEvQixDQUFsQjtBQUNBLFdBQUtSLElBQUwsQ0FBVVksSUFBVixDQUFlSixRQUFmO0FBQ0gsS0FQWSxDQVFiOzs7QUFDQVEsSUFBQUEsV0FBVyxDQUFDQyxLQUFaLENBQWtCLElBQWxCO0FBQ0gsR0F0RUk7QUF3RUxDLEVBQUFBLFNBQVMsRUFBRSxxQkFBVztBQUNsQixRQUFJLEtBQUtsQixJQUFULEVBQWU7QUFDWCxXQUFLQSxJQUFMLENBQVVtQixHQUFWLENBQWMsVUFBZCxFQUEwQixLQUFLZCxhQUEvQixFQUE4QyxJQUE5QztBQUNIO0FBQ0o7QUE1RUksQ0FBVCIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi8uLi9hc3NldHMvY29tbW9uL3NjcmlwdC9iYXNpYyIsInNvdXJjZXNDb250ZW50IjpbInZhciBQYW5lbEFuaW1hdGlvbiA9IGNjLkVudW0oe1xuICAgIE5vbmU6IC0xLFxuICAgIFNjYWxlQW5kQWxwaGE6IC0xXG59KTtcblxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNob3dBbmltYXRpb246IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IFBhbmVsQW5pbWF0aW9uLk5vbmUsXG4gICAgICAgICAgICB0eXBlOiBQYW5lbEFuaW1hdGlvblxuICAgICAgICB9LFxuICAgICAgICBoaWRlQW5pbWF0aW9uOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBQYW5lbEFuaW1hdGlvbi5Ob25lLFxuICAgICAgICAgICAgdHlwZTogUGFuZWxBbmltYXRpb25cbiAgICAgICAgfSxcbiAgICAgICAgaXNVc2VNYXNrOiBmYWxzZVxuICAgIH0sXG5cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBub2RlIGxvYWQgLS1cbiAgICAgICAgdGhpcy5ub2RlRGljdCA9IHt9O1xuXG4gICAgICAgIHZhciBsaW5rV2lkZ2V0ID0gZnVuY3Rpb24oc2VsZiwgbm9kZURpY3QpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHNlbGYuY2hpbGRyZW47XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpZGdldE5hbWUgPSBjaGlsZHJlbltpXS5uYW1lO1xuICAgICAgICAgICAgICAgIGlmICh3aWRnZXROYW1lICYmIHdpZGdldE5hbWUuaW5kZXhPZihcImtleV9cIikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZU5hbWUgPSB3aWRnZXROYW1lLnN1YnN0cmluZyg0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVEaWN0W25vZGVOYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoXCLmjqfku7blkI3lrZfph43lpI0hXCIgKyBjaGlsZHJlbltpXS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBub2RlRGljdFtub2RlTmFtZV0gPSBjaGlsZHJlbltpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2ldLmNoaWxkcmVuQ291bnQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtXaWRnZXQoY2hpbGRyZW5baV0sIG5vZGVEaWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgbGlua1dpZGdldCh0aGlzLm5vZGUsIHRoaXMubm9kZURpY3QpO1xuXG4gICAgICAgIC8vIOa3u+WKoOWKqOeUuy0tXG4gICAgICAgIGlmICghdGhpcy5zaG93QW5pbWF0aW9uIHx8ICF0aGlzLmhpZGVBbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbSA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgICAgICBpZiAoIXRoaXMuYW5pbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbSA9IHRoaXMuYWRkQ29tcG9uZW50KGNjLkFuaW1hdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmFuaW0ub24oJ2ZpbmlzaGVkJywgdGhpcy5zaG93Q29tcGxldGVkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93OiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd0FuaW1hdGlvbiA9PT0gUGFuZWxBbmltYXRpb24uTm9uZSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY2xpcE5hbWUgPSBQYW5lbEFuaW1hdGlvblt0aGlzLnNob3dBbmltYXRpb25dO1xuICAgICAgICAgICAgdGhpcy5hbmltLmFkZENsaXAoZGF0YUZ1bmMudWlQYW5lbEFuaW1hdGlvbkNsaXBzW2NsaXBOYW1lXSk7XG4gICAgICAgICAgICB0aGlzLmFuaW0ucGxheShjbGlwTmFtZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd0NvbXBsZXRlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubm9kZS5uYW1lICsgXCLliqjnlLvmkq3mlL7lrozmr5XvvZ5cIik7XG4gICAgfSxcblxuICAgIGhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5oaWRlQW5pbWF0aW9uID09PSBQYW5lbEFuaW1hdGlvbi5Ob25lKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY2xpcE5hbWUgPSBQYW5lbEFuaW1hdGlvblt0aGlzLmhpZGVBbmltYXRpb25dO1xuICAgICAgICAgICAgdGhpcy5hbmltLmFkZENsaXAoZGF0YUZ1bmMudWlQYW5lbEFuaW1hdGlvbkNsaXBzW2NsaXBOYW1lXSk7XG4gICAgICAgICAgICB0aGlzLmFuaW0ucGxheShjbGlwTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g6Kej6Zmk5LqL5Lu257uR5a6aLS1cbiAgICAgICAgY2xpZW50RXZlbnQuY2xlYXIodGhpcyk7XG4gICAgfSxcblxuICAgIG9uRGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmFuaW0pIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbS5vZmYoJ2ZpbmlzaGVkJywgdGhpcy5zaG93Q29tcGxldGVkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sXG59KTtcbiJdfQ==