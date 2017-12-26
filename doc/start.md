# 快速开始

## 导语
鉴于目前[ H5-Video 在 Web 生态环境中存在较大差异化的表现](http://chimee.org/docs/chimee_player_preface.html)，尤其[移动端更是存在着太多不得不“case by case”的怪异状况](http://chimee.org/docs/chimee_mobile_plugin_dev.html)的问题；

另外，也为了满足不同业务场景下各种灵活多变的潜在需求，使用[基于组件化框架设计的 Chimee](http://chimee.org/docs/why_chimee_is_a_frame.html)，可以从不同层次满足业务接入需求。

## 初识Chimee
基于  [Chimee](http://chimee.org/docs/chimee_readme.html)  统一调度处理的[属性方法](http://chimee.org/docs/chimee_api.html#video%E5%85%83%E7%B4%A0%E7%9B%B8%E5%85%B3%E6%96%B9%E6%B3%95)、[属性读写API](http://chimee.org/docs/chimee_api.html#video%E5%85%83%E7%B4%A0%E7%9B%B8%E5%85%B3%E5%B1%9E%E6%80%A7)，能解决大部分的兼容性、差异化问题，实现[对HLS与FLV编解码支持](http://chimee.org/docs/chimee_api.html#\*-kernels)，且[支持直播点播两种模式](http://chimee.org/docs/chimee_api.html#islive)。

基于 Chimee 可以实现原生Video所不能支持的[媒体源热切换](http://chimee.org/docs/chimee_api.html#\*-$silentload)、[全屏操作与监听](http://chimee.org/docs/chimee_api.html#%E5%85%A8%E5%B1%8F%E7%9B%B8%E5%85%B3%E6%96%B9%E6%B3%95)...

基于 Chimee 的[事件监听](http://chimee.org/docs/chimee_api.html#%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC%E7%9B%B8%E5%85%B3%E6%96%B9%E6%B3%95)与[数据状态监听](http://chimee.org/docs/chimee_api.html#%E6%95%B0%E6%8D%AE%E7%9B%91%E5%90%AC%E7%9B%B8%E5%85%B3%E6%96%B9%E6%B3%95)，可以很方便的感知状态的变化、[进行事件挂起拦截](http://chimee.org/docs/why_chimee_is_a_frame.html#%E4%BA%8B%E4%BB%B6%E6%8C%82%E8%B5%B7)等操作。


## 选择合适的接入方案

不得不再次强调：[Chimee 是一套组件化视频播放器框架](http://chimee.org/docs/why_chimee_is_a_frame.html#%E4%BA%8B%E4%BB%B6%E6%8C%82%E8%B5%B7)，基于组件化插件的[应用](http://chimee.org/docs/chimee_api.html#plugin)与[定制化组件开发](http://chimee.org/docs/chimee_plugin_api.html)，可以很方便的达成[更有特色且更契合业务需求的功能开发](http://chimee.org/docs/how_to_write_a_popup_plugin.html)；但前提是您必须有足够的好奇心和精力、能够预先充分[了解 Chimee](http://chimee.org/docs/chimee_readme.html) 和掌握业务需求。

如果精力不是很充足，那么可以结合目标业务场景，使用官方提供的基于 Chimee 打包后的 [适合PC端的Chimee-Player](http://chimee.org/docs/chimee_player.html)或是[适合移动端的Chimee-Mobile-Player](http://chimee.org/docs/chimee_mobile_player.html)。

## 几种方案的用法

不管是基于[Chimee](http://chimee.org/docs/chimee_readme.html)、还是[Chimee-Player](http://chimee.org/docs/chimee_player.html)、亦或者是[Chimee-Mobile-Player](http://chimee.org/docs/chimee_mobile_player.html)，官方都提供了[多种不同的构建输出版本](http://chimee.org/docs/chimee_readme.html#%E4%B8%8D%E5%90%8C%E7%9A%84%E6%9E%84%E5%BB%BA%E7%89%88%E6%9C%AC)来满足不同业务应用场景的开发需求。

可以选择基于 `npm install 模块名称 --save`在自有构建环境进行依赖安装，也可以直接使用`<script src='模块构建结果JS URL'></script>`引入到业务页面中。

下面具体分别来看看：

### PC端 Chimee-Player解决方案

1 . 引用[公共CDN上的JS](https://cdn.baomitu.com/chimee-player)，或者在[lib目录下](https://github.com/Chimeejs/chimee-player/tree/master/lib)选择适合的构建结果放入业务目录中，直接引用JS:

```html
<!-- 注意：这里的 CDN 资源链接可能不是最新版，具体可访问：https://cdn.baomitu.com/chimee-player -->
<script src="http://lib.baomitu.com/chimee-player/1.1.9/chimee-player.browser.js"></script>
<script>
new ChimeePlayer({
  wrapper: '#wrapper',  // video dom容器
  src: 'http://chimee.org/vod/1.mp4',
  controls: true
});
</script>
```

2 . 项目是基于nodejs环境构建的话，可以先在项目目录下执行命令安装依赖包：

```
npm install chimee-player --save
```
然后再按照自己的使用习惯，将依赖 import 或 require 到业务代码中使用：

```
import ChimeePlayer from 'chimee-player';

new ChimeePlayer({
  wrapper: '#wrapper',  // video dom容器
  src: 'http://chimee.org/vod/1.mp4',
  controls: true
});

// HLS 直播
new ChimeePlayer({
  wrapper: '#wrapper',
  src: 'http://chimee.org/xxx/fff.m3u8',
  box: 'hls',
  isLive: true,
  autoplay: true,
  controls: true
});

// FLV 直播
new ChimeePlayer({
  wrapper: '#wrapper',
  src: 'http://chimee.org/xxx/fff.flv',
  box: 'flv',
  isLive: true,
  autoplay: true,
  controls: true
});

```
更详细的说明及文档请参考：http://chimee.org/docs/chimee_player.html。

### 移动端 Chimee-Mobile-Player解决方案

1 . 在[lib目录下](https://github.com/Chimeejs/chimee-mobile-player/tree/master/lib)选择适合的构建结果放入业务目录或托管到CDN服务上，直接引用JS:

```html
<script src="..yourURL../chimee-mobile-player.browser.js"></script>
<script>
new ChimeeMobilePlayer({
  wrapper: '#wrapper',  // video dom容器
  src: 'http://chimee.org/vod/1.mp4',
  autoplay: true,
  controls: true,
  playsInline: true,
  preload: true,
  x5VideoPlayerFullscreen: true,
  x5VideoOrientation: true,
  xWebkitAirplay: true,
  muted: true
});
</script>
```

2 . 项目是基于nodejs环境构建的话，可以先在项目目录下执行命令安装依赖包：

```
npm install chimee-mobile-player --save
```
然后再按照自己的使用习惯，将依赖 import 或 require 到业务代码中使用：

```
import ChimeePlayer from 'chimee-mobile-player';

new ChimeeMobilePlayer({
  wrapper: '#wrapper',  // video dom容器
  src: 'http://chimee.org/vod/1.mp4',
  autoplay: true,
  controls: true,
  playsInline: true,
  preload: true,
  x5VideoPlayerFullscreen: true,
  x5VideoOrientation: true,
  xWebkitAirplay: true,
  muted: true
});

// HLS 直播（移动端HLS可以用系统默认解码器，所以这里不需要像PC端那样设置box）
new ChimeeMobilePlayer({
  wrapper: '#wrapper',
  src: 'http://chimee.org/xxx/fff.m3u8',
  isLive: true,
  autoplay: true,
  controls: true,
  playsInline: true,
  preload: true,
  x5VideoPlayerFullscreen: true,
  x5VideoOrientation: true,
  xWebkitAirplay: true,
  muted: true
});
```
更详细的说明及文档请参考：http://chimee.org/docs/chimee_mobile_player.html。

另外如果您有移动端特殊需求，可以[到这里进行需求登记](https://github.com/Chimeejs/chimee-plugin-controlbar/issues/6)；如果有遇到特定场景怪异表现，可以[到这里提交异常兼容问题](https://github.com/Chimeejs/chimee-plugin-mobile-controlbar/issues/2)，并关注后续版本更新。

### 基于 Chimee 定制化开发方案

1 . 在[lib目录下](https://github.com/Chimeejs/chimee/tree/master/lib)选择适合的构建结果放入业务目录或托管到CDN服务上，直接引用JS:

```html
<script src="..yourURL../index.browser.js"></script>
<script>
// 编写自己的控制插件，并使用Chimee
const Chimee = window.Chimee;
const plugin = {
  // 插件名为 controller
  name: 'controller',
  // 插件实体为按钮
  el: '<button>play</button>',
  data: {
    text: 'play',
  },
  methods: {
    changeVideoStatus() {
      this[this.text]();
    },
    changeButtonText(text) {
      this.text = text;
      this.$dom.innerText = this.text;
    },
  },
  // 在插件创建的阶段，我们为插件绑定事件。
  create() {
    this.$dom.addEventListener('click', this.changeVideoStatus);
    this.$watch('controls', function(newVal, oldVal) {
      console.log(newVal, oldVal);
    }, { diff: false });
    console.log(this.$plugins);
  },
  // 插件会在播放暂停操作发生后改变自己的文案及相应的行为
  events: {
    pause() {
      this.changeButtonText('play');
    },
    play() {
      this.changeButtonText('pause');
    },
    c_contextmenu(evt) {
      console.log(evt);
    },
    click(evt) {
      console.log(evt);
    },
  },
};
Chimee.install(plugin);
const player = new Chimee({
  // 播放地址
  src: 'http://chimee.org/vod/1.mp4',
  // dom容器
  wrapper: '#wrapper',
  plugin: [ 'controller' ],
  volume: 0.1,
  controls: true,
});
[ 'touchstart', 'touchmove', 'touchend' ].forEach(key => {
  player.$on(key, evt => console.log(evt, key));
});
</script>
```

2 . 项目是基于nodejs环境构建的话，可以先在项目目录下执行命令安装依赖包（定制化开发时推荐使用这个方案）：

```
npm install chimee --save

# 这里可以按照业务需求继续安装其他依赖，比如下文代码中还需要：
npm install chimee-plugin-controlbar chimee-plugin-center-state chimee-kernel-hls chimee-kernel-flv --save
```
然后再按照自己的使用习惯，将依赖 import 或 require 到业务代码中使用：

```
import Chimee from 'chimee';
import chimeeControl from 'chimee-plugin-controlbar';
import chimeeCenterState from 'chimee-plugin-center-state';
import chimeeKernelHls from 'chimee-kernel-hls';
import chimeeKernelFlv from 'chimee-kernel-flv';

Chimee.install(chimeeControl);
Chimee.install(chimeeCenterState);

class MyChimeePlayer extends Chimee {
  constructor (config) {
    config = config ||{};
    // 添加UI插件
    config.plugin = config.plugin || config.plugins;
    if(!config.plugin) config.plugin = [];
    const innerPlugins = [
      chimeeControl.name,
      chimeeCenterState.name
    ];
    const configPluginNames = config.plugin.map(item => isObject(item) ? item.name : item);
    innerPlugins.forEach(name => {
      if(configPluginNames.indexOf(name) > -1) return;
      config.plugin.push(name);
    });

    // 添加解码器
	 config.preset = {
	   hls: chimeeKernelHls,
	   flv: chimeeKernelFlv
	 };
    super(config);
  }
}

export default MyChimeePlayer;
```
更详细的说明及文档请参考：http://chimee.org/docs/chimee_api.html。

### 写在最后
ChimeeJS的每个项目模块源码中，都包含一个`demo`目录，可以参考里面的示例，进行相应模块的使用或二次开发。

