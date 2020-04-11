
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/user.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cd8c6VJV7ZMpaHcdw56brJE', 'user');
// common/script/user.js

"use strict";

var GLB = require("Glb");

window.user = {};

user.init = function () {
  user.stepNoEat = 0;
  user.allOpenNum = 0;
  user.allEatNum = 0;
  user.isMyTurn = null;
}; // 1：吃，2：翻，3：空


user.stepIfEatOrOpen = function (isEatOrOpen, isSelf) {
  if (isEatOrOpen === 1) {
    this.stepNoEat = 0;
    this.allEatNum++;
    return;
  } else if (isEatOrOpen === 2) {
    this.stepNoEat = 0;
    this.allOpenNum++;
    return;
  } else if (isEatOrOpen === 3) {
    this.stepNoEat++;
  }

  if (this.stepNoEat >= GLB.needStepNoEat) {
    // 判断是否符合条件 棋子全开，小于等于4个子
    if (this.allOpenNum < 16) {
      // 全开
      this.stepNoEat = 0;
      return;
    }

    if (this.allEatNum < 12) {
      // 小于等于4个子
      this.stepNoEat = 0;
      return;
    }

    if (isSelf) {
      setTimeout(function () {
        this.setAudio("draw");
        console.log("12步未吃");
        var msg = {
          action: GLB.GAME_OVER_EVENT,
          winFlag: null
        };
        Game.GameManager.sendEventEx(msg);
      }.bind(this), 700);
    }
  }
};

user.setAudio = function (name) {
  var url = cc.url.raw("resources/sound/" + name + ".mp3");
  cc.audioEngine.play(url, false, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VzZXIuanMiXSwibmFtZXMiOlsiR0xCIiwicmVxdWlyZSIsIndpbmRvdyIsInVzZXIiLCJpbml0Iiwic3RlcE5vRWF0IiwiYWxsT3Blbk51bSIsImFsbEVhdE51bSIsImlzTXlUdXJuIiwic3RlcElmRWF0T3JPcGVuIiwiaXNFYXRPck9wZW4iLCJpc1NlbGYiLCJuZWVkU3RlcE5vRWF0Iiwic2V0VGltZW91dCIsInNldEF1ZGlvIiwiY29uc29sZSIsImxvZyIsIm1zZyIsImFjdGlvbiIsIkdBTUVfT1ZFUl9FVkVOVCIsIndpbkZsYWciLCJHYW1lIiwiR2FtZU1hbmFnZXIiLCJzZW5kRXZlbnRFeCIsImJpbmQiLCJuYW1lIiwidXJsIiwiY2MiLCJyYXciLCJhdWRpb0VuZ2luZSIsInBsYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsR0FBRyxHQUFHQyxPQUFPLENBQUMsS0FBRCxDQUFqQjs7QUFDQUMsTUFBTSxDQUFDQyxJQUFQLEdBQWMsRUFBZDs7QUFJQUEsSUFBSSxDQUFDQyxJQUFMLEdBQVksWUFBWTtBQUNwQkQsRUFBQUEsSUFBSSxDQUFDRSxTQUFMLEdBQWlCLENBQWpCO0FBQ0FGLEVBQUFBLElBQUksQ0FBQ0csVUFBTCxHQUFrQixDQUFsQjtBQUNBSCxFQUFBQSxJQUFJLENBQUNJLFNBQUwsR0FBaUIsQ0FBakI7QUFDQUosRUFBQUEsSUFBSSxDQUFDSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0gsQ0FMRCxFQU9BOzs7QUFDQUwsSUFBSSxDQUFDTSxlQUFMLEdBQXVCLFVBQVNDLFdBQVQsRUFBc0JDLE1BQXRCLEVBQThCO0FBQ2pELE1BQUlELFdBQVcsS0FBSyxDQUFwQixFQUF1QjtBQUNuQixTQUFLTCxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBS0UsU0FBTDtBQUNBO0FBQ0gsR0FKRCxNQUlPLElBQUlHLFdBQVcsS0FBSyxDQUFwQixFQUFzQjtBQUN6QixTQUFLTCxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBS0MsVUFBTDtBQUNBO0FBQ0gsR0FKTSxNQUlBLElBQUlJLFdBQVcsS0FBSyxDQUFwQixFQUFzQjtBQUN6QixTQUFLTCxTQUFMO0FBQ0g7O0FBRUQsTUFBSSxLQUFLQSxTQUFMLElBQWtCTCxHQUFHLENBQUNZLGFBQTFCLEVBQXlDO0FBQ3JDO0FBQ0EsUUFBSSxLQUFLTixVQUFMLEdBQWtCLEVBQXRCLEVBQTBCO0FBQUM7QUFDdkIsV0FBS0QsU0FBTCxHQUFpQixDQUFqQjtBQUNBO0FBQ0g7O0FBRUQsUUFBSSxLQUFLRSxTQUFMLEdBQWlCLEVBQXJCLEVBQXlCO0FBQUM7QUFDdEIsV0FBS0YsU0FBTCxHQUFpQixDQUFqQjtBQUNBO0FBQ0g7O0FBRUQsUUFBSU0sTUFBSixFQUFZO0FBQ1JFLE1BQUFBLFVBQVUsQ0FBQyxZQUFXO0FBQ2xCLGFBQUtDLFFBQUwsQ0FBYyxNQUFkO0FBQ0FDLFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLE9BQVo7QUFDQSxZQUFJQyxHQUFHLEdBQUc7QUFDTkMsVUFBQUEsTUFBTSxFQUFFbEIsR0FBRyxDQUFDbUIsZUFETjtBQUVOQyxVQUFBQSxPQUFPLEVBQUU7QUFGSCxTQUFWO0FBSUFDLFFBQUFBLElBQUksQ0FBQ0MsV0FBTCxDQUFpQkMsV0FBakIsQ0FBNkJOLEdBQTdCO0FBQ0gsT0FSVSxDQVFUTyxJQVJTLENBUUosSUFSSSxDQUFELEVBUUksR0FSSixDQUFWO0FBU0g7QUFDSjtBQUNKLENBckNEOztBQXVDQXJCLElBQUksQ0FBQ1csUUFBTCxHQUFnQixVQUFTVyxJQUFULEVBQWU7QUFDM0IsTUFBSUMsR0FBRyxHQUFHQyxFQUFFLENBQUNELEdBQUgsQ0FBT0UsR0FBUCxDQUFXLHFCQUFtQkgsSUFBbkIsR0FBd0IsTUFBbkMsQ0FBVjtBQUNBRSxFQUFBQSxFQUFFLENBQUNFLFdBQUgsQ0FBZUMsSUFBZixDQUFvQkosR0FBcEIsRUFBeUIsS0FBekIsRUFBZ0MsQ0FBaEM7QUFDSCxDQUhEIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIEdMQiA9IHJlcXVpcmUoXCJHbGJcIik7XG53aW5kb3cudXNlciA9IHtcblxufVxuXG51c2VyLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdXNlci5zdGVwTm9FYXQgPSAwO1xuICAgIHVzZXIuYWxsT3Blbk51bSA9IDA7XG4gICAgdXNlci5hbGxFYXROdW0gPSAwO1xuICAgIHVzZXIuaXNNeVR1cm4gPSBudWxsO1xufTtcblxuLy8gMe+8muWQg++8jDLvvJrnv7vvvIwz77ya56m6XG51c2VyLnN0ZXBJZkVhdE9yT3BlbiA9IGZ1bmN0aW9uKGlzRWF0T3JPcGVuLCBpc1NlbGYpIHtcbiAgICBpZiAoaXNFYXRPck9wZW4gPT09IDEpIHtcbiAgICAgICAgdGhpcy5zdGVwTm9FYXQgPSAwO1xuICAgICAgICB0aGlzLmFsbEVhdE51bSsrO1xuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmIChpc0VhdE9yT3BlbiA9PT0gMil7XG4gICAgICAgIHRoaXMuc3RlcE5vRWF0ID0gMDtcbiAgICAgICAgdGhpcy5hbGxPcGVuTnVtKys7XG4gICAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKGlzRWF0T3JPcGVuID09PSAzKXtcbiAgICAgICAgdGhpcy5zdGVwTm9FYXQrKztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5zdGVwTm9FYXQgPj0gR0xCLm5lZWRTdGVwTm9FYXQpIHtcbiAgICAgICAgLy8g5Yik5pat5piv5ZCm56ym5ZCI5p2h5Lu2IOaji+WtkOWFqOW8gO+8jOWwj+S6juetieS6jjTkuKrlrZBcbiAgICAgICAgaWYgKHRoaXMuYWxsT3Blbk51bSA8IDE2KSB7Ly8g5YWo5byAXG4gICAgICAgICAgICB0aGlzLnN0ZXBOb0VhdCA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5hbGxFYXROdW0gPCAxMikgey8vIOWwj+S6juetieS6jjTkuKrlrZBcbiAgICAgICAgICAgIHRoaXMuc3RlcE5vRWF0ID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1NlbGYpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRBdWRpbyhcImRyYXdcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIxMuatpeacquWQg1wiKTtcbiAgICAgICAgICAgICAgICB2YXIgbXNnID0ge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEdMQi5HQU1FX09WRVJfRVZFTlQsXG4gICAgICAgICAgICAgICAgICAgIHdpbkZsYWc6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5zZW5kRXZlbnRFeChtc2cpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCA3MDApO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudXNlci5zZXRBdWRpbyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgdXJsID0gY2MudXJsLnJhdyhcInJlc291cmNlcy9zb3VuZC9cIituYW1lK1wiLm1wM1wiKTtcbiAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHVybCwgZmFsc2UsIDEpO1xufTsiXX0=