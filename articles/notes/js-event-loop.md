- `promise` 和`setTimeout` 以及for循环

```javascript
let promise1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 900, 1)
})

let promise2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 600, 2)
})

let promise3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 300, 3)
})
let promises = [promise1, promise2, promise3]
let indexes = [0, 1, 2]


setTimeout(function() {
    console.log('------------')
}, 0)


for (let i = 0; i < 3; i++) {
    console.log('ready to execute: ' + i)
    let promise = promises[i]
    promise.then(() => {
        console.log(indexes[i])
        return i
    })
}
Promise.all(promises).then((res) => {
    console.log('finish: ' + res)
})


setTimeout(function() {
    console.log('++++++++++++')
    new Promise(function(resolve, reject) {
        setTimeout(function(param) {
            console.log(param)
            resolve()
        }, 300, 'haha')
    })
}, 0)

// setTimeout 是宏任务(macro)，time=0时，放到当前任务最后
// promise.then把promise放到微任务(micro),微任务等当前宏任务执行完毕后再执行
// Promise.all是promise全执行完毕后的回调
// for循环是当前任务，先执行，然后setTimeout(time=0)才加入队列

// output:
//
// ready to execute: 0 当前任务先执行
// ready to execute: 1
// ready to execute: 2
// ------------ 被放到当前任务最后的第一个setTimeout方法执行(time = 0)
// ++++++++++++ 被放到当前任务最后的第二个setTimeout方法执行(time = 0)
// 2            微任务第一个执行完毕(time = 300)
// haha         微任务第二个执行完毕(time = 300)
// 1            微任务第三个执行完毕(time = 600)
// 0            微任务第一个执行完毕(time = 900)
// finish: 1,2,3 所有微任务执行完毕
```
