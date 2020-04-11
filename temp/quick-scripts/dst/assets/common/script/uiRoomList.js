
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/uiRoomList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b8d92GHTWtF9b8nT+A88ZLS', 'uiRoomList');
// common/script/uiRoomList.js

"use strict";

var uiPanel = require("uiPanel");

var mvs = require("Matchvs");

var GLB = require("Glb");

cc.Class({
  "extends": uiPanel,
  properties: {},
  start: function start() {
    this.roomPrefab = this.nodeDict["roomPrefab"];
    this.editBox = this.nodeDict["editBox"].getComponent(cc.EditBox);
    this.roomPrefab.active = false;
    this.nodeDict["search"].on("click", this.search, this);
    this.nodeDict["quit"].on("click", this.quit, this);
    this.rooms = [];
    clientEvent.on(clientEvent.eventType.getRoomListResponse, this.getRoomListResponse, this);
    clientEvent.on(clientEvent.eventType.joinRoomResponse, this.joinRoomResponse, this);
    clientEvent.on(clientEvent.eventType.getRoomListExResponse, this.getRoomListExResponse, this);
    this.getRoomList();
    this.roomRqId = setInterval(function () {
      if (this.editBox.string === '') {
        this.getRoomList();
      }
    }.bind(this), 5000);
  },
  getRoomList: function getRoomList() {
    var filter = {
      maxPlayer: 0,
      mode: 0,
      canWatch: 0,
      roomProperty: "",
      full: 2,
      state: 1,
      sort: 1,
      order: 0,
      pageNo: 0,
      pageSize: 20
    };
    mvs.engine.getRoomListEx(filter);
  },
  getRoomListResponse: function getRoomListResponse(data) {
    for (var j = 0; j < this.rooms.length; j++) {
      this.rooms[j].destroy();
    }

    this.rooms = [];
    data.roomInfos.sort(function (a, b) {
      return a.roomID - b.roomID;
    });

    for (var i = 0; i < data.roomInfos.length; i++) {
      var room = cc.instantiate(this.roomPrefab);
      room.active = true;
      room.parent = this.roomPrefab.parent;
      var roomScript = room.getComponent('roomInfo');
      roomScript.setData(data.roomInfos[i]);
      this.rooms.push(room);
    }
  },
  getRoomListExResponse: function getRoomListExResponse(data) {
    for (var j = 0; j < this.rooms.length; j++) {
      this.rooms[j].destroy();
    }

    this.rooms = [];
    this.roomAttrs = data.rsp.roomAttrs;

    for (var i = 0; i < data.rsp.roomAttrs.length; i++) {
      var room = cc.instantiate(this.roomPrefab);
      room.active = true;
      room.parent = this.roomPrefab.parent;
      var roomScript = room.getComponent('roomInfo');
      roomScript.setData(data.rsp.roomAttrs[i]);
      this.rooms.push(room);
    }
  },
  quit: function quit() {
    clearInterval(this.roomRqId);
    uiFunc.closeUI(this.node.name);
    this.node.destroy();
  },
  search: function search() {
    if (this.editBox.string === '') {
      for (var i = 0; i < this.rooms.length; i++) {
        this.rooms[i].active = true;
      }
    } else {
      for (var j = 0; j < this.rooms.length; j++) {
        var roomScript = this.rooms[j].getComponent('roomInfo');

        if (roomScript.roomIdLb.string == this.editBox.string) {
          this.rooms[j].active = true;
        } else {
          this.rooms[j].active = false;
        }
      }
    }
  },
  joinRoomResponse: function joinRoomResponse(data) {
    if (data.status !== 200) {
      console.log('进入房间失败,异步回调错误码: ' + data.status);
    } else {
      console.log('进入房间成功');
      console.log('房间号: ' + data.roomInfo.roomID);

      if (!data.roomUserInfoList.some(function (x) {
        return x.userId === GLB.userInfo.id;
      })) {
        data.roomUserInfoList.push({
          userId: GLB.userInfo.id,
          userProfile: ""
        });
      } // 设置房间最大人数--


      for (var i = 0; i < this.roomAttrs.length; i++) {
        if (data.roomInfo.roomID === this.roomAttrs[i].roomID) {
          GLB.MAX_PLAYER_COUNT = this.roomAttrs[i].maxPlayer;
          break;
        }
      }

      if (cc.Canvas.instance.designResolution.height > cc.Canvas.instance.designResolution.width) {
        uiFunc.openUI("uiRoomVer", function (obj) {
          var room = obj.getComponent('uiRoom');
          room.joinRoomInit(data.roomUserInfoList, data.roomInfo);
          uiFunc.closeUI(this.node.name);
          this.node.destroy();
        }.bind(this));
      } else {
        uiFunc.openUI("uiRoom", function (obj) {
          var room = obj.getComponent('uiRoom');
          room.joinRoomInit(data.roomUserInfoList, data.roomInfo);
          uiFunc.closeUI(this.node.name);
          this.node.destroy();
        }.bind(this));
      }
    }
  },
  onDestroy: function onDestroy() {
    if (window.wx) {
      wx.offKeyboardComplete();
      wx.offKeyboardInput();
      wx.hideKeyboard();
    }

    clearInterval(this.roomRqId);
    clientEvent.off(clientEvent.eventType.getRoomListResponse, this.getRoomListResponse, this);
    clientEvent.off(clientEvent.eventType.joinRoomResponse, this.joinRoomResponse, this);
    clientEvent.off(clientEvent.eventType.getRoomListExResponse, this.getRoomListExResponse, this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Fzc2V0cy9jb21tb24vc2NyaXB0L3VpUm9vbUxpc3QuanMiXSwibmFtZXMiOlsidWlQYW5lbCIsInJlcXVpcmUiLCJtdnMiLCJHTEIiLCJjYyIsIkNsYXNzIiwicHJvcGVydGllcyIsInN0YXJ0Iiwicm9vbVByZWZhYiIsIm5vZGVEaWN0IiwiZWRpdEJveCIsImdldENvbXBvbmVudCIsIkVkaXRCb3giLCJhY3RpdmUiLCJvbiIsInNlYXJjaCIsInF1aXQiLCJyb29tcyIsImNsaWVudEV2ZW50IiwiZXZlbnRUeXBlIiwiZ2V0Um9vbUxpc3RSZXNwb25zZSIsImpvaW5Sb29tUmVzcG9uc2UiLCJnZXRSb29tTGlzdEV4UmVzcG9uc2UiLCJnZXRSb29tTGlzdCIsInJvb21ScUlkIiwic2V0SW50ZXJ2YWwiLCJzdHJpbmciLCJiaW5kIiwiZmlsdGVyIiwibWF4UGxheWVyIiwibW9kZSIsImNhbldhdGNoIiwicm9vbVByb3BlcnR5IiwiZnVsbCIsInN0YXRlIiwic29ydCIsIm9yZGVyIiwicGFnZU5vIiwicGFnZVNpemUiLCJlbmdpbmUiLCJnZXRSb29tTGlzdEV4IiwiZGF0YSIsImoiLCJsZW5ndGgiLCJkZXN0cm95Iiwicm9vbUluZm9zIiwiYSIsImIiLCJyb29tSUQiLCJpIiwicm9vbSIsImluc3RhbnRpYXRlIiwicGFyZW50Iiwicm9vbVNjcmlwdCIsInNldERhdGEiLCJwdXNoIiwicm9vbUF0dHJzIiwicnNwIiwiY2xlYXJJbnRlcnZhbCIsInVpRnVuYyIsImNsb3NlVUkiLCJub2RlIiwibmFtZSIsInJvb21JZExiIiwic3RhdHVzIiwiY29uc29sZSIsImxvZyIsInJvb21JbmZvIiwicm9vbVVzZXJJbmZvTGlzdCIsInNvbWUiLCJ4IiwidXNlcklkIiwidXNlckluZm8iLCJpZCIsInVzZXJQcm9maWxlIiwiTUFYX1BMQVlFUl9DT1VOVCIsIkNhbnZhcyIsImluc3RhbmNlIiwiZGVzaWduUmVzb2x1dGlvbiIsImhlaWdodCIsIndpZHRoIiwib3BlblVJIiwib2JqIiwiam9pblJvb21Jbml0Iiwib25EZXN0cm95Iiwid2luZG93Iiwid3giLCJvZmZLZXlib2FyZENvbXBsZXRlIiwib2ZmS2V5Ym9hcmRJbnB1dCIsImhpZGVLZXlib2FyZCIsIm9mZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxPQUFPLEdBQUdDLE9BQU8sQ0FBQyxTQUFELENBQXJCOztBQUNBLElBQUlDLEdBQUcsR0FBR0QsT0FBTyxDQUFDLFNBQUQsQ0FBakI7O0FBQ0EsSUFBSUUsR0FBRyxHQUFHRixPQUFPLENBQUMsS0FBRCxDQUFqQjs7QUFDQUcsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTTCxPQURKO0FBR0xNLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBS0xDLEVBQUFBLEtBTEssbUJBS0c7QUFDSixTQUFLQyxVQUFMLEdBQWtCLEtBQUtDLFFBQUwsQ0FBYyxZQUFkLENBQWxCO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLEtBQUtELFFBQUwsQ0FBYyxTQUFkLEVBQXlCRSxZQUF6QixDQUFzQ1AsRUFBRSxDQUFDUSxPQUF6QyxDQUFmO0FBQ0EsU0FBS0osVUFBTCxDQUFnQkssTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxTQUFLSixRQUFMLENBQWMsUUFBZCxFQUF3QkssRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsS0FBS0MsTUFBekMsRUFBaUQsSUFBakQ7QUFDQSxTQUFLTixRQUFMLENBQWMsTUFBZCxFQUFzQkssRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsS0FBS0UsSUFBdkMsRUFBNkMsSUFBN0M7QUFHQSxTQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUVBQyxJQUFBQSxXQUFXLENBQUNKLEVBQVosQ0FBZUksV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxtQkFBckMsRUFBMEQsS0FBS0EsbUJBQS9ELEVBQW9GLElBQXBGO0FBQ0FGLElBQUFBLFdBQVcsQ0FBQ0osRUFBWixDQUFlSSxXQUFX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VCxFQUFjO0FBQ2xDLGNBQUloQyxJQUFJLEdBQUdnQyxHQUFHLENBQUN2RSxZQUFKLENBQWlCLFFBQWpCLENBQVg7QUFDQXVDLFVBQUFBLElBQUksQ0FBQ2lDLFlBQUwsQ0FBa0IxQyxJQUFJLENBQUMyQixnQkFBdkIsRUFBeUMzQixJQUFJLENBQUMwQixRQUE5QztBQUNBUixVQUFBQSxNQUFNLENBQUNDLE9BQVAsQ0FBZSxLQUFLQyxJQUFMLENBQVVDLElBQXpCO0FBQ0EsZUFBS0QsSUFBTCxDQUFVakIsT0FBVjtBQUNILFNBTHVCLENBS3RCakIsSUFMc0IsQ0FLakIsSUFMaUIsQ0FBeEI7QUFNSDtBQUNKO0FBQ0osR0E1SUk7QUE4SUx5RCxFQUFBQSxTQTlJSyx1QkE4SU87QUFDUixRQUFJQyxNQUFNLENBQUNDLEVBQVgsRUFBZTtBQUNYQSxNQUFBQSxFQUFFLENBQUNDLG1CQUFIO0FBQ0FELE1BQUFBLEVBQUUsQ0FBQ0UsZ0JBQUg7QUFDQUYsTUFBQUEsRUFBRSxDQUFDRyxZQUFIO0FBQ0g7O0FBQ0QvQixJQUFBQSxhQUFhLENBQUMsS0FBS2xDLFFBQU4sQ0FBYjtBQUNBTixJQUFBQSxXQUFXLENBQUN3RSxHQUFaLENBQWdCeEUsV0FBVyxDQUFDQyxTQUFaLENBQXNCQyxtQkFBdEMsRUFBMkQsS0FBS0EsbUJBQWhFLEVBQXFGLElBQXJGO0FBQ0FGLElBQUFBLFdBQVcsQ0FBQ3dFLEdBQVosQ0FBZ0J4RSxXQUFXLENBQUNDLFNBQVosQ0FBc0JFLGdCQUF0QyxFQUF3RCxLQUFLQSxnQkFBN0QsRUFBK0UsSUFBL0U7QUFDQUgsSUFBQUEsV0FBVyxDQUFDd0UsR0FBWixDQUFnQnhFLFdBQVcsQ0FBQ0MsU0FBWixDQUFzQkcscUJBQXRDLEVBQTZELEtBQUtBLHFCQUFsRSxFQUF5RixJQUF6RjtBQUNIO0FBeEpJLENBQVQiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdWlQYW5lbCA9IHJlcXVpcmUoXCJ1aVBhbmVsXCIpO1xudmFyIG12cyA9IHJlcXVpcmUoXCJNYXRjaHZzXCIpO1xudmFyIEdMQiA9IHJlcXVpcmUoXCJHbGJcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogdWlQYW5lbCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHRoaXMucm9vbVByZWZhYiA9IHRoaXMubm9kZURpY3RbXCJyb29tUHJlZmFiXCJdO1xuICAgICAgICB0aGlzLmVkaXRCb3ggPSB0aGlzLm5vZGVEaWN0W1wiZWRpdEJveFwiXS5nZXRDb21wb25lbnQoY2MuRWRpdEJveCk7XG4gICAgICAgIHRoaXMucm9vbVByZWZhYi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ub2RlRGljdFtcInNlYXJjaFwiXS5vbihcImNsaWNrXCIsIHRoaXMuc2VhcmNoLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlRGljdFtcInF1aXRcIl0ub24oXCJjbGlja1wiLCB0aGlzLnF1aXQsIHRoaXMpO1xuXG5cbiAgICAgICAgdGhpcy5yb29tcyA9IFtdO1xuXG4gICAgICAgIGNsaWVudEV2ZW50Lm9uKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5nZXRSb29tTGlzdFJlc3BvbnNlLCB0aGlzLmdldFJvb21MaXN0UmVzcG9uc2UsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vbihjbGllbnRFdmVudC5ldmVudFR5cGUuam9pblJvb21SZXNwb25zZSwgdGhpcy5qb2luUm9vbVJlc3BvbnNlLCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub24oY2xpZW50RXZlbnQuZXZlbnRUeXBlLmdldFJvb21MaXN0RXhSZXNwb25zZSwgdGhpcy5nZXRSb29tTGlzdEV4UmVzcG9uc2UsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuZ2V0Um9vbUxpc3QoKTtcbiAgICAgICAgdGhpcy5yb29tUnFJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdEJveC5zdHJpbmcgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRSb29tTGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcyksIDUwMDApO1xuICAgIH0sXG5cbiAgICBnZXRSb29tTGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWx0ZXIgPSB7XG4gICAgICAgICAgICBtYXhQbGF5ZXI6IDAsXG4gICAgICAgICAgICBtb2RlOiAwLFxuICAgICAgICAgICAgY2FuV2F0Y2g6IDAsXG4gICAgICAgICAgICByb29tUHJvcGVydHk6IFwiXCIsXG4gICAgICAgICAgICBmdWxsOiAyLFxuICAgICAgICAgICAgc3RhdGU6IDEsXG4gICAgICAgICAgICBzb3J0OiAxLFxuICAgICAgICAgICAgb3JkZXI6IDAsXG4gICAgICAgICAgICBwYWdlTm86IDAsXG4gICAgICAgICAgICBwYWdlU2l6ZTogMjBcbiAgICAgICAgfVxuICAgICAgICBtdnMuZW5naW5lLmdldFJvb21MaXN0RXgoZmlsdGVyKTtcbiAgICB9LFxuXG4gICAgZ2V0Um9vbUxpc3RSZXNwb25zZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMucm9vbXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHRoaXMucm9vbXNbal0uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm9vbXMgPSBbXTtcbiAgICAgICAgZGF0YS5yb29tSW5mb3Muc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5yb29tSUQgLSBiLnJvb21JRDtcbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5yb29tSW5mb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByb29tID0gY2MuaW5zdGFudGlhdGUodGhpcy5yb29tUHJlZmFiKTtcbiAgICAgICAgICAgIHJvb20uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJvb20ucGFyZW50ID0gdGhpcy5yb29tUHJlZmFiLnBhcmVudDtcbiAgICAgICAgICAgIHZhciByb29tU2NyaXB0ID0gcm9vbS5nZXRDb21wb25lbnQoJ3Jvb21JbmZvJyk7XG4gICAgICAgICAgICByb29tU2NyaXB0LnNldERhdGEoZGF0YS5yb29tSW5mb3NbaV0pO1xuXG4gICAgICAgICAgICB0aGlzLnJvb21zLnB1c2gocm9vbSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0Um9vbUxpc3RFeFJlc3BvbnNlOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5yb29tcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdGhpcy5yb29tc1tqXS5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb29tcyA9IFtdO1xuICAgICAgICB0aGlzLnJvb21BdHRycyA9IGRhdGEucnNwLnJvb21BdHRycztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnJzcC5yb29tQXR0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByb29tID0gY2MuaW5zdGFudGlhdGUodGhpcy5yb29tUHJlZmFiKTtcbiAgICAgICAgICAgIHJvb20uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHJvb20ucGFyZW50ID0gdGhpcy5yb29tUHJlZmFiLnBhcmVudDtcbiAgICAgICAgICAgIHZhciByb29tU2NyaXB0ID0gcm9vbS5nZXRDb21wb25lbnQoJ3Jvb21JbmZvJyk7XG4gICAgICAgICAgICByb29tU2NyaXB0LnNldERhdGEoZGF0YS5yc3Aucm9vbUF0dHJzW2ldKTtcblxuICAgICAgICAgICAgdGhpcy5yb29tcy5wdXNoKHJvb20pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHF1aXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMucm9vbVJxSWQpO1xuICAgICAgICB1aUZ1bmMuY2xvc2VVSSh0aGlzLm5vZGUubmFtZSk7XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfSxcblxuICAgIHNlYXJjaDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRCb3guc3RyaW5nID09PSAnJykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvb21zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tc1tpXS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnJvb21zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvb21TY3JpcHQgPSB0aGlzLnJvb21zW2pdLmdldENvbXBvbmVudCgncm9vbUluZm8nKTtcbiAgICAgICAgICAgICAgICBpZiAocm9vbVNjcmlwdC5yb29tSWRMYi5zdHJpbmcgPT0gdGhpcy5lZGl0Qm94LnN0cmluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb21zW2pdLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tc1tqXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgam9pblJvb21SZXNwb25zZTogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBpZiAoZGF0YS5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+i/m+WFpeaIv+mXtOWksei0pSzlvILmraXlm57osIPplJnor6/noIE6ICcgKyBkYXRhLnN0YXR1cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6L+b5YWl5oi/6Ze05oiQ5YqfJyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5oi/6Ze05Y+3OiAnICsgZGF0YS5yb29tSW5mby5yb29tSUQpO1xuICAgICAgICAgICAgaWYgKCFkYXRhLnJvb21Vc2VySW5mb0xpc3Quc29tZShmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHgudXNlcklkID09PSBHTEIudXNlckluZm8uaWQ7XG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgIGRhdGEucm9vbVVzZXJJbmZvTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcklkOiBHTEIudXNlckluZm8uaWQsXG4gICAgICAgICAgICAgICAgICAgIHVzZXJQcm9maWxlOiBcIlwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDorr7nva7miL/pl7TmnIDlpKfkurrmlbAtLVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvb21BdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnJvb21JbmZvLnJvb21JRCA9PT0gdGhpcy5yb29tQXR0cnNbaV0ucm9vbUlEKSB7XG4gICAgICAgICAgICAgICAgICAgIEdMQi5NQVhfUExBWUVSX0NPVU5UID0gdGhpcy5yb29tQXR0cnNbaV0ubWF4UGxheWVyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYy5DYW52YXMuaW5zdGFuY2UuZGVzaWduUmVzb2x1dGlvbi5oZWlnaHQgPiBjYy5DYW52YXMuaW5zdGFuY2UuZGVzaWduUmVzb2x1dGlvbi53aWR0aCkge1xuICAgICAgICAgICAgICAgIHVpRnVuYy5vcGVuVUkoXCJ1aVJvb21WZXJcIiwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb29tID0gb2JqLmdldENvbXBvbmVudCgndWlSb29tJyk7XG4gICAgICAgICAgICAgICAgICAgIHJvb20uam9pblJvb21Jbml0KGRhdGEucm9vbVVzZXJJbmZvTGlzdCwgZGF0YS5yb29tSW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIHVpRnVuYy5jbG9zZVVJKHRoaXMubm9kZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1aUZ1bmMub3BlblVJKFwidWlSb29tXCIsIGZ1bmN0aW9uKG9iaikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm9vbSA9IG9iai5nZXRDb21wb25lbnQoJ3VpUm9vbScpO1xuICAgICAgICAgICAgICAgICAgICByb29tLmpvaW5Sb29tSW5pdChkYXRhLnJvb21Vc2VySW5mb0xpc3QsIGRhdGEucm9vbUluZm8pO1xuICAgICAgICAgICAgICAgICAgICB1aUZ1bmMuY2xvc2VVSSh0aGlzLm5vZGUubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh3aW5kb3cud3gpIHtcbiAgICAgICAgICAgIHd4Lm9mZktleWJvYXJkQ29tcGxldGUoKTtcbiAgICAgICAgICAgIHd4Lm9mZktleWJvYXJkSW5wdXQoKTtcbiAgICAgICAgICAgIHd4LmhpZGVLZXlib2FyZCgpO1xuICAgICAgICB9XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5yb29tUnFJZCk7XG4gICAgICAgIGNsaWVudEV2ZW50Lm9mZihjbGllbnRFdmVudC5ldmVudFR5cGUuZ2V0Um9vbUxpc3RSZXNwb25zZSwgdGhpcy5nZXRSb29tTGlzdFJlc3BvbnNlLCB0aGlzKTtcbiAgICAgICAgY2xpZW50RXZlbnQub2ZmKGNsaWVudEV2ZW50LmV2ZW50VHlwZS5qb2luUm9vbVJlc3BvbnNlLCB0aGlzLmpvaW5Sb29tUmVzcG9uc2UsIHRoaXMpO1xuICAgICAgICBjbGllbnRFdmVudC5vZmYoY2xpZW50RXZlbnQuZXZlbnRUeXBlLmdldFJvb21MaXN0RXhSZXNwb25zZSwgdGhpcy5nZXRSb29tTGlzdEV4UmVzcG9uc2UsIHRoaXMpO1xuICAgIH1cbn0pO1xuIl19