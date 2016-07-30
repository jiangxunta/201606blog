var express = require('express');
var app = express();
//返回路由实例 本质是一个中间件
var cRouter = express.Router();
cRouter.get('/c1',function(req,res){
    res.send('c1');
});
cRouter.get('/c2',function(req,res){
    res.send('c2');
});
app.get('/a',function(req,res){
    res.end('a');
});
app.get('/b',function(req,res){
    res.end('b');
});
app.use('/c',cRouter);
app.listen(9090);