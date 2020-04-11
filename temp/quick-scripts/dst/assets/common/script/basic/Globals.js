
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/Globals.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6ef76APuCREkJ0E57ey+NRe', 'Globals');
// common/script/basic/Globals.js

"use strict";

window.Game = {
  GameManager: null,
  BulletManager: null,
  DuckManger: null,
  PlayerManager: null,
  fireInterval: 1500,
  itemInterval: 8000,
  GameSeconds: 60
};
window.GameState = cc.Enum({
  None: 0,
  Pause: 1,
  Play: 2,
  Over: 3,
  End: 4
});
window.Player_State = {
  None: 0,
  Hit: 1,
  BeingHit: 2,
  HitAndBeingHit: 3,
  StandUp: 4,
  Complacent: 5,
  SitDown: 6
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL0dsb2JhbHMuanMiXSwibmFtZXMiOlsid2luZG93IiwiR2FtZSIsIkdhbWVNYW5hZ2VyIiwiQnVsbGV0TWFuYWdlciIsIkR1Y2tNYW5nZXIiLCJQbGF5ZXJNYW5hZ2VyIiwiZmlyZUludGVydmFsIiwiaXRlbUludGVydmFsIiwiR2FtZVNlY29uZHMiLCJHYW1lU3RhdGUiLCJjYyIsIkVudW0iLCJOb25lIiwiUGF1c2UiLCJQbGF5IiwiT3ZlciIsIkVuZCIsIlBsYXllcl9TdGF0ZSIsIkhpdCIsIkJlaW5nSGl0IiwiSGl0QW5kQmVpbmdIaXQiLCJTdGFuZFVwIiwiQ29tcGxhY2VudCIsIlNpdERvd24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjO0FBQ1ZDLEVBQUFBLFdBQVcsRUFBRSxJQURIO0FBRVZDLEVBQUFBLGFBQWEsRUFBRSxJQUZMO0FBR1ZDLEVBQUFBLFVBQVUsRUFBRSxJQUhGO0FBSVZDLEVBQUFBLGFBQWEsRUFBRSxJQUpMO0FBTVZDLEVBQUFBLFlBQVksRUFBRSxJQU5KO0FBT1ZDLEVBQUFBLFlBQVksRUFBRSxJQVBKO0FBUVZDLEVBQUFBLFdBQVcsRUFBRTtBQVJILENBQWQ7QUFXQVIsTUFBTSxDQUFDUyxTQUFQLEdBQW1CQyxFQUFFLENBQUNDLElBQUgsQ0FBUTtBQUN2QkMsRUFBQUEsSUFBSSxFQUFFLENBRGlCO0FBRXZCQyxFQUFBQSxLQUFLLEVBQUUsQ0FGZ0I7QUFHdkJDLEVBQUFBLElBQUksRUFBRSxDQUhpQjtBQUl2QkMsRUFBQUEsSUFBSSxFQUFFLENBSmlCO0FBS3ZCQyxFQUFBQSxHQUFHLEVBQUU7QUFMa0IsQ0FBUixDQUFuQjtBQVFBaEIsTUFBTSxDQUFDaUIsWUFBUCxHQUFzQjtBQUNsQkwsRUFBQUEsSUFBSSxFQUFFLENBRFk7QUFFbEJNLEVBQUFBLEdBQUcsRUFBRSxDQUZhO0FBR2xCQyxFQUFBQSxRQUFRLEVBQUUsQ0FIUTtBQUlsQkMsRUFBQUEsY0FBYyxFQUFFLENBSkU7QUFLbEJDLEVBQUFBLE9BQU8sRUFBRSxDQUxTO0FBTWxCQyxFQUFBQSxVQUFVLEVBQUUsQ0FOTTtBQU9sQkMsRUFBQUEsT0FBTyxFQUFFO0FBUFMsQ0FBdEIiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQvYmFzaWMiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuR2FtZSA9IHtcbiAgICBHYW1lTWFuYWdlcjogbnVsbCxcbiAgICBCdWxsZXRNYW5hZ2VyOiBudWxsLFxuICAgIER1Y2tNYW5nZXI6IG51bGwsXG4gICAgUGxheWVyTWFuYWdlcjogbnVsbCxcblxuICAgIGZpcmVJbnRlcnZhbDogMTUwMCxcbiAgICBpdGVtSW50ZXJ2YWw6IDgwMDAsXG4gICAgR2FtZVNlY29uZHM6IDYwXG59XG5cbndpbmRvdy5HYW1lU3RhdGUgPSBjYy5FbnVtKHtcbiAgICBOb25lOiAwLFxuICAgIFBhdXNlOiAxLFxuICAgIFBsYXk6IDIsXG4gICAgT3ZlcjogMyxcbiAgICBFbmQ6IDRcbn0pXG5cbndpbmRvdy5QbGF5ZXJfU3RhdGUgPSB7XG4gICAgTm9uZTogMCxcbiAgICBIaXQ6IDEsXG4gICAgQmVpbmdIaXQ6IDIsXG4gICAgSGl0QW5kQmVpbmdIaXQ6IDMsXG4gICAgU3RhbmRVcDogNCxcbiAgICBDb21wbGFjZW50OiA1LFxuICAgIFNpdERvd246IDZcbn1cbiJdfQ==