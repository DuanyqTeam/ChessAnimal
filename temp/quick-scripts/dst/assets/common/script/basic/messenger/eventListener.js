
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/messenger/eventListener.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '359bao5dhlF44Q44k+/qNRI', 'eventListener');
// common/script/basic/messenger/eventListener.js

"use strict";

window.eventListener = {};
var oneToMultiListener = {};

oneToMultiListener.on = function (eventName, handler, target) {
  var handlerList = this.handlers[eventName];

  if (!handlerList) {
    handlerList = [];
    this.handlers[eventName] = handlerList;
  }

  for (var i = 0; i < handlerList.length; i++) {
    if (!handlerList[i]) {
      handlerList[i].handler = handler;
      handlerList[i].target = target;
      return i;
    }
  }

  handlerList.push({
    handler: handler,
    target: target
  });
  return handlerList.length;
};

oneToMultiListener.dispatch = function (eventName, data) {
  var handlerList = this.handlers[eventName];

  if (!handlerList) {
    return;
  }

  var len = handlerList.length;

  for (var i = 0; i < len; i++) {
    var handler = handlerList[i].handler;
    var target = handlerList[i].target;

    if (handler) {
      try {
        if (target) {
          handler.call(target, data);
        } else {
          handler(data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
};

oneToMultiListener.off = function (eventName, handler, target) {
  var handlerList = this.handlers[eventName];

  if (!handlerList) {
    return;
  }

  for (var i = 0; i < handlerList.length; i++) {
    var oldHandler = handlerList[i].handler;
    var oldTarget = handlerList[i].target;

    if (oldHandler === handler && oldTarget === target) {
      handlerList.splice(i, 1);
      break;
    }
  }
};

oneToMultiListener.clear = function (target) {
  for (var eventName in this.handlers) {
    var handlerList = this.handlers[eventName];

    for (var i = 0; i < handlerList.length; i++) {
      var oldTarget = handlerList[i].target;

      if (oldTarget === target) {
        handlerList.splice(i, 1);
      }
    }
  }
};

eventListener.create = function () {
  var newEventListener = Object.create(oneToMultiListener);
  newEventListener.handlers = {};
  return newEventListener;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL21lc3Nlbmdlci9hc3NldHMvY29tbW9uL3NjcmlwdC9iYXNpYy9tZXNzZW5nZXIvZXZlbnRMaXN0ZW5lci5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJldmVudExpc3RlbmVyIiwib25lVG9NdWx0aUxpc3RlbmVyIiwib24iLCJldmVudE5hbWUiLCJoYW5kbGVyIiwidGFyZ2V0IiwiaGFuZGxlckxpc3QiLCJoYW5kbGVycyIsImkiLCJsZW5ndGgiLCJwdXNoIiwiZGlzcGF0Y2giLCJkYXRhIiwibGVuIiwiY2FsbCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJvZmYiLCJvbGRIYW5kbGVyIiwib2xkVGFyZ2V0Iiwic3BsaWNlIiwiY2xlYXIiLCJjcmVhdGUiLCJuZXdFdmVudExpc3RlbmVyIiwiT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLGFBQVAsR0FBdUIsRUFBdkI7QUFFQSxJQUFJQyxrQkFBa0IsR0FBRyxFQUF6Qjs7QUFFQUEsa0JBQWtCLENBQUNDLEVBQW5CLEdBQXdCLFVBQVNDLFNBQVQsRUFBb0JDLE9BQXBCLEVBQTZCQyxNQUE3QixFQUFxQztBQUN6RCxNQUFJQyxXQUFXLEdBQUcsS0FBS0MsUUFBTCxDQUFjSixTQUFkLENBQWxCOztBQUNBLE1BQUksQ0FBQ0csV0FBTCxFQUFrQjtBQUNkQSxJQUFBQSxXQUFXLEdBQUcsRUFBZDtBQUNBLFNBQUtDLFFBQUwsQ0FBY0osU0FBZCxJQUEyQkcsV0FBM0I7QUFDSDs7QUFFRCxPQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdGLFdBQVcsQ0FBQ0csTUFBaEMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDekMsUUFBSSxDQUFDRixXQUFXLENBQUNFLENBQUQsQ0FBaEIsRUFBcUI7QUFDakJGLE1BQUFBLFdBQVcsQ0FBQ0UsQ0FB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RDs7QUFZQVIsYUFBYSxDQUFDdUIsTUFBZCxHQUF1QixZQUFXO0FBQzlCLE1BQUlDLGdCQUFnQixHQUFHQyxNQUFNLENBQUNGLE1BQVAsQ0FBY3RCLGtCQUFkLENBQXZCO0FBQ0F1QixFQUFBQSxnQkFBZ0IsQ0FBQ2pCLFFBQWpCLEdBQTRCLEVBQTVCO0FBQ0EsU0FBT2lCLGdCQUFQO0FBQ0gsQ0FKRCIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi8uLi8uLi8uLi8uLi9hc3NldHMvY29tbW9uL3NjcmlwdC9iYXNpYy9tZXNzZW5nZXIiLCJzb3VyY2VzQ29udGVudCI6WyJ3aW5kb3cuZXZlbnRMaXN0ZW5lciA9IHt9O1xuXG52YXIgb25lVG9NdWx0aUxpc3RlbmVyID0ge307XG5cbm9uZVRvTXVsdGlMaXN0ZW5lci5vbiA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgaGFuZGxlciwgdGFyZ2V0KSB7XG4gICAgdmFyIGhhbmRsZXJMaXN0ID0gdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdO1xuICAgIGlmICghaGFuZGxlckxpc3QpIHtcbiAgICAgICAgaGFuZGxlckxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdID0gaGFuZGxlckxpc3Q7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVyTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWhhbmRsZXJMaXN0W2ldKSB7XG4gICAgICAgICAgICBoYW5kbGVyTGlzdFtpXS5oYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgICAgIGhhbmRsZXJMaXN0W2ldLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlckxpc3QucHVzaCh7aGFuZGxlcjogaGFuZGxlciwgdGFyZ2V0OiB0YXJnZXR9KTtcbiAgICByZXR1cm4gaGFuZGxlckxpc3QubGVuZ3RoO1xufTtcblxub25lVG9NdWx0aUxpc3RlbmVyLmRpc3BhdGNoID0gZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgdmFyIGhhbmRsZXJMaXN0ID0gdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdO1xuICAgIGlmICghaGFuZGxlckxpc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBoYW5kbGVyTGlzdC5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgaGFuZGxlciA9IGhhbmRsZXJMaXN0W2ldLmhhbmRsZXI7XG4gICAgICAgIHZhciB0YXJnZXQgPSBoYW5kbGVyTGlzdFtpXS50YXJnZXQ7XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5jYWxsKHRhcmdldCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcihkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbm9uZVRvTXVsdGlMaXN0ZW5lci5vZmYgPSBmdW5jdGlvbihldmVudE5hbWUsIGhhbmRsZXIsIHRhcmdldCkge1xuICAgIHZhciBoYW5kbGVyTGlzdCA9IHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXTtcbiAgICBpZiAoIWhhbmRsZXJMaXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvbGRIYW5kbGVyID0gaGFuZGxlckxpc3RbaV0uaGFuZGxlcjtcbiAgICAgICAgdmFyIG9sZFRhcmdldCA9IGhhbmRsZXJMaXN0W2ldLnRhcmdldDtcbiAgICAgICAgaWYgKG9sZEhhbmRsZXIgPT09IGhhbmRsZXIgJiYgb2xkVGFyZ2V0ID09PSB0YXJnZXQpIHtcbiAgICAgICAgICAgIGhhbmRsZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufTtcbm9uZVRvTXVsdGlMaXN0ZW5lci5jbGVhciA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgIGZvciAodmFyIGV2ZW50TmFtZSBpbiB0aGlzLmhhbmRsZXJzKSB7XG4gICAgICAgIHZhciBoYW5kbGVyTGlzdCA9IHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kbGVyTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG9sZFRhcmdldCA9IGhhbmRsZXJMaXN0W2ldLnRhcmdldDtcbiAgICAgICAgICAgIGlmIChvbGRUYXJnZXQgPT09IHRhcmdldCkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXJMaXN0LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV2ZW50TGlzdGVuZXIuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG5ld0V2ZW50TGlzdGVuZXIgPSBPYmplY3QuY3JlYXRlKG9uZVRvTXVsdGlMaXN0ZW5lcik7XG4gICAgbmV3RXZlbnRMaXN0ZW5lci5oYW5kbGVycyA9IHt9O1xuICAgIHJldHVybiBuZXdFdmVudExpc3RlbmVyO1xufTsiXX0=