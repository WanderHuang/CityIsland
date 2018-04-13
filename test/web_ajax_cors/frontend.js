/**
 * 前提条件：
 * 1. vue-cli工程运行正常
 * 2. 页面正常
 */
 
 var axios = require('axios');
 axios.defaults.baseURL = 'http://localhost:1994'; //此处可以改为从配置文件导入
 
 //..省略其余代码
 
 var methods = {
    add: function() {
      // 新增 post方法 模拟表单提交 Content-Type要设置对
      var instance = axios.create();
      instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      var params = new URLSearchParams();
      params.append('name', this.obj.name);
      params.append('age', this.obj.age);
      
      instance.post('/add', params)
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    mod: function() {
      // 修改 put方法 数据类型为json
      var instance = axios.create();
      instance.defaults.headers.post['Content-Type'] = 'application/json';
            
      instance.put('/mod', this.obj)
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    del: function() {
      // 删除 delete api的第二个参数为config，data需要在config.data上设置
      var instance = axios.create();      
      instance.delete('/del', {
        data: this.obj
      })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error)
      })
    },
    qry: function() {
      // 查询 get方法
      var instance = axios.create();
      instance.get('/qry')
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error)
      })
    }
 }
 
 
