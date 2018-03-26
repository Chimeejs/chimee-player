
/** chimeePlayer
 * chimee-player v1.4.2
 * (c) 2017-2018 huzunjie
 * Released under MIT
 */

import _Object$getPrototypeOf from '../node_modules/babel-runtime/core-js/object/get-prototype-of.js';
import _classCallCheck from '../node_modules/babel-runtime/helpers/classCallCheck.js';
import _possibleConstructorReturn from '../node_modules/babel-runtime/helpers/possibleConstructorReturn.js';
import _inherits from '../node_modules/babel-runtime/helpers/inherits.js';
import Chimee from 'chimee';
import { isObject, isArray, deepAssign } from 'chimee-helper';
import chimeeControl from 'chimee-plugin-controlbar/src';
import popupFactory from 'chimee-plugin-popup/src';
import chimeeContextmenu from 'chimee-plugin-contextmenu/src';
import chimeeLog from 'chimee-plugin-log';
import chimeeCenterState from 'chimee-plugin-center-state/src';
import chimeeKernelHls from 'chimee-kernel-hls';
import chimeeKernelFlv from 'chimee-kernel-flv';

// import 'babel-polyfill';

Chimee.install(chimeeControl);
Chimee.install(chimeeCenterState);
Chimee.install(chimeeContextmenu);
Chimee.install(chimeeLog);

var ChimeePlayer = function (_Chimee) {
  _inherits(ChimeePlayer, _Chimee);

  function ChimeePlayer(config) {
    _classCallCheck(this, ChimeePlayer);

    if (!isObject(config)) throw new TypeError('You must pass an Object as config when you new ChimeePlayer');

    // 添加UI插件
    config.plugin = config.plugin || config.plugins;
    if (!isArray(config.plugin)) config.plugin = [];
    var innerPlugins = [chimeeControl.name, chimeeCenterState.name, chimeeContextmenu.name, chimeeLog.name];
    var configPluginNames = config.plugin.map(function (item) {
      return isObject(item) ? item.name : item;
    });
    innerPlugins.forEach(function (name) {
      if (configPluginNames.indexOf(name) > -1) return;
      config.plugin.push(name);
    });

    // 添加解码器
    config.kernels = deepAssign(config.kernels || {}, {
      hls: {
        handler: chimeeKernelHls
      },
      flv: {
        handler: chimeeKernelFlv
      }
    });

    // 右键菜单的播放暂停
    var _this = _possibleConstructorReturn(this, (ChimeePlayer.__proto__ || _Object$getPrototypeOf(ChimeePlayer)).call(this, config));

    _this.on('play', function () {
      return _this.chimeeContextmenu.updatemenu([{ text: '暂停', action: 'pause' }]);
    });
    _this.on('pause', function () {
      return _this.chimeeContextmenu.updatemenu([{ text: '播放', action: 'play' }]);
    });
    return _this;
  }

  return ChimeePlayer;
}(Chimee);
// 暴露浮层工厂方法


ChimeePlayer.popupFactory = popupFactory;

export default ChimeePlayer;
