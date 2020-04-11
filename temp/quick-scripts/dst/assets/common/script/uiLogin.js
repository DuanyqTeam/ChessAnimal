
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiLogin.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fb82d5Sr/1JnZbeK/r8ui/t', 'uiLogin');
// common/script/uiLogin.js

"use strict";

var uiPanel = require("uiPanel");

cc.Class({
  "extends": uiPanel,
  properties: {},
  onLoad: function onLoad() {
    this._super();
  },
  start: function start() {
    if (window.wx) {
      this.nodeDict["start"].active = false;
      wx.getSystemInfo({
        success: function success(data) {
          Game.GameManager.getUserInfoBtn = wx.createUserInfoButton({
            type: 'text',
            text: '开始多人游戏',
            style: {
              left: data.screenWidth * 0.2,
              top: data.screenHeight * 0.73,
              width: data.screenWidth * 0.65,
              height: data.screenHeight * 0.07,
              lineHeight: data.screenHeight * 0.07,
              backgroundColor: '#fe714a',
              color: '#ffffff',
              textAlign: 'center',
              fontSize: data.screenHeight * 0.025,
              borderRadius: 8
            }
          });
          Game.GameManager.getUserInfoBtn.onTap(function (res) {
            if (Game.GameManager.isClickCd) {
              return;
            }

            Game.GameManager.isClickCd = true;
            setTimeout(function () {
              Game.GameManager.isClickCd = false;
            }, 1000);
            Game.GameManager.nickName = res.userInfo.nickName;
            Game.GameManager.avatarUrl = res.userInfo.avatarUrl;
            Game.GameManager.matchVsInit();
            Game.GameManager.getUserInfoBtn.hide();
          });
        }
      });
    } else {
      this.nodeDict["start"].on("click", Game.GameManager.matchVsInit, Game.GameManager);
    }
  },
  onEnable: function onEnable() {
    if (Game.GameManager.getUserInfoBtn) {
      Game.GameManager.getUserInfoBtn.show();
    }
  },
  onDisable: function onDisable() {
    if (Game.GameManager.getUserInfoBtn) {
      Game.GameManager.getUserInfoBtn.hide();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpTG9naW4uanMiXSwibmFtZXMiOlsidWlQYW5lbCIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsIm9uTG9hZCIsIl9zdXBlciIsInN0YXJ0Iiwid2luZG93Iiwid3giLCJub2RlRGljdCIsImFjdGl2ZSIsImdldFN5c3RlbUluZm8iLCJzdWNjZXNzIiwiZGF0YSIsIkdhbWUiLCJHYW1lTWFuYWdlciIsImdldFVzZXJJbmZvQnRuIiwiY3JlYXRlVXNlckluZm9CdXR0b24iLCJ0eXBlIiwidGV4dCIsInN0eWxlIiwibGVmdCIsInNjcmVlbldpZHRoIiwidG9wIiwic2NyZWVuSGVpZ2h0Iiwid2lkdGgiLCJoZWlnaHQiLCJsaW5lSGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJ0ZXh0QWxpZ24iLCJmb250U2l6ZSIsImJvcmRlclJhZGl1cyIsIm9uVGFwIiwicmVzIiwiaXNDbGlja0NkIiwic2V0VGltZW91dCIsIm5pY2tOYW1lIiwidXNlckluZm8iLCJhdmF0YXJVcmwiLCJtYXRjaFZzSW5pdCIsImhpZGUiLCJvbiIsIm9uRW5hYmxlIiwic2hvdyIsIm9uRGlzYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBQyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNILE9BREo7QUFFTEksRUFBQUEsVUFBVSxFQUFFLEVBRlA7QUFJTEMsRUFBQUEsTUFKSyxvQkFJSTtBQUNMLFNBQUtDLE1BQUw7QUFDSCxHQU5JO0FBUUxDLEVBQUFBLEtBUkssbUJBUUc7QUFDSixRQUFJQyxNQUFNLENBQUNDLEVBQVgsRUFBZTtBQUNYLFdBQUtDLFFBQUwsQ0FBYyxPQUFkLEVBQXVCQyxNQUF2QixHQUFnQyxLQUFoQztBQUNBRixNQUFBQSxFQUFFLENBQUNHLGFBQUgsQ0FBaUI7QUFDYkMsUUFBQUEsT0FBTyxFQUFFLGlCQUFTQyxJQUFULEVBQWU7QUFDcEJDLFVBQUFBLElBQUksQ0FBQ0MsV0FBTCxDQUFpQkMsY0FBakIsR0FBa0NSLEVBQUUsQ0FBQ1Msb0JBQUgsQ0FBd0I7QUFDdERDLFlBQUFBLElBQUksRUFBRSxNQURnRDtBQUV0REMsWUFBQUEsSUFBSSxFQUFFLFFBRmdEO0FBR3REQyxZQUFBQSxLQUFLLEVBQUU7QUFDSEMsY0FBQUEsSUFBSSxFQUFFUixJQUFJLENBQUNTLFdBQUwsR0FBbUIsR0FEdEI7QUFFSEMsY0FBQUEsR0FBRyxFQUFFVixJQUFJLENBQUNXLFlBQUwsR0FBb0IsSUFGdEI7QUFHSEMsY0FBQUEsS0FBSyxFQUFFWixJQUFJLENBQUNTLFdBQUwsR0FBbUIsSUFIdkI7QUFJSEksY0FBQUEsTUFBTSxFQUFFYixJQUFJLENBQUNXLFlBQUwsR0FBb0IsSUFKekI7QUFLSEcsY0FBQUEsVUFBVSxFQUFFZCxJQUFJLENBQUNXLFlBQUwsR0FBb0IsSUFMN0I7QUFNSEksY0FBQUEsZUFBZSxFQUFFLFNBTmQ7QUFPSEMsY0FBQUEsS0FBSyxFQUFFLFNBUEo7QUFRSEMsY0FBQUEsU0FBUyxFQUFFLFFBUlI7QUFTSEMsY0FBQUEsUUFBUSxFQUFFbEIsSUFBSSxDQUFDVyxZQUFMLEdBQW9CLEtBVDNCO0FBVUhRLGNBQUFBLFlBQVksRUFBRTtBQVZYO0FBSCtDLFdBQXhCLENBQWxDO0FBZ0JBbEIsVUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCQyxjQUFqQixDQUFnQ2lCLEtBQWhDLENBQXNDLFVBQVNDLEdBQVQsRUFBYztBQUNoRCxnQkFBSXBCLElBQUksQ0FBQ0MsV0FBTCxDQUFpQm9CLFNBQXJCLEVBQWdDO0FBQzVCO0FBQ0g7O0FBQ0RyQixZQUFBQSxJQUFJLENBQUNDLFdBQUwsQ0FBaUJvQixTQUFqQixHQUE2QixJQUE3QjtBQUNBQyxZQUFBQSxVQUFVLENBQUMsWUFBVztBQUNsQnRCLGNBQUFBLElBQUksQ0FBQ0MsV0FBTCxDQUFpQm9CLFNBQWpCLEdBQTZCLEtBQTdCO0FBQ0gsYUFGUyxFQUVQLElBRk8sQ0FBVjtBQUdBckIsWUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCc0IsUUFBakIsR0FBNEJILEdBQUcsQ0FBQ0ksUUFBSixDQUFhRCxRQUF6QztBQUNBdkIsWUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCd0IsU0FBakIsR0FBNkJMLEdBQUcsQ0FBQ0ksUUFBSixDQUFhQyxTQUExQztBQUNBekIsWUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCeUIsV0FBakI7QUFDQTFCLFlBQUFBLElBQUksQ0FBQ0MsV0FBTCxDQUFpQkMsY0FBakIsQ0FBZ0N5QixJQUFoQztBQUNILFdBWkQ7QUFhSDtBQS9CWSxPQUFqQjtBQWlDSCxLQW5DRCxNQW1DTztBQUNILFdBQUtoQyxRQUFMLENBQWMsT0FBZCxFQUF1QmlDLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DNUIsSUFBSSxDQUFDQyxXQUFMLENBQWlCeUIsV0FBcEQsRUFBaUUxQixJQUFJLENBQUNDLFdBQXRFO0FBQ0g7QUFDSixHQS9DSTtBQWlETDRCLEVBQUFBLFFBakRLLHNCQWlETTtBQUNQLFFBQUk3QixJQUFJLENBQUNDLFdBQUwsQ0FBaUJDLGNBQXJCLEVBQXFDO0FBQ2pDRixNQUFBQSxJQUFJLENBQUNDLFdBQUwsQ0FBaUJDLGNBQWpCLENBQWdDNEIsSUFBaEM7QUFDSDtBQUNKLEdBckRJO0FBdURMQyxFQUFBQSxTQXZESyx1QkF1RE87QUFDUixRQUFJL0IsSUFBSSxDQUFDQyxXQUFMLENBQWlCQyxjQUFyQixFQUFxQztBQUNqQ0YsTUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCQyxjQUFqQixDQUFnQ3lCLElBQWhDO0FBQ0g7QUFDSjtBQTNESSxDQUFUIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVpUGFuZWwgPSByZXF1aXJlKFwidWlQYW5lbFwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiB1aVBhbmVsLFxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLl9zdXBlcigpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy53eCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlRGljdFtcInN0YXJ0XCJdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgd3guZ2V0U3lzdGVtSW5mbyh7XG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLmdldFVzZXJJbmZvQnRuID0gd3guY3JlYXRlVXNlckluZm9CdXR0b24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ+W8gOWni+WkmuS6uua4uOaIjycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGRhdGEuc2NyZWVuV2lkdGggKiAwLjIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBkYXRhLnNjcmVlbkhlaWdodCAqIDAuNzMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGRhdGEuc2NyZWVuV2lkdGggKiAwLjY1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogZGF0YS5zY3JlZW5IZWlnaHQgKiAwLjA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IGRhdGEuc2NyZWVuSGVpZ2h0ICogMC4wNyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmU3MTRhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IGRhdGEuc2NyZWVuSGVpZ2h0ICogMC4wMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiA4XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLmdldFVzZXJJbmZvQnRuLm9uVGFwKGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEdhbWUuR2FtZU1hbmFnZXIuaXNDbGlja0NkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5pc0NsaWNrQ2QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLmlzQ2xpY2tDZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLm5pY2tOYW1lID0gcmVzLnVzZXJJbmZvLm5pY2tOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5hdmF0YXJVcmwgPSByZXMudXNlckluZm8uYXZhdGFyVXJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5tYXRjaFZzSW5pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5nZXRVc2VySW5mb0J0bi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ub2RlRGljdFtcInN0YXJ0XCJdLm9uKFwiY2xpY2tcIiwgR2FtZS5HYW1lTWFuYWdlci5tYXRjaFZzSW5pdCwgR2FtZS5HYW1lTWFuYWdlcik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25FbmFibGUoKSB7XG4gICAgICAgIGlmIChHYW1lLkdhbWVNYW5hZ2VyLmdldFVzZXJJbmZvQnRuKSB7XG4gICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLmdldFVzZXJJbmZvQnRuLnNob3coKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIGlmIChHYW1lLkdhbWVNYW5hZ2VyLmdldFVzZXJJbmZvQnRuKSB7XG4gICAgICAgICAgICBHYW1lLkdhbWVNYW5hZ2VyLmdldFVzZXJJbmZvQnRuLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl19