# HTML5学习
## 常用内容
* doctype
  * `<!DOCTYPE HTML>`表明文档类型为html
* 字符集
  * `<meta charset="UTF-8">`页面字符集
* 语义化
  * 富有语义的元素`header` `nav` `section` `article` `aside`等等
* `querySelector & querySelectorAll`
  * 类似于jquery的选择元素方法，更方便
  * `document.querySelector('#main')`
* getElementsByClassName
  * 通过class来查找dom元素
  * `const doms = document.getElementsByClassName('clazz-name')`
  * `const doms = document.getElementById('main').getElementsByClassName('clazz-name')`
* classList
  * 通过此api可以操作dom元素的class。在此之前只有className属性
  * `dom.classList.add('clazz')`为class列表增加clazz
  * `dom.classList.remove('clazz')`从class列表中删除clazz
  * `dom.classList.contains('clazz')`判断class列表中是否存在clazz
  * `dom.classList.toggle('clazz')`切换clazz，如存在则删除，如不存在，则增加
* data-
  * 用户可以给元素自定义属性，dom元素上直接写，如data-index="1"。js中用dom.dataset.index取值
  * `<div id="main" data-index="1">This is a block</div>`
  * `dom.dataset.index = 2`
* outerHTML
  * 用法和innerHTML类似。读取时，outerHTML返回调用它的元素及其所有子节点；写入时，用写入的html替换当前元素及其子元素
* 全屏
  * `requestFullScreen(standard webkit@ ms@ moz@) | onfullscreenchange | exitFullscreen`等相关api
* 切屏(页面可见性)
  * `onvisibilitychange(standard webkit@ ms@) | onfocusin(ie9-) | onpageshow`等相关api
  * `document.hidden`: Boolean.是否可见
  * `document.visibilityState`： Enum. visible可见不是最小化 hidden不可见或最小化 prerender正在重新渲染，且不可见
* 画布(canvas)
  * document.getElementById('canvas').getContext('2d')
  * 这个需要单独列一篇文章了
* 预加载
  * `<link rel="prefetch" href="../../a.html">`
  * `<link rel="dns-prefetch" href="b.png">`
* 访问用户媒介
  * `navigator.getUserMedia(navigator.webkitGetUserMedia)` 访问摄像头、麦克风(移动端)
* 电池信息
  * app内嵌浏览器获取系统信息，告知用户电量情况
  * `const battery = navigator.battery | naviagator.webkitBattery | navigator.mozBattery`
  * `battery.charging` 是否正在充电
  * `battery.level` 当前电量
  * `battery.dischargingTime` 未充电时间
  * `battery.addEventListener('chargingchange',fn)`
* 时间方案
  * `const time = performance.now()` 当前时间的精确度 亚毫秒级
  * `performance.mark('tag_1') performance.measure('tag', 'tag_1', 'tag_2')` 可以用来计算代码运行时间
  * `performance.timing`时间戳
* 网络信息
  * `navigator.connection` 网络对象
  * `navigator.connection.metered` 连接是否正常 Boolean
  * `navigator.connection.bandwidth`返回带宽 MB/s
  * 目前只有Firefox12+ 和chrome移动 提供实验支持
* 地理位置
  * 若用户授权，则可以获取用户的地理位置信息(移动端)
  * `navigator.geoloaction.getCurrentPosition(success, error, options)`
  * `position.itmestamp` 时间戳 获取到位置信息的具体时间
  * `position.coords`位置对象 latitude纬度 longitude经度 accuracy精度 altitude海拔 altitudeAccuracy海拔精度 heading以360度表示的方向 speed每秒速度
* 震动
  * `navigator.vibrate(2000)`
* websocket
  * 需要单独开文写相关的内容
* requestAnimationFrame
  * `window.requestAnimationFrame | window.mozRequestAnimationFrame | window.webkitRequestAnimationFrame | window.msRequestAnimationFrame`
  * 根据浏览器自身刷新频率来调用对应的方法。确保每次刷新帧时调用已注册的方法
* window.history
  * `history.go(index)`URL定位到指定位置
  * `history.back()`模拟后退
  * `history.forward()`模拟前进
  * `history.pushState(state, title, url)`压栈
  * `history.replaceState(state, title, url)`替换
* 文件操作
  * window.Blob 表示原始二进制数据 可以用来访问文件大小和字节数据
  * window.File 保存着文件的只读属性信息，文件名、文件类型、文件数据访问地址等
  * FileList 一组文件
  * FileReader 读取文件
  * FileError FileException文件错误、异常
* 本地存储方案
  * localStorage
  * sessionStorage
  * indexDB
  * FileSystem
  * (old) cookie
  * 这条内容也应该新开一篇文章去讲
## 后记
  HTML5的内容十分浩大，买本权威性高的书，从基础学习一遍才是解决之道
  
