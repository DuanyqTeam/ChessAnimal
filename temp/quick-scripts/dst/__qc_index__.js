
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}require('./assets/common/lobby/roomUserInfo');
require('./assets/common/script/chess');
require('./assets/common/script/uiMatching');
require('./assets/common/script/basic/Matchvs');
require('./assets/common/script/nextStep');
require('./assets/common/script/uiRankPanel');
require('./assets/common/script/basic/uiPanel');
require('./assets/common/script/basic/messenger/eventListener');
require('./assets/common/lobby/resultPlayerIcon');
require('./assets/common/script/uiGamePanel');
require('./assets/common/script/basic/rankNetwork/network');
require('./assets/common/script/basic/rankNetwork/msgType');
require('./assets/migration/use_v2.0.x_cc.Toggle_event');
require('./assets/common/script/uiMatching1v1');
require('./assets/common/script/basic/Globals');
require('./assets/common/script/uiMatching1v1Ver');
require('./assets/common/script/gameManager');
require('./assets/common/script/uiRoom');
require('./assets/common/script/basic/messenger/clientEvent');
require('./assets/common/script/uiTip');
require('./assets/common/lobby/playerIcon');
require('./assets/common/script/updateScore');
require('./assets/common/script/chessBoardSubPanel');
require('./assets/common/script/uiVsResult');
require('./assets/common/script/basic/MatchvsEngine');
require('./assets/common/script/uiLobbyPanel');
require('./assets/common/script/uiMatching2v2Ver');
require('./assets/common/script/uiExit');
require('./assets/common/script/uiMaskLayout');
require('./assets/common/script/uiMatching2v2');
require('./assets/common/script/uiResultPanel');
require('./assets/common/script/basic/DataFunc');
require('./assets/common/script/uiRoomList');
require('./assets/common/script/player');
require('./assets/common/lobby/roomInfo');
require('./assets/common/script/user');
require('./assets/common/script/basic/Glb');
require('./assets/common/script/uiRoundTip');
require('./assets/basic/script/rankUserInfo');
require('./assets/common/script/basic/pool');
require('./assets/common/script/uiCreateRoom');
require('./assets/common/script/basic/UIFunc');
require('./assets/common/script/uiResult');
require('./plugin-matchvs-js/matchvs.all');
require('./assets/common/script/uiLogin');
require('./assets/common/script/basic/rankNetwork/pomeloBuild');

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