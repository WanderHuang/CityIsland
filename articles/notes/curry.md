# 柯里化:innocent:
## 从一个加法开始
* 初级加法add(a, b)
      
      //返回两个数的和
      let add = function(a, b) {
        return a + b
      }
* 高级加法add(a, b, c, d,...)
    
      let add = function() {
        let args = [].slice.call(arguments)
        return args.reduce(function(a, b) {
          if(typeof b === 'number') {
            return a + b
          }else {
            return a
          }
          
        }, 0)
      }
## 加法改造：醉人的闭包
　　个人理解闭包：在某个作用域下，持有了其他作用域的变量，导致该被持有的变量一直占用内存，无法被释放。
* 最简单的闭包

      let man = {}
      man.sayHi = function(name) {
        let hi = 'I am ' + name + ', hello!'
        function mouth() {
          // mouth这个方法拿到了他想说的（hi），就不会再放走了。hi属于外部匿名函数的属性，但被内部的方法mouth持有了
          // 虽然sayHi的部分执行完毕了，但mouth里面还有这个变量。于是mouth()能取到想说的那句话'I am...'
          console.log(hi)
        }
        mouth()
      }
      man.sayHi('Jay Chou')
* 使用闭包的高级加法

      let add = function() {
        let args = [].slice.call(arguments)
        let sum = 0
        
        function calculate(a) {
          //不论是何时何地进入此执行环境，都能拿到sum, 且sum值在不断变化
          sum += a
        }
        
        for(let i = 0; i < args.length; i++) {
          calculate(args[i])
        }
        
        return sum
      }
## 延迟计算：基于闭包的柯里化
* 最直观的柯里化是这样子的
  
      //if you want to calculate sum = 1 + 2 + 3 + 4 + 5, then in curry：
      add(1)(2)(3)(4)(5)
* 期望中的加法器

      //do many calculations base on function parameters
      add(100, 200, 300)(400)(500)(600, 700)(800)
      //get real sum
      add()
* 意大利面端上来 招呼友军  
　　使用闭包(把和放到内存中)来存储和，其他情况直接返回函数以支持链式调用
  
      function curry_add() {
        let sum = 0
        
        //闭包、链式调用的基础(返回值仍然为函数)
        return function() {
          //参数为空时 默认为获取和值
          if(arguments.length === 0) {
            let result = sum
            //清空sum 否则只能装逼一次
            sum = 0 
            return result
          }else {
            // 在sum的基础上增加arguments的值
            for(let i = 0; i < arguments.length; i++) {
              let arg = arguments[i]
              if(typeof arg === 'string') {
                arg = isNaN(Number(arg)) ? 0 : Number(arg)
              }
              if(typeof arg === 'number') {
                sum += arg
              }
            }
            //返回当前参数的调用函数(返回值仍然为函数)
            return arguments.callee
          }
        }
      }
      
      let add = curry_add()
      add(1)(2, 3)(4)
      add(5)
      //在这里才真正结束运算
      const result = add()
      console.log(result)
      
## 后记
* [知乎热评柯里化](https://www.zhihu.com/question/37774367)
* 其余装逼贴请移步百度:ghost:
    
