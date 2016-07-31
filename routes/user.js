var express = require('express');
var util = require('../util');
var router = express.Router();
//注册页面
router.get('/reg', function(req, res, next) {
  res.render('user/reg',{title:'注册'});
});
//提交注册表单
router.post('/reg',function(req,res,next){
  var user = req.body;
  if(user.password != user.repassword){
     return res.redirect('back');
  }
  //1. 对用户密码进行加密
  //2. 得到头像
  user.password = util.md5(user.password);
  user.avatar = "https://secure.gravatar.com/avatar/"+util.md5(user.email)+"?s=25";
  //向数据库保存用户
  Model('User').create(user,function(err,doc){
     if(err){
       return res.redirect('back');
     }else{
       //实现登陆 如果此客户端在服务器端的session中有user属性的话就表示登陆状态
       req.session.user = doc;
       return res.redirect('/');
     }
  });
});
//登录页面
router.get('/login', function(req, res, next) {
  res.render('user/login',{title:'登录'});
});

router.post('/login', function(req, res, next) {
  var user = req.body;
  user.password = util.md5(user.password);
  Model('User').findOne(user,function(err,doc){
    if(err){
      return res.redirect('back');
    }else{
      if(doc){
        req.session.user = doc;
        return res.redirect('/');
      }else{
        return res.redirect('/user/reg');
      }
    }
  });
});

router.get('/logout', function(req, res, next) {
  req.session.user = null;
  return res.redirect('/user/login');
});


module.exports = router;
