"use strict";
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