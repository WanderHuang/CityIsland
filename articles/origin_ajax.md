#  实现跨域请求的方式 
不论什么方式实现跨域资源请求，都是需要服务器配合支持的。能获取到，说明服务器默许了您的行为。  
1. 野路子出身却好用的方式：JSONP  
2. 官方推荐的跨域资源共享方案：CORS  
3. 使用HTML5 API：postMessage  
4. 抛弃HTTP，使用：Web Sockets  
##  JSONP  
JSONP是JSON with padding的简写。
> 1. 浏览器同源策略限制了AJAX跨域获取资源，但并未阻止获取资源这件事本身。所以我们能通过`script`、`link`、`img`等标签
的属性获取到某站点下的资源。  
> 2. 浏览器加载到.js文件后，是直接将文本内容换到对应位置。  

方式：  
* 在脚本内写入`<script type="text/javascript" src="http://www.othersite.com/resources?jsonp=callback"></script>`  
* 写下你的`callback`.
``` javascript
function callback() {
  console.log('this is my callback')
}
```

* 在你的服务端代码中，获取key=jsonp的参数值，用该值生成一个js函数  
* 将服务端数据放入该js函数中作为参数callback({name: 'xiao huang', age： 25})  
* 页面加载完成，自动调用callback  

缺陷：  
* 只支持get请求  
* 无法检测jsonp请求是否失败  
* 需要将请求发送到可信赖的服务器，否则服务器可能设置恶意js代码  

##  CORS  
CORS(Cross-origin resource sharing)是跨域资源共享的意思。 这块看[阮一峰的博客](http://www.ruanyifeng.com/blog/2016/04/cors.html)就行了  

## WebSocket(html5)  
客户端与服务端双向通信  

## window.postMessage(html5)  
可以在浏览器各窗口推送消息  

#AJAX  
[廖雪峰-AJAX](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499861493e7c35be5e0864769a2c06afb4754acc6000)
