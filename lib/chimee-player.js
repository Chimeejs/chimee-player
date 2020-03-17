
/** chimeePlayer
 * chimee-player v1.4.9
 * (c) 2017-2020 huzunjie
 * Released under MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _classCallCheck = _interopDefault(require('../node_modules/@babel/runtime/helpers/classCallCheck.js'));
var _possibleConstructorReturn = _interopDefault(require('../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js'));
var _getPrototypeOf = _interopDefault(require('../node_modules/@babel/runtime/helpers/getPrototypeOf.js'));
var _inherits = _interopDefault(require('../node_modules/@babel/runtime/helpers/inherits.js'));
var Chimee = _interopDefault(require('chimee'));
var chimeeHelper = require('chimee-helper');
var chimeeControl = _interopDefault(require('chimee-plugin-controlbar/src'));
var popupFactory = _interopDefault(require('chimee-plugin-popup/src'));
var chimeeContextmenu = _interopDefault(require('chimee-plugin-contextmenu/src'));
var chimeeLog = _interopDefault(require('chimee-plugin-log'));
var chimeeCenterState = _interopDefault(require('chimee-plugin-center-state/src'));
var chimeeKernelHls = _interopDefault(require('chimee-kernel-hls'));
var chimeeKernelFlv = _interopDefault(require('chimee-kernel-flv'));

Chimee.install(chimeeControl);
Chimee.install(chimeeCenterState);
Chimee.install(chimeeContextmenu);
Chimee.install(chimeeLog);

var ChimeePlayer = /*#__PURE__*/function (_Chimee) {
  _inherits(ChimeePlayer, _Chimee);

  function ChimeePlayer(config) {
    var _this;

    _classCallCheck(this, ChimeePlayer);

    if (!chimeeHelper.isObject(config)) throw new TypeError('You must pass an Object as config when you new ChimeePlayer'); // 添加UI插件

    config.plugin = config.plugin || config.plugins;
    if (!chimeeHelper.isArray(config.plugin)) config.plugin = [];
    var innerPlugins = [chimeeControl.name, chimeeCenterState.name, chimeeContextmenu.name, chimeeLog.name];
    var configPluginNames = config.plugin.map(function (item) {
      return chimeeHelper.isObject(item) ? item.name : item;
    });
    innerPlugins.forEach(function (name) {
      if (configPluginNames.indexOf(name) > -1) return;
      config.plugin.push(name);
    }); // 添加解码器

    config.kernels = chimeeHelper.deepAssign(config.kernels || {}, {
      hls: {
        handler: chimeeKernelHls
      },
      flv: {
        handler: chimeeKernelFlv
      }
    });
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChimeePlayer).call(this, config)); // 右键菜单的播放暂停

    _this.on('play', function () {
      return _this.chimeeContextmenu.updatemenu([{
        text: '暂停',
        action: 'pause'
      }]);
    });

    _this.on('pause', function () {
      return _this.chimeeContextmenu.updatemenu([{
        text: '播放',
        action: 'play'
      }]);
    });

    return _this;
  }

  return ChimeePlayer;
}(Chimee); // 暴露浮层工厂方法


ChimeePlayer.popupFactory = popupFactory;

module.exports = ChimeePlayer;
