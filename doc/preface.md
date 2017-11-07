
## H5-Video 实践

随着移动设备的飞速发展、各浏览器环境对Video支持的普及、Flash的没落，使用一个简单的VideoHTMLElement标签来替代原有的播放器插件进行视频媒体播放，帮我们更好的提高用户体验、增加更多的产品可能性已经日趋明显。

这篇文章我们从Video的几种应用场景、各环境中依然或将长期存在的问题、基于原生Video进行业务开发常见的问题等方面，一起学习了解更多的实践方向和可能存在的坑。

### 一. Viode的几种应用场景

#### 1. 最基本的HTML标签应用

H5中视频播放，像我们以前使用IMG标签插入图片到网页里一样方便，写一个video设置一个src属性指定媒体源地址就可以实现媒体播放了，针对低版本浏览器video的HTML结构也提供了友好的兼容方案，只需要在video标签内写上不兼容时要展示的HTML内容即可。

```html
<video src="https://chimee.org/vod/1.mp4" controls>
    您的浏览器不支持Video标签。
</video>
```

为了便于用户的操作，我们还设置了一个布尔型controls属性，告诉浏览器这个播放器渲染时需要显示控制条，在Chrome中渲染出的效果如下：

![image](https://p1.ssl.qhimg.com/d/inn/7b9a4489/1.jpeg)

当然[HTMLVideoElement的属性设置](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement)不只简单的提供了一个controls，还有更多的可配置项，比如：通过添加autoplay属性开启在动播放、通过添加muted设置为静音模式、通过给volume属性设置0.0~1.0之间的数值控制初始音量大小...

#### 2. 针对不同环境配置其支持的媒体资源

目前原生H5支持的媒体格式主要有MP4、OGG、WebM、M3U8等，基于媒体编码格式存在专利和产权归属问题，所以各大浏览器厂商之间对媒体格式的支持也各不相同：

##### MP4：

![image](https://p4.ssl.qhimg.com/dm/888_199_/d/inn/a86851ea8872/caniuse_mp4.jpg)

##### WebM：

![image](https://p4.ssl.qhimg.com/dm/888_199_/d/inn/a1ba51ea8872/caniuse_webm.jpg)

##### OGG：

![image](https://p0.ssl.qhimg.com/dm/888_199_/d/inn/cb5251ea8872/caniuse_ogg.jpg)


##### M3U8：

![image](https://p3.ssl.qhimg.com/dm/888_199_/d/inn/195851ea8872/caniuse_m3u8.jpg)

通过上面可以看到，目前就MP4各浏览器的兼容较好。这种浏览器之间媒体格式支持的差异化，使得我们必须得考虑不同用户环境的兼容问题。比较庆幸的是Video标准制定中也考虑了这些问题，比如在HTML代码的编写上我们可以在video标签内嵌套source标签来达成不同兼容环境下设定相应媒体源的需求：

```html
<video controls>
  <source src="https://chimee.org/vod/2.webm">
  <source src="https://chimee.org/vod/2.ogg">
  <source src="https://chimee.org/vod/2.mp4">
  <source src='https://chimee.org/x.myvideoext' type='video/mp4; codecs="mp4v.20.8, mp4a.40.2"'>
  <p>当前环境不支持video标签。</p>
</video>
```

当我们设置了source，就可以让不同的浏览器环境按照自身的支持情况，找到能正常解码播放的媒体源进行播放，为了让浏览器更快速准确的匹配媒体资源，建议同时设定type属性，来明确说明媒体编码格式，以尽可能的减少不必要的等待。

另外，在编写javascript的时候，也可以通过HTMLVideoElement的canPlayType API进行当前环境的格式兼容判断：

```javascript
let videoEl = document.createElement("video");

// 是否支持 MP4
videoEl.canPlayType('video/mp4') !== '';

// 是否支持 MP4 & 特定编码的
videoEl.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"') !== '';
// 是否支持 webm & 特定编码的
videoEl.canPlayType('video/webm; codecs="vp8, vorbis"') !== '';
// 是否支持 ogg & 特定编码的
videoEl.canPlayType('video/ogg; codecs="theora, vorbis"') !== '';

// 是否支持 HLS 的 m3u8
videoEl.canPlayType('application/vnd.apple.mpegURL') !== '';
// 是否支持 HLS 的 TS 切片
videoEl.canPlayType('video/mp2t; codecs="avc1.42E01E,mp4a.40.2"') !== '';
```

使用canPlayType方法传入要检测的媒体类型或具体编码格式，我们将可能得到'maybe'、'probably'、''三个String值中的一个，当得到空字串的时候，可以确定为不支持。

![image](https://p2.ssl.qhimg.com/d/inn/2016893c/2.png)

([动手尝试一下](https://code.h5jun.com/neko/7/edit?html,js,console))

#### 3. 使用Video的API和事件交互实现RPG互动游戏

一方面我们可以通过VideoElement的JS API进行状态的修改控制，来实现用户行为对剧情发展的影响带来不同场景间的切换；另一方面我们通过对VideoElement的事件监听可以响应状态的变化，当剧情发展到特定场景需要用户执行关键抉择。

![image](https://p3.ssl.qhimg.com/d/inn/6138c3a9/3.png)

（[动手尝试一下](https://code.h5jun.com/toji/4/edit?js,output)）

到这里只是基于最基本的VideoAPI已经可以实现很多有意思的东西了。聪明的你一定想到了举一反三，实现更复杂的一些互动游戏了吧，比如各种风靡微信的密室逃脱...

![image](https://p1.ssl.qhimg.com/d/inn/ab7a1003/4.jpg)

如果我们接下来在Video的使用上更进一步，加入更宽泛的H5 API应用，脑洞或许可以更大。

### 4. 使用Video播放本地媒体文件

在这里我们加入FileInput和FileReader API，让用户可以直接在网页中预览并播放自己选择的本地媒体文件。

```javascript
let iptFileEl = document.querySelector('input[type="file"]');
let videoEl = document.querySelector('video');

iptFileEl.onchange = e =>{
  let file = iptFileEl.files && iptFileEl.files[0];
  playFile(file);
};

function playFile(file){
  if(file){
    let fileReader = new FileReader();
    fileReader.onload = evt => {
      if(FileReader.DONE == fileReader.readyState){
        videoEl.src = fileReader.result;
      }else{
        console.log('FileReader Error:', evt);
      }
    }
    fileReader.readAsDataURL(file);
  }else{
    videoEl.src = '';
  }
}
```
这里使用了比较简单粗暴的方案 --- 当用户选择了媒体文件，那么直接使用FileReader得到本地文件的DataURI，并塞给video进行播放；虽然这个方案存在一些局限，但实用价值也还是挺高的，比如在线GIF编辑器 https://gif.75team.com 的视频转GIF功能就有用到类似的方案。

![image](https://p4.ssl.qhimg.com/d/inn/a59b3bea/5.png)

([动手尝试一下](https://code.h5jun.com/zupo/8/edit?js,output))

### 5. 使用Video播放设备自带摄像头视频流

随着WebRTC的兴起，以往在WEB端很难实现的需求，也完全可以成为现实。比如通过浏览器提供的 getUserMedia API，可以非常容易的开启摄像头并采集的视频流在页面上播放：

```javascript
navigator.getUserMedia(
  { audio: false, video: true},
  function(stream) {
    let video = document.querySelector('video');
    video.srcObject = stream;
    // 当媒体头信息就绪，自动开始播放
    video.onloadedmetadata = () => video.play();
  },
  function(err) {
    alert('getUserMedia error: ' + err.message);
  }
);
```

既然能拿到摄像头视频流了，自然也就可以做更多的事情了，关于摄像头媒体流播放[可以点这里尝试一下](https://code.h5jun.com/miri/7/edit?js,output)；而配合Canvas进行Video的画面的分析处理，我们也可以做更多有趣的尝试，比如：[人脸识别](https://code.h5jun.com/jihi/1/edit?js,output) ...

![image](https://p3.ssl.qhimg.com/d/inn/d01e7375/6.png)

而结合MediaRecorder API，也可以很方便的实现[纯WEB前端的视频录制功能](https://code.h5jun.com/zele/2/edit?js,output)。

### 6. 使用Video播放JS异步拉取的媒体流

直播行业的兴起，让更多的人了解了动态媒体流的存在，而WebRTC制定之初也主要是定位在多媒体实时通讯方向，这里面包含的MediaSource API让我们可以用JS创建动态媒体源，然后再通过任意异步方式往里 appendBuffer，实现不停的拉流播放。

```javascript
var video = document.querySelector('video');
var mediaSource = new MediaSource(); 
video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen', function() {
  var sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
  fetchAB('https://nickdesaulniers.github.io/netfix/demo/frag_bunny.mp4', function (buf) {
    sourceBuffer.addEventListener('updateend', function () {
      mediaSource.endOfStream();
      video.play();
    });
    sourceBuffer.appendBuffer(buf);
  });
});

function fetchAB (url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () { cb(xhr.response) };
  xhr.send();
};
```
（[异步拉流播放效果示例](https://code.h5jun.com/honu/edit?js,output)）

前面我们在谈到原生Video支持的媒体格式类型时，了解到的M3U8动态切片格式是众多格式中适合直播流的媒体类型，但并不是所有浏览器都支持，而且眼下很多直播平台可能也还是在使用FLV比较多，但原生Video并不支持FLV，但是结合JS动态拉流、解码、编码、MediaSource API，也让WEB前端直接播放原生不支持的媒体格式成为了可能。

### 二. 现状与未来

#### 1. 未来很美好

当我们了解到这里，你是不是也想到除了上面这些不同类型的Video应用场景，还有更多的脑洞和点子呢？

通过新的API了解和应用，显而易见WEB前端能做的事情已经越来越多了，可以施展的空间也越来越大了呢！是不是也已经跃跃欲试想去新的空间里尝试更多更大胆有趣的想法或探索更广袤的可能了吧？

多好的前景！多么的振奋人心啊！！~~~

![image](https://p3.ssl.qhimg.com/dm/500_350_/d/inn/1adf9d62/timg.jpeg)

#### 2. 现状还比较悲催

如果你已经迈出这一步，打开H5-Video视频播放处理的大门，就会发现 --- 并不是像想象中憧憬的那么美好。

因为作为WEB前端研发人员，必须要面对不同的浏览器环境各自的实现，这就像挨个打开不同的大门，而每个大门里面蕴藏的是整齐有序还是杂乱无章亦或随心所欲，打开之前都是未知的...

![image](https://media.giphy.com/media/l2SpS6MdfeYgPHZpC/giphy.gif)

### 三. 无法避免的环境差异

在IE还大行其道的WEB前端远古时代，大家比较痛恨各种怪异模式，当下伴随移动设备的兴旺，各种W3C API标准也越来越完美了，但我们发现越来越多的设备、浏览器、WebView厂商雨后春笋一样层出不穷，并且在标准的支持上也各有各的想法，甚至在自己的一亩三分地里制定着自己的规范标准...

#### 1. 各环境中Video UI不一致

我们拿同一个页面，放一个“大白兔”的示例视频，在不同的浏览器环境下观察截图：

![image](https://p1.ssl.qhimg.com/dm/307_168_/d/inn/701eb9a3/ui_chrome.png)
![image](https://p1.ssl.qhimg.com/dm/307_168_/d/inn/701eb9a3/ui_firefox.png)
![image](https://p1.ssl.qhimg.com/dm/307_168_/d/inn/701eb9a3/ui_safari.png)
![image](https://p1.ssl.qhimg.com/dm/307_168_/d/inn/27716634/ui_uc.png)
![image](https://p0.ssl.qhimg.com/dm/307_168_/d/inn/ae58edc5/ui_firefox_un.png)
![image](https://p1.ssl.qhimg.com/dm/307_168_/d/inn/27716634/ui_360_and.png)
![image](https://p2.ssl.qhimg.com/dm/307_168_/d/inn/ae58edc5/ui_opera_win.png)
![image](https://p1.ssl.qhimg.com/dm/307_168_/d/inn/ae58edc5/ui_chrome_win.png)

怎么样，意不意外？惊不惊喜？

同一个浏览器不同的版本都可能大相径庭，当你的用户给你反馈播放器上一些奇奇怪怪按钮看不懂事干嘛的、一些奇特的功能用着不爽的时候，你能确定他说的与你看到的是一个东西吗？

#### 2. 各种环境中API实现与支持程度的差异

看看下面这一堆配置都是什么鬼？([本小节参考资料](https://segmentfault.com/a/1190000009395289))
```html
<video
  src="video.mp4" 
  controls
  poster="images.jpg"
  preload="auto" 
  webkit-playsinline="true" 
  playsinline="true"
  x-webkit-airplay="allow" 
  x5-video-player-type="h5"
  x5-video-player-fullscreen="true"
  x5-video-orientation="portraint"
  style="object-fit:fill">
</video>
```
我们针对不同的环境，必须做一些符合它的要求的配置，以期望能尽量达成我们想要的目的。但是不得不说的是，标准API里的controls、poster、autoplay也都未必有效（只是想隐藏控制条都得想各种纠结的办法--裁剪出镜、更或者一些宣传短片干脆做成序列帧...），前面说的通过source来设置不同媒体源的方案，部分浏览器也可能是不认识的。

W3C标准和MDN告诉我们可以通过VideoElement.error取得媒体播放异常的参考信息，但是实践告诉我们，很多环境下是压根没有这么个东东，或者参考信息不够详尽靠谱。

#### 3. 事件交互行为不一致

通过[MediaEvents&API 检测](https://www.w3.org/2010/05/video/mediaevents.html)，会发现各环境中播放进度变化、事件触发频率不同、部分事件触发时相应状态值未必可靠、部分场景缺少事件（全屏状态变化、系统播放器劫持）、seek时不一定触发play...

例如ios部分环境监听canplay和canplaythrough（是否已缓冲了足够的数据可以流畅播放），当加载时是不会触发的，即使preload="auto"也没用，但在pc的chrome调试器下和android下，是会在加载阶段就触发，ios需要播放后才会触发。

部分环境中视频从开始播到能展现画面会有短暂的黑屏（处理视频源数据的时间），为了避免这个黑屏，可以在视频上加个浮层或设置容器背景并在播放前隐藏video，然后监听相关事件，开始播放或认为有画面的时候再切换到Video界面。

所以总体来看，并没有可靠统一的规范。

#### 4. 媒体格式的支持无法保证

在前面探讨各浏览器环境原生Video支持的媒体类型时候，有各媒体格式兼容情况的详尽贴图 --- MP4 总体支持较好、M3U8在高版本移动环境较好、媒体点播直播中现存大量 flv 播放需求原生Video是不支持的。

到系统层面来看，不同版本支持的类型或编解码版本，也会存在各种不同的差异；当你不停的查标准规范、查API文档，再不停的实践，你也许会发现 ---- “哇靠，真的是‘能力越大责任越大’呢”。

![image](https://media.giphy.com/media/14nYsrWlBphE2Y/giphy.gif#https://www.chimee.org/ppt/img/shuilongtou.gif)

### 四. 视频播放业务层比较纠结的几个问题

如果耐着性子把环境问题一个一个踩坑，一个一个地雷趟过来，终于可以写业务逻辑了，结果发现，业务逻辑上依然让人头大。

#### 1. 状态处理容易存在冲突

假如我们将原生video元素视作一个数据状态储存容器，那么可以看到以上四种需求需要如下权限：

对于有播放状态控制的一些控件，会同时需要状态的读、写；对于展示式需求，例如无交互的弹幕、打赏礼品、特效挂件等，只需要读状态 --- 例如暂停则停止；更高级的，例如片头、片尾、插片广告，我们不但要知道播放状态、时机，甚至要在广告播放期间阻止一切默认行为，直到允许用户跳过等，这就不只是需要完整的读写权限，还要具备阻截别人读写的功能...

当业务逻辑日积月累[状态操作的场景越来越繁杂](https://github.com/Chimeejs/chimee/blob/master/doc/zh-cn/why-chimee-is-a-frame.md)，缺乏合理的状态管理机制，势必会导致状态混乱、冲突的产生。

![image](https://camo.githubusercontent.com/561dee38a107723b0dfc1acb0a5283e8a8e600af/687474703a2f2f696d616765732e74616b756e6770616f2e636f6d2f323031362f303231392f32303136303231393032313335343933362e6a7067)

#### 2. 交互与层级管理的矛盾

UI插件的需求在业务中也是纷繁复杂的，比如通常的弹幕插件是不需要交互，只要滚动展示内容，这时候我们点击弹幕跟点击播放器本身一样要触发暂停或播放行为。

突然有一天需要夹杂展示点击后跳转详情的广告内容，这时需要交互行为，这也就与前面的需求相矛盾了。

再加上一些动态变更层级的UI组件---比如右键菜单、popup配置浮层... 这也需要有一套可靠灵活的层级管理机制，来支撑这些可能出现的需求。
    
![image](http://p6.qhimg.com/dr/600__/t014fe4bd6b295a2387.jpg)

#### 3. 日志收集上报易耦合

好的产品离不开数据回馈、理性分析、合理优化。

对于已经实现了的业务逻辑，当我们发现问题的时候，通常都是在后续迭代优化过程时，插入日志收集逻辑在已有业务逻辑中间，但这么以来我们的日志处理相关的逻辑势必会分散在业务代码的各个角落里，不但干扰业务逻辑的可读性、对后续业务迭代增加难度，对于日志处理需求本身，也难以理解和维护；这带来的弊端可能会更大的抵消掉了原期望通过它得到的价值。

一套能与业务逻辑完全解耦的日志收集上报工具，不但有助于业务迭代优化，也一定要保证自身的独立可迭代维护性。

### 五. 小结

综上，如果要进行H5视频播放开发，环境差异带来的各种琐碎问题无法避免，技术的发展也一直在不停的前进着，美好就在前面，避免重蹈覆辙踩别人踩过的坑，你也就有更多的时间和精力做更多有价值的产出。

如果有一套更理想的解决方案，她能带给我们统一的API与事件行为、可控的状态管理机制、一致且可自定义的UI、支持热插拔且解耦的插件处理策略、能保证各环境对M3U8&FLV的支持，并且可定制，你是否也会选择她呢？
