var express = require('express');
var router = express.Router();
var auth = require('../middle');
var markdown = require('markdown').markdown;
//显示所有的文章列表 article.user
router.get('/list',function(req,res){
    Model('Article').find().populate('user').exec(function(err,docs){
        docs.forEach(function(doc){
            doc.content = markdown.toHTML(doc.content);
        });
        res.render('article/list',{title:'文章列表',articles:docs});
    });
});

router.get('/add',auth.checkLogin,function(req,res){
    res.render('article/add',{title:'发表文章'});
});

router.post('/add',auth.checkLogin,function(req,res){
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

router.get('/detail/:_id',function(req,res){
    Model('Article').findById(req.params._id,function(err,doc){
        res.render('article/detail',{title:'文章详情',article:doc});
    })
});

router.get('/delete/:_id',function(req,res){
    Model('Article').findById(req.params._id,function(err,doc){
        if(doc){
            if(req.session.user._id == doc.user){
                Model('Article').remove({_id:req.params._id},function(err,result){
                    res.redirect('/');
                })
            }else{
                req.flash('error','不是你发表的文章，不能删除');
                res.redirect('back');
            }
        }else{
            res.redirect('back');
        }
    })

});

module.exports = router;