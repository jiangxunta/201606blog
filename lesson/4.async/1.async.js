var async = require('./async');
/**
 * 用于处理控制异步流程
 * 并行 所有的任务同时开始执行，
 * 当所有的任务都执行完毕之后才会调用回调函数
 */
console.time('cost');
async.series([
   function(cb){
      setTimeout(function(){
          cb(err,1);
      },3000);
   },
   function(cb){
       setTimeout(function(){
           cb(null,2);
       },1000);
   }
],function(err,result){
    console.timeEnd('cost');
    console.log(result);
})
