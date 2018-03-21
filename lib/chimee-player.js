
/** chimeePlayer
 * chimee-player v1.4.1
 * (c) 2017-2018 huzunjie
 * Released under MIT
 */

'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Chimee = _interopDefault(require('chimee'));
var chimeeHelper = require('chimee-helper');
var chimeeControl = _interopDefault(require('chimee-plugin-controlbar/src'));
var popupFactory = _interopDefault(require('chimee-plugin-popup'));
var chimeeContextmenu = _interopDefault(require('chimee-plugin-contextmenu/src'));
var chimeeLog = _interopDefault(require('chimee-plugin-log'));
var chimeeCenterState = _interopDefault(require('chimee-plugin-center-state/src'));
var chimeeKernelHls = _interopDefault(require('chimee-kernel-hls'));
var chimeeKernelFlv = _interopDefault(require('chimee-kernel-flv'));

// import 'babel-polyfill';

Chimee.install(chimeeControl);
Chimee.install(chimeeCenterState);
Chimee.install(chimeeContextmenu);
Chimee.install(chimeeLog);

class ChimeePlayer extends Chimee {
  constructor(config) {
    if (!chimeeHelper.isObject(config)) throw new TypeError('You must pass an Object as config when you new ChimeePlayer');

    // 添加UI插件
    config.plugin = config.plugin || config.plugins;
    if (!chimeeHelper.isArray(config.plugin)) config.plugin = [];
    const innerPlugins = [
      chimeeControl.name,
      chimeeCenterState.name,
      chimeeContextmenu.name,
      chimeeLog.name,
    ];
    const configPluginNames = config.plugin.map(item => (chimeeHelper.isObject(item) ? item.name : item));
    innerPlugins.forEach(name => {
      if (configPluginNames.indexOf(name) > -1) return;
      config.plugin.push(name);
    });

    // 添加解码器
    config.kernels = chimeeHelper.deepAssign(config.kernels || {}, {
      hls: {
        handler: chimeeKernelHls,
      },
      flv: {
        handler: chimeeKernelFlv,
      },
    });

    super(config);

    // 右键菜单的播放暂停
    this.on('play', () => this.chimeeContextmenu.updatemenu([{ text: '暂停', action: 'pause' }]));
    this.on('pause', () => this.chimeeContextmenu.updatemenu([{ text: '播放', action: 'play' }]));
  }
}
// 暴露浮层工厂方法
ChimeePlayer.popupFactory = popupFactory;

module.exports = ChimeePlayer;
