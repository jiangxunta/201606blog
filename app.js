var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
//是用来记录访问请求
var logger = require('morgan');
//解析cookie req.cookies
var cookieParser = require('cookie-parser');
//处理请求体 req.body
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var user = require('./routes/user');
var article = require('./routes/article');
var app = express();

// view engine setup
//设置模板的存放目录
app.set('views', path.join(__dirname, 'views'));
//设置模板的引擎
app.set('view engine', 'html');
app.engine('html',require('ejs').__express);

// uncomment after placing your favicon in /public
// 把favicon旋转在/public目录下之后取消掉注释
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//指定记录请求的中间件，并指定格式
app.use(logger('dev'));
//处理请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());// req.cookies
//静态文件中间件
app.use(express.static(path.join(__dirname, 'public')));
//以哪个路径开头
app.use('/', routes);
app.use('/user', user);
app.use('/article', article);
// catch 404 and forward to error handler
// 捕获404错误并且转向错误处理中间件
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers 错误处理

// development error handler 开发环境错误处理
// will print stacktrace 将打印推栈信息
//env 读取的是环境变量中的 NODE_ENV
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler 生产环境错误处理
// no stacktraces leaked to user 不要向用户暴露堆栈信息
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
