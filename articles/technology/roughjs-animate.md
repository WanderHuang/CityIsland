# roughjs  
[link](https://github.com/pshihn/rough/)  
# animation  
一下三个方法可以用来制作页面动画  
* setTimeout  
* setInterval  
* requestAnimationFrame  
[博文](https://blog.csdn.net/qingyafan/article/details/52335753)  
# bind  
在roughjs的示例中有这样的[例子](https://github.com/pshihn/rough/blob/master/docs/examples/contributed/balloon-animation.html),
这个可以用来做页面动态背景。  
其中有这样的代码：  
```javascript
// ...
const Color = extend.bind(null, { h: 0, s: 100, l: 100, a: 1 })
// ...

if (scope.animation) {
  scope.animation(animationLoop.bind(null, scope))
}
//...
const scope = {
  animation: requestAnimationFrame.bind(null),
  ctx: document.createElement('canvas').getContext('2d'),
  rotation: 0,
  particles: []
}
//...
```  

* 这些bind（null, parameters）的用法是产生一个[偏函数](http://benalman.com/news/2012/09/partial-application-in-javascript/)，第二个参数实际上是设置了调用函数时的默认值。  
1. requestAnimationFrame在调用时默认的this为window，这里网页根据频率刷新的时候，在全局中调用他的animationLoop()方法，但requestAnimationFrame并不会
默认设置一个参数进去，所以采用了bind给函数设置默认值，确保每次刷新时，运行animationLoop都会拿到scope。  
2. 而scope.animation采用bind为了返回一个新的空参重绘方法，否则在他的animationLoop里面调用requestAnimationFrame时会出错，因为this指向被scope调用时的环境替换掉了，不再是window环境。  
* 以上两个方式，保证了每次刷新的时候，传给重绘方法的参数是连贯的。
