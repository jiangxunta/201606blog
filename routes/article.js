var express = require('express');
var router = express.Router();

router.get('/add',function(req,res){
    res.render('article/add',{title:'发表文章'});
});

router.post('/add',function(req,res){
   var article = req.body;
   //从session中获取当前会话用户的ID
   article.user = req.session.user._id;
   Model('Article').create(article,function(err,doc){
       if(err){
           req.flash('error','发表文章失败');
           res.redirect('back');
       }else{
           req.flash('success','发表文章成功');
           res.redirect('/');
       }
   })
});

module.exports = router;