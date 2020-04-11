
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/common/script/basic/rankNetwork/pomeloBuild.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'fcbc4JxLPtK25TfU3NaoI+E', 'pomeloBuild');
// common/script/basic/rankNetwork/pomeloBuild.js

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 此文件来自于pomelo helloworld lib/build/build.js
 */

/**
 * hasOwnProperty.
 */
var has = Object.prototype.hasOwnProperty;
var pomeloBuild = cc.Class({
  onLoad: function onLoad() {
    /**
     * Registered modules.
     */
    this.modules = {};
    /**
     * Registered aliases.
     */

    this.aliases = {};
  },
  requirePomelo: function requirePomelo(path, parent, orig) {
    var resolved = this.resolve(path); // lookup failed

    if (null === resolved) {
      orig = orig || path;
      parent = parent || 'root';
      var err = new Error('Failed to requirePomelo "' + orig + '" from "' + parent + '"');
      err.path = orig;
      err.parent = parent;
      err.requirePomelo = true;
      throw err;
    }

    var module = this.modules[resolved]; // perform real requirePomelo()
    // by invoking the module's
    // registered function

    if (!module.exports) {
      module.exports = {};
      module.client = module.component = true;
      module.call(this, module.exports, this.relative(resolved), module);
    }

    return module.exports;
  },

  /**
   * Resolve `path`.
   *
   * Lookup:
   *
   *   - PATH/index.js
   *   - PATH.js
   *   - PATH
   *
   * @param {String} path
   * @return {String} path or null
   * @api private
   */
  resolve: function resolve(path) {
    if (path.charAt(0) === '/') path = path.slice(1);
    var index = path + '/index.js';
    var paths = [path, path + '.js', path + '.json', path + '/index.js', path + '/index.json'];

    for (var i = 0; i < paths.length; i++) {
      var resolvePath = paths[i];
      if (has.call(this.modules, resolvePath)) return resolvePath;
    }

    if (has.call(this.aliases, index)) {
      return this.aliases[index];
    }
  },

  /**
   * Normalize `path` relative to the current path.
   *
   * @param {String} curr
   * @param {String} path
   * @return {String}
   * @api private
   */
  normalize: function normalize(curr, path) {
    var segs = [];
    if ('.' !== path.charAt(0)) return path;
    curr = curr.split('/');
    path = path.split('/');

    for (var i = 0; i < path.length; ++i) {
      if ('..' === path[i]) {
        curr.pop();
      } else if ('.' !== path[i] && '' !== path[i]) {
        segs.push(path[i]);
      }
    }

    return curr.concat(segs).join('/');
  },

  /**
   * Register module at `path` with callback `definition`.
   *
   * @param {String} path
   * @param {Function} definition
   * @api private
   */
  register: function register(path, definition) {
    this.modules[path] = definition;
  },

  /**
   * Alias a module definition.
   *
   * @param {String} from
   * @param {String} to
   * @api private
   */
  alias: function alias(from, to) {
    if (!has.call(this.modules, from)) {
      throw new Error('Failed to alias "' + from + '", it does not exist');
    }

    this.aliases[to] = from;
  },

  /**
   * Return a requirePomelo function relative to the `parent` path.
   *
   * @param {String} parent
   * @return {Function}
   * @api private
   */
  relative: function relative(parent) {
    var p = this.normalize(parent, '..');
    /**
     * lastIndexOf helper.
     */

    function lastIndexOf(arr, obj) {
      var i = arr.length;

      while (i--) {
        if (arr[i] === obj) return i;
      }

      return -1;
    }
    /**
     * The relative requirePomelo() itself.
     */


    var selfPomelo = this;

    function localrequirePomelo(path) {
      var resolved = localrequirePomelo.resolve(path);
      return selfPomelo.requirePomelo(resolved, parent, path);
    }
    /**
     * Resolve relative to the parent.
     */


    localrequirePomelo.resolve = function (path) {
      var c = path.charAt(0);
      if ('/' === c) return path.slice(1);
      if ('.' === c) return selfPomelo.normalize(p, path); // resolve deps by returning
      // the dep in the nearest "deps"
      // directory

      var segs = parent.split('/');
      var i = lastIndexOf(segs, 'deps') + 1;
      if (!i) i = 0;
      path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
      return path;
    };
    /**
     * Check if module is defined at `path`.
     */


    localrequirePomelo.exists = function (path) {
      return has.call(selfPomelo.modules, localrequirePomelo.resolve(path));
    };

    return localrequirePomelo;
  }
});

pomeloBuild.create = function () {
  var pomeloBuildObj = new pomeloBuild();
  pomeloBuildObj.onLoad();
  pomeloBuildObj.register("component-indexof/index.js", function (exports, requirePomelo, module) {
    var indexOf = [].indexOf;

    module.exports = function (arr, obj) {
      if (indexOf) return arr.indexOf(obj);

      for (var i = 0; i < arr.length; ++i) {
        if (arr[i] === obj) return i;
      }

      return -1;
    };
  });
  pomeloBuildObj.register("component-emitter/index.js", function (exports, requirePomelo, module) {
    /**
     * Module dependencies.
     */
    var index = requirePomelo('indexof');
    /**
     * Expose `Emitter`.
     */

    module.exports = Emitter;
    /**
     * Initialize a new `Emitter`.
     *
     * @api public
     */

    function Emitter(obj) {
      if (obj) return mixin(obj);
    }

    ;
    /**
     * Mixin the emitter properties.
     *
     * @param {Object} obj
     * @return {Object}
     * @api private
     */

    function mixin(obj) {
      for (var key in Emitter.prototype) {
        obj[key] = Emitter.prototype[key];
      }

      return obj;
    }
    /**
     * Listen on the given `event` with `fn`.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.on = function (event, fn) {
      this._callbacks = this._callbacks || {};
      (this._callbacks[event] = this._callbacks[event] || []).push(fn);
      return this;
    };
    /**
     * Adds an `event` listener that will be invoked a single
     * time then automatically removed.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.once = function (event, fn) {
      var self = this;
      this._callbacks = this._callbacks || {};

      function on() {
        self.off(event, on);
        fn.apply(this, arguments);
      }

      fn._off = on;
      this.on(event, on);
      return this;
    };
    /**
     * Remove the given callback for `event` or all
     * registered callbacks.
     *
     * @param {String} event
     * @param {Function} fn
     * @return {Emitter}
     * @api public
     */


    Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = function (event, fn) {
      this._callbacks = this._callbacks || {}; // all

      if (0 === arguments.length) {
        this._callbacks = {};
        return this;
      } // specific event


      var callbacks = this._callbacks[event];
      if (!callbacks) return this; // remove all handlers

      if (1 === arguments.length) {
        delete this._callbacks[event];
        return this;
      } // remove specific handler


      var i = index(callbacks, fn._off || fn);
      if (~i) callbacks.splice(i, 1);
      return this;
    };
    /**
     * Emit `event` with the given args.
     *
     * @param {String} event
     * @param {Mixed} ...
     * @return {Emitter}
     */


    Emitter.prototype.emit = function (event) {
      this._callbacks = this._callbacks || {};
      var args = [].slice.call(arguments, 1),
          callbacks = this._callbacks[event];

      if (callbacks) {
        callbacks = callbacks.slice(0);

        for (var i = 0, len = callbacks.length; i < len; ++i) {
          callbacks[i].apply(this, args);
        }
      }

      return this;
    };
    /**
     * Return array of callbacks for `event`.
     *
     * @param {String} event
     * @return {Array}
     * @api public
     */


    Emitter.prototype.listeners = function (event) {
      this._callbacks = this._callbacks || {};
      return this._callbacks[event] || [];
    };
    /**
     * Check if this emitter has `event` handlers.
     *
     * @param {String} event
     * @return {Boolean}
     * @api public
     */


    Emitter.prototype.hasListeners = function (event) {
      return !!this.listeners(event).length;
    };
  });
  pomeloBuildObj.register("NetEase-pomelo-protocol/lib/protocol.js", function (exports, requirePomelo, module) {
    (function (exports, ByteArray, global) {
      var Protocol = exports;
      var PKG_HEAD_BYTES = 4;
      var MSG_FLAG_BYTES = 1;
      var MSG_ROUTE_CODE_BYTES = 2;
      var MSG_ID_MAX_BYTES = 5;
      var MSG_ROUTE_LEN_BYTES = 1;
      var MSG_ROUTE_CODE_MAX = 0xffff;
      var MSG_COMPRESS_ROUTE_MASK = 0x1;
      var MSG_TYPE_MASK = 0x7;
      var Package = Protocol.Package = {};
      var Message = Protocol.Message = {};
      Package.TYPE_HANDSHAKE = 1;
      Package.TYPE_HANDSHAKE_ACK = 2;
      Package.TYPE_HEARTBEAT = 3;
      Package.TYPE_DATA = 4;
      Package.TYPE_KICK = 5;
      Message.TYPE_REQUEST = 0;
      Message.TYPE_NOTIFY = 1;
      Message.TYPE_RESPONSE = 2;
      Message.TYPE_PUSH = 3;
      /**
       * pomele client encode
       * id message id;
       * route message route
       * msg message body
       * socketio current support string
       */

      Protocol.strencode = function (str) {
        var byteArray = new ByteArray(str.length * 3);
        var offset = 0;

        for (var i = 0; i < str.length; i++) {
          var charCode = str.charCodeAt(i);
          var codes = null;

          if (charCode <= 0x7f) {
            codes = [charCode];
          } else if (charCode <= 0x7ff) {
            codes = [0xc0 | charCode >> 6, 0x80 | charCode & 0x3f];
          } else {
            codes = [0xe0 | charCode >> 12, 0x80 | (charCode & 0xfc0) >> 6, 0x80 | charCode & 0x3f];
          }

          for (var j = 0; j < codes.length; j++) {
            byteArray[offset] = codes[j];
            ++offset;
          }
        }

        var _buffer = new ByteArray(offset);

        copyArray(_buffer, 0, byteArray, 0, offset);
        return _buffer;
      };
      /**
       * client decode
       * msg String data
       * return Message Object
       */


      Protocol.strdecode = function (buffer) {
        var bytes = new ByteArray(buffer);
        var array = [];
        var offset = 0;
        var charCode = 0;
        var end = bytes.length;

        while (offset < end) {
          if (bytes[offset] < 128) {
            charCode = bytes[offset];
            offset += 1;
          } else if (bytes[offset] < 224) {
            charCode = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
            offset += 2;
          } else {
            charCode = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
            offset += 3;
          }

          array.push(charCode);
        }

        var res = '';
        var chunk = 8 * 1024;
        var i;

        for (i = 0; i < array.length / chunk; i++) {
          res += String.fromCharCode.apply(null, array.slice(i * chunk, (i + 1) * chunk));
        }

        res += String.fromCharCode.apply(null, array.slice(i * chunk));
        return res;
      };
      /**
       * Package protocol encode.
       *
       * Pomelo package format:
       * +------+-------------+------------------+
       * | type | body length |       body       |
       * +------+-------------+------------------+
       *
       * Head: 4bytes
       *   0: package type,
       *      1 - handshake,
       *      2 - handshake ack,
       *      3 - heartbeat,
       *      4 - data
       *      5 - kick
       *   1 - 3: big-endian body length
       * Body: body length bytes
       *
       * @param  {Number}    type   package type
       * @param  {ByteArray} body   body content in bytes
       * @return {ByteArray}        new byte array that contains encode result
       */


      Package.encode = function (type, body) {
        var length = body ? body.length : 0;
        var buffer = new ByteArray(PKG_HEAD_BYTES + length);
        var index = 0;
        buffer[index++] = type & 0xff;
        buffer[index++] = length >> 16 & 0xff;
        buffer[index++] = length >> 8 & 0xff;
        buffer[index++] = length & 0xff;

        if (body) {
          copyArray(buffer, index, body, 0, length);
        }

        return buffer;
      };
      /**
       * Package protocol decode.
       * See encode for package format.
       *
       * @param  {ByteArray} buffer byte array containing package content
       * @return {Object}           {type: package type, buffer: body byte array}
       */


      Package.decode = function (buffer) {
        var bytes = new ByteArray(buffer);
        var type = bytes[0];
        var index = 1;
        var length = (bytes[index++] << 16 | bytes[index++] << 8 | bytes[index++]) >>> 0;
        var body = length ? new ByteArray(length) : null;
        copyArray(body, 0, bytes, PKG_HEAD_BYTES, length);
        return {
          'type': type,
          'body': body
        };
      };
      /**
       * Message protocol encode.
       *
       * @param  {Number} id            message id
       * @param  {Number} type          message type
       * @param  {Number} compressRoute whether compress route
       * @param  {Number|String} route  route code or route string
       * @param  {Buffer} msg           message body bytes
       * @return {Buffer}               encode result
       */


      Message.encode = function (id, type, compressRoute, route, msg) {
        // caculate message max length
        var idBytes = msgHasId(type) ? caculateMsgIdBytes(id) : 0;
        var msgLen = MSG_FLAG_BYTES + idBytes;

        if (msgHasRoute(type)) {
          if (compressRoute) {
            if (typeof route !== 'number') {
              throw new Error('error flag for number route!');
            }

            msgLen += MSG_ROUTE_CODE_BYTES;
          } else {
            msgLen += MSG_ROUTE_LEN_BYTES;

            if (route) {
              route = Protocol.strencode(route);

              if (route.length > 255) {
                throw new Error('route maxlength is overflow');
              }

              msgLen += route.length;
            }
          }
        }

        if (msg) {
          msgLen += msg.length;
        }

        var buffer = new ByteArray(msgLen);
        var offset = 0; // add flag

        offset = encodeMsgFlag(type, compressRoute, buffer, offset); // add message id

        if (msgHasId(type)) {
          offset = encodeMsgId(id, idBytes, buffer, offset);
        } // add route


        if (msgHasRoute(type)) {
          offset = encodeMsgRoute(compressRoute, route, buffer, offset);
        } // add body


        if (msg) {
          offset = encodeMsgBody(msg, buffer, offset);
        }

        return buffer;
      };
      /**
       * Message protocol decode.
       *
       * @param  {Buffer|Uint8Array} buffer message bytes
       * @return {Object}            message object
       */


      Message.decode = function (buffer) {
        var bytes = new ByteArray(buffer);
        var bytesLen = bytes.length || bytes.byteLength;
        var offset = 0;
        var id = 0;
        var route = null; // parse flag

        var flag = bytes[offset++];
        var compressRoute = flag & MSG_COMPRESS_ROUTE_MASK;
        var type = flag >> 1 & MSG_TYPE_MASK; // parse id

        if (msgHasId(type)) {
          var _byte = bytes[offset++];
          id = _byte & 0x7f;

          while (_byte & 0x80) {
            id <<= 7;
            _byte = bytes[offset++];
            id |= _byte & 0x7f;
          }
        } // parse route


        if (msgHasRoute(type)) {
          if (compressRoute) {
            route = bytes[offset++] << 8 | bytes[offset++];
          } else {
            var routeLen = bytes[offset++];

            if (routeLen) {
              route = new ByteArray(routeLen);
              copyArray(route, 0, bytes, offset, routeLen);
              route = Protocol.strdecode(route);
            } else {
              route = '';
            }

            offset += routeLen;
          }
        } // parse body


        var bodyLen = bytesLen - offset;
        var body = new ByteArray(bodyLen);
        copyArray(body, 0, bytes, offset, bodyLen);
        return {
          'id': id,
          'type': type,
          'compressRoute': compressRoute,
          'route': route,
          'body': body
        };
      };

      var copyArray = function copyArray(dest, doffset, src, soffset, length) {
        if ('function' === typeof src.copy) {
          // Buffer
          src.copy(dest, doffset, soffset, soffset + length);
        } else {
          // Uint8Array
          for (var index = 0; index < length; index++) {
            dest[doffset++] = src[soffset++];
          }
        }
      };

      var msgHasId = function msgHasId(type) {
        return type === Message.TYPE_REQUEST || type === Message.TYPE_RESPONSE;
      };

      var msgHasRoute = function msgHasRoute(type) {
        return type === Message.TYPE_REQUEST || type === Message.TYPE_NOTIFY || type === Message.TYPE_PUSH;
      };

      var caculateMsgIdBytes = function caculateMsgIdBytes(id) {
        var len = 0;

        do {
          len += 1;
          id >>= 7;
        } while (id > 0);

        return len;
      };

      var encodeMsgFlag = function encodeMsgFlag(type, compressRoute, buffer, offset) {
        if (type !== Message.TYPE_REQUEST && type !== Message.TYPE_NOTIFY && type !== Message.TYPE_RESPONSE && type !== Message.TYPE_PUSH) {
          throw new Error('unkonw message type: ' + type);
        }

        buffer[offset] = type << 1 | (compressRoute ? 1 : 0);
        return offset + MSG_FLAG_BYTES;
      };

      var encodeMsgId = function encodeMsgId(id, idBytes, buffer, offset) {
        var index = offset + idBytes - 1;
        buffer[index--] = id & 0x7f;

        while (index >= offset) {
          id >>= 7;
          buffer[index--] = id & 0x7f | 0x80;
        }

        return offset + idBytes;
      };

      var encodeMsgRoute = function encodeMsgRoute(compressRoute, route, buffer, offset) {
        if (compressRoute) {
          if (route > MSG_ROUTE_CODE_MAX) {
            throw new Error('route number is overflow');
          }

          buffer[offset++] = route >> 8 & 0xff;
          buffer[offset++] = route & 0xff;
        } else {
          if (route) {
            buffer[offset++] = route.length & 0xff;
            copyArray(buffer, offset, route, 0, route.length);
            offset += route.length;
          } else {
            buffer[offset++] = 0;
          }
        }

        return offset;
      };

      var encodeMsgBody = function encodeMsgBody(msg, buffer, offset) {
        copyArray(buffer, offset, msg, 0, msg.length);
        return offset + msg.length;
      };

      module.exports = Protocol;
    })('object' === _typeof(module) ? module.exports : this.Protocol = {}, 'object' === _typeof(module) ? Buffer : Uint8Array, this);
  });
  pomeloBuildObj.register("pomelonode-pomelo-protobuf/lib/client/protobuf.js", function (exports, requirePomelo, module) {
    /* ProtocolBuffer client 0.1.0*/

    /**
     * pomelo-protobuf
     * @author <zhang0935@gmail.com>
     */

    /**
     * Protocol buffer root
     * In browser, it will be window.protbuf
     */
    (function (exports, global) {
      var Protobuf = exports;

      Protobuf.init = function (opts) {
        //On the serverside, use serverProtos to encode messages send to client
        Protobuf.encoder.init(opts.encoderProtos); //On the serverside, user clientProtos to decode messages receive from clients

        Protobuf.decoder.init(opts.decoderProtos);
      };

      Protobuf.encode = function (key, msg) {
        return Protobuf.encoder.encode(key, msg);
      };

      Protobuf.decode = function (key, msg) {
        return Protobuf.decoder.decode(key, msg);
      }; // exports to support for components


      module.exports = Protobuf;
    })('object' === _typeof(module) ? module.exports : this.protobuf = {}, this);
    /**
     * constants
     */


    (function (exports, global) {
      var constants = exports.constants = {};
      constants.TYPES = {
        uInt32: 0,
        sInt32: 0,
        int32: 0,
        "double": 1,
        string: 2,
        message: 2,
        "float": 5
      };
    })('undefined' !== typeof protobuf ? protobuf : module.exports, this);
    /**
     * util module
     */


    (function (exports, global) {
      var Util = exports.util = {};

      Util.isSimpleType = function (type) {
        return type === 'uInt32' || type === 'sInt32' || type === 'int32' || type === 'uInt64' || type === 'sInt64' || type === 'float' || type === 'double';
      };
    })('undefined' !== typeof protobuf ? protobuf : module.exports, this);
    /**
     * codec module
     */


    (function (exports, global) {
      var Codec = exports.codec = {};
      var buffer = new ArrayBuffer(8);
      var float32Array = new Float32Array(buffer);
      var float64Array = new Float64Array(buffer);
      var uInt8Array = new Uint8Array(buffer);

      Codec.encodeUInt32 = function (n) {
        var n = parseInt(n);

        if (isNaN(n) || n < 0) {
          return null;
        }

        var result = [];

        do {
          var tmp = n % 128;
          var next = Math.floor(n / 128);

          if (next !== 0) {
            tmp = tmp + 128;
          }

          result.push(tmp);
          n = next;
        } while (n !== 0);

        return result;
      };

      Codec.encodeSInt32 = function (n) {
        var n = parseInt(n);

        if (isNaN(n)) {
          return null;
        }

        n = n < 0 ? Math.abs(n) * 2 - 1 : n * 2;
        return Codec.encodeUInt32(n);
      };

      Codec.decodeUInt32 = function (bytes) {
        var n = 0;

        for (var i = 0; i < bytes.length; i++) {
          var m = parseInt(bytes[i]);
          n = n + (m & 0x7f) * Math.pow(2, 7 * i);

          if (m < 128) {
            return n;
          }
        }

        return n;
      };

      Codec.decodeSInt32 = function (bytes) {
        var n = this.decodeUInt32(bytes);
        var flag = n % 2 === 1 ? -1 : 1;
        n = (n % 2 + n) / 2 * flag;
        return n;
      };

      Codec.encodeFloat = function (_float) {
        float32Array[0] = _float;
        return uInt8Array;
      };

      Codec.decodeFloat = function (bytes, offset) {
        if (!bytes || bytes.length < offset + 4) {
          return null;
        }

        for (var i = 0; i < 4; i++) {
          uInt8Array[i] = bytes[offset + i];
        }

        return float32Array[0];
      };

      Codec.encodeDouble = function (_double) {
        float64Array[0] = _double;
        return uInt8Array.subarray(0, 8);
      };

      Codec.decodeDouble = function (bytes, offset) {
        if (!bytes || bytes.length < 8 + offset) {
          return null;
        }

        for (var i = 0; i < 8; i++) {
          uInt8Array[i] = bytes[offset + i];
        }

        return float64Array[0];
      };

      Codec.encodeStr = function (bytes, offset, str) {
        for (var i = 0; i < str.length; i++) {
          var code = str.charCodeAt(i);
          var codes = encode2UTF8(code);

          for (var j = 0; j < codes.length; j++) {
            bytes[offset] = codes[j];
            offset++;
          }
        }

        return offset;
      };
      /**
       * Decode string from utf8 bytes
       */


      Codec.decodeStr = function (bytes, offset, length) {
        var array = [];
        var end = offset + length;

        while (offset < end) {
          var code = 0;

          if (bytes[offset] < 128) {
            code = bytes[offset];
            offset += 1;
          } else if (bytes[offset] < 224) {
            code = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
            offset += 2;
          } else {
            code = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
            offset += 3;
          }

          array.push(code);
        }

        var str = '';

        for (var i = 0; i < array.length;) {
          str += String.fromCharCode.apply(null, array.slice(i, i + 10000));
          i += 10000;
        }

        return str;
      };
      /**
       * Return the byte length of the str use utf8
       */


      Codec.byteLength = function (str) {
        if (typeof str !== 'string') {
          return -1;
        }

        var length = 0;

        for (var i = 0; i < str.length; i++) {
          var code = str.charCodeAt(i);
          length += codeLength(code);
        }

        return length;
      };
      /**
       * Encode a unicode16 char code to utf8 bytes
       */


      function encode2UTF8(charCode) {
        if (charCode <= 0x7f) {
          return [charCode];
        } else if (charCode <= 0x7ff) {
          return [0xc0 | charCode >> 6, 0x80 | charCode & 0x3f];
        } else {
          return [0xe0 | charCode >> 12, 0x80 | (charCode & 0xfc0) >> 6, 0x80 | charCode & 0x3f];
        }
      }

      function codeLength(code) {
        if (code <= 0x7f) {
          return 1;
        } else if (code <= 0x7ff) {
          return 2;
        } else {
          return 3;
        }
      }
    })('undefined' !== typeof protobuf ? protobuf : module.exports, this);
    /**
     * encoder module
     */


    (function (exports, global) {
      var protobuf = exports;
      var MsgEncoder = exports.encoder = {};
      var codec = protobuf.codec;
      var constant = protobuf.constants;
      var util = protobuf.util;

      MsgEncoder.init = function (protos) {
        this.protos = protos || {};
      };

      MsgEncoder.encode = function (route, msg) {
        //Get protos from protos map use the route as key
        var protos = this.protos[route]; //Check msg

        if (!checkMsg(msg, protos)) {
          return null;
        } //Set the length of the buffer 2 times bigger to prevent overflow


        var length = codec.byteLength(JSON.stringify(msg)); //Init buffer and offset

        var buffer = new ArrayBuffer(length);
        var uInt8Array = new Uint8Array(buffer);
        var offset = 0;

        if (!!protos) {
          offset = encodeMsg(uInt8Array, offset, protos, msg);

          if (offset > 0) {
            return uInt8Array.subarray(0, offset);
          }
        }

        return null;
      };
      /**
       * Check if the msg follow the defination in the protos
       */


      function checkMsg(msg, protos) {
        if (!protos) {
          return false;
        }

        for (var name in protos) {
          var proto = protos[name]; //All required element must exist

          switch (proto.option) {
            case 'required':
              if (typeof msg[name] === 'undefined') {
                return false;
              }

            case 'optional':
              if (typeof msg[name] !== 'undefined') {
                var message = protos.__messages[proto.type] || MsgEncoder.protos['message ' + proto.type];

                if (!!message) {
                  checkMsg(msg[name], message);
                }
              }

              break;

            case 'repeated':
              //Check nest message in repeated elements
              var message = protos.__messages[proto.type] || MsgEncoder.protos['message ' + proto.type];

              if (!!msg[name] && !!message) {
                for (var i = 0; i < msg[name].length; i++) {
                  if (!checkMsg(msg[name][i], message)) {
                    return false;
                  }
                }
              }

              break;
          }
        }

        return true;
      }

      function encodeMsg(buffer, offset, protos, msg) {
        for (var name in msg) {
          if (!!protos[name]) {
            var proto = protos[name];

            switch (proto.option) {
              case 'required':
              case 'optional':
                offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
                offset = encodeProp(msg[name], proto.type, offset, buffer, protos);
                break;

              case 'repeated':
                if (msg[name].length > 0) {
                  offset = encodeArray(msg[name], proto, offset, buffer, protos);
                }

                break;
            }
          }
        }

        return offset;
      }

      function encodeProp(value, type, offset, buffer, protos) {
        switch (type) {
          case 'uInt32':
            offset = writeBytes(buffer, offset, codec.encodeUInt32(value));
            break;

          case 'int32':
          case 'sInt32':
            offset = writeBytes(buffer, offset, codec.encodeSInt32(value));
            break;

          case 'float':
            writeBytes(buffer, offset, codec.encodeFloat(value));
            offset += 4;
            break;

          case 'double':
            writeBytes(buffer, offset, codec.encodeDouble(value));
            offset += 8;
            break;

          case 'string':
            var length = codec.byteLength(value); //Encode length

            offset = writeBytes(buffer, offset, codec.encodeUInt32(length)); //write string

            codec.encodeStr(buffer, offset, value);
            offset += length;
            break;

          default:
            var message = protos.__messages[type] || MsgEncoder.protos['message ' + type];

            if (!!message) {
              //Use a tmp buffer to build an internal msg
              var tmpBuffer = new ArrayBuffer(codec.byteLength(JSON.stringify(value)));
              var length = 0;
              length = encodeMsg(tmpBuffer, length, message, value); //Encode length

              offset = writeBytes(buffer, offset, codec.encodeUInt32(length)); //contact the object

              for (var i = 0; i < length; i++) {
                buffer[offset] = tmpBuffer[i];
                offset++;
              }
            }

            break;
        }

        return offset;
      }
      /**
       * Encode reapeated properties, simple msg and object are decode differented
       */


      function encodeArray(array, proto, offset, buffer, protos) {
        var i = 0;

        if (util.isSimpleType(proto.type)) {
          offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
          offset = writeBytes(buffer, offset, codec.encodeUInt32(array.length));

          for (i = 0; i < array.length; i++) {
            offset = encodeProp(array[i], proto.type, offset, buffer);
          }
        } else {
          for (i = 0; i < array.length; i++) {
            offset = writeBytes(buffer, offset, encodeTag(proto.type, proto.tag));
            offset = encodeProp(array[i], proto.type, offset, buffer, protos);
          }
        }

        return offset;
      }

      function writeBytes(buffer, offset, bytes) {
        for (var i = 0; i < bytes.length; i++, offset++) {
          buffer[offset] = bytes[i];
        }

        return offset;
      }

      function encodeTag(type, tag) {
        var value = constant.TYPES[type] || 2;
        return codec.encodeUInt32(tag << 3 | value);
      }
    })('undefined' !== typeof protobuf ? protobuf : module.exports, this);
    /**
     * decoder module
     */


    (function (exports, global) {
      var protobuf = exports;
      var MsgDecoder = exports.decoder = {};
      var codec = protobuf.codec;
      var util = protobuf.util;
      var buffer;
      var offset = 0;

      MsgDecoder.init = function (protos) {
        this.protos = protos || {};
      };

      MsgDecoder.setProtos = function (protos) {
        if (!!protos) {
          this.protos = protos;
        }
      };

      MsgDecoder.decode = function (route, buf) {
        var protos = this.protos[route];
        buffer = buf;
        offset = 0;

        if (!!protos) {
          return decodeMsg({}, protos, buffer.length);
        }

        return null;
      };

      function decodeMsg(msg, protos, length) {
        while (offset < length) {
          var head = getHead();
          var type = head.type;
          var tag = head.tag;
          var name = protos.__tags[tag];

          switch (protos[name].option) {
            case 'optional':
            case 'required':
              msg[name] = decodeProp(protos[name].type, protos);
              break;

            case 'repeated':
              if (!msg[name]) {
                msg[name] = [];
              }

              decodeArray(msg[name], protos[name].type, protos);
              break;
          }
        }

        return msg;
      }
      /**
       * Test if the given msg is finished
       */


      function isFinish(msg, protos) {
        return !protos.__tags[peekHead().tag];
      }
      /**
       * Get property head from protobuf
       */


      function getHead() {
        var tag = codec.decodeUInt32(getBytes());
        return {
          type: tag & 0x7,
          tag: tag >> 3
        };
      }
      /**
       * Get tag head without move the offset
       */


      function peekHead() {
        var tag = codec.decodeUInt32(peekBytes());
        return {
          type: tag & 0x7,
          tag: tag >> 3
        };
      }

      function decodeProp(type, protos) {
        switch (type) {
          case 'uInt32':
            return codec.decodeUInt32(getBytes());

          case 'int32':
          case 'sInt32':
            return codec.decodeSInt32(getBytes());

          case 'float':
            var _float2 = codec.decodeFloat(buffer, offset);

            offset += 4;
            return _float2;

          case 'double':
            var _double2 = codec.decodeDouble(buffer, offset);

            offset += 8;
            return _double2;

          case 'string':
            var length = codec.decodeUInt32(getBytes());
            var str = codec.decodeStr(buffer, offset, length);
            offset += length;
            return str;

          default:
            var message = protos.__messages[type] || MsgDecoder.protos['message ' + type];

            if (!!protos && !!message) {
              var length = codec.decodeUInt32(getBytes());
              var msg = {};
              decodeMsg(msg, message, offset + length);
              return msg;
            }

            break;
        }
      }

      function decodeArray(array, type, protos) {
        if (util.isSimpleType(type)) {
          var length = codec.decodeUInt32(getBytes());

          for (var i = 0; i < length; i++) {
            array.push(decodeProp(type));
          }
        } else {
          array.push(decodeProp(type, protos));
        }
      }

      function getBytes(flag) {
        var bytes = [];
        var pos = offset;
        flag = flag || false;
        var b;

        do {
          b = buffer[pos];
          bytes.push(b);
          pos++;
        } while (b >= 128);

        if (!flag) {
          offset = pos;
        }

        return bytes;
      }

      function peekBytes() {
        return getBytes(true);
      }
    })('undefined' !== typeof protobuf ? protobuf : module.exports, this);
  });
  pomeloBuildObj.register("pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js", function (exports, requirePomelo, module) {
    (function (self) {
      var JS_WS_CLIENT_TYPE = 'js-websocket';
      var JS_WS_CLIENT_VERSION = '0.0.1';
      var Protocol = self.Protocol;
      var Package = Protocol.Package;
      var Message = Protocol.Message;
      var EventEmitter = self.EventEmitter;
      var protobuf = self.protobuf;
      var RES_OK = 200;
      var RES_FAIL = 500;
      var RES_OLD_CLIENT = 501;

      if (typeof Object.create !== 'function') {
        Object.create = function (o) {
          function F() {}

          F.prototype = o;
          return new F();
        };
      }

      var root = window;
      var pomelo = Object.create(EventEmitter.prototype); // object extend from object

      root.pomelo = pomelo;
      var socket = null;
      var reqId = 0;
      var callbacks = {};
      var handlers = {}; //Map from request id to route

      var routeMap = {};
      var heartbeatInterval = 0;
      var heartbeatTimeout = 0;
      var nextHeartbeatTimeout = 0;
      var gapThreshold = 100; // heartbeat gap threashold

      var heartbeatId = null;
      var heartbeatTimeoutId = null;
      var handshakeCallback = null;
      var handshakeBuffer = {
        'sys': {
          type: JS_WS_CLIENT_TYPE,
          version: JS_WS_CLIENT_VERSION
        },
        'user': {}
      };
      var initCallback = null;

      pomelo.init = function (params, cb) {
        initCallback = cb;
        var host = params.host;
        var port = params.port;
        var wsStr = "ws://";

        if (params.wsStr) {
          wsStr = params.wsStr;
        }

        var url = wsStr + host;

        if (port) {
          url += ':' + port;
        }

        handshakeBuffer.user = params.user;
        handshakeCallback = params.handshakeCallback;
        initWebSocket(url, cb);
      };

      var initWebSocket = function initWebSocket(url, cb) {
        console.log('connect to ' + url);

        var onopen = function onopen(event) {
          var obj = Package.encode(Package.TYPE_HANDSHAKE, Protocol.strencode(JSON.stringify(handshakeBuffer)));
          send(obj);
        };

        var onmessage = function onmessage(event) {
          processPackage(Package.decode(event.data), cb); // new package arrived, update the heartbeat timeout

          if (heartbeatTimeout) {
            nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
          }
        };

        var onerror = function onerror(event) {
          pomelo.emit('io-error', event);
          console.warn('socket error: ', JSON.stringify(event));
        };

        var onclose = function onclose(event) {
          pomelo.emit('close', event);
          console.warn('socket close: ', JSON.stringify(event)); // //尝试修复断线后继续发心跳包后报错
          // if (heartbeatId) {
          //     clearTimeout(heartbeatId);
          //     heartbeatId = null;
          // }
          //
          // if (heartbeatTimeoutId) {
          //     clearTimeout(heartbeatTimeoutId);
          //     heartbeatTimeoutId = null;
          // }
        };

        socket = new WebSocket(url);
        socket.binaryType = 'arraybuffer';
        socket.onopen = onopen;
        socket.onmessage = onmessage;
        socket.onerror = onerror;
        socket.onclose = onclose;
      };

      pomelo.disconnect = function () {
        if (socket) {
          if (socket.disconnect) socket.disconnect();
          if (socket.close) socket.close();
          console.log('disconnect');
          socket = null;
        }

        if (heartbeatId) {
          clearTimeout(heartbeatId);
          heartbeatId = null;
        }

        if (heartbeatTimeoutId) {
          clearTimeout(heartbeatTimeoutId);
          heartbeatTimeoutId = null;
        }
      };

      pomelo.request = function (route, msg, cb) {
        if (arguments.length === 2 && typeof msg === 'function') {
          cb = msg;
          msg = {};
        } else {
          msg = msg || {};
        }

        route = route || msg.route;

        if (!route) {
          return;
        }

        reqId++;
        /**
         * 128及其倍数的reqId会导致服务端编解码出现异常,128及其倍数是个坑。绕过。
         * //pomelo-protocol.js#243
         *  do{
                m = parseInt(bytes[offset]);
                id += (m & 0x7f) << (7 * i);   //这个风骚的位移有bug
                offset++;
                i++;
            }while(m >= 128); 
         * 
         */

        if (reqId % 128 == 0) {
          reqId++;
        }

        sendMessage(reqId, route, msg);
        callbacks[reqId] = cb;
        routeMap[reqId] = route;
      };

      pomelo.notify = function (route, msg) {
        msg = msg || {};
        sendMessage(0, route, msg);
      };

      pomelo.clearCallback = function () {
        if (!socket) return;
        socket.onopen = null;
        socket.onmessage = null;
        socket.onerror = null;
        socket.onclose = null;
      };

      pomelo.isConnecting = function () {
        return socket && socket.readyState === WebSocket.CONNECTING;
      };

      pomelo.isOpen = function () {
        return socket && socket.readyState === WebSocket.OPEN;
      };

      pomelo.isClosed = function () {
        return socket && socket.readyState === WebSocket.CLOSED;
      };

      pomelo.isClosing = function () {
        return socket && socket.readyState === WebSocket.CLOSING;
      };

      var sendMessage = function sendMessage(reqId, route, msg) {
        var type = reqId ? Message.TYPE_REQUEST : Message.TYPE_NOTIFY; //compress message by protobuf

        var protos = !!pomelo.data.protos ? pomelo.data.protos.client : {};

        if (!!protos[route]) {
          msg = protobuf.encode(route, msg);
        } else {
          msg = Protocol.strencode(JSON.stringify(msg));
        }

        var compressRoute = 0;

        if (pomelo.dict && pomelo.dict[route]) {
          route = pomelo.dict[route];
          compressRoute = 1;
        }

        msg = Message.encode(reqId, type, compressRoute, route, msg);
        var packet = Package.encode(Package.TYPE_DATA, msg);
        send(packet);
      };

      var send = function send(packet) {
        if (socket) {
          socket.send(packet.buffer);
        }
      };

      var handler = {};

      var heartbeat = function heartbeat(data) {
        if (!heartbeatInterval) {
          // no heartbeat
          return;
        }

        pomelo.emit('heartbeat recv');
        var obj = Package.encode(Package.TYPE_HEARTBEAT);

        if (heartbeatTimeoutId) {
          clearTimeout(heartbeatTimeoutId);
          heartbeatTimeoutId = null;
        }

        if (heartbeatId) {
          // already in a heartbeat interval
          return;
        }

        heartbeatId = setTimeout(function () {
          heartbeatId = null;
          send(obj);
          nextHeartbeatTimeout = Date.now() + heartbeatTimeout;
          heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, heartbeatTimeout);
        }, heartbeatInterval);
      };

      var heartbeatTimeoutCb = function heartbeatTimeoutCb() {
        var gap = nextHeartbeatTimeout - Date.now();

        if (gap > gapThreshold) {
          heartbeatTimeoutId = setTimeout(heartbeatTimeoutCb, gap);
        } else {
          console.warn('server heartbeat timeout');
          pomelo.emit('heartbeat timeout');
          pomelo.disconnect();
        }
      };

      var handshake = function handshake(data) {
        data = JSON.parse(Protocol.strdecode(data));

        if (data.code === RES_OLD_CLIENT) {
          pomelo.emit('error', 'client version not fullfill');
          return;
        }

        if (data.code !== RES_OK) {
          pomelo.emit('error', 'handshake fail');
          return;
        }

        handshakeInit(data);
        var obj = Package.encode(Package.TYPE_HANDSHAKE_ACK);
        send(obj);

        if (initCallback) {
          initCallback(socket);
          initCallback = null;
        }
      };

      var onData = function onData(data) {
        //probuff decode
        var msg = Message.decode(data);

        if (msg.id > 0) {
          msg.route = routeMap[msg.id];
          delete routeMap[msg.id];

          if (!msg.route) {
            return;
          }
        }

        msg.body = deCompose(msg);
        processMessage(pomelo, msg);
      };

      var onKick = function onKick(data) {
        var info = JSON.parse(Protocol.strdecode(data));
        var reason = "kick";

        if (info.hasOwnProperty("reason")) {
          reason = info["reason"];
        }

        pomelo.emit('onKick', reason);
      };

      handlers[Package.TYPE_HANDSHAKE] = handshake;
      handlers[Package.TYPE_HEARTBEAT] = heartbeat;
      handlers[Package.TYPE_DATA] = onData;
      handlers[Package.TYPE_KICK] = onKick;

      var processPackage = function processPackage(msg) {
        handlers[msg.type](msg.body);
      };

      var processMessage = function processMessage(pomelo, msg) {
        if (!msg.id) {
          // server push message
          pomelo.emit(msg.route, msg);
          return;
        } //if have a id then find the callback function with the request


        var cb = callbacks[msg.id];
        delete callbacks[msg.id];

        if (typeof cb !== 'function') {
          return;
        }

        cb(msg);
        return;
      };

      var processMessageBatch = function processMessageBatch(pomelo, msgs) {
        for (var i = 0, l = msgs.length; i < l; i++) {
          processMessage(pomelo, msgs[i]);
        }
      };

      var deCompose = function deCompose(msg) {
        var protos = !!pomelo.data.protos ? pomelo.data.protos.server : {};
        var abbrs = pomelo.data.abbrs;
        var route = msg.route; //Decompose route from dict

        if (msg.compressRoute) {
          if (!abbrs[route]) {
            return {};
          }

          route = msg.route = abbrs[route];
        }

        if (!!protos[route]) {
          return protobuf.decode(route, msg.body);
        } else {
          return JSON.parse(Protocol.strdecode(msg.body));
        }

        return msg;
      };

      var handshakeInit = function handshakeInit(data) {
        if (data.sys && data.sys.heartbeat) {
          heartbeatInterval = data.sys.heartbeat * 1000; // heartbeat interval

          heartbeatTimeout = heartbeatInterval * 2; // max heartbeat timeout
        } else {
          heartbeatInterval = 0;
          heartbeatTimeout = 0;
        }

        initData(data);

        if (typeof handshakeCallback === 'function') {
          handshakeCallback(data.user);
        }
      }; //Initilize data used in pomelo client


      var initData = function initData(data) {
        if (!data || !data.sys) {
          return;
        }

        pomelo.data = pomelo.data || {};
        var dict = data.sys.dict;
        var protos = data.sys.protos; //Init compress dict

        if (dict) {
          pomelo.data.dict = dict;
          pomelo.data.abbrs = {};

          for (var route in dict) {
            pomelo.data.abbrs[dict[route]] = route;
          }
        } //Init protobuf protos


        if (protos) {
          pomelo.data.protos = {
            server: protos.server || {},
            client: protos.client || {}
          };

          if (!!protobuf) {
            protobuf.init({
              encoderProtos: protos.client,
              decoderProtos: protos.server
            });
          }
        }
      };

      module.exports = pomelo;
    })(this);
  });
  pomeloBuildObj.register("boot/index.js", function (exports, requirePomelo, module) {
    var Emitter = requirePomelo('emitter');
    this.EventEmitter = Object.create(Emitter);
    var protocol = requirePomelo('pomelo-protocol');
    this.Protocol = protocol;
    var protobuf = requirePomelo('pomelo-protobuf');
    this.protobuf = protobuf;
    var pomelo = requirePomelo('pomelo-jsclient-websocket');
    this.pomelo = pomelo;
  });
  pomeloBuildObj.alias("boot/index.js", "pomelo-client/deps/boot/index.js");
  pomeloBuildObj.alias("component-emitter/index.js", "boot/deps/emitter/index.js");
  pomeloBuildObj.alias("component-indexof/index.js", "component-emitter/deps/indexof/index.js");
  pomeloBuildObj.alias("NetEase-pomelo-protocol/lib/protocol.js", "boot/deps/pomelo-protocol/lib/protocol.js");
  pomeloBuildObj.alias("NetEase-pomelo-protocol/lib/protocol.js", "boot/deps/pomelo-protocol/index.js");
  pomeloBuildObj.alias("NetEase-pomelo-protocol/lib/protocol.js", "NetEase-pomelo-protocol/index.js");
  pomeloBuildObj.alias("pomelonode-pomelo-protobuf/lib/client/protobuf.js", "boot/deps/pomelo-protobuf/lib/client/protobuf.js");
  pomeloBuildObj.alias("pomelonode-pomelo-protobuf/lib/client/protobuf.js", "boot/deps/pomelo-protobuf/index.js");
  pomeloBuildObj.alias("pomelonode-pomelo-protobuf/lib/client/protobuf.js", "pomelonode-pomelo-protobuf/index.js");
  pomeloBuildObj.alias("pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js", "boot/deps/pomelo-jsclient-websocket/lib/pomelo-client.js");
  pomeloBuildObj.alias("pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js", "boot/deps/pomelo-jsclient-websocket/index.js");
  pomeloBuildObj.alias("pomelonode-pomelo-jsclient-websocket/lib/pomelo-client.js", "pomelonode-pomelo-jsclient-websocket/index.js");
  pomeloBuildObj.requirePomelo("boot");
  return pomeloBuildObj;
};

window.pomeloBuild = pomeloBuild;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL3JhbmtOZXR3b3JrL2Fzc2V0cy9jb21tb24vc2NyaXB0L2Jhc2ljL3JhbmtOZXR3b3JrL3BvbWVsb0J1aWxkLmpzIl0sIm5hbWVzIjpbImhhcyIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwicG9tZWxvQnVpbGQiLCJjYyIsIkNsYXNzIiwib25Mb2FkIiwibW9kdWxlcyIsImFsaWFzZXMiLCJyZXF1aXJlUG9tZWxvIiwicGF0aCIsInBhcmVudCIsIm9yaWciLCJyZXNvbHZlZCIsInJlc29sdmUiLCJlcnIiLCJFcnJvciIsIm1vZHVsZSIsImV4cG9ydHMiLCJjbGllbnQiLCJjb21wb25lbnQiLCJjYWxsIiwicmVsYXRpdmUiLCJjaGFyQXQiLCJzbGljZSIsImluZGV4IiwicGF0aHMiLCJpIiwibGVuZ3RoIiwicmVzb2x2ZVBhdGgiLCJub3JtYWxpemUiLCJjdXJyIiwic2VncyIsInNwbGl0IiwicG9wIiwicHVzaCIsImNvbmNhdCIsImpvaW4iLCJyZWdpc3RlciIsImRlZmluaXRpb24iLCJhbGlhcyIsImZyb20iLCJ0byIsInAiLCJsYXN0SW5kZXhPZiIsImFyciIsIm9iaiIsInNlbGZQb21lbG8iLCJsb2NhbHJlcXVpcmVQb21lbG8iLCJjIiwiZXhpc3RzIiwiY3JlYXRlIiwicG9tZWxvQnVpbGRPYmoiLCJpbmRleE9mIiwiRW1pdHRlciIsIm1peGluIiwia2V5Iiwib24iLCJldmVudCIsImZuIiwiX2NhbGxiYWNrcyIsIm9uY2UiLCJzZWxmIiwib2ZmIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfb2ZmIiwicmVtb3ZlTGlzdGVuZXIiLCJyZW1vdmVBbGxMaXN0ZW5lcnMiLCJjYWxsYmFja3MiLCJzcGxpY2UiLCJlbWl0IiwiYXJncyIsImxlbiIsImxpc3RlbmVycyIsImhhc0xpc3RlbmVycyIsIkJ5dGVBcnJheSIsImdsb2JhbCIsIlByb3RvY29sIiwiUEtHX0hFQURfQllURVMiLCJNU0dfRkxBR19CWVRFUyIsIk1TR19ST1VURV9DT0RFX0JZVEVTIiwiTVNHX0lEX01BWF9CWVRFUyIsIk1TR19ST1VURV9MRU5fQllURVMiLCJNU0dfUk9VVEVfQ09ERV9NQVgiLCJNU0dfQ09NUFJFU1NfUk9VVEVfTUFTSyIsIk1TR19UWVBFX01BU0siLCJQYWNrYWdlIiwiTWVzc2FnZSIsIlRZUEVfSEFORFNIQUtFIiwiVFlQRV9IQU5EU0hBS0VfQUNLIiwiVFlQRV9IRUFSVEJFQVQiLCJUWVBFX0RBVEEiLCJUWVBFX0tJQ0siLCJUWVBFX1JFUVVFU1QiLCJUWVBFX05PVElGWSIsIlRZUEVfUkVTUE9OU0UiLCJUWVBFX1BVU0giLCJzdHJlbmNvZGUiLCJzdHIiLCJieXRlQXJyYXkiLCJvZmZzZXQiLCJjaGFyQ29kZSIsImNoYXJDb2RlQXQiLCJjb2RlcyIsImoiLCJfYnVmZmVyIiwiY29weUFycmF5Iiwic3RyZGVjb2RlIiwiYnVmZmVyIiwiYnl0ZXMiLCJhcnJheSIsImVuZCIsInJlcyIsImNodW5rIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiZW5jb2RlIiwidHlwZSIsImJvZHkiLCJkZWNvZGUiLCJpZCIsImNvbXByZXNzUm91dGUiLCJyb3V0ZSIsIm1zZyIsImlkQnl0ZXMiLCJtc2dIYXNJZCIsImNhY3VsYXRlTXNnSWRCeXRlcyIsIm1zZ0xlbiIsIm1zZ0hhc1JvdXRlIiwiZW5jb2RlTXNnRmxhZyIsImVuY29kZU1zZ0lkIiwiZW5jb2RlTXNnUm91dGUiLCJlbmNvZGVNc2dCb2R5IiwiYnl0ZXNMZW4iLCJieXRlTGVuZ3RoIiwiZmxhZyIsImJ5dGUiLCJyb3V0ZUxlbiIsImJvZHlMZW4iLCJkZXN0IiwiZG9mZnNldCIsInNyYyIsInNvZmZzZXQiLCJjb3B5IiwiQnVmZmVyIiwiVWludDhBcnJheSIsIlByb3RvYnVmIiwiaW5pdCIsIm9wdHMiLCJlbmNvZGVyIiwiZW5jb2RlclByb3RvcyIsImRlY29kZXIiLCJkZWNvZGVyUHJvdG9zIiwicHJvdG9idWYiLCJjb25zdGFudHMiLCJUWVBFUyIsInVJbnQzMiIsInNJbnQzMiIsImludDMyIiwic3RyaW5nIiwibWVzc2FnZSIsIlV0aWwiLCJ1dGlsIiwiaXNTaW1wbGVUeXBlIiwiQ29kZWMiLCJjb2RlYyIsIkFycmF5QnVmZmVyIiwiZmxvYXQzMkFycmF5IiwiRmxvYXQzMkFycmF5IiwiZmxvYXQ2NEFycmF5IiwiRmxvYXQ2NEFycmF5IiwidUludDhBcnJheSIsImVuY29kZVVJbnQzMiIsIm4iLCJwYXJzZUludCIsImlzTmFOIiwicmVzdWx0IiwidG1wIiwibmV4dCIsIk1hdGgiLCJmbG9vciIsImVuY29kZVNJbnQzMiIsImFicyIsImRlY29kZVVJbnQzMiIsIm0iLCJwb3ciLCJkZWNvZGVTSW50MzIiLCJlbmNvZGVGbG9hdCIsImZsb2F0IiwiZGVjb2RlRmxvYXQiLCJlbmNvZGVEb3VibGUiLCJkb3VibGUiLCJzdWJhcnJheSIsImRlY29kZURvdWJsZSIsImVuY29kZVN0ciIsImNvZGUiLCJlbmNvZGUyVVRGOCIsImRlY29kZVN0ciIsImNvZGVMZW5ndGgiLCJNc2dFbmNvZGVyIiwiY29uc3RhbnQiLCJwcm90b3MiLCJjaGVja01zZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJlbmNvZGVNc2ciLCJuYW1lIiwicHJvdG8iLCJvcHRpb24iLCJfX21lc3NhZ2VzIiwid3JpdGVCeXRlcyIsImVuY29kZVRhZyIsInRhZyIsImVuY29kZVByb3AiLCJlbmNvZGVBcnJheSIsInZhbHVlIiwidG1wQnVmZmVyIiwiTXNnRGVjb2RlciIsInNldFByb3RvcyIsImJ1ZiIsImRlY29kZU1zZyIsImhlYWQiLCJnZXRIZWFkIiwiX190YWdzIiwiZGVjb2RlUHJvcCIsImRlY29kZUFycmF5IiwiaXNGaW5pc2giLCJwZWVrSGVhZCIsImdldEJ5dGVzIiwicGVla0J5dGVzIiwicG9zIiwiYiIsIkpTX1dTX0NMSUVOVF9UWVBFIiwiSlNfV1NfQ0xJRU5UX1ZFUlNJT04iLCJFdmVudEVtaXR0ZXIiLCJSRVNfT0siLCJSRVNfRkFJTCIsIlJFU19PTERfQ0xJRU5UIiwibyIsIkYiLCJyb290Iiwid2luZG93IiwicG9tZWxvIiwic29ja2V0IiwicmVxSWQiLCJoYW5kbGVycyIsInJvdXRlTWFwIiwiaGVhcnRiZWF0SW50ZXJ2YWwiLCJoZWFydGJlYXRUaW1lb3V0IiwibmV4dEhlYXJ0YmVhdFRpbWVvdXQiLCJnYXBUaHJlc2hvbGQiLCJoZWFydGJlYXRJZCIsImhlYXJ0YmVhdFRpbWVvdXRJZCIsImhhbmRzaGFrZUNhbGxiYWNrIiwiaGFuZHNoYWtlQnVmZmVyIiwidmVyc2lvbiIsImluaXRDYWxsYmFjayIsInBhcmFtcyIsImNiIiwiaG9zdCIsInBvcnQiLCJ3c1N0ciIsInVybCIsInVzZXIiLCJpbml0V2ViU29ja2V0IiwiY29uc29sZSIsImxvZyIsIm9ub3BlbiIsInNlbmQiLCJvbm1lc3NhZ2UiLCJwcm9jZXNzUGFja2FnZSIsImRhdGEiLCJEYXRlIiwibm93Iiwib25lcnJvciIsIndhcm4iLCJvbmNsb3NlIiwiV2ViU29ja2V0IiwiYmluYXJ5VHlwZSIsImRpc2Nvbm5lY3QiLCJjbG9zZSIsImNsZWFyVGltZW91dCIsInJlcXVlc3QiLCJzZW5kTWVzc2FnZSIsIm5vdGlmeSIsImNsZWFyQ2FsbGJhY2siLCJpc0Nvbm5lY3RpbmciLCJyZWFkeVN0YXRlIiwiQ09OTkVDVElORyIsImlzT3BlbiIsIk9QRU4iLCJpc0Nsb3NlZCIsIkNMT1NFRCIsImlzQ2xvc2luZyIsIkNMT1NJTkciLCJkaWN0IiwicGFja2V0IiwiaGFuZGxlciIsImhlYXJ0YmVhdCIsInNldFRpbWVvdXQiLCJoZWFydGJlYXRUaW1lb3V0Q2IiLCJnYXAiLCJoYW5kc2hha2UiLCJwYXJzZSIsImhhbmRzaGFrZUluaXQiLCJvbkRhdGEiLCJkZUNvbXBvc2UiLCJwcm9jZXNzTWVzc2FnZSIsIm9uS2ljayIsImluZm8iLCJyZWFzb24iLCJwcm9jZXNzTWVzc2FnZUJhdGNoIiwibXNncyIsImwiLCJzZXJ2ZXIiLCJhYmJycyIsInN5cyIsImluaXREYXRhIiwicHJvdG9j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OENBQWxGO0FBQ0FZLEVBQUFBLGNBQWMsQ0FBQ1osS0FBZixDQUFxQiwyREFBckIsRUFBa0YsK0NBQWxGO0FBRUFZLEVBQUFBLGNBQWMsQ0FBQzNDLGFBQWYsQ0FBNkIsTUFBN0I7QUFFQSxTQUFPMkMsY0FBUDtBQUNILENBdmtERDs7QUF5a0RBOEwsTUFBTSxDQUFDL08sV0FBUCxHQUFxQkEsV0FBckIiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vLi4vLi4vLi4vLi4vYXNzZXRzL2NvbW1vbi9zY3JpcHQvYmFzaWMvcmFua05ldHdvcmsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIOatpOaWh+S7tuadpeiHquS6jnBvbWVsbyBoZWxsb3dvcmxkIGxpYi9idWlsZC9idWlsZC5qc1xuICovXG4vKipcbiAqIGhhc093blByb3BlcnR5LlxuICovXG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgcG9tZWxvQnVpbGQgPSBjYy5DbGFzcyh7XG4gICAgb25Mb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlcmVkIG1vZHVsZXMuXG4gICAgICAgICAqL1xuXG4gICAgICAgIHRoaXMubW9kdWxlcyA9IHt9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWdpc3RlcmVkIGFsaWFzZXMuXG4gICAgICAgICAqL1xuXG4gICAgICAgIHRoaXMuYWxpYXNlcyA9IHt9O1xuICAgIH0sXG5cbiAgICByZXF1aXJlUG9tZWxvOiBmdW5jdGlvbihwYXRoLCBwYXJlbnQsIG9yaWcpIHtcbiAgICAgICAgdmFyIHJlc29sdmVkID0gdGhpcy5yZXNvbHZlKHBhdGgpO1xuXG4gICAgICAgIC8vIGxvb2t1cCBmYWlsZWRcbiAgICAgICAgaWYgKG51bGwgPT09IHJlc29sdmVkKSB7XG4gICAgICAgICAgICBvcmlnID0gb3JpZyB8fCBwYXRoO1xuICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50IHx8ICdyb290JztcbiAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ZhaWxlZCB0byByZXF1aXJlUG9tZWxvIFwiJyArIG9yaWcgKyAnXCIgZnJvbSBcIicgKyBwYXJlbnQgKyAnXCInKTtcbiAgICAgICAgICAgIGVyci5wYXRoID0gb3JpZztcbiAgICAgICAgICAgIGVyci5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICBlcnIucmVxdWlyZVBvbWVsbyA9IHRydWU7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbW9kdWxlID0gdGhpcy5tb2R1bGVzW3Jlc29sdmVkXTtcblxuICAgICAgICAvLyBwZXJmb3JtIHJlYWwgcmVxdWlyZVBvbWVsbygpXG4gICAgICAgIC8vIGJ5IGludm9raW5nIHRoZSBtb2R1bGUnc1xuICAgICAgICAvLyByZWdpc3RlcmVkIGZ1bmN0aW9uXG4gICAgICAgIGlmICghbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0ge307XG4gICAgICAgICAgICBtb2R1bGUuY2xpZW50ID0gbW9kdWxlLmNvbXBvbmVudCA9IHRydWU7XG4gICAgICAgICAgICBtb2R1bGUuY2FsbCh0aGlzLCBtb2R1bGUuZXhwb3J0cywgdGhpcy5yZWxhdGl2ZShyZXNvbHZlZCksIG1vZHVsZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlc29sdmUgYHBhdGhgLlxuICAgICAqXG4gICAgICogTG9va3VwOlxuICAgICAqXG4gICAgICogICAtIFBBVEgvaW5kZXguanNcbiAgICAgKiAgIC0gUEFUSC5qc1xuICAgICAqICAgLSBQQVRIXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gcGF0aCBvciBudWxsXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG5cbiAgICByZXNvbHZlOiBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICBpZiAocGF0aC5jaGFyQXQoMCkgPT09ICcvJykgcGF0aCA9IHBhdGguc2xpY2UoMSk7XG4gICAgICAgIHZhciBpbmRleCA9IHBhdGggKyAnL2luZGV4LmpzJztcblxuICAgICAgICB2YXIgcGF0aHMgPSBbXG4gICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgcGF0aCArICcuanMnLFxuICAgICAgICAgICAgcGF0aCArICcuanNvbicsXG4gICAgICAgICAgICBwYXRoICsgJy9pbmRleC5qcycsXG4gICAgICAgICAgICBwYXRoICsgJy9pbmRleC5qc29uJ1xuICAgICAgICBdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByZXNvbHZlUGF0aCA9IHBhdGhzW2ldO1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRoaXMubW9kdWxlcywgcmVzb2x2ZVBhdGgpKSByZXR1cm4gcmVzb2x2ZVBhdGg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzLmNhbGwodGhpcy5hbGlhc2VzLCBpbmRleCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFsaWFzZXNbaW5kZXhdO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE5vcm1hbGl6ZSBgcGF0aGAgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgcGF0aC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjdXJyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG5cbiAgICBub3JtYWxpemU6IGZ1bmN0aW9uIChjdXJyLCBwYXRoKSB7XG4gICAgICAgIHZhciBzZWdzID0gW107XG5cbiAgICAgICAgaWYgKCcuJyAhPT0gcGF0aC5jaGFyQXQoMCkpIHJldHVybiBwYXRoO1xuXG4gICAgICAgIGN1cnIgPSBjdXJyLnNwbGl0KCcvJyk7XG4gICAgICAgIHBhdGggPSBwYXRoLnNwbGl0KCcvJyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoJy4uJyA9PT0gcGF0aFtpXSkge1xuICAgICAgICAgICAgICAgIGN1cnIucG9wKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCcuJyAhPT0gcGF0aFtpXSAmJiAnJyAhPT0gcGF0aFtpXSkge1xuICAgICAgICAgICAgICAgIHNlZ3MucHVzaChwYXRoW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjdXJyLmNvbmNhdChzZWdzKS5qb2luKCcvJyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIG1vZHVsZSBhdCBgcGF0aGAgd2l0aCBjYWxsYmFjayBgZGVmaW5pdGlvbmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGRlZmluaXRpb25cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cblxuICAgIHJlZ2lzdGVyOiBmdW5jdGlvbiAocGF0aCwgZGVmaW5pdGlvbikge1xuICAgICAgICB0aGlzLm1vZHVsZXNbcGF0aF0gPSBkZWZpbml0aW9uO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBhIG1vZHVsZSBkZWZpbml0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGZyb21cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdG9cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cblxuICAgIGFsaWFzOiBmdW5jdGlvbiAoZnJvbSwgdG8pIHtcbiAgICAgICAgaWYgKCFoYXMuY2FsbCh0aGlzLm1vZHVsZXMsIGZyb20pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCB0byBhbGlhcyBcIicgKyBmcm9tICsgJ1wiLCBpdCBkb2VzIG5vdCBleGlzdCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWxpYXNlc1t0b10gPSBmcm9tO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSByZXF1aXJlUG9tZWxvIGZ1bmN0aW9uIHJlbGF0aXZlIHRvIHRoZSBgcGFyZW50YCBwYXRoLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhcmVudFxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuXG4gICAgcmVsYXRpdmU6IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdmFyIHAgPSB0aGlzLm5vcm1hbGl6ZShwYXJlbnQsICcuLicpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBsYXN0SW5kZXhPZiBoZWxwZXIuXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIGxhc3RJbmRleE9mKGFyciwgb2JqKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGFyci5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcmVsYXRpdmUgcmVxdWlyZVBvbWVsbygpIGl0c2VsZi5cbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIHNlbGZQb21lbG8gPSB0aGlzO1xuICAgICAgICBmdW5jdGlvbiBsb2NhbHJlcXVpcmVQb21lbG8ocGF0aCkge1xuICAgICAgICAgICAgdmFyIHJlc29sdmVkID0gbG9jYWxyZXF1aXJlUG9tZWxvLnJlc29sdmUocGF0aCk7XG4gICAgICAgICAgICByZXR1cm4gc2VsZlBvbWVsby5yZXF1aXJlUG9tZWxvKHJlc29sdmVkLCBwYXJlbnQsIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc29sdmUgcmVsYXRpdmUgdG8gdGhlIHBhcmVudC5cbiAgICAgICAgICovXG5cbiAgICAgICAgbG9jYWxyZXF1aXJlUG9tZWxvLnJlc29sdmUgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICAgICAgdmFyIGMgPSBwYXRoLmNoYXJBdCgwKTtcbiAgICAgICAgICAgIGlmICgnLycgPT09IGMpIHJldHVybiBwYXRoLnNsaWNlKDEpO1xuICAgICAgICAgICAgaWYgKCcuJyA9PT0gYykgcmV0dXJuIHNlbGZQb21lbG8ubm9ybWFsaXplKHAsIHBhdGgpO1xuXG4gICAgICAgICAgICAvLyByZXNvbHZlIGRlcHMgYnkgcmV0dXJuaW5nXG4gICAgICAgICAgICAvLyB0aGUgZGVwIGluIHRoZSBuZWFyZXN0IFwiZGVwc1wiXG4gICAgICAgICAgICAvLyBkaXJlY3RvcnlcbiAgICAgICAgICAgIHZhciBzZWdzID0gcGFyZW50LnNwbGl0KCcvJyk7XG4gICAgICAgICAgICB2YXIgaSA9IGxhc3RJbmRleE9mKHNlZ3MsICdkZXBzJykgKyAxO1xuICAgICAgICAgICAgaWYgKCFpKSBpID0gMDtcbiAgICAgICAgICAgIHBhdGggPSBzZWdzLnNsaWNlKDAsIGkgKyAxKS5qb2luKCcvJykgKyAnL2RlcHMvJyArIHBhdGg7XG4gICAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgbW9kdWxlIGlzIGRlZmluZWQgYXQgYHBhdGhgLlxuICAgICAgICAgKi9cblxuICAgICAgICBsb2NhbHJlcXVpcmVQb21lbG8uZXhpc3RzID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBoYXMuY2FsbChzZWxmUG9tZWxvLm1vZHVsZXMsIGxvY2FscmVxdWlyZVBvbWVsby5yZXNvbHZlKHBhdGgpKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbG9jYWxyZXF1aXJlUG9tZWxvO1xuICAgIH1cbn0pO1xuXG5wb21lbG9CdWlsZC5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBvbWVsb0J1aWxkT2JqID0gbmV3IHBvbWVsb0J1aWxkKCk7XG4gICAgcG9tZWxvQnVpbGRPYmoub25Mb2FkKCk7XG5cbiAgICBwb21lbG9CdWlsZE9iai5yZWdpc3RlcihcImNvbXBvbmVudC1pbmRleG9mL2luZGV4LmpzXCIsIGZ1bmN0aW9uIChleHBvcnRzLCByZXF1aXJlUG9tZWxvLCBtb2R1bGUpIHtcblxuICAgICAgICB2YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyLCBvYmopIHtcbiAgICAgICAgICAgIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIHBvbWVsb0J1aWxkT2JqLnJlZ2lzdGVyKFwiY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanNcIiwgZnVuY3Rpb24gKGV4cG9ydHMsIHJlcXVpcmVQb21lbG8sIG1vZHVsZSkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgaW5kZXggPSByZXF1aXJlUG9tZWxvKCdpbmRleG9mJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV4cG9zZSBgRW1pdHRlcmAuXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICAgICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICAgICAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxuICAgICAgICAgICAgICAgIC5wdXNoKGZuKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcbiAgICAgICAgICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICAgICAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gICAgICAgICAqIEBhcGkgcHVibGljXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYub2ZmKGV2ZW50LCBvbik7XG4gICAgICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm4uX29mZiA9IG9uO1xuICAgICAgICAgICAgdGhpcy5vbihldmVudCwgb24pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXG4gICAgICAgICAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICAgICAgICogQGFwaSBwdWJsaWNcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbiAgICAgICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICAgICAgICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBhbGxcbiAgICAgICAgICAgICAgICAgICAgaWYgKDAgPT09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBzcGVjaWZpYyBldmVudFxuICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgICAgICAgICAgICAgICAgICAgaWYgKDEgPT09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IGluZGV4KGNhbGxiYWNrcywgZm4uX29mZiB8fCBmbik7XG4gICAgICAgICAgICAgICAgICAgIGlmICh+aSkgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAgICAgKiBAcGFyYW0ge01peGVkfSAuLi5cbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG5cbiAgICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG4gICAgICAgIH07XG5cbiAgICB9KTtcblxuICAgIHBvbWVsb0J1aWxkT2JqLnJlZ2lzdGVyKFwiTmV0RWFzZS1wb21lbG8tcHJvdG9jb2wvbGliL3Byb3RvY29sLmpzXCIsIGZ1bmN0aW9uIChleHBvcnRzLCByZXF1aXJlUG9tZWxvLCBtb2R1bGUpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChleHBvcnRzLCBCeXRlQXJyYXksIGdsb2JhbCkge1xuICAgICAgICAgICAgdmFyIFByb3RvY29sID0gZXhwb3J0cztcblxuICAgICAgICAgICAgdmFyIFBLR19IRUFEX0JZVEVTID0gNDtcbiAgICAgICAgICAgIHZhciBNU0dfRkxBR19CWVRFUyA9IDE7XG4gICAgICAgICAgICB2YXIgTVNHX1JPVVRFX0NPREVfQllURVMgPSAyO1xuICAgICAgICAgICAgdmFyIE1TR19JRF9NQVhfQllURVMgPSA1O1xuICAgICAgICAgICAgdmFyIE1TR19ST1VURV9MRU5fQllURVMgPSAxO1xuXG4gICAgICAgICAgICB2YXIgTVNHX1JPVVRFX0NPREVfTUFYID0gMHhmZmZmO1xuXG4gICAgICAgICAgICB2YXIgTVNHX0NPTVBSRVNTX1JPVVRFX01BU0sgPSAweDE7XG4gICAgICAgICAgICB2YXIgTVNHX1RZUEVfTUFTSyA9IDB4NztcblxuICAgICAgICAgICAgdmFyIFBhY2thZ2UgPSBQcm90b2NvbC5QYWNrYWdlID0ge307XG4gICAgICAgICAgICB2YXIgTWVzc2FnZSA9IFByb3RvY29sLk1lc3NhZ2UgPSB7fTtcblxuICAgICAgICAgICAgUGFja2FnZS5UWVBFX0hBTkRTSEFLRSA9IDE7XG4gICAgICAgICAgICBQYWNrYWdlLlRZUEVfSEFORFNIQUtFX0FDSyA9IDI7XG4gICAgICAgICAgICBQYWNrYWdlLlRZUEVfSEVBUlRCRUFUID0gMztcbiAgICAgICAgICAgIFBhY2thZ2UuVFlQRV9EQVRBID0gNDtcbiAgICAgICAgICAgIFBhY2thZ2UuVFlQRV9LSUNLID0gNTtcblxuICAgICAgICAgICAgTWVzc2FnZS5UWVBFX1JFUVVFU1QgPSAwO1xuICAgICAgICAgICAgTWVzc2FnZS5UWVBFX05PVElGWSA9IDE7XG4gICAgICAgICAgICBNZXNzYWdlLlRZUEVfUkVTUE9OU0UgPSAyO1xuICAgICAgICAgICAgTWVzc2FnZS5UWVBFX1BVU0ggPSAzO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIHBvbWVsZSBjbGllbnQgZW5jb2RlXG4gICAgICAgICAgICAgKiBpZCBtZXNzYWdlIGlkO1xuICAgICAgICAgICAgICogcm91dGUgbWVzc2FnZSByb3V0ZVxuICAgICAgICAgICAgICogbXNnIG1lc3NhZ2UgYm9keVxuICAgICAgICAgICAgICogc29ja2V0aW8gY3VycmVudCBzdXBwb3J0IHN0cmluZ1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBQcm90b2NvbC5zdHJlbmNvZGUgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ5dGVBcnJheSA9IG5ldyBCeXRlQXJyYXkoc3RyLmxlbmd0aCAqIDMpO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29kZXMgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPD0gMHg3Zikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXMgPSBbY2hhckNvZGVdO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoYXJDb2RlIDw9IDB4N2ZmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlcyA9IFsweGMwIHwgKGNoYXJDb2RlID4+IDYpLCAweDgwIHwgKGNoYXJDb2RlICYgMHgzZildO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXMgPSBbMHhlMCB8IChjaGFyQ29kZSA+PiAxMiksIDB4ODAgfCAoKGNoYXJDb2RlICYgMHhmYzApID4+IDYpLCAweDgwIHwgKGNoYXJDb2RlICYgMHgzZildO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVBcnJheVtvZmZzZXRdID0gY29kZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICArK29mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgX2J1ZmZlciA9IG5ldyBCeXRlQXJyYXkob2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBjb3B5QXJyYXkoX2J1ZmZlciwgMCwgYnl0ZUFycmF5LCAwLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfYnVmZmVyO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBjbGllbnQgZGVjb2RlXG4gICAgICAgICAgICAgKiBtc2cgU3RyaW5nIGRhdGFcbiAgICAgICAgICAgICAqIHJldHVybiBNZXNzYWdlIE9iamVjdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBQcm90b2NvbC5zdHJkZWNvZGUgPSBmdW5jdGlvbiAoYnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ5dGVzID0gbmV3IEJ5dGVBcnJheShidWZmZXIpO1xuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBjaGFyQ29kZSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGVuZCA9IGJ5dGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChieXRlc1tvZmZzZXRdIDwgMTI4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IGJ5dGVzW29mZnNldF07XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChieXRlc1tvZmZzZXRdIDwgMjI0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9ICgoYnl0ZXNbb2Zmc2V0XSAmIDB4M2YpIDw8IDYpICsgKGJ5dGVzW29mZnNldCArIDFdICYgMHgzZik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gKChieXRlc1tvZmZzZXRdICYgMHgwZikgPDwgMTIpICsgKChieXRlc1tvZmZzZXQgKyAxXSAmIDB4M2YpIDw8IDYpICsgKGJ5dGVzW29mZnNldCArIDJdICYgMHgzZik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGNoYXJDb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHJlcyA9ICcnO1xuICAgICAgICAgICAgICAgIHZhciBjaHVuayA9IDggKiAxMDI0O1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggLyBjaHVuazsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGFycmF5LnNsaWNlKGkgKiBjaHVuaywgKGkgKyAxKSAqIGNodW5rKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGFycmF5LnNsaWNlKGkgKiBjaHVuaykpO1xuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhY2thZ2UgcHJvdG9jb2wgZW5jb2RlLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIFBvbWVsbyBwYWNrYWdlIGZvcm1hdDpcbiAgICAgICAgICAgICAqICstLS0tLS0rLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0rXG4gICAgICAgICAgICAgKiB8IHR5cGUgfCBib2R5IGxlbmd0aCB8ICAgICAgIGJvZHkgICAgICAgfFxuICAgICAgICAgICAgICogKy0tLS0tLSstLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBIZWFkOiA0Ynl0ZXNcbiAgICAgICAgICAgICAqICAgMDogcGFja2FnZSB0eXBlLFxuICAgICAgICAgICAgICogICAgICAxIC0gaGFuZHNoYWtlLFxuICAgICAgICAgICAgICogICAgICAyIC0gaGFuZHNoYWtlIGFjayxcbiAgICAgICAgICAgICAqICAgICAgMyAtIGhlYXJ0YmVhdCxcbiAgICAgICAgICAgICAqICAgICAgNCAtIGRhdGFcbiAgICAgICAgICAgICAqICAgICAgNSAtIGtpY2tcbiAgICAgICAgICAgICAqICAgMSAtIDM6IGJpZy1lbmRpYW4gYm9keSBsZW5ndGhcbiAgICAgICAgICAgICAqIEJvZHk6IGJvZHkgbGVuZ3RoIGJ5dGVzXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtICB7TnVtYmVyfSAgICB0eXBlICAgcGFja2FnZSB0eXBlXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtCeXRlQXJyYXl9IGJvZHkgICBib2R5IGNvbnRlbnQgaW4gYnl0ZXNcbiAgICAgICAgICAgICAqIEByZXR1cm4ge0J5dGVBcnJheX0gICAgICAgIG5ldyBieXRlIGFycmF5IHRoYXQgY29udGFpbnMgZW5jb2RlIHJlc3VsdFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBQYWNrYWdlLmVuY29kZSA9IGZ1bmN0aW9uICh0eXBlLCBib2R5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGJvZHkgPyBib2R5Lmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBCeXRlQXJyYXkoUEtHX0hFQURfQllURVMgKyBsZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgYnVmZmVyW2luZGV4KytdID0gdHlwZSAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgYnVmZmVyW2luZGV4KytdID0gKGxlbmd0aCA+PiAxNikgJiAweGZmO1xuICAgICAgICAgICAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IChsZW5ndGggPj4gOCkgJiAweGZmO1xuICAgICAgICAgICAgICAgIGJ1ZmZlcltpbmRleCsrXSA9IGxlbmd0aCAmIDB4ZmY7XG4gICAgICAgICAgICAgICAgaWYgKGJvZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29weUFycmF5KGJ1ZmZlciwgaW5kZXgsIGJvZHksIDAsIGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFBhY2thZ2UgcHJvdG9jb2wgZGVjb2RlLlxuICAgICAgICAgICAgICogU2VlIGVuY29kZSBmb3IgcGFja2FnZSBmb3JtYXQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtICB7Qnl0ZUFycmF5fSBidWZmZXIgYnl0ZSBhcnJheSBjb250YWluaW5nIHBhY2thZ2UgY29udGVudFxuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAge3R5cGU6IHBhY2thZ2UgdHlwZSwgYnVmZmVyOiBib2R5IGJ5dGUgYXJyYXl9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIFBhY2thZ2UuZGVjb2RlID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHZhciBieXRlcyA9IG5ldyBCeXRlQXJyYXkoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IGJ5dGVzWzBdO1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IDE7XG4gICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9ICgoYnl0ZXNbaW5kZXgrK10pIDw8IDE2IHwgKGJ5dGVzW2luZGV4KytdKSA8PCA4IHwgYnl0ZXNbaW5kZXgrK10pID4+PiAwO1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gbGVuZ3RoID8gbmV3IEJ5dGVBcnJheShsZW5ndGgpIDogbnVsbDtcbiAgICAgICAgICAgICAgICBjb3B5QXJyYXkoYm9keSwgMCwgYnl0ZXMsIFBLR19IRUFEX0JZVEVTLCBsZW5ndGgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7J3R5cGUnOiB0eXBlLCAnYm9keSc6IGJvZHl9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBNZXNzYWdlIHByb3RvY29sIGVuY29kZS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0gIHtOdW1iZXJ9IGlkICAgICAgICAgICAgbWVzc2FnZSBpZFxuICAgICAgICAgICAgICogQHBhcmFtICB7TnVtYmVyfSB0eXBlICAgICAgICAgIG1lc3NhZ2UgdHlwZVxuICAgICAgICAgICAgICogQHBhcmFtICB7TnVtYmVyfSBjb21wcmVzc1JvdXRlIHdoZXRoZXIgY29tcHJlc3Mgcm91dGVcbiAgICAgICAgICAgICAqIEBwYXJhbSAge051bWJlcnxTdHJpbmd9IHJvdXRlICByb3V0ZSBjb2RlIG9yIHJvdXRlIHN0cmluZ1xuICAgICAgICAgICAgICogQHBhcmFtICB7QnVmZmVyfSBtc2cgICAgICAgICAgIG1lc3NhZ2UgYm9keSBieXRlc1xuICAgICAgICAgICAgICogQHJldHVybiB7QnVmZmVyfSAgICAgICAgICAgICAgIGVuY29kZSByZXN1bHRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgTWVzc2FnZS5lbmNvZGUgPSBmdW5jdGlvbiAoaWQsIHR5cGUsIGNvbXByZXNzUm91dGUsIHJvdXRlLCBtc2cpIHtcbiAgICAgICAgICAgICAgICAvLyBjYWN1bGF0ZSBtZXNzYWdlIG1heCBsZW5ndGhcbiAgICAgICAgICAgICAgICB2YXIgaWRCeXRlcyA9IG1zZ0hhc0lkKHR5cGUpID8gY2FjdWxhdGVNc2dJZEJ5dGVzKGlkKSA6IDA7XG4gICAgICAgICAgICAgICAgdmFyIG1zZ0xlbiA9IE1TR19GTEFHX0JZVEVTICsgaWRCeXRlcztcblxuICAgICAgICAgICAgICAgIGlmIChtc2dIYXNSb3V0ZSh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcHJlc3NSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByb3V0ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Vycm9yIGZsYWcgZm9yIG51bWJlciByb3V0ZSEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZ0xlbiArPSBNU0dfUk9VVEVfQ09ERV9CWVRFUztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1zZ0xlbiArPSBNU0dfUk9VVEVfTEVOX0JZVEVTO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUgPSBQcm90b2NvbC5zdHJlbmNvZGUocm91dGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyb3V0ZS5sZW5ndGggPiAyNTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyb3V0ZSBtYXhsZW5ndGggaXMgb3ZlcmZsb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbXNnTGVuICs9IHJvdXRlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtc2cpIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnTGVuICs9IG1zZy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBCeXRlQXJyYXkobXNnTGVuKTtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCBmbGFnXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gZW5jb2RlTXNnRmxhZyh0eXBlLCBjb21wcmVzc1JvdXRlLCBidWZmZXIsIG9mZnNldCk7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgbWVzc2FnZSBpZFxuICAgICAgICAgICAgICAgIGlmIChtc2dIYXNJZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBlbmNvZGVNc2dJZChpZCwgaWRCeXRlcywgYnVmZmVyLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFkZCByb3V0ZVxuICAgICAgICAgICAgICAgIGlmIChtc2dIYXNSb3V0ZSh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBlbmNvZGVNc2dSb3V0ZShjb21wcmVzc1JvdXRlLCByb3V0ZSwgYnVmZmVyLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFkZCBib2R5XG4gICAgICAgICAgICAgICAgaWYgKG1zZykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBlbmNvZGVNc2dCb2R5KG1zZywgYnVmZmVyLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBidWZmZXI7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIE1lc3NhZ2UgcHJvdG9jb2wgZGVjb2RlLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwYXJhbSAge0J1ZmZlcnxVaW50OEFycmF5fSBidWZmZXIgbWVzc2FnZSBieXRlc1xuICAgICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICAgIG1lc3NhZ2Ugb2JqZWN0XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIE1lc3NhZ2UuZGVjb2RlID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIHZhciBieXRlcyA9IG5ldyBCeXRlQXJyYXkoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICB2YXIgYnl0ZXNMZW4gPSBieXRlcy5sZW5ndGggfHwgYnl0ZXMuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgaWQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciByb3V0ZSA9IG51bGw7XG5cbiAgICAgICAgICAgICAgICAvLyBwYXJzZSBmbGFnXG4gICAgICAgICAgICAgICAgdmFyIGZsYWcgPSBieXRlc1tvZmZzZXQrK107XG4gICAgICAgICAgICAgICAgdmFyIGNvbXByZXNzUm91dGUgPSBmbGFnICYgTVNHX0NPTVBSRVNTX1JPVVRFX01BU0s7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSAoZmxhZyA+PiAxKSAmIE1TR19UWVBFX01BU0s7XG5cbiAgICAgICAgICAgICAgICAvLyBwYXJzZSBpZFxuICAgICAgICAgICAgICAgIGlmIChtc2dIYXNJZCh0eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnl0ZSA9IGJ5dGVzW29mZnNldCsrXTtcbiAgICAgICAgICAgICAgICAgICAgaWQgPSBieXRlICYgMHg3ZjtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGJ5dGUgJiAweDgwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZCA8PD0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGUgPSBieXRlc1tvZmZzZXQrK107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZCB8PSBieXRlICYgMHg3ZjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHBhcnNlIHJvdXRlXG4gICAgICAgICAgICAgICAgaWYgKG1zZ0hhc1JvdXRlKHR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wcmVzc1JvdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3V0ZSA9IChieXRlc1tvZmZzZXQrK10pIDw8IDggfCBieXRlc1tvZmZzZXQrK107XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm91dGVMZW4gPSBieXRlc1tvZmZzZXQrK107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm91dGVMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZSA9IG5ldyBCeXRlQXJyYXkocm91dGVMZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcHlBcnJheShyb3V0ZSwgMCwgYnl0ZXMsIG9mZnNldCwgcm91dGVMZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlID0gUHJvdG9jb2wuc3RyZGVjb2RlKHJvdXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSByb3V0ZUxlbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHBhcnNlIGJvZHlcbiAgICAgICAgICAgICAgICB2YXIgYm9keUxlbiA9IGJ5dGVzTGVuIC0gb2Zmc2V0O1xuICAgICAgICAgICAgICAgIHZhciBib2R5ID0gbmV3IEJ5dGVBcnJheShib2R5TGVuKTtcblxuICAgICAgICAgICAgICAgIGNvcHlBcnJheShib2R5LCAwLCBieXRlcywgb2Zmc2V0LCBib2R5TGVuKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICdpZCc6IGlkLCAndHlwZSc6IHR5cGUsICdjb21wcmVzc1JvdXRlJzogY29tcHJlc3NSb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgJ3JvdXRlJzogcm91dGUsICdib2R5JzogYm9keVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgY29weUFycmF5ID0gZnVuY3Rpb24gKGRlc3QsIGRvZmZzZXQsIHNyYywgc29mZnNldCwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBzcmMuY29weSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBCdWZmZXJcbiAgICAgICAgICAgICAgICAgICAgc3JjLmNvcHkoZGVzdCwgZG9mZnNldCwgc29mZnNldCwgc29mZnNldCArIGxlbmd0aCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVWludDhBcnJheVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXN0W2RvZmZzZXQrK10gPSBzcmNbc29mZnNldCsrXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBtc2dIYXNJZCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09IE1lc3NhZ2UuVFlQRV9SRVFVRVNUIHx8IHR5cGUgPT09IE1lc3NhZ2UuVFlQRV9SRVNQT05TRTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBtc2dIYXNSb3V0ZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09IE1lc3NhZ2UuVFlQRV9SRVFVRVNUIHx8IHR5cGUgPT09IE1lc3NhZ2UuVFlQRV9OT1RJRlkgfHxcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9PT0gTWVzc2FnZS5UWVBFX1BVU0g7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgY2FjdWxhdGVNc2dJZEJ5dGVzID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IDA7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBsZW4gKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWQgPj49IDc7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoaWQgPiAwKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGVuO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGVuY29kZU1zZ0ZsYWcgPSBmdW5jdGlvbiAodHlwZSwgY29tcHJlc3NSb3V0ZSwgYnVmZmVyLCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gTWVzc2FnZS5UWVBFX1JFUVVFU1QgJiYgdHlwZSAhPT0gTWVzc2FnZS5UWVBFX05PVElGWSAmJlxuICAgICAgICAgICAgICAgICAgICB0eXBlICE9PSBNZXNzYWdlLlRZUEVfUkVTUE9OU0UgJiYgdHlwZSAhPT0gTWVzc2FnZS5UWVBFX1BVU0gpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmtvbncgbWVzc2FnZSB0eXBlOiAnICsgdHlwZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldF0gPSAodHlwZSA8PCAxKSB8IChjb21wcmVzc1JvdXRlID8gMSA6IDApO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mZnNldCArIE1TR19GTEFHX0JZVEVTO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGVuY29kZU1zZ0lkID0gZnVuY3Rpb24gKGlkLCBpZEJ5dGVzLCBidWZmZXIsIG9mZnNldCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IG9mZnNldCArIGlkQnl0ZXMgLSAxO1xuICAgICAgICAgICAgICAgIGJ1ZmZlcltpbmRleC0tXSA9IGlkICYgMHg3ZjtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaW5kZXggPj0gb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlkID4+PSA3O1xuICAgICAgICAgICAgICAgICAgICBidWZmZXJbaW5kZXgtLV0gPSBpZCAmIDB4N2YgfCAweDgwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gb2Zmc2V0ICsgaWRCeXRlcztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBlbmNvZGVNc2dSb3V0ZSA9IGZ1bmN0aW9uIChjb21wcmVzc1JvdXRlLCByb3V0ZSwgYnVmZmVyLCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29tcHJlc3NSb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm91dGUgPiBNU0dfUk9VVEVfQ09ERV9NQVgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncm91dGUgbnVtYmVyIGlzIG92ZXJmbG93Jyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gKHJvdXRlID4+IDgpICYgMHhmZjtcbiAgICAgICAgICAgICAgICAgICAgYnVmZmVyW29mZnNldCsrXSA9IHJvdXRlICYgMHhmZjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1ZmZlcltvZmZzZXQrK10gPSByb3V0ZS5sZW5ndGggJiAweGZmO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29weUFycmF5KGJ1ZmZlciwgb2Zmc2V0LCByb3V0ZSwgMCwgcm91dGUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSByb3V0ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0KytdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgZW5jb2RlTXNnQm9keSA9IGZ1bmN0aW9uIChtc2csIGJ1ZmZlciwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgY29weUFycmF5KGJ1ZmZlciwgb2Zmc2V0LCBtc2csIDAsIG1zZy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBvZmZzZXQgKyBtc2cubGVuZ3RoO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBQcm90b2NvbDtcbiAgICAgICAgfSkoJ29iamVjdCcgPT09IHR5cGVvZiBtb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6ICh0aGlzLlByb3RvY29sID0ge30pLCAnb2JqZWN0JyA9PT0gdHlwZW9mIG1vZHVsZSA/IEJ1ZmZlciA6IFVpbnQ4QXJyYXksIHRoaXMpO1xuXG4gICAgfSk7XG5cbiAgICBwb21lbG9CdWlsZE9iai5yZWdpc3RlcihcInBvbWVsb25vZGUtcG9tZWxvLXByb3RvYnVmL2xpYi9jbGllbnQvcHJvdG9idWYuanNcIiwgZnVuY3Rpb24gKGV4cG9ydHMsIHJlcXVpcmVQb21lbG8sIG1vZHVsZSkge1xuICAgICAgICAvKiBQcm90b2NvbEJ1ZmZlciBjbGllbnQgMC4xLjAqL1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBwb21lbG8tcHJvdG9idWZcbiAgICAgICAgICogQGF1dGhvciA8emhhbmcwOTM1QGdtYWlsLmNvbT5cbiAgICAgICAgICovXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb3RvY29sIGJ1ZmZlciByb290XG4gICAgICAgICAqIEluIGJyb3dzZXIsIGl0IHdpbGwgYmUgd2luZG93LnByb3RidWZcbiAgICAgICAgICovXG4gICAgICAgIChmdW5jdGlvbiAoZXhwb3J0cywgZ2xvYmFsKSB7XG4gICAgICAgICAgICB2YXIgUHJvdG9idWYgPSBleHBvcnRzO1xuXG4gICAgICAgICAgICBQcm90b2J1Zi5pbml0ID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgICAgICAgICAgICAvL09uIHRoZSBzZXJ2ZXJzaWRlLCB1c2Ugc2VydmVyUHJvdG9zIHRvIGVuY29kZSBtZXNzYWdlcyBzZW5kIHRvIGNsaWVudFxuICAgICAgICAgICAgICAgIFByb3RvYnVmLmVuY29kZXIuaW5pdChvcHRzLmVuY29kZXJQcm90b3MpO1xuXG4gICAgICAgICAgICAgICAgLy9PbiB0aGUgc2VydmVyc2lkZSwgdXNlciBjbGllbnRQcm90b3MgdG8gZGVjb2RlIG1lc3NhZ2VzIHJlY2VpdmUgZnJvbSBjbGllbnRzXG4gICAgICAgICAgICAgICAgUHJvdG9idWYuZGVjb2Rlci5pbml0KG9wdHMuZGVjb2RlclByb3Rvcyk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBQcm90b2J1Zi5lbmNvZGUgPSBmdW5jdGlvbiAoa2V5LCBtc2cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvdG9idWYuZW5jb2Rlci5lbmNvZGUoa2V5LCBtc2cpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgUHJvdG9idWYuZGVjb2RlID0gZnVuY3Rpb24gKGtleSwgbXNnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb3RvYnVmLmRlY29kZXIuZGVjb2RlKGtleSwgbXNnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGV4cG9ydHMgdG8gc3VwcG9ydCBmb3IgY29tcG9uZW50c1xuICAgICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBQcm90b2J1ZjtcbiAgICAgICAgfSkoJ29iamVjdCcgPT09IHR5cGVvZiBtb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6ICh0aGlzLnByb3RvYnVmID0ge30pLCB0aGlzKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY29uc3RhbnRzXG4gICAgICAgICAqL1xuICAgICAgICAoZnVuY3Rpb24gKGV4cG9ydHMsIGdsb2JhbCkge1xuICAgICAgICAgICAgdmFyIGNvbnN0YW50cyA9IGV4cG9ydHMuY29uc3RhbnRzID0ge307XG5cbiAgICAgICAgICAgIGNvbnN0YW50cy5UWVBFUyA9IHtcbiAgICAgICAgICAgICAgICB1SW50MzI6IDAsXG4gICAgICAgICAgICAgICAgc0ludDMyOiAwLFxuICAgICAgICAgICAgICAgIGludDMyOiAwLFxuICAgICAgICAgICAgICAgIGRvdWJsZTogMSxcbiAgICAgICAgICAgICAgICBzdHJpbmc6IDIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogMixcbiAgICAgICAgICAgICAgICBmbG9hdDogNVxuICAgICAgICAgICAgfTtcblxuICAgICAgICB9KSgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIHByb3RvYnVmID8gcHJvdG9idWYgOiBtb2R1bGUuZXhwb3J0cywgdGhpcyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHV0aWwgbW9kdWxlXG4gICAgICAgICAqL1xuICAgICAgICAoZnVuY3Rpb24gKGV4cG9ydHMsIGdsb2JhbCkge1xuXG4gICAgICAgICAgICB2YXIgVXRpbCA9IGV4cG9ydHMudXRpbCA9IHt9O1xuXG4gICAgICAgICAgICBVdGlsLmlzU2ltcGxlVHlwZSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICggdHlwZSA9PT0gJ3VJbnQzMicgfHxcbiAgICAgICAgICAgICAgICB0eXBlID09PSAnc0ludDMyJyB8fFxuICAgICAgICAgICAgICAgIHR5cGUgPT09ICdpbnQzMicgfHxcbiAgICAgICAgICAgICAgICB0eXBlID09PSAndUludDY0JyB8fFxuICAgICAgICAgICAgICAgIHR5cGUgPT09ICdzSW50NjQnIHx8XG4gICAgICAgICAgICAgICAgdHlwZSA9PT0gJ2Zsb2F0JyB8fFxuICAgICAgICAgICAgICAgIHR5cGUgPT09ICdkb3VibGUnICk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0pKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgcHJvdG9idWYgPyBwcm90b2J1ZiA6IG1vZHVsZS5leHBvcnRzLCB0aGlzKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogY29kZWMgbW9kdWxlXG4gICAgICAgICAqL1xuICAgICAgICAoZnVuY3Rpb24gKGV4cG9ydHMsIGdsb2JhbCkge1xuXG4gICAgICAgICAgICB2YXIgQ29kZWMgPSBleHBvcnRzLmNvZGVjID0ge307XG5cbiAgICAgICAgICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoOCk7XG4gICAgICAgICAgICB2YXIgZmxvYXQzMkFycmF5ID0gbmV3IEZsb2F0MzJBcnJheShidWZmZXIpO1xuICAgICAgICAgICAgdmFyIGZsb2F0NjRBcnJheSA9IG5ldyBGbG9hdDY0QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgICAgIHZhciB1SW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcblxuICAgICAgICAgICAgQ29kZWMuZW5jb2RlVUludDMyID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHBhcnNlSW50KG4pO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihuKSB8fCBuIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG1wID0gbiAlIDEyODtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHQgPSBNYXRoLmZsb29yKG4gLyAxMjgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0bXAgPSB0bXAgKyAxMjg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godG1wKTtcbiAgICAgICAgICAgICAgICAgICAgbiA9IG5leHQ7XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAobiAhPT0gMCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ29kZWMuZW5jb2RlU0ludDMyID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IHBhcnNlSW50KG4pO1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihuKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbiA9IG4gPCAwID8gKE1hdGguYWJzKG4pICogMiAtIDEpIDogbiAqIDI7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gQ29kZWMuZW5jb2RlVUludDMyKG4pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ29kZWMuZGVjb2RlVUludDMyID0gZnVuY3Rpb24gKGJ5dGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IHBhcnNlSW50KGJ5dGVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgbiA9IG4gKyAoKG0gJiAweDdmKSAqIE1hdGgucG93KDIsICg3ICogaSkpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG0gPCAxMjgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIENvZGVjLmRlY29kZVNJbnQzMiA9IGZ1bmN0aW9uIChieXRlcykge1xuICAgICAgICAgICAgICAgIHZhciBuID0gdGhpcy5kZWNvZGVVSW50MzIoYnl0ZXMpO1xuICAgICAgICAgICAgICAgIHZhciBmbGFnID0gKChuICUgMikgPT09IDEpID8gLTEgOiAxO1xuXG4gICAgICAgICAgICAgICAgbiA9ICgobiAlIDIgKyBuKSAvIDIpICogZmxhZztcblxuICAgICAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ29kZWMuZW5jb2RlRmxvYXQgPSBmdW5jdGlvbiAoZmxvYXQpIHtcbiAgICAgICAgICAgICAgICBmbG9hdDMyQXJyYXlbMF0gPSBmbG9hdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdUludDhBcnJheTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIENvZGVjLmRlY29kZUZsb2F0ID0gZnVuY3Rpb24gKGJ5dGVzLCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWJ5dGVzIHx8IGJ5dGVzLmxlbmd0aCA8IChvZmZzZXQgKyA0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB1SW50OEFycmF5W2ldID0gYnl0ZXNbb2Zmc2V0ICsgaV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZsb2F0MzJBcnJheVswXTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIENvZGVjLmVuY29kZURvdWJsZSA9IGZ1bmN0aW9uIChkb3VibGUpIHtcbiAgICAgICAgICAgICAgICBmbG9hdDY0QXJyYXlbMF0gPSBkb3VibGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVJbnQ4QXJyYXkuc3ViYXJyYXkoMCwgOCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBDb2RlYy5kZWNvZGVEb3VibGUgPSBmdW5jdGlvbiAoYnl0ZXMsIG9mZnNldCkge1xuICAgICAgICAgICAgICAgIGlmICghYnl0ZXMgfHwgYnl0ZXMubGVuZ3RoIDwgKDggKyBvZmZzZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHVJbnQ4QXJyYXlbaV0gPSBieXRlc1tvZmZzZXQgKyBpXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZmxvYXQ2NEFycmF5WzBdO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgQ29kZWMuZW5jb2RlU3RyID0gZnVuY3Rpb24gKGJ5dGVzLCBvZmZzZXQsIHN0cikge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2RlcyA9IGVuY29kZTJVVEY4KGNvZGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY29kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVzW29mZnNldF0gPSBjb2Rlc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGVjb2RlIHN0cmluZyBmcm9tIHV0ZjggYnl0ZXNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgQ29kZWMuZGVjb2RlU3RyID0gZnVuY3Rpb24gKGJ5dGVzLCBvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBlbmQgPSBvZmZzZXQgKyBsZW5ndGg7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2RlID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYnl0ZXNbb2Zmc2V0XSA8IDEyOCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZSA9IGJ5dGVzW29mZnNldF07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGJ5dGVzW29mZnNldF0gPCAyMjQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUgPSAoKGJ5dGVzW29mZnNldF0gJiAweDNmKSA8PCA2KSArIChieXRlc1tvZmZzZXQgKyAxXSAmIDB4M2YpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlID0gKChieXRlc1tvZmZzZXRdICYgMHgwZikgPDwgMTIpICsgKChieXRlc1tvZmZzZXQgKyAxXSAmIDB4M2YpIDw8IDYpICsgKGJ5dGVzW29mZnNldCArIDJdICYgMHgzZik7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGFycmF5LnB1c2goY29kZSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGFycmF5LnNsaWNlKGksIGkgKyAxMDAwMCkpO1xuICAgICAgICAgICAgICAgICAgICBpICs9IDEwMDAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFJldHVybiB0aGUgYnl0ZSBsZW5ndGggb2YgdGhlIHN0ciB1c2UgdXRmOFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBDb2RlYy5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yoc3RyKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoICs9IGNvZGVMZW5ndGgoY29kZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRW5jb2RlIGEgdW5pY29kZTE2IGNoYXIgY29kZSB0byB1dGY4IGJ5dGVzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZTJVVEY4KGNoYXJDb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDw9IDB4N2YpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtjaGFyQ29kZV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFyQ29kZSA8PSAweDdmZikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzB4YzAgfCAoY2hhckNvZGUgPj4gNiksIDB4ODAgfCAoY2hhckNvZGUgJiAweDNmKV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsweGUwIHwgKGNoYXJDb2RlID4+IDEyKSwgMHg4MCB8ICgoY2hhckNvZGUgJiAweGZjMCkgPj4gNiksIDB4ODAgfCAoY2hhckNvZGUgJiAweDNmKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBjb2RlTGVuZ3RoKGNvZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoY29kZSA8PSAweDdmKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZSA8PSAweDdmZikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgcHJvdG9idWYgPyBwcm90b2J1ZiA6IG1vZHVsZS5leHBvcnRzLCB0aGlzKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogZW5jb2RlciBtb2R1bGVcbiAgICAgICAgICovXG4gICAgICAgIChmdW5jdGlvbiAoZXhwb3J0cywgZ2xvYmFsKSB7XG5cbiAgICAgICAgICAgIHZhciBwcm90b2J1ZiA9IGV4cG9ydHM7XG4gICAgICAgICAgICB2YXIgTXNnRW5jb2RlciA9IGV4cG9ydHMuZW5jb2RlciA9IHt9O1xuXG4gICAgICAgICAgICB2YXIgY29kZWMgPSBwcm90b2J1Zi5jb2RlYztcbiAgICAgICAgICAgIHZhciBjb25zdGFudCA9IHByb3RvYnVmLmNvbnN0YW50cztcbiAgICAgICAgICAgIHZhciB1dGlsID0gcHJvdG9idWYudXRpbDtcblxuICAgICAgICAgICAgTXNnRW5jb2Rlci5pbml0ID0gZnVuY3Rpb24gKHByb3Rvcykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvdG9zID0gcHJvdG9zIHx8IHt9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgTXNnRW5jb2Rlci5lbmNvZGUgPSBmdW5jdGlvbiAocm91dGUsIG1zZykge1xuICAgICAgICAgICAgICAgIC8vR2V0IHByb3RvcyBmcm9tIHByb3RvcyBtYXAgdXNlIHRoZSByb3V0ZSBhcyBrZXlcbiAgICAgICAgICAgICAgICB2YXIgcHJvdG9zID0gdGhpcy5wcm90b3Nbcm91dGVdO1xuXG4gICAgICAgICAgICAgICAgLy9DaGVjayBtc2dcbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrTXNnKG1zZywgcHJvdG9zKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL1NldCB0aGUgbGVuZ3RoIG9mIHRoZSBidWZmZXIgMiB0aW1lcyBiaWdnZXIgdG8gcHJldmVudCBvdmVyZmxvd1xuICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSBjb2RlYy5ieXRlTGVuZ3RoKEpTT04uc3RyaW5naWZ5KG1zZykpO1xuXG4gICAgICAgICAgICAgICAgLy9Jbml0IGJ1ZmZlciBhbmQgb2Zmc2V0XG4gICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihsZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZhciB1SW50OEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyKTtcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcblxuICAgICAgICAgICAgICAgIGlmICghIXByb3Rvcykge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBlbmNvZGVNc2codUludDhBcnJheSwgb2Zmc2V0LCBwcm90b3MsIG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdUludDhBcnJheS5zdWJhcnJheSgwLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENoZWNrIGlmIHRoZSBtc2cgZm9sbG93IHRoZSBkZWZpbmF0aW9uIGluIHRoZSBwcm90b3NcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tNc2cobXNnLCBwcm90b3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXByb3Rvcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBwcm90b3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByb3RvID0gcHJvdG9zW25hbWVdO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vQWxsIHJlcXVpcmVkIGVsZW1lbnQgbXVzdCBleGlzdFxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3RvLm9wdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVxdWlyZWQnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mKG1zZ1tuYW1lXSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcHRpb25hbCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YobXNnW25hbWVdKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBwcm90b3MuX19tZXNzYWdlc1twcm90by50eXBlXSB8fCBNc2dFbmNvZGVyLnByb3Rvc1snbWVzc2FnZSAnICsgcHJvdG8udHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIW1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrTXNnKG1zZ1tuYW1lXSwgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRlZCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ2hlY2sgbmVzdCBtZXNzYWdlIGluIHJlcGVhdGVkIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBwcm90b3MuX19tZXNzYWdlc1twcm90by50eXBlXSB8fCBNc2dFbmNvZGVyLnByb3Rvc1snbWVzc2FnZSAnICsgcHJvdG8udHlwZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhbXNnW25hbWVdICYmICEhbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1zZ1tuYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja01zZyhtc2dbbmFtZV1baV0sIG1lc3NhZ2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZU1zZyhidWZmZXIsIG9mZnNldCwgcHJvdG9zLCBtc2cpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIG1zZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISFwcm90b3NbbmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm90byA9IHByb3Rvc1tuYW1lXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwcm90by5vcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXF1aXJlZCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wdGlvbmFsJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IHdyaXRlQnl0ZXMoYnVmZmVyLCBvZmZzZXQsIGVuY29kZVRhZyhwcm90by50eXBlLCBwcm90by50YWcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gZW5jb2RlUHJvcChtc2dbbmFtZV0sIHByb3RvLnR5cGUsIG9mZnNldCwgYnVmZmVyLCBwcm90b3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRlZCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXNnW25hbWVdLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IGVuY29kZUFycmF5KG1zZ1tuYW1lXSwgcHJvdG8sIG9mZnNldCwgYnVmZmVyLCBwcm90b3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZW5jb2RlUHJvcCh2YWx1ZSwgdHlwZSwgb2Zmc2V0LCBidWZmZXIsIHByb3Rvcykge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd1SW50MzInOlxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gd3JpdGVCeXRlcyhidWZmZXIsIG9mZnNldCwgY29kZWMuZW5jb2RlVUludDMyKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaW50MzInIDpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc0ludDMyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IHdyaXRlQnl0ZXMoYnVmZmVyLCBvZmZzZXQsIGNvZGVjLmVuY29kZVNJbnQzMih2YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlQnl0ZXMoYnVmZmVyLCBvZmZzZXQsIGNvZGVjLmVuY29kZUZsb2F0KHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkb3VibGUnOlxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGVCeXRlcyhidWZmZXIsIG9mZnNldCwgY29kZWMuZW5jb2RlRG91YmxlKHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gODtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGNvZGVjLmJ5dGVMZW5ndGgodmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvL0VuY29kZSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IHdyaXRlQnl0ZXMoYnVmZmVyLCBvZmZzZXQsIGNvZGVjLmVuY29kZVVJbnQzMihsZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vd3JpdGUgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlYy5lbmNvZGVTdHIoYnVmZmVyLCBvZmZzZXQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSBsZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHByb3Rvcy5fX21lc3NhZ2VzW3R5cGVdIHx8IE1zZ0VuY29kZXIucHJvdG9zWydtZXNzYWdlICcgKyB0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIW1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1VzZSBhIHRtcCBidWZmZXIgdG8gYnVpbGQgYW4gaW50ZXJuYWwgbXNnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRtcEJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihjb2RlYy5ieXRlTGVuZ3RoKEpTT04uc3RyaW5naWZ5KHZhbHVlKSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gZW5jb2RlTXNnKHRtcEJ1ZmZlciwgbGVuZ3RoLCBtZXNzYWdlLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9FbmNvZGUgbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gd3JpdGVCeXRlcyhidWZmZXIsIG9mZnNldCwgY29kZWMuZW5jb2RlVUludDMyKGxlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29udGFjdCB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0XSA9IHRtcEJ1ZmZlcltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBFbmNvZGUgcmVhcGVhdGVkIHByb3BlcnRpZXMsIHNpbXBsZSBtc2cgYW5kIG9iamVjdCBhcmUgZGVjb2RlIGRpZmZlcmVudGVkXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZUFycmF5KGFycmF5LCBwcm90bywgb2Zmc2V0LCBidWZmZXIsIHByb3Rvcykge1xuICAgICAgICAgICAgICAgIHZhciBpID0gMDtcblxuICAgICAgICAgICAgICAgIGlmICh1dGlsLmlzU2ltcGxlVHlwZShwcm90by50eXBlKSkge1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSB3cml0ZUJ5dGVzKGJ1ZmZlciwgb2Zmc2V0LCBlbmNvZGVUYWcocHJvdG8udHlwZSwgcHJvdG8udGFnKSk7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IHdyaXRlQnl0ZXMoYnVmZmVyLCBvZmZzZXQsIGNvZGVjLmVuY29kZVVJbnQzMihhcnJheS5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBlbmNvZGVQcm9wKGFycmF5W2ldLCBwcm90by50eXBlLCBvZmZzZXQsIGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IHdyaXRlQnl0ZXMoYnVmZmVyLCBvZmZzZXQsIGVuY29kZVRhZyhwcm90by50eXBlLCBwcm90by50YWcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IGVuY29kZVByb3AoYXJyYXlbaV0sIHByb3RvLnR5cGUsIG9mZnNldCwgYnVmZmVyLCBwcm90b3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9mZnNldDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gd3JpdGVCeXRlcyhidWZmZXIsIG9mZnNldCwgYnl0ZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrLCBvZmZzZXQrKykge1xuICAgICAgICAgICAgICAgICAgICBidWZmZXJbb2Zmc2V0XSA9IGJ5dGVzW2ldO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZVRhZyh0eXBlLCB0YWcpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBjb25zdGFudC5UWVBFU1t0eXBlXSB8fCAyO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2RlYy5lbmNvZGVVSW50MzIoKHRhZyA8PCAzKSB8IHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBwcm90b2J1ZiA/IHByb3RvYnVmIDogbW9kdWxlLmV4cG9ydHMsIHRoaXMpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZWNvZGVyIG1vZHVsZVxuICAgICAgICAgKi9cbiAgICAgICAgKGZ1bmN0aW9uIChleHBvcnRzLCBnbG9iYWwpIHtcbiAgICAgICAgICAgIHZhciBwcm90b2J1ZiA9IGV4cG9ydHM7XG4gICAgICAgICAgICB2YXIgTXNnRGVjb2RlciA9IGV4cG9ydHMuZGVjb2RlciA9IHt9O1xuXG4gICAgICAgICAgICB2YXIgY29kZWMgPSBwcm90b2J1Zi5jb2RlYztcbiAgICAgICAgICAgIHZhciB1dGlsID0gcHJvdG9idWYudXRpbDtcblxuICAgICAgICAgICAgdmFyIGJ1ZmZlcjtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAwO1xuXG4gICAgICAgICAgICBNc2dEZWNvZGVyLmluaXQgPSBmdW5jdGlvbiAocHJvdG9zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm90b3MgPSBwcm90b3MgfHwge307XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBNc2dEZWNvZGVyLnNldFByb3RvcyA9IGZ1bmN0aW9uIChwcm90b3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoISFwcm90b3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm90b3MgPSBwcm90b3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgTXNnRGVjb2Rlci5kZWNvZGUgPSBmdW5jdGlvbiAocm91dGUsIGJ1Zikge1xuICAgICAgICAgICAgICAgIHZhciBwcm90b3MgPSB0aGlzLnByb3Rvc1tyb3V0ZV07XG5cbiAgICAgICAgICAgICAgICBidWZmZXIgPSBidWY7XG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gMDtcblxuICAgICAgICAgICAgICAgIGlmICghIXByb3Rvcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVjb2RlTXNnKHt9LCBwcm90b3MsIGJ1ZmZlci5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gZGVjb2RlTXNnKG1zZywgcHJvdG9zLCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWFkID0gZ2V0SGVhZCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IGhlYWQudHlwZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZyA9IGhlYWQudGFnO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IHByb3Rvcy5fX3RhZ3NbdGFnXTtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHByb3Rvc1tuYW1lXS5vcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wdGlvbmFsJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXF1aXJlZCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZ1tuYW1lXSA9IGRlY29kZVByb3AocHJvdG9zW25hbWVdLnR5cGUsIHByb3Rvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdyZXBlYXRlZCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbXNnW25hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1zZ1tuYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVBcnJheShtc2dbbmFtZV0sIHByb3Rvc1tuYW1lXS50eXBlLCBwcm90b3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1zZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBUZXN0IGlmIHRoZSBnaXZlbiBtc2cgaXMgZmluaXNoZWRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gaXNGaW5pc2gobXNnLCBwcm90b3MpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCFwcm90b3MuX190YWdzW3BlZWtIZWFkKCkudGFnXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogR2V0IHByb3BlcnR5IGhlYWQgZnJvbSBwcm90b2J1ZlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRIZWFkKCkge1xuICAgICAgICAgICAgICAgIHZhciB0YWcgPSBjb2RlYy5kZWNvZGVVSW50MzIoZ2V0Qnl0ZXMoKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0YWcgJiAweDcsXG4gICAgICAgICAgICAgICAgICAgIHRhZzogdGFnID4+IDNcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEdldCB0YWcgaGVhZCB3aXRob3V0IG1vdmUgdGhlIG9mZnNldFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbiBwZWVrSGVhZCgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gY29kZWMuZGVjb2RlVUludDMyKHBlZWtCeXRlcygpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHRhZyAmIDB4NyxcbiAgICAgICAgICAgICAgICAgICAgdGFnOiB0YWcgPj4gM1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlY29kZVByb3AodHlwZSwgcHJvdG9zKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3VJbnQzMic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29kZWMuZGVjb2RlVUludDMyKGdldEJ5dGVzKCkpO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdpbnQzMicgOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzSW50MzInIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2RlYy5kZWNvZGVTSW50MzIoZ2V0Qnl0ZXMoKSk7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Zsb2F0JyA6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmxvYXQgPSBjb2RlYy5kZWNvZGVGbG9hdChidWZmZXIsIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgKz0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmbG9hdDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZG91YmxlJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG91YmxlID0gY29kZWMuZGVjb2RlRG91YmxlKGJ1ZmZlciwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCArPSA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvdWJsZTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gY29kZWMuZGVjb2RlVUludDMyKGdldEJ5dGVzKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gY29kZWMuZGVjb2RlU3RyKGJ1ZmZlciwgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHByb3Rvcy5fX21lc3NhZ2VzW3R5cGVdIHx8IE1zZ0RlY29kZXIucHJvdG9zWydtZXNzYWdlICcgKyB0eXBlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXByb3RvcyAmJiAhIW1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gY29kZWMuZGVjb2RlVUludDMyKGdldEJ5dGVzKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtc2cgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWNvZGVNc2cobXNnLCBtZXNzYWdlLCBvZmZzZXQgKyBsZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtc2c7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlY29kZUFycmF5KGFycmF5LCB0eXBlLCBwcm90b3MpIHtcbiAgICAgICAgICAgICAgICBpZiAodXRpbC5pc1NpbXBsZVR5cGUodHlwZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGNvZGVjLmRlY29kZVVJbnQzMihnZXRCeXRlcygpKTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJheS5wdXNoKGRlY29kZVByb3AodHlwZSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyYXkucHVzaChkZWNvZGVQcm9wKHR5cGUsIHByb3RvcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0Qnl0ZXMoZmxhZykge1xuICAgICAgICAgICAgICAgIHZhciBieXRlcyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBvZmZzZXQ7XG4gICAgICAgICAgICAgICAgZmxhZyA9IGZsYWcgfHwgZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgYjtcblxuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgYiA9IGJ1ZmZlcltwb3NdO1xuICAgICAgICAgICAgICAgICAgICBieXRlcy5wdXNoKGIpO1xuICAgICAgICAgICAgICAgICAgICBwb3MrKztcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChiID49IDEyOCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWZsYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gcG9zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYnl0ZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHBlZWtCeXRlcygpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0Qnl0ZXModHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSkoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBwcm90b2J1ZiA/IHByb3RvYnVmIDogbW9kdWxlLmV4cG9ydHMsIHRoaXMpO1xuXG5cbiAgICB9KTtcblxuICAgIHBvbWVsb0J1aWxkT2JqLnJlZ2lzdGVyKFwicG9tZWxvbm9kZS1wb21lbG8tanNjbGllbnQtd2Vic29ja2V0L2xpYi9wb21lbG8tY2xpZW50LmpzXCIsIGZ1bmN0aW9uIChleHBvcnRzLCByZXF1aXJlUG9tZWxvLCBtb2R1bGUpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChzZWxmKSB7XG4gICAgICAgICAgICB2YXIgSlNfV1NfQ0xJRU5UX1RZUEUgPSAnanMtd2Vic29ja2V0JztcbiAgICAgICAgICAgIHZhciBKU19XU19DTElFTlRfVkVSU0lPTiA9ICcwLjAuMSc7XG5cbiAgICAgICAgICAgIHZhciBQcm90b2NvbCA9IHNlbGYuUHJvdG9jb2w7XG4gICAgICAgICAgICB2YXIgUGFja2FnZSA9IFByb3RvY29sLlBhY2thZ2U7XG4gICAgICAgICAgICB2YXIgTWVzc2FnZSA9IFByb3RvY29sLk1lc3NhZ2U7XG4gICAgICAgICAgICB2YXIgRXZlbnRFbWl0dGVyID0gc2VsZi5FdmVudEVtaXR0ZXI7XG4gICAgICAgICAgICB2YXIgcHJvdG9idWYgPSBzZWxmLnByb3RvYnVmO1xuXG4gICAgICAgICAgICB2YXIgUkVTX09LID0gMjAwO1xuICAgICAgICAgICAgdmFyIFJFU19GQUlMID0gNTAwO1xuICAgICAgICAgICAgdmFyIFJFU19PTERfQ0xJRU5UID0gNTAxO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24gKG8pIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gRigpIHtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIEYucHJvdG90eXBlID0gbztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHJvb3QgPSB3aW5kb3c7XG4gICAgICAgICAgICB2YXIgcG9tZWxvID0gT2JqZWN0LmNyZWF0ZShFdmVudEVtaXR0ZXIucHJvdG90eXBlKTsgLy8gb2JqZWN0IGV4dGVuZCBmcm9tIG9iamVjdFxuICAgICAgICAgICAgcm9vdC5wb21lbG8gPSBwb21lbG87XG4gICAgICAgICAgICB2YXIgc29ja2V0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciByZXFJZCA9IDA7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2tzID0ge307XG4gICAgICAgICAgICB2YXIgaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgICAgIC8vTWFwIGZyb20gcmVxdWVzdCBpZCB0byByb3V0ZVxuICAgICAgICAgICAgdmFyIHJvdXRlTWFwID0ge307XG5cbiAgICAgICAgICAgIHZhciBoZWFydGJlYXRJbnRlcnZhbCA9IDA7XG4gICAgICAgICAgICB2YXIgaGVhcnRiZWF0VGltZW91dCA9IDA7XG4gICAgICAgICAgICB2YXIgbmV4dEhlYXJ0YmVhdFRpbWVvdXQgPSAwO1xuICAgICAgICAgICAgdmFyIGdhcFRocmVzaG9sZCA9IDEwMDsgICAvLyBoZWFydGJlYXQgZ2FwIHRocmVhc2hvbGRcbiAgICAgICAgICAgIHZhciBoZWFydGJlYXRJZCA9IG51bGw7XG4gICAgICAgICAgICB2YXIgaGVhcnRiZWF0VGltZW91dElkID0gbnVsbDtcblxuICAgICAgICAgICAgdmFyIGhhbmRzaGFrZUNhbGxiYWNrID0gbnVsbDtcblxuICAgICAgICAgICAgdmFyIGhhbmRzaGFrZUJ1ZmZlciA9IHtcbiAgICAgICAgICAgICAgICAnc3lzJzoge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKU19XU19DTElFTlRfVFlQRSxcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbjogSlNfV1NfQ0xJRU5UX1ZFUlNJT05cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd1c2VyJzoge31cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBpbml0Q2FsbGJhY2sgPSBudWxsO1xuXG4gICAgICAgICAgICBwb21lbG8uaW5pdCA9IGZ1bmN0aW9uIChwYXJhbXMsIGNiKSB7XG4gICAgICAgICAgICAgICAgaW5pdENhbGxiYWNrID0gY2I7XG4gICAgICAgICAgICAgICAgdmFyIGhvc3QgPSBwYXJhbXMuaG9zdDtcbiAgICAgICAgICAgICAgICB2YXIgcG9ydCA9IHBhcmFtcy5wb3J0O1xuXG4gICAgICAgICAgICAgICAgdmFyIHdzU3RyID0gXCJ3czovL1wiO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy53c1N0cikge1xuICAgICAgICAgICAgICAgICAgICB3c1N0ciA9IHBhcmFtcy53c1N0cjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gd3NTdHIgKyBob3N0O1xuICAgICAgICAgICAgICAgIGlmIChwb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIHVybCArPSAnOicgKyBwb3J0O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGhhbmRzaGFrZUJ1ZmZlci51c2VyID0gcGFyYW1zLnVzZXI7XG4gICAgICAgICAgICAgICAgaGFuZHNoYWtlQ2FsbGJhY2sgPSBwYXJhbXMuaGFuZHNoYWtlQ2FsbGJhY2s7XG4gICAgICAgICAgICAgICAgaW5pdFdlYlNvY2tldCh1cmwsIGNiKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBpbml0V2ViU29ja2V0ID0gZnVuY3Rpb24gKHVybCwgY2IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29ubmVjdCB0byAnICsgdXJsKTtcbiAgICAgICAgICAgICAgICB2YXIgb25vcGVuID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBQYWNrYWdlLmVuY29kZShQYWNrYWdlLlRZUEVfSEFORFNIQUtFLCBQcm90b2NvbC5zdHJlbmNvZGUoSlNPTi5zdHJpbmdpZnkoaGFuZHNoYWtlQnVmZmVyKSkpO1xuICAgICAgICAgICAgICAgICAgICBzZW5kKG9iaik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgb25tZXNzYWdlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3NQYWNrYWdlKFBhY2thZ2UuZGVjb2RlKGV2ZW50LmRhdGEpLCBjYik7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5ldyBwYWNrYWdlIGFycml2ZWQsIHVwZGF0ZSB0aGUgaGVhcnRiZWF0IHRpbWVvdXRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlYXJ0YmVhdFRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRIZWFydGJlYXRUaW1lb3V0ID0gRGF0ZS5ub3coKSArIGhlYXJ0YmVhdFRpbWVvdXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciBvbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvbWVsby5lbWl0KCdpby1lcnJvcicsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdzb2NrZXQgZXJyb3I6ICcsIEpTT04uc3RyaW5naWZ5KGV2ZW50KSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB2YXIgb25jbG9zZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBwb21lbG8uZW1pdCgnY2xvc2UnLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybignc29ja2V0IGNsb3NlOiAnLCBKU09OLnN0cmluZ2lmeShldmVudCkpO1xuICAgICAgICAgICAgICAgICAgICAvLyAvL+WwneivleS/ruWkjeaWree6v+WQjue7p+e7reWPkeW/g+i3s+WMheWQjuaKpemUmVxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoaGVhcnRiZWF0SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNsZWFyVGltZW91dChoZWFydGJlYXRJZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBoZWFydGJlYXRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGhlYXJ0YmVhdFRpbWVvdXRJZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY2xlYXJUaW1lb3V0KGhlYXJ0YmVhdFRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBoZWFydGJlYXRUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBzb2NrZXQgPSBuZXcgV2ViU29ja2V0KHVybCk7XG4gICAgICAgICAgICAgICAgc29ja2V0LmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgICAgIHNvY2tldC5vbm9wZW4gPSBvbm9wZW47XG4gICAgICAgICAgICAgICAgc29ja2V0Lm9ubWVzc2FnZSA9IG9ubWVzc2FnZTtcbiAgICAgICAgICAgICAgICBzb2NrZXQub25lcnJvciA9IG9uZXJyb3I7XG4gICAgICAgICAgICAgICAgc29ja2V0Lm9uY2xvc2UgPSBvbmNsb3NlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcG9tZWxvLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc29ja2V0LmRpc2Nvbm5lY3QpIHNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb2NrZXQuY2xvc2UpIHNvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlzY29ubmVjdCcpO1xuICAgICAgICAgICAgICAgICAgICBzb2NrZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChoZWFydGJlYXRJZCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoaGVhcnRiZWF0SWQpO1xuICAgICAgICAgICAgICAgICAgICBoZWFydGJlYXRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChoZWFydGJlYXRUaW1lb3V0SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGhlYXJ0YmVhdFRpbWVvdXRJZCk7XG4gICAgICAgICAgICAgICAgICAgIGhlYXJ0YmVhdFRpbWVvdXRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcG9tZWxvLnJlcXVlc3QgPSBmdW5jdGlvbiAocm91dGUsIG1zZywgY2IpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgbXNnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNiID0gbXNnO1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSB7fTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBtc2cgfHwge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJvdXRlID0gcm91dGUgfHwgbXNnLnJvdXRlO1xuICAgICAgICAgICAgICAgIGlmICghcm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlcUlkKys7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogMTI45Y+K5YW25YCN5pWw55qEcmVxSWTkvJrlr7zoh7TmnI3liqHnq6/nvJbop6PnoIHlh7rnjrDlvILluLgsMTI45Y+K5YW25YCN5pWw5piv5Liq5Z2R44CC57uV6L+H44CCXG4gICAgICAgICAgICAgICAgICogLy9wb21lbG8tcHJvdG9jb2wuanMjMjQzXG4gICAgICAgICAgICAgICAgICogIGRve1xuICAgICAgICAgICAgICAgICAgICAgICAgbSA9IHBhcnNlSW50KGJ5dGVzW29mZnNldF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQgKz0gKG0gJiAweDdmKSA8PCAoNyAqIGkpOyAgIC8v6L+Z5Liq6aOO6aqa55qE5L2N56e75pyJYnVnXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgfXdoaWxlKG0gPj0gMTI4KTsgXG4gICAgICAgICAgICAgICAgICogXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKHJlcUlkICUgMTI4ID09IDApe1xuICAgICAgICAgICAgICAgICAgICByZXFJZCsrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNlbmRNZXNzYWdlKHJlcUlkLCByb3V0ZSwgbXNnKTtcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrc1tyZXFJZF0gPSBjYjtcbiAgICAgICAgICAgICAgICByb3V0ZU1hcFtyZXFJZF0gPSByb3V0ZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBvbWVsby5ub3RpZnkgPSBmdW5jdGlvbiAocm91dGUsIG1zZykge1xuICAgICAgICAgICAgICAgIG1zZyA9IG1zZyB8fCB7fTtcbiAgICAgICAgICAgICAgICBzZW5kTWVzc2FnZSgwLCByb3V0ZSwgbXNnKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBvbWVsby5jbGVhckNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmKCFzb2NrZXQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzb2NrZXQub25vcGVuID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzb2NrZXQub25tZXNzYWdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBzb2NrZXQub25lcnJvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgc29ja2V0Lm9uY2xvc2UgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcG9tZWxvLmlzQ29ubmVjdGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHNvY2tldCAmJiBzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcG9tZWxvLmlzT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKHNvY2tldCAmJiBzb2NrZXQucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcG9tZWxvLmlzQ2xvc2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoc29ja2V0ICYmIHNvY2tldC5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHBvbWVsby5pc0Nsb3NpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChzb2NrZXQgJiYgc29ja2V0LnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DTE9TSU5HKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBzZW5kTWVzc2FnZSA9IGZ1bmN0aW9uIChyZXFJZCwgcm91dGUsIG1zZykge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gcmVxSWQgPyBNZXNzYWdlLlRZUEVfUkVRVUVTVCA6IE1lc3NhZ2UuVFlQRV9OT1RJRlk7XG5cbiAgICAgICAgICAgICAgICAvL2NvbXByZXNzIG1lc3NhZ2UgYnkgcHJvdG9idWZcbiAgICAgICAgICAgICAgICB2YXIgcHJvdG9zID0gISFwb21lbG8uZGF0YS5wcm90b3MgPyBwb21lbG8uZGF0YS5wcm90b3MuY2xpZW50IDoge307XG4gICAgICAgICAgICAgICAgaWYgKCEhcHJvdG9zW3JvdXRlXSkge1xuICAgICAgICAgICAgICAgICAgICBtc2cgPSBwcm90b2J1Zi5lbmNvZGUocm91dGUsIG1zZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnID0gUHJvdG9jb2wuc3RyZW5jb2RlKEpTT04uc3RyaW5naWZ5KG1zZykpO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgdmFyIGNvbXByZXNzUm91dGUgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChwb21lbG8uZGljdCAmJiBwb21lbG8uZGljdFtyb3V0ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUgPSBwb21lbG8uZGljdFtyb3V0ZV07XG4gICAgICAgICAgICAgICAgICAgIGNvbXByZXNzUm91dGUgPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1zZyA9IE1lc3NhZ2UuZW5jb2RlKHJlcUlkLCB0eXBlLCBjb21wcmVzc1JvdXRlLCByb3V0ZSwgbXNnKTtcbiAgICAgICAgICAgICAgICB2YXIgcGFja2V0ID0gUGFja2FnZS5lbmNvZGUoUGFja2FnZS5UWVBFX0RBVEEsIG1zZyk7XG4gICAgICAgICAgICAgICAgc2VuZChwYWNrZXQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHNlbmQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICBzb2NrZXQuc2VuZChwYWNrZXQuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHZhciBoYW5kbGVyID0ge307XG5cbiAgICAgICAgICAgIHZhciBoZWFydGJlYXQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICghaGVhcnRiZWF0SW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbm8gaGVhcnRiZWF0XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwb21lbG8uZW1pdCgnaGVhcnRiZWF0IHJlY3YnKTtcblxuICAgICAgICAgICAgICAgIHZhciBvYmogPSBQYWNrYWdlLmVuY29kZShQYWNrYWdlLlRZUEVfSEVBUlRCRUFUKTtcbiAgICAgICAgICAgICAgICBpZiAoaGVhcnRiZWF0VGltZW91dElkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChoZWFydGJlYXRUaW1lb3V0SWQpO1xuICAgICAgICAgICAgICAgICAgICBoZWFydGJlYXRUaW1lb3V0SWQgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChoZWFydGJlYXRJZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhbHJlYWR5IGluIGEgaGVhcnRiZWF0IGludGVydmFsXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBoZWFydGJlYXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFydGJlYXRJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHNlbmQob2JqKTtcblxuICAgICAgICAgICAgICAgICAgICBuZXh0SGVhcnRiZWF0VGltZW91dCA9IERhdGUubm93KCkgKyBoZWFydGJlYXRUaW1lb3V0O1xuICAgICAgICAgICAgICAgICAgICBoZWFydGJlYXRUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGhlYXJ0YmVhdFRpbWVvdXRDYiwgaGVhcnRiZWF0VGltZW91dCk7XG4gICAgICAgICAgICAgICAgfSwgaGVhcnRiZWF0SW50ZXJ2YWwpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGhlYXJ0YmVhdFRpbWVvdXRDYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2FwID0gbmV4dEhlYXJ0YmVhdFRpbWVvdXQgLSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGlmIChnYXAgPiBnYXBUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhcnRiZWF0VGltZW91dElkID0gc2V0VGltZW91dChoZWFydGJlYXRUaW1lb3V0Q2IsIGdhcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdzZXJ2ZXIgaGVhcnRiZWF0IHRpbWVvdXQnKTtcbiAgICAgICAgICAgICAgICAgICAgcG9tZWxvLmVtaXQoJ2hlYXJ0YmVhdCB0aW1lb3V0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHBvbWVsby5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGhhbmRzaGFrZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoUHJvdG9jb2wuc3RyZGVjb2RlKGRhdGEpKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb2RlID09PSBSRVNfT0xEX0NMSUVOVCkge1xuICAgICAgICAgICAgICAgICAgICBwb21lbG8uZW1pdCgnZXJyb3InLCAnY2xpZW50IHZlcnNpb24gbm90IGZ1bGxmaWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5jb2RlICE9PSBSRVNfT0spIHtcbiAgICAgICAgICAgICAgICAgICAgcG9tZWxvLmVtaXQoJ2Vycm9yJywgJ2hhbmRzaGFrZSBmYWlsJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBoYW5kc2hha2VJbml0KGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IFBhY2thZ2UuZW5jb2RlKFBhY2thZ2UuVFlQRV9IQU5EU0hBS0VfQUNLKTtcbiAgICAgICAgICAgICAgICBzZW5kKG9iaik7XG4gICAgICAgICAgICAgICAgaWYgKGluaXRDYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBpbml0Q2FsbGJhY2soc29ja2V0KTtcbiAgICAgICAgICAgICAgICAgICAgaW5pdENhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgb25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvL3Byb2J1ZmYgZGVjb2RlXG4gICAgICAgICAgICAgICAgdmFyIG1zZyA9IE1lc3NhZ2UuZGVjb2RlKGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1zZy5pZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnLnJvdXRlID0gcm91dGVNYXBbbXNnLmlkXTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHJvdXRlTWFwW21zZy5pZF07XG4gICAgICAgICAgICAgICAgICAgIGlmICghbXNnLnJvdXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtc2cuYm9keSA9IGRlQ29tcG9zZShtc2cpO1xuXG4gICAgICAgICAgICAgICAgcHJvY2Vzc01lc3NhZ2UocG9tZWxvLCBtc2cpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIG9uS2ljayA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSBKU09OLnBhcnNlKFByb3RvY29sLnN0cmRlY29kZShkYXRhKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVhc29uID0gXCJraWNrXCI7XG4gICAgICAgICAgICAgICAgaWYgKGluZm8uaGFzT3duUHJvcGVydHkoXCJyZWFzb25cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhc29uID0gaW5mb1tcInJlYXNvblwiXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwb21lbG8uZW1pdCgnb25LaWNrJywgcmVhc29uKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGhhbmRsZXJzW1BhY2thZ2UuVFlQRV9IQU5EU0hBS0VdID0gaGFuZHNoYWtlO1xuICAgICAgICAgICAgaGFuZGxlcnNbUGFja2FnZS5UWVBFX0hFQVJUQkVBVF0gPSBoZWFydGJlYXQ7XG4gICAgICAgICAgICBoYW5kbGVyc1tQYWNrYWdlLlRZUEVfREFUQV0gPSBvbkRhdGE7XG4gICAgICAgICAgICBoYW5kbGVyc1tQYWNrYWdlLlRZUEVfS0lDS10gPSBvbktpY2s7XG5cbiAgICAgICAgICAgIHZhciBwcm9jZXNzUGFja2FnZSA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyc1ttc2cudHlwZV0obXNnLmJvZHkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHByb2Nlc3NNZXNzYWdlID0gZnVuY3Rpb24gKHBvbWVsbywgbXNnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFtc2cuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VydmVyIHB1c2ggbWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICBwb21lbG8uZW1pdChtc2cucm91dGUsIG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL2lmIGhhdmUgYSBpZCB0aGVuIGZpbmQgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIHdpdGggdGhlIHJlcXVlc3RcbiAgICAgICAgICAgICAgICB2YXIgY2IgPSBjYWxsYmFja3NbbXNnLmlkXTtcblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBjYWxsYmFja3NbbXNnLmlkXTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYihtc2cpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBwcm9jZXNzTWVzc2FnZUJhdGNoID0gZnVuY3Rpb24gKHBvbWVsbywgbXNncykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbXNncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc01lc3NhZ2UocG9tZWxvLCBtc2dzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgZGVDb21wb3NlID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIHZhciBwcm90b3MgPSAhIXBvbWVsby5kYXRhLnByb3RvcyA/IHBvbWVsby5kYXRhLnByb3Rvcy5zZXJ2ZXIgOiB7fTtcbiAgICAgICAgICAgICAgICB2YXIgYWJicnMgPSBwb21lbG8uZGF0YS5hYmJycztcbiAgICAgICAgICAgICAgICB2YXIgcm91dGUgPSBtc2cucm91dGU7XG5cbiAgICAgICAgICAgICAgICAvL0RlY29tcG9zZSByb3V0ZSBmcm9tIGRpY3RcbiAgICAgICAgICAgICAgICBpZiAobXNnLmNvbXByZXNzUm91dGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhYmJyc1tyb3V0ZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJvdXRlID0gbXNnLnJvdXRlID0gYWJicnNbcm91dGVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoISFwcm90b3Nbcm91dGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcm90b2J1Zi5kZWNvZGUocm91dGUsIG1zZy5ib2R5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShQcm90b2NvbC5zdHJkZWNvZGUobXNnLmJvZHkpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbXNnO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGhhbmRzaGFrZUluaXQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN5cyAmJiBkYXRhLnN5cy5oZWFydGJlYXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhcnRiZWF0SW50ZXJ2YWwgPSBkYXRhLnN5cy5oZWFydGJlYXQgKiAxMDAwOyAgIC8vIGhlYXJ0YmVhdCBpbnRlcnZhbFxuICAgICAgICAgICAgICAgICAgICBoZWFydGJlYXRUaW1lb3V0ID0gaGVhcnRiZWF0SW50ZXJ2YWwgKiAyOyAgICAgICAgLy8gbWF4IGhlYXJ0YmVhdCB0aW1lb3V0XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhcnRiZWF0SW50ZXJ2YWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICBoZWFydGJlYXRUaW1lb3V0ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbml0RGF0YShkYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaGFuZHNoYWtlQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZHNoYWtlQ2FsbGJhY2soZGF0YS51c2VyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvL0luaXRpbGl6ZSBkYXRhIHVzZWQgaW4gcG9tZWxvIGNsaWVudFxuICAgICAgICAgICAgdmFyIGluaXREYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEgfHwgIWRhdGEuc3lzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9tZWxvLmRhdGEgPSBwb21lbG8uZGF0YSB8fCB7fTtcbiAgICAgICAgICAgICAgICB2YXIgZGljdCA9IGRhdGEuc3lzLmRpY3Q7XG4gICAgICAgICAgICAgICAgdmFyIHByb3RvcyA9IGRhdGEuc3lzLnByb3RvcztcblxuICAgICAgICAgICAgICAgIC8vSW5pdCBjb21wcmVzcyBkaWN0XG4gICAgICAgICAgICAgICAgaWYgKGRpY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9tZWxvLmRhdGEuZGljdCA9IGRpY3Q7XG4gICAgICAgICAgICAgICAgICAgIHBvbWVsby5kYXRhLmFiYnJzID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcm91dGUgaW4gZGljdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9tZWxvLmRhdGEuYWJicnNbZGljdFtyb3V0ZV1dID0gcm91dGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL0luaXQgcHJvdG9idWYgcHJvdG9zXG4gICAgICAgICAgICAgICAgaWYgKHByb3Rvcykge1xuICAgICAgICAgICAgICAgICAgICBwb21lbG8uZGF0YS5wcm90b3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2ZXI6IHByb3Rvcy5zZXJ2ZXIgfHwge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGllbnQ6IHByb3Rvcy5jbGllbnQgfHwge31cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEhcHJvdG9idWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3RvYnVmLmluaXQoe2VuY29kZXJQcm90b3M6IHByb3Rvcy5jbGllbnQsIGRlY29kZXJQcm90b3M6IHByb3Rvcy5zZXJ2ZXJ9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gcG9tZWxvO1xuICAgICAgICB9KSh0aGlzKTtcblxuICAgIH0pO1xuXG4gICAgcG9tZWxvQnVpbGRPYmoucmVnaXN0ZXIoXCJib290L2luZGV4LmpzXCIsIGZ1bmN0aW9uIChleHBvcnRzLCByZXF1aXJlUG9tZWxvLCBtb2R1bGUpIHtcbiAgICAgICAgdmFyIEVtaXR0ZXIgPSByZXF1aXJlUG9tZWxvKCdlbWl0dGVyJyk7XG4gICAgICAgIHRoaXMuRXZlbnRFbWl0dGVyID0gT2JqZWN0LmNyZWF0ZShFbWl0dGVyKTtcblxuICAgICAgICB2YXIgcHJvdG9jb2wgPSByZXF1aXJlUG9tZWxvKCdwb21lbG8tcHJvdG9jb2wnKTtcbiAgICAgICAgdGhpcy5Qcm90b2NvbCA9IHByb3RvY29sO1xuXG4gICAgICAgIHZhciBwcm90b2J1ZiA9IHJlcXVpcmVQb21lbG8oJ3BvbWVsby1wcm90b2J1ZicpO1xuICAgICAgICB0aGlzLnByb3RvYnVmID0gcHJvdG9idWY7XG5cbiAgICAgICAgdmFyIHBvbWVsbyA9IHJlcXVpcmVQb21lbG8oJ3BvbWVsby1qc2NsaWVudC13ZWJzb2NrZXQnKTtcbiAgICAgICAgdGhpcy5wb21lbG8gPSBwb21lbG87XG5cbiAgICB9KTtcbiAgICBwb21lbG9CdWlsZE9iai5hbGlhcyhcImJvb3QvaW5kZXguanNcIiwgXCJwb21lbG8tY2xpZW50L2RlcHMvYm9vdC9pbmRleC5qc1wiKTtcbiAgICBwb21lbG9CdWlsZE9iai5hbGlhcyhcImNvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzXCIsIFwiYm9vdC9kZXBzL2VtaXR0ZXIvaW5kZXguanNcIik7XG4gICAgcG9tZWxvQnVpbGRPYmouYWxpYXMoXCJjb21wb25lbnQtaW5kZXhvZi9pbmRleC5qc1wiLCBcImNvbXBvbmVudC1lbWl0dGVyL2RlcHMvaW5kZXhvZi9pbmRleC5qc1wiKTtcblxuICAgIHBvbWVsb0J1aWxkT2JqLmFsaWFzKFwiTmV0RWFzZS1wb21lbG8tcHJvdG9jb2wvbGliL3Byb3RvY29sLmpzXCIsIFwiYm9vdC9kZXBzL3BvbWVsby1wcm90b2NvbC9saWIvcHJvdG9jb2wuanNcIik7XG4gICAgcG9tZWxvQnVpbGRPYmouYWxpYXMoXCJOZXRFYXNlLXBvbWVsby1wcm90b2NvbC9saWIvcHJvdG9jb2wuanNcIiwgXCJib290L2RlcHMvcG9tZWxvLXByb3RvY29sL2luZGV4LmpzXCIpO1xuICAgIHBvbWVsb0J1aWxkT2JqLmFsaWFzKFwiTmV0RWFzZS1wb21lbG8tcHJvdG9jb2wvbGliL3Byb3RvY29sLmpzXCIsIFwiTmV0RWFzZS1wb21lbG8tcHJvdG9jb2wvaW5kZXguanNcIik7XG5cbiAgICBwb21lbG9CdWlsZE9iai5hbGlhcyhcInBvbWVsb25vZGUtcG9tZWxvLXByb3RvYnVmL2xpYi9jbGllbnQvcHJvdG9idWYuanNcIiwgXCJib290L2RlcHMvcG9tZWxvLXByb3RvYnVmL2xpYi9jbGllbnQvcHJvdG9idWYuanNcIik7XG4gICAgcG9tZWxvQnVpbGRPYmouYWxpYXMoXCJwb21lbG9ub2RlLXBvbWVsby1wcm90b2J1Zi9saWIvY2xpZW50L3Byb3RvYnVmLmpzXCIsIFwiYm9vdC9kZXBzL3BvbWVsby1wcm90b2J1Zi9pbmRleC5qc1wiKTtcbiAgICBwb21lbG9CdWlsZE9iai5hbGlhcyhcInBvbWVsb25vZGUtcG9tZWxvLXByb3RvYnVmL2xpYi9jbGllbnQvcHJvdG9idWYuanNcIiwgXCJwb21lbG9ub2RlLXBvbWVsby1wcm90b2J1Zi9pbmRleC5qc1wiKTtcblxuICAgIHBvbWVsb0J1aWxkT2JqLmFsaWFzKFwicG9tZWxvbm9kZS1wb21lbG8tanNjbGllbnQtd2Vic29ja2V0L2xpYi9wb21lbG8tY2xpZW50LmpzXCIsIFwiYm9vdC9kZXBzL3BvbWVsby1qc2NsaWVudC13ZWJzb2NrZXQvbGliL3BvbWVsby1jbGllbnQuanNcIik7XG4gICAgcG9tZWxvQnVpbGRPYmouYWxpYXMoXCJwb21lbG9ub2RlLXBvbWVsby1qc2NsaWVudC13ZWJzb2NrZXQvbGliL3BvbWVsby1jbGllbnQuanNcIiwgXCJib290L2RlcHMvcG9tZWxvLWpzY2xpZW50LXdlYnNvY2tldC9pbmRleC5qc1wiKTtcbiAgICBwb21lbG9CdWlsZE9iai5hbGlhcyhcInBvbWVsb25vZGUtcG9tZWxvLWpzY2xpZW50LXdlYnNvY2tldC9saWIvcG9tZWxvLWNsaWVudC5qc1wiLCBcInBvbWVsb25vZGUtcG9tZWxvLWpzY2xpZW50LXdlYnNvY2tldC9pbmRleC5qc1wiKTtcblxuICAgIHBvbWVsb0J1aWxkT2JqLnJlcXVpcmVQb21lbG8oXCJib290XCIpO1xuXG4gICAgcmV0dXJuIHBvbWVsb0J1aWxkT2JqO1xufTtcblxud2luZG93LnBvbWVsb0J1aWxkID0gcG9tZWxvQnVpbGQ7XG4iXX0=