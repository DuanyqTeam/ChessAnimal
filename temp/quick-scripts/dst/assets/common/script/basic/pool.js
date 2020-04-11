
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/pool.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd64cfx7sNRHP6e6hOQkSrsx', 'pool');
// common/script/basic/pool.js

"use strict";

var pool = {
  _name1: "Pool",
  _name2: "Prefab",
  init: function init() {
    console.log('***********调用pool***********');
  },
  getPool: function getPool(name) {
    return this[name + this._name1];
  },
  isPool: function isPool(name) {
    return this[name + this._name1] && this[name + this._name2];
  },
  //prefab, 任意类型的对象或者预制体
  //size，初始对象池的大小，推荐使用默认大小1
  createPrefabPool: function createPrefabPool(prefab, count) {
    if (!this.isPool(prefab.name)) {
      this[prefab.name + this._name1] = new cc.NodePool();
      this[prefab.name + this._name2] = prefab;
    }

    var pool = this[prefab.name + this._name1];
    count = count || 1;
    count -= pool.size();

    for (var k = 0; k < count; k++) {
      this[prefab.name + this._name1].put(cc.instantiate(prefab));
    }
  },
  //从对象池中获取对象
  getPrefab: function getPrefab(name) {
    var prefab = null;

    if (this.isPool(name)) {
      var pool = this[name + this._name1];

      if (pool.size() > 0) {
        prefab = pool.get();
      } else {
        prefab = cc.instantiate(this[name + this._name2]);
      }
    }

    return prefab;
  },
  //从对象池中获取对象,同时初始化
  getPrefabEx: function getPrefabEx(name, data) {
    var prefab = this.getPrefab(name);
    if (prefab) prefab.getComponent(name).setData(data);
    return prefab;
  },
  putInPool: function putInPool(name, node) {
    if (!this.isPool(name)) return;

    this[name + this._name1].put(node);
  },
  //回收子节点中属于对象池的对象
  putChildInPool: function putChildInPool(node) {
    if (!cc.isValid(node) || node.children.length === 0) return;
    var count = node.children.length;

    for (var i = 0; i < count; i++) {
      var child = node.children[0];
      if (!this.isPool(child.name)) continue;
      this.putChildInPool(child);
      this.putInPool(child.name, child);
    }
  }
};
module.exports = pool;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL3Bvb2wuanMiXSwibmFtZXMiOlsicG9vbCIsIl9uYW1lMSIsIl9uYW1lMiIsImluaXQiLCJjb25zb2xlIiwibG9nIiwiZ2V0UG9vbCIsIm5hbWUiLCJpc1Bvb2wiLCJjcmVhdGVQcmVmYWJQb29sIiwicHJlZmFiIiwiY291bnQiLCJjYyIsIk5vZGVQb29sIiwic2l6ZSIsImsiLCJwdXQiLCJpbnN0YW50aWF0ZSIsImdldFByZWZhYiIsImdldCIsImdldFByZWZhYkV4IiwiZGF0YSIsImdldENvbXBvbmVudCIsInNldERhdGEiLCJwdXRJblBvb2wiLCJub2RlIiwicHV0Q2hpbGRJblBvb2wiLCJpc1ZhbGlkIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJpIiwiY2hpbGQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLElBQUksR0FBRztBQUNQQyxFQUFBQSxNQUFNLEVBQUUsTUFERDtBQUVQQyxFQUFBQSxNQUFNLEVBQUUsUUFGRDtBQUdQQyxFQUFBQSxJQUFJLEVBQUUsZ0JBQVk7QUFDZEMsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksOEJBQVo7QUFDSCxHQUxNO0FBT1BDLEVBQUFBLE9BQU8sRUFBRSxpQkFBVUMsSUFBVixFQUFnQjtBQUNyQixXQUFPLEtBQUtBLElBQUksR0FBRyxLQUFLTixNQUFqQixDQUFQO0FBQ0gsR0FUTTtBQVdQTyxFQUFBQSxNQUFNLEVBQUUsZ0JBQVVELElBQVYsRUFBZ0I7QUFDcEIsV0FBTyxLQUFLQSxJQUFJLEdBQUcsS0FBS04sTUFBakIsS0FBNEIsS0FBS00sSUFBSSxHQUFHLEtBQUtMLE1BQWpCLENBQW5DO0FBQ0gsR0FiTTtBQWVQO0FBQ0E7QUFDQU8sRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVVDLE1BQVYsRUFBa0JDLEtB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Q0FBQ3hCLElBQXJCLEVBQTJCd0IsS0FBM0I7QUFDSDtBQUNKO0FBdEVNLENBQVg7QUF3RUFDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmpDLElBQWpCIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHBvb2wgPSB7XG4gICAgX25hbWUxOiBcIlBvb2xcIixcbiAgICBfbmFtZTI6IFwiUHJlZmFiXCIsXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnKioqKioqKioqKirosIPnlKhwb29sKioqKioqKioqKionKVxuICAgIH0sXG5cbiAgICBnZXRQb29sOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpc1tuYW1lICsgdGhpcy5fbmFtZTFdO1xuICAgIH0sXG5cbiAgICBpc1Bvb2w6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzW25hbWUgKyB0aGlzLl9uYW1lMV0gJiYgdGhpc1tuYW1lICsgdGhpcy5fbmFtZTJdO1xuICAgIH0sXG5cbiAgICAvL3ByZWZhYiwg5Lu75oSP57G75Z6L55qE5a+56LGh5oiW6ICF6aKE5Yi25L2TXG4gICAgLy9zaXpl77yM5Yid5aeL5a+56LGh5rGg55qE5aSn5bCP77yM5o6o6I2Q5L2/55So6buY6K6k5aSn5bCPMVxuICAgIGNyZWF0ZVByZWZhYlBvb2w6IGZ1bmN0aW9uIChwcmVmYWIsIGNvdW50KSB7XG4gICAgICAgIGlmICghdGhpcy5pc1Bvb2wocHJlZmFiLm5hbWUpKSB7XG4gICAgICAgICAgICB0aGlzW3ByZWZhYi5uYW1lICsgdGhpcy5fbmFtZTFdID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgICAgICB0aGlzW3ByZWZhYi5uYW1lICsgdGhpcy5fbmFtZTJdID0gcHJlZmFiO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvb2wgPSB0aGlzW3ByZWZhYi5uYW1lICsgdGhpcy5fbmFtZTFdO1xuICAgICAgICBjb3VudCA9IGNvdW50IHx8IDE7XG4gICAgICAgIGNvdW50IC09IHBvb2wuc2l6ZSgpO1xuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGNvdW50OyBrKyspIHtcbiAgICAgICAgICAgIHRoaXNbcHJlZmFiLm5hbWUgKyB0aGlzLl9uYW1lMV0ucHV0KGNjLmluc3RhbnRpYXRlKHByZWZhYikpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5LuO5a+56LGh5rGg5Lit6I635Y+W5a+56LGhXG4gICAgZ2V0UHJlZmFiOiBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICB2YXIgcHJlZmFiID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMuaXNQb29sKG5hbWUpKSB7XG4gICAgICAgICAgICB2YXIgcG9vbCA9IHRoaXNbbmFtZSArIHRoaXMuX25hbWUxXTtcbiAgICAgICAgICAgIGlmIChwb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBwcmVmYWIgPSBwb29sLmdldCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmVmYWIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzW25hbWUgKyB0aGlzLl9uYW1lMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmVmYWI7XG4gICAgfSxcblxuICAgIC8v5LuO5a+56LGh5rGg5Lit6I635Y+W5a+56LGhLOWQjOaXtuWIneWni+WMllxuICAgIGdldFByZWZhYkV4OiBmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuICAgICAgICB2YXIgcHJlZmFiID0gdGhpcy5nZXRQcmVmYWIobmFtZSk7XG4gICAgICAgIGlmIChwcmVmYWIpXG4gICAgICAgICAgICBwcmVmYWIuZ2V0Q29tcG9uZW50KG5hbWUpLnNldERhdGEoZGF0YSk7XG5cbiAgICAgICAgcmV0dXJuIHByZWZhYjtcbiAgICB9LFxuXG4gICAgcHV0SW5Qb29sOiBmdW5jdGlvbiAobmFtZSwgbm9kZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNQb29sKG5hbWUpKSByZXR1cm47XG4gICAgICAgIHRoaXNbbmFtZSArIHRoaXMuX25hbWUxXS5wdXQobm9kZSk7XG4gICAgfSxcblxuICAgIC8v5Zue5pS25a2Q6IqC54K55Lit5bGe5LqO5a+56LGh5rGg55qE5a+56LGhXG4gICAgcHV0Q2hpbGRJblBvb2w6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmICghY2MuaXNWYWxpZChub2RlKSB8fCBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBjb3VudCA9IG5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IG5vZGUuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNQb29sKGNoaWxkLm5hbWUpKSBjb250aW51ZTtcbiAgICAgICAgICAgIHRoaXMucHV0Q2hpbGRJblBvb2woY2hpbGQpO1xuICAgICAgICAgICAgdGhpcy5wdXRJblBvb2woY2hpbGQubmFtZSwgY2hpbGQpO1xuICAgICAgICB9XG4gICAgfVxufTtcbm1vZHVsZS5leHBvcnRzID0gcG9vbDsiXX0=