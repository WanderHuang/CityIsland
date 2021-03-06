# 封装一个js组件
* 原生js的能力
  * 防止变量污染(module || IIFE)
  * 命名变量的能力(靠经验积累、阅读别人源码)
  * 代码组织方式(模式)、可维护性、可扩展性(高内聚、低耦合)
  * 原型链、作用域链的认识(可以减少交叉引用、提升变量访问速度)
  * String、Array、Number、Object等对象的原生方法(算法)、算法能力(算法导论、数据结构)
  * API友好度，直接关系到有多少人愿意使用(靠阅读开源代码，自己也要积累)
  * 注释能力。好的代码需要有好的文档支撑。(靠阅读开源代码，自己积累)
* css样式能力
  * 基本的布局(float、position、translate、flex、grid、table)
  * 基本的色彩搭配(多看设计师方面的网站、书、多思考人生0—0)
  * 伪元素使用(减少dom元素使用、开发一些小图标什么的)
  * 伪类使用(同上)
  * 元素定位(定位与文档流的关系、定位与重绘重排的关系、定位与上下元素的关系、定位与父子元素的关系)
  * 样式变更是否高效(重绘、重排) 重要，影响到页面流畅性(cssText、className、classList)
  * 高效的选择器 重要，渲染速度(多积累、要知道各个选择器的权重、多复用，减少交叉使用)
  * CSS3 渐变、动画、透明、图像处理等 界面好看是很重要的一项生产力(比较薄弱，多看看github上好的项目、css揭秘)
* 浏览器
  * 兼容性：使用什么样的js和css，决定了你的组件能支持的范围。大多数都可以向前hack，多写一些代码来兼容较为老旧的一些浏览器。(头疼 = =，多看mdn兼容性)
  * 与服务器交互：原生ajax(XMLHttpRequest) 原生js能力，实现数据交互(动态页面)
  * 服务器跨域支持： JSONP、CORS(正常情况后端开启跨域支持就行)
  * DOM树与样式树：渲染流程、重绘重排(渲染步骤、js加载对渲染的影响)
  * DOM操作耗时(减少dom操作、多缓存、用文档片段、用局部变量、循环体优化)
  * 懒加载：分页、滚动加载、异步加载(多看一下别人网站如何实现的，如图片加载优化、功能块加载优化、滚动加载方式、分页算法啊 0.0)
  * documentFragment：文档片段、优化dom渲染性能
  * cssText： 优化样式渲染性能
  
  ```
      |--------------------------------------------------------|
      |----showing your component to others makes you happy----|   <-----   get more rewards, share to more and more people
      |-----------------------^--------------------------------|
      |-----------------------|--------------------------------|
      |----browsers & algorithms make you have a headache------|   <-----   now you grow up
      |--------------------------------------------------------|
      |-----------------------^--------------------------------|
      |-----------------------|--------------------------------|
      |----js skill--------css skill----------html skill-------|   <-----   base skils
      |--------------------------------------------------------|
      |--------------------------------------------------------|
  ```
