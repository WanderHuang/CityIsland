/**
 * 前提条件 express服务(4.0) mysql数据库 与前端属于不同域
 * 后台服务运行正常
 */
 
 var mysql =require('mysql'); //数据库连接
 var express = require('express'); //express服务
 var bodyParser = require('body-parser'); // 消息体解析
 
 
 // .. 省略其余代码
 
 // 服务端支持跨域CORS
 var allowCors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // 允许该域访问
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS'); //允许这些方法访问
  res.header('Access-Control-Allow-Headers', 'Content-Type'); // 允许设置Content-Type
  res.header('Access-Control-Allow-Credentials', 'true'); // 证书
 }
 
 app.use(allowCors);
 app.use(bodyParser.urlencoded({extend: false}));
 app.use(bodyParser.json());
 
 // 服务端支持post方法 数据已被bodyParser处理 从body中获取即可 (x-www-form-urlencoded)
 app.post('/add', function(req, res, next) {
  var name = req.body.name;
  var age = req.body.age;
  
  // 数据库处理
  
  res.send('success');
 })
 
 // 服务端支持put方法 数据已被bodyParser处理 从body中获取即可 (json)
 app.put('/mod', function(req, res, next) {
  var name = req.body.name;
  var age = req.body.age;
  
  // 数据库处理
  
  res.send('success');
 })
 
 // 服务端支持delete方法 数据已被bodyParser处理 从body中获取即可 (json)
 app.delete('/del', function(req, res, next) {
  var name = req.body.name;
  var age = req.body.age;
  
  // 数据库处理
  
  res.send('success');
 })
 
 // 服务端支持get方法 数据从query参数中获取
 app.get('/qry', function(req, res, next) {
  var name = req.query.name;
  var age = req.query.age;
  
  // 数据库处理
  
  res.send('success');
 })
