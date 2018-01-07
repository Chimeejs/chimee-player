
/** ChimeePlayer
 * chimee-player v1.1.10
 * (c) 2017 huzunjie
 * Released under MIT
 */

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import Chimee from 'chimee';
import { isArray, isObject } from 'chimee-helper';
import chimeeControl from 'chimee-plugin-controlbar';
import popupFactory from 'chimee-plugin-popup';
import chimeeContextmenu from 'chimee-plugin-contextmenu';
import chimeeLog from 'chimee-plugin-log';
import chimeeCenterState from 'chimee-plugin-center-state';
import chimeeKernelHls from 'chimee-kernel-hls';
import chimeeKernelFlv from 'chimee-kernel-flv';

__$styleInject(".chimee-container container{position:relative;display:block;width:100%;height:100%}.chimee-container video{display:block;width:100%;height:100%;background:#000;outline:0}.chimee-container video:focus{outline:0}.chimee-container chimee-center-state-loading{box-sizing:initial}", undefined);

//import 'babel-polyfill';

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
    if (!isObject(config.preset)) {
      config.preset = {
        hls: chimeeKernelHls,
        flv: chimeeKernelFlv
      };
    }

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
