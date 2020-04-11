
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiRankPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '2c8cfg9bhVBM6dvwnWUt5qp', 'uiRankPanel');
// common/script/uiRankPanel.js

"use strict";

var uiPanel = require("uiPanel");

cc.Class({
  "extends": uiPanel,
  properties: {
    rankPrefab: {
      "default": null,
      type: cc.Node
    },
    rank1Node: {
      "default": null,
      type: cc.Node
    },
    rank2Node: {
      "default": null,
      type: cc.Node
    },
    rank3Node: {
      "default": null,
      type: cc.Node
    }
  },
  onLoad: function onLoad() {
    this._super();

    this.rankPrefab.active = false;
    this.rank1Node.active = false;
    this.rank2Node.active = false;
    this.rank3Node.active = false;
    this.rank1Info = this.rank1Node.getComponent("rankUserInfo");
    this.rank2Info = this.rank2Node.getComponent("rankUserInfo");
    this.rank3Info = this.rank3Node.getComponent("rankUserInfo");
    this.nodeDict["exit"].on("click", this.quit, this);
  },
  quit: function quit() {
    uiFunc.closeUI(this.node.name);
    this.node.destroy();
  },
  setData: function setData(rankdata) {
    console.log("setData");

    for (var i = 0; i < rankdata.length; i++) {
      if (i === 0) {
        this.rank1Node.active = true;
        this.rank1Info.setData(rankdata[i]);
      } else if (i === 1) {
        this.rank2Node.active = true;
        this.rank2Info.setData(rankdata[i]);
      } else if (i === 2) {
        this.rank3Node.active = true;
        this.rank3Info.setData(rankdata[i]);
      } else {
        var temp = cc.instantiate(this.rankPrefab);
        temp.active = true;
        temp.parent = this.rankPrefab.parent;
        var rankInfo = temp.getComponent("rankUserInfo");
        rankInfo.setData(rankdata[i]);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpUmFua1BhbmVsLmpzIl0sIm5hbWVzIjpbInVpUGFuZWwiLCJyZXF1aXJlIiwiY2MiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJyYW5rUHJlZmFiIiwidHlwZSIsIk5vZGUiLCJyYW5rMU5vZGUiLCJyYW5rMk5vZGUiLCJyYW5rM05vZGUiLCJvbkxvYWQiLCJfc3VwZXIiLCJhY3RpdmUiLCJyYW5rMUluZm8iLCJnZXRDb21wb25lbnQiLCJyYW5rMkluZm8iLCJyYW5rM0luZm8iLCJub2RlRGljdCIsIm9uIiwicXVpdCIsInVpRnVuYyIsImNsb3NlVUkiLCJub2RlIiwibmFtZSIsImRlc3Ryb3kiLCJzZXREYXRhIiwicmFua2RhdGEiLCJjb25zb2xlIiwibG9nIiwiaSIsImxlbmd0aCIsInRlbXAiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInJhbmtJbmZvIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sR0FBR0MsT0FBTyxDQUFDLFNBQUQsQ0FBckI7O0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBRUwsYUFBU0gsT0FGSjtBQUdMSSxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFFO0FBQ1IsaUJBQVMsSUFERDtBQUVSQyxNQUFBQSxJQUFJLEVBQUVKLEVBQUUsQ0FBQ0s7QUFGRCxLQURKO0FBS1JDLElBQUFBLFNBQVMsRUFBRTtBQUNQLGlCQUFTLElBREY7QUFFUEYsTUFBQUEsSUFBSSxFQUFFSixFQUFFLENBQUNLO0FBRkYsS0FMSDtBQVNSRSxJQUFBQSxTQUFTLEVBQUU7QUFDUCxpQkFBUyxJQURGO0FBRVBILE1BQUFBLElBQUksRUFBRUosRUFBRSxDQUFDSztBQUZGLEtBVEg7QUFhUkcsSUFBQUEsU0FBUyxFQUFFO0FBQ1AsaUJBQVMsSUFERjtBQUVQSixNQUFBQSxJQUFJLEVBQUVKLEVBQUUsQ0FBQ0s7QUFGRjtBQWJILEdBSFA7QUFzQkxJLEVBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmLFNBQUtDLE1BQUw7O0FBQ0EsU0FBS1AsVUFBTCxDQUFnQlEsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxTQUFLTCxTQUFMLENBQWVLLE1BQWYsR0FBd0IsS0FBeEI7QUFDQSxTQUFLSixTQUFMLENBQWVJLE1BQWYsR0FBd0IsS0FBeEI7QUFDQSxTQUFLSCxTQUFMLENBQWVHLE1BQWYsR0FBd0IsS0FBeEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEtBQUtOLFNBQUwsQ0FBZU8sWUFBZixDQUE0QixjQUE1QixDQUFqQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBS1AsU0FBTCxDQUFlTSxZQUFmLENBQTRCLGNBQTVCLENBQWpCO0FBQ0EsU0FBS0UsU0FBTCxHQUFpQixLQUFLUCxTQUFMLENBQWVLLFlBQWYsQ0FBNEIsY0FBNUIsQ0FBakI7QUFDQSxTQUFLRyxRQUFMLENBQWMsTUFBZCxFQUFzQkMsRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsS0FBS0MsSUFBdkMsRUFBNkMsSUFBN0M7QUFDSCxHQWhDSTtBQWtDTEEsRUFBQUEsSUFBSSxFQUFFLGdCQUFXO0FBQ2JDLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlLEtBQUtDLElBQUwsQ0FBVUMsSUFBekI7QUFDQSxTQUFLRCxJQUFMLENBQVVFLE9BQVY7QUFDSCxHQXJDSTtBQXVDTEMsRUFBQUEsT0FBTyxFQUFFLGlCQUFTQyxRQUFULEVBQW1CO0FBQ3hCQyxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0gsUUFBUSxDQUFDSSxNQUE3QixFQUFxQ0QsQ0FBQyxFQUF0QyxFQUEwQztBQUN0QyxVQUFJQSxDQUFDLEtBQUssQ0FBVixFQUFhO0FBQ1QsYUFBS3RCLFNBQUwsQ0FBZUssTUFBZixHQUF3QixJQUF4QjtBQUNBLGFBQUtDLFNBQUwsQ0FBZVksT0FBZixDQUF1QkMsUUFBUSxDQUFDRyxDQUFELENBQS9CO0FBQ0gsT0FIRCxNQUdPLElBQUlBLENBQUMsS0FBSyxDQUFWLEVBQWE7QUFDaEIsYUFBS3JCLFNBQUwsQ0FBZUksTUFBZixHQUF3QixJQUF4QjtBQUNBLGFBQUtHLFNBQUwsQ0FBZVUsT0FBZixDQUF1QkMsUUFBUSxDQUFDRyxDQUFELENBQS9CO0FBQ0gsT0FITSxNQUdBLElBQUlBLENBQUMsS0FBSyxDQUFWLEVBQWE7QUFDaEIsYUFBS3BCLFNBQUwsQ0FBZUcsTUFBZixHQUF3QixJQUF4QjtBQUNBLGFBQUtJLFNBQUwsQ0FBZVMsT0FBZixDQUF1QkMsUUFBUSxDQUFDRyxDQUFELENBQS9CO0FBQ0gsT0FITSxNQUdBO0FBQ0gsWUFBSUUsSUFBSSxHQUFHOUIsRUFBRSxDQUFDK0IsV0FBSCxDQUFlLEtBQUs1QixVQUFwQixDQUFYO0FBQ0EyQixRQUFBQSxJQUFJLENBQUNuQixNQUFMLEdBQWMsSUFBZDtBQUNBbUIsUUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBSzdCLFVBQUwsQ0FBZ0I2QixNQUE5QjtBQUNBLFlBQUlDLFFBQVEsR0FBR0gsSUFBSSxDQUFDakIsWUFBTCxDQUFrQixjQUFsQixDQUFmO0FBQ0FvQixRQUFBQSxRQUFRLENBQUNULE9BQVQsQ0FBaUJDLFFBQVEsQ0FBQ0csQ0FBRCxDQUF6QjtBQUNIO0FBQ0o7QUFDSjtBQTNESSxDQUFUIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0Iiwic291cmNlc0NvbnRlbnQiOlsidmFyIHVpUGFuZWwgPSByZXF1aXJlKFwidWlQYW5lbFwiKTtcblxuY2MuQ2xhc3Moe1xuXG4gICAgZXh0ZW5kczogdWlQYW5lbCxcbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHJhbmtQcmVmYWI6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIHJhbmsxTm9kZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgcmFuazJOb2RlOiB7XG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuICAgICAgICByYW5rM05vZGU6IHtcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yYW5rUHJlZmFiLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJhbmsxTm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yYW5rMk5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmFuazNOb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJhbmsxSW5mbyA9IHRoaXMucmFuazFOb2RlLmdldENvbXBvbmVudChcInJhbmtVc2VySW5mb1wiKTtcbiAgICAgICAgdGhpcy5yYW5rMkluZm8gPSB0aGlzLnJhbmsyTm9kZS5nZXRDb21wb25lbnQoXCJyYW5rVXNlckluZm9cIik7XG4gICAgICAgIHRoaXMucmFuazNJbmZvID0gdGhpcy5yYW5rM05vZGUuZ2V0Q29tcG9uZW50KFwicmFua1VzZXJJbmZvXCIpO1xuICAgICAgICB0aGlzLm5vZGVEaWN0W1wiZXhpdFwiXS5vbihcImNsaWNrXCIsIHRoaXMucXVpdCwgdGhpcyk7XG4gICAgfSxcblxuICAgIHF1aXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB1aUZ1bmMuY2xvc2VVSSh0aGlzLm5vZGUubmFtZSk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIHNldERhdGE6IGZ1bmN0aW9uKHJhbmtkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2V0RGF0YVwiKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5rZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmsxTm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmFuazFJbmZvLnNldERhdGEocmFua2RhdGFbaV0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5rMk5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmsySW5mby5zZXREYXRhKHJhbmtkYXRhW2ldKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHRoaXMucmFuazNOb2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5yYW5rM0luZm8uc2V0RGF0YShyYW5rZGF0YVtpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wID0gY2MuaW5zdGFudGlhdGUodGhpcy5yYW5rUHJlZmFiKTtcbiAgICAgICAgICAgICAgICB0ZW1wLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGVtcC5wYXJlbnQgPSB0aGlzLnJhbmtQcmVmYWIucGFyZW50O1xuICAgICAgICAgICAgICAgIHZhciByYW5rSW5mbyA9IHRlbXAuZ2V0Q29tcG9uZW50KFwicmFua1VzZXJJbmZvXCIpO1xuICAgICAgICAgICAgICAgIHJhbmtJbmZvLnNldERhdGEocmFua2RhdGFbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXX0=