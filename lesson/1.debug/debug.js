module.exports = function(name){
   return function(msg){
     //判断环境变量中的DEUBG的值是否等于当前的名称name
     var env = process.env.DEBUG;
     if(env == name){
         console.log(msg);
     }
   }
}