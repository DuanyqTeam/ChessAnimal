
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiVsResult.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a528d52rENI3bES+SKyYqZu', 'uiVsResult');
// common/script/uiVsResult.js

"use strict";

var uiPanel = require("uiPanel");

var mvs = require("Matchvs");

var GLB = require("Glb");

cc.Class({
  "extends": uiPanel,
  properties: {
    loseClip: {
      "default": null,
      url: cc.AudioClip
    },
    victoryClip: {
      "default": null,
      url: cc.AudioClip
    },
    redFrame: cc.SpriteFrame,
    blueFrame: cc.SpriteFrame
  },
  isWin: function isWin(flag) {
    if (flag) {
      cc.audioEngine.play(this.victoryClip, false, 1);
    } else {
      cc.audioEngine.play(this.loseClip, false, 1);
    }

    this.nodeDict["lose"].active = !flag;
    this.nodeDict["win"].active = flag;
    this.nodeDict["draw"].active = false;
  },
  draw: function draw() {
    this.nodeDict["lose"].active = false;
    this.nodeDict["win"].active = false;
    this.nodeDict["draw"].active = true;
    cc.audioEngine.play(this.victoryClip, false, 1);
  },
  setData: function setData(winFlag) {
    if (winFlag === GLB.PLAYER_FLAG.RED && GLB.isRoomOwner) {
      this.isWin(true);
    } else if (winFlag === GLB.PLAYER_FLAG.BLUE && !GLB.isRoomOwner) {
      this.isWin(true);
    } else if (winFlag === null) {
      this.draw();
    } else {
      this.isWin(false);
      return;
    }

    Game.GameManager.loginServer();
  },
  setFrameColor: function setFrameColor() {
    if (GLB.isRoomOwner) {
      this.leftFrameSprite.spriteFrame = this.redFrame;
      this.rightFrameSprite.spriteFrame = this.blueFrame;
    } else {
      this.leftFrameSprite.spriteFrame = this.blueFrame;
      this.rightFrameSprite.spriteFrame = this.redFrame;
    }
  },
  start: function start() {
    this.player = this.nodeDict["player"].getComponent("resultPlayerIcon");
    this.player.setData(GLB.playerUserIds[0]);
    this.rival = this.nodeDict["rival"].getComponent("resultPlayerIcon");
    this.rival.setData(GLB.playerUserIds[1]);
    this.nodeDict["vs"].active = true;
    this.nodeDict["score"].active = false;
    this.leftFrameSprite = this.nodeDict['leftFrame'].getComponent(cc.Sprite);
    this.rightFrameSprite = this.nodeDict['rightFrame'].getComponent(cc.Sprite);
    this.setFrameColor(); // var gamePanel = uiFunc.findUI("uiGamePanel");
    // if (gamePanel) {
    //     var gamePanelScript = gamePanel.getComponent("uiGamePanel");
    //     this.selfScore = gamePanelScript.selfScore;
    //     this.otherScore = gamePanelScript.otherScore;
    // }
    // if (this.selfScore >= this.otherScore) {
    //     this.nodeDict["lose"].active = false;
    //     this.nodeDict["win"].active = true;
    // } else {
    //     this.nodeDict["lose"].active = true;
    //     this.nodeDict["win"].active = false;
    // }
    // var isWin = this.selfScore >= this.otherScore;
    // if (isWin) {
    //     cc.audioEngine.play(this.victoryClip, false, 1);
    // } else {
    //     cc.audioEngine.play(this.loseClip, false, 1);
    // }
    //
    // this.nodeDict["playerScore"].getComponent(cc.Label).string = this.selfScore;
    // this.nodeDict["rivalScore"].getComponent(cc.Label).string = this.otherScore;

    this.nodeDict["quit"].on("click", this.quit, this); // if (isWin) {
    //     // 发送胜局记录--
    //     Game.GameManager.loginServer();
    // }
  },
  quit: function quit() {
    mvs.engine.leaveRoom("");
    var gamePanel = uiFunc.findUI("uiGamePanel");

    if (gamePanel) {
      uiFunc.closeUI("uiGamePanel");
      gamePanel.destroy();
    }

    uiFunc.closeUI(this.node.name);
    this.node.destroy();
    Game.GameManager.lobbyShow();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpVnNSZXN1bHQuanMiXSwibmFtZXMiOlsidWlQYW5lbCIsInJlcXVpcmUiLCJtdnMiLCJHTEIiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsImxvc2VDbGlwIiwidXJsIiwiQXVkaW9DbGlwIiwidmljdG9yeUNsaXAiLCJyZWRGcmFtZSIsIlNwcml0ZUZyYW1lIiwiYmx1ZUZyYW1lIiwiaXNXaW4iLCJmbGFnIiwiYXVkaW9FbmdpbmUiLCJwbGF5Iiwibm9kZURpY3QiLCJhY3RpdmUiLCJkcmF3Iiwic2V0RGF0YSIsIndpbkZsYWciLCJQTEFZRVJfRkxBRyIsIlJFRCIsImlzUm9vbU93bmVyIiwiQkxVRSIsIkdhbWUiLCJHYW1lTWFuYWdlciIsImxvZ2luU2VydmVyIiwic2V0RnJhbWVDb2xvciIsImxlZnRGcmFtZVNwcml0ZSIsInNwcml0ZUZyYW1lIiwicmlnaHRGcmFtZVNwcml0ZSIsInN0YXJ0IiwicGxheWVyIiwiZ2V0Q29tcG9uZW50IiwicGxheWVyVXNlcklkcyIsInJpdmFsIiwiU3ByaXRlIiwib24iLCJxdWl0IiwiZW5naW5lIiwibGVhdmVSb29tIiwiZ2FtZVBhbmVsIiwidWlGdW5jIiwiZmluZFVJIiwiY2xvc2VVSSIsImRlc3Ryb3kiLCJub2RlIiwibmFtZSIsImxvYmJ5U2hvdyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQUlDLEdBQUcsR0FBR0QsT0FBTyxDQUFDLFNBQUQsQ0FBakI7O0FBQ0EsSUFBSUUsR0FBRyxHQUFHRixPQUFPLENBQUMsS0FBRCxDQUFqQjs7QUFDQUcsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTTCxPQURKO0FBR0xNLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUU7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QSxTQUFTLENBQUNJLE9BQVY7QUFDSDs7QUFDREgsSUFBQUEsTUFBTSxDQUFDRSxPQUFQLENBQWUsS0FBS0UsSUFBTCxDQUFVQyxJQUF6QjtBQUNBLFNBQUtELElBQUwsQ0FBVUQsT0FBVjtBQUdBckIsSUFBQUEsSUFBSSxDQUFDQyxXQUFMLENBQWlCdUIsU0FBakI7QUFDSDtBQS9HSSxDQUFUIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVpUGFuZWwgPSByZXF1aXJlKFwidWlQYW5lbFwiKTtcbnZhciBtdnMgPSByZXF1aXJlKFwiTWF0Y2h2c1wiKTtcbnZhciBHTEIgPSByZXF1aXJlKFwiR2xiXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IHVpUGFuZWwsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxvc2VDbGlwOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfSxcbiAgICAgICAgdmljdG9yeUNsaXA6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICByZWRGcmFtZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgICAgIGJsdWVGcmFtZTogY2MuU3ByaXRlRnJhbWUsXG4gICAgfSxcblxuICAgIGlzV2luIChmbGFnKSB7XG4gICAgICAgIGlmIChmbGFnKSB7XG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMudmljdG9yeUNsaXAsIGZhbHNlLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5sb3NlQ2xpcCwgZmFsc2UsIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZURpY3RbXCJsb3NlXCJdLmFjdGl2ZSA9ICFmbGFnO1xuICAgICAgICB0aGlzLm5vZGVEaWN0W1wid2luXCJdLmFjdGl2ZSA9IGZsYWc7XG4gICAgICAgIHRoaXMubm9kZURpY3RbXCJkcmF3XCJdLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBkcmF3ICgpIHtcbiAgICAgICAgdGhpcy5ub2RlRGljdFtcImxvc2VcIl0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZURpY3RbXCJ3aW5cIl0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubm9kZURpY3RbXCJkcmF3XCJdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy52aWN0b3J5Q2xpcCwgZmFsc2UsIDEpO1xuICAgIH0sXG5cbiAgICBzZXREYXRhICh3aW5GbGFnKSB7XG4gICAgICAgIGlmICh3aW5GbGFnID09PSBHTEIuUExBWUVSX0ZMQUcuUkVEICYmIEdMQi5pc1Jvb21Pd25lcikge1xuICAgICAgICAgICAgdGhpcy5pc1dpbih0cnVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5GbGFnID09PSBHTEIuUExBWUVSX0ZMQUcuQkxVRSAmJiAhR0xCLmlzUm9vbU93bmVyKSB7XG4gICAgICAgICAgICB0aGlzLmlzV2luKHRydWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbkZsYWcgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc1dpbihmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5sb2dpblNlcnZlcigpO1xuICAgIH0sXG5cbiAgICBzZXRGcmFtZUNvbG9yICgpIHtcbiAgICAgICAgaWYoR0xCLmlzUm9vbU93bmVyKSB7XG4gICAgICAgICAgICB0aGlzLmxlZnRGcmFtZVNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucmVkRnJhbWU7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0RnJhbWVTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmJsdWVGcmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGVmdEZyYW1lU3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5ibHVlRnJhbWU7XG4gICAgICAgICAgICB0aGlzLnJpZ2h0RnJhbWVTcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnJlZEZyYW1lO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLnBsYXllciA9IHRoaXMubm9kZURpY3RbXCJwbGF5ZXJcIl0uZ2V0Q29tcG9uZW50KFwicmVzdWx0UGxheWVySWNvblwiKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuc2V0RGF0YShHTEIucGxheWVyVXNlcklkc1swXSk7XG4gICAgICAgIHRoaXMucml2YWwgPSB0aGlzLm5vZGVEaWN0W1wicml2YWxcIl0uZ2V0Q29tcG9uZW50KFwicmVzdWx0UGxheWVySWNvblwiKTtcbiAgICAgICAgdGhpcy5yaXZhbC5zZXREYXRhKEdMQi5wbGF5ZXJVc2VySWRzWzFdKTtcbiAgICAgICAgdGhpcy5ub2RlRGljdFtcInZzXCJdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9kZURpY3RbXCJzY29yZVwiXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sZWZ0RnJhbWVTcHJpdGUgPSAgdGhpcy5ub2RlRGljdFsnbGVmdEZyYW1lJ10uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHRoaXMucmlnaHRGcmFtZVNwcml0ZSA9IHRoaXMubm9kZURpY3RbJ3JpZ2h0RnJhbWUnXS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcbiAgICAgICAgdGhpcy5zZXRGcmFtZUNvbG9yKCk7XG4gICAgICAgIC8vIHZhciBnYW1lUGFuZWwgPSB1aUZ1bmMuZmluZFVJKFwidWlHYW1lUGFuZWxcIik7XG4gICAgICAgIC8vIGlmIChnYW1lUGFuZWwpIHtcbiAgICAgICAgLy8gICAgIHZhciBnYW1lUGFuZWxTY3JpcHQgPSBnYW1lUGFuZWwuZ2V0Q29tcG9uZW50KFwidWlHYW1lUGFuZWxcIik7XG4gICAgICAgIC8vICAgICB0aGlzLnNlbGZTY29yZSA9IGdhbWVQYW5lbFNjcmlwdC5zZWxmU2NvcmU7XG4gICAgICAgIC8vICAgICB0aGlzLm90aGVyU2NvcmUgPSBnYW1lUGFuZWxTY3JpcHQub3RoZXJTY29yZTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZiAodGhpcy5zZWxmU2NvcmUgPj0gdGhpcy5vdGhlclNjb3JlKSB7XG4gICAgICAgIC8vICAgICB0aGlzLm5vZGVEaWN0W1wibG9zZVwiXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZURpY3RbXCJ3aW5cIl0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIHRoaXMubm9kZURpY3RbXCJsb3NlXCJdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIC8vICAgICB0aGlzLm5vZGVEaWN0W1wid2luXCJdLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHZhciBpc1dpbiA9IHRoaXMuc2VsZlNjb3JlID49IHRoaXMub3RoZXJTY29yZTtcbiAgICAgICAgLy8gaWYgKGlzV2luKSB7XG4gICAgICAgIC8vICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMudmljdG9yeUNsaXAsIGZhbHNlLCAxKTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5sb3NlQ2xpcCwgZmFsc2UsIDEpO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoaXMubm9kZURpY3RbXCJwbGF5ZXJTY29yZVwiXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMuc2VsZlNjb3JlO1xuICAgICAgICAvLyB0aGlzLm5vZGVEaWN0W1wicml2YWxTY29yZVwiXS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRoaXMub3RoZXJTY29yZTtcblxuICAgICAgICB0aGlzLm5vZGVEaWN0W1wicXVpdFwiXS5vbihcImNsaWNrXCIsIHRoaXMucXVpdCwgdGhpcyk7XG5cbiAgICAgICAgLy8gaWYgKGlzV2luKSB7XG4gICAgICAgIC8vICAgICAvLyDlj5HpgIHog5zlsYDorrDlvZUtLVxuICAgICAgICAvLyAgICAgR2FtZS5HYW1lTWFuYWdlci5sb2dpblNlcnZlcigpO1xuICAgICAgICAvLyB9XG4gICAgfSxcblxuICAgIHF1aXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBtdnMuZW5naW5lLmxlYXZlUm9vbShcIlwiKTtcbiAgICAgICAgdmFyIGdhbWVQYW5lbCA9IHVpRnVuYy5maW5kVUkoXCJ1aUdhbWVQYW5lbFwiKTtcbiAgICAgICAgaWYgKGdhbWVQYW5lbCkge1xuICAgICAgICAgICAgdWlGdW5jLmNsb3NlVUkoXCJ1aUdhbWVQYW5lbFwiKTtcbiAgICAgICAgICAgIGdhbWVQYW5lbC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdWlGdW5jLmNsb3NlVUkodGhpcy5ub2RlLm5hbWUpO1xuICAgICAgICB0aGlzLm5vZGUuZGVzdHJveSgpO1xuXG5cbiAgICAgICAgR2FtZS5HYW1lTWFuYWdlci5sb2JieVNob3coKTtcbiAgICB9XG59KTtcbiJdfQ==