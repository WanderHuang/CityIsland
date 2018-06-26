# Records  
* 复习http相关知识 完成前后台数据交互  
* 分析了500px.com加载图片的性能优化点  
  * 懒加载： 每次加载五十张图片剩余的需要滚动触发加载  
  * 图片压缩： 首屏展示的图片为压缩后的 点击图片后再加载高清图  
  * nginx反向代理(负载均衡): 用的是nginx做反向代理 图片资源放在不同的服务器上做负载均衡  
  * https(http/2.0): 请求nginx时采用http/2.0 一个http链接共享多个请求 实现同时加载50张小图  
  * 缓存管理: 部分静态资源采用了缓存管理 设置了Cache-Control:max-age  
  * 资源用都用了hash值来指引路径，每个图片get请求的时候，发送了不同的参数，应该是指明资源位置和资源大小(大图小图)  
* vue出了个vuepress 有空看一下  
  * 2018年4月23日23:38:30 感觉生成速度要比hexo慢一些 特性还没研究  
* await/async  
  * koa2一些基础[笔记-博文](https://github.com/chenshenhai/koa2-note)  
  * 踩了一个坑：  
  ```javascript
   // cors.js
   const cors = async (ctx, next) => {
    //设置你的Access-Control-
    //...
    await next()  //这里不加await的话 后面的中间件ctx.body = await MONGOOSE.RESULT 中的ctx.body会在await之前返回
   }

   //router.js

   router.get('/queryAll', (ctx, next) => {
    //...
    ctx.body = await handler.queryAll //前面不加await的话， 这里ctx.body拿不到await的异步返回结果，返回给前台的只能是这一行之前的ctx.body
   })
  
  ```  
* vue-router/vuex 需要翻看官方文档  
