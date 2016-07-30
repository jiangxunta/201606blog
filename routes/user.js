var express = require('express');
var router = express.Router();
//注册页面
router.get('/reg', function(req, res, next) {
  res.render('user/reg',{title:'注册'});
});
//登录页面
router.get('/login', function(req, res, next) {
  res.render('user/login',{title:'登录'});
});


module.exports = router;
