module.exports = {
    //串行，一个一个执行，先执行一个才会执行下一个
    series(tasks,callback){
        var index = 0;
        var result = [];
        function next(err,data){
            if(index > 0) //忽略第一次data
                result.push(data);
            //如果索引越界或者有错误立刻调回调函数
            if(index >= tasks.length || err){
                return callback(err,result);
            }
            //得到当前的task并调用
            var task = tasks[index++];
            task(next);
        }
        next();
    },
    parallel(tasks,callback){
        var result;//总返回值
        var index = 0;//当前完成任务的索引
        var total = 0;//总任务数
        var isArray = Object.prototype.toString.call(tasks) == '[object Array]';
        if(isArray){//如果是一个数组
            result = [];//返回值也是数组
            total = tasks.length;//总任务数
        }else{
            result = {};//返回值也是一个对象
            total = Object.keys(tasks).length;//总任务数
        }
        // pos索引或者属性名
        function cb(attr,err,res){
            index++;
            result[attr] = res;

            if(err || index >= total){
               callback(err,result);
            }
        }
        if(isArray){//开始并行执行所有的任务
            for(var i=0; i<tasks.length; i++){
                tasks[i](cb.bind(null,i));
            }
        }else{
            var attrs = Object.keys(tasks);//得到所有的属性数组
            attrs.forEach(function(attr){
                //把属性对应的值函数取出
                tasks[t](cb.bind(null,attr));
            })
        }

    }
}