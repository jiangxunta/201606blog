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
   var article = req.body;//得到请求体
   var _id = article._id;//先得到文章的ID
   if(_id){//修改
       Model('Article').update(//使用修改器修改对应文章的标题和内容
           {_id:_id},
           {$set:{title:article.title,content:article.content}},
       function(err,result){
           if(err){
               req.flash('error','修改文章失败');
               res.redirect('back');
           }else{
               req.flash('success','修改文章成功');
               //如果前台是通过ajax请求此路由，那么并不能跳转
               res.redirect('/article/detail/'+_id);
           }
       });
   }else{//新增加
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
   }
});

router.get('/detail/:_id',function(req,res){
    Model('Article').findById(req.params._id,function(err,doc){
        res.render('article/detail',{title:'文章详情',article:doc});
    })
});

router.get('/delete/:_id',function(req,res){
    Model('Article').findById(req.params._id,function(err,doc){
        if(doc){
            console.log(req.session.user._id , doc.user);
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
//先得到文章的ID，然后得到文章的详情对象，并跳转到编辑页(复用新增文章模板)
router.get('/edit/:_id',function(req,res){
  //得到文章的ID
  var _id = req.params._id;
  //根据ID查询文章对象，并把此对象赋给模板变量
  Model('Article').findById(_id,function(err,doc){
      res.render('article/add.html',{title:'修改文章',article:doc});
  })
});


module.exports = router;