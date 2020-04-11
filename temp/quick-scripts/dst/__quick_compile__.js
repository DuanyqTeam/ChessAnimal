
(function () {
var scripts = [{"deps":{"./assets/common/script/gameManager":1,"./assets/migration/use_v2.0.x_cc.Toggle_event":2,"./assets/common/script/uiGamePanel":3,"./assets/common/script/chessBoardSubPanel":4,"./assets/common/script/basic/DataFunc":5,"./assets/basic/script/rankUserInfo":6,"./assets/common/lobby/resultPlayerIcon":7,"./assets/common/script/basic/messenger/eventListener":8,"./assets/common/script/basic/rankNetwork/network":9,"./assets/common/script/uiRankPanel":10,"./assets/common/script/uiTip":11,"./assets/common/script/nextStep":12,"./assets/common/script/uiRoom":13,"./assets/common/script/uiMatching1v1":14,"./assets/common/script/uiMatching1v1Ver":15,"./assets/common/script/uiVsResult":16,"./assets/common/script/updateScore":17,"./assets/common/script/uiMatching2v2Ver":18,"./assets/common/script/uiMatching2v2":19,"./assets/common/script/uiLobbyPanel":20,"./assets/common/script/uiExit":21,"./assets/common/script/uiMaskLayout":22,"./assets/common/script/uiResultPanel":23,"./assets/common/script/player":24,"./assets/common/script/user":25,"./assets/common/script/uiRoomList":26,"./assets/common/script/uiRoundTip":27,"./assets/common/script/uiLogin":28,"./assets/common/lobby/playerIcon":29,"./assets/common/script/uiCreateRoom":30,"./assets/common/script/uiMatching":31,"./assets/common/lobby/roomInfo":32,"./assets/common/script/basic/uiPanel":33,"./assets/common/lobby/roomUserInfo":34,"./assets/common/script/basic/Globals":35,"./assets/common/script/basic/MatchvsEngine":36,"./assets/common/script/basic/pool":37,"./assets/common/script/uiResult":38,"./assets/common/script/basic/Matchvs":39,"./assets/common/script/basic/messenger/clientEvent":40,"./assets/common/script/basic/UIFunc":41,"./assets/common/script/basic/Glb":42,"./assets/common/script/basic/rankNetwork/msgType":43,"./assets/common/script/chess":44,"./assets/common/script/basic/rankNetwork/pomeloBuild":45,"./plugin-matchvs-js/matchvs.all":46},"path":"preview-scripts/__qc_index__.js"},{"deps":{"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/gameManager.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiGamePanel.js"},{"deps":{"Glb":42,"pool":37},"path":"preview-scripts/assets/common/script/chessBoardSubPanel.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/DataFunc.js"},{"deps":{},"path":"preview-scripts/assets/basic/script/rankUserInfo.js"},{"deps":{},"path":"preview-scripts/assets/common/lobby/resultPlayerIcon.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/messenger/eventListener.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/rankNetwork/network.js"},{"deps":{"uiPanel":33},"path":"preview-scripts/assets/common/script/uiRankPanel.js"},{"deps":{"uiPanel":33},"path":"preview-scripts/assets/common/script/uiTip.js"},{"deps":{"Glb":42},"path":"preview-scripts/assets/common/script/nextStep.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiRoom.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiMatching1v1.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiMatching1v1Ver.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiVsResult.js"},{"deps":{},"path":"preview-scripts/assets/common/script/updateScore.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiMatching2v2Ver.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiMatching2v2.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiLobbyPanel.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiExit.js"},{"deps":{"uiPanel":33},"path":"preview-scripts/assets/common/script/uiMaskLayout.js"},{"deps":{"uiPanel":33},"path":"preview-scripts/assets/common/script/uiResultPanel.js"},{"deps":{},"path":"preview-scripts/assets/common/script/player.js"},{"deps":{"Glb":42},"path":"preview-scripts/assets/common/script/user.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiRoomList.js"},{"deps":{"uiPanel":33,"Glb":42},"path":"preview-scripts/assets/common/script/uiRoundTip.js"},{"deps":{"uiPanel":33},"path":"preview-scripts/assets/common/script/uiLogin.js"},{"deps":{},"path":"preview-scripts/assets/common/lobby/playerIcon.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiCreateRoom.js"},{"deps":{"uiPanel":33,"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/script/uiMatching.js"},{"deps":{"Matchvs":39},"path":"preview-scripts/assets/common/lobby/roomInfo.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/uiPanel.js"},{"deps":{"Matchvs":39,"Glb":42},"path":"preview-scripts/assets/common/lobby/roomUserInfo.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/Globals.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/MatchvsEngine.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/pool.js"},{"deps":{"uiPanel":33},"path":"preview-scripts/assets/common/script/uiResult.js"},{"deps":{"matchvs.all":46,"MatchvsEngine":36},"path":"preview-scripts/assets/common/script/basic/Matchvs.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/messenger/clientEvent.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/UIFunc.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/Glb.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/rankNetwork/msgType.js"},{"deps":{"Glb":42},"path":"preview-scripts/assets/common/script/chess.js"},{"deps":{},"path":"preview-scripts/assets/common/script/basic/rankNetwork/pomeloBuild.js"},{"deps":{},"path":"preview-scripts/plugin-matchvs-js/matchvs.all.js"}];
var entries = ["preview-scripts/__qc_index__.js"];

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            requestScript = scripts[ m.deps[request] ];
        }
        
        path = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                path = name2path[request];
            }

            if (!path) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            path = formatPath(requestScript.path);
        }

        m = modules[path];
        
        if (!m) {
            console.warn('Can not find module for path : ' + path);
            return null;
        }

        if (!m.module && m.func) {
            m.func();
        }

        if (!m.module) {
            console.warn('Can not find module.module for path : ' + path);
            return null;
        }

        return m.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;
        
            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
        
            return path;
        });

        loadScripts(srcs, function () {
            self.run();
            cb();
        });
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    