var express = require('express');
// var fs = require('fs');
// var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// 跨域设置
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// 注册接口
var task = require('./routes/task');
app.use('/task', task);

// // 访问静态资源
// app.use(express.static(path.resolve(__dirname, '../dist')));

// // 访问单页
// app.get('*', function (req, res) {
//   var html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
//   res.send(html);
// });

// 监听
app.listen(4000, function () {
  console.log('success listen...4000');
});