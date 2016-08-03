'use strict'
var arr = [1,2,3,3,4,4];
var addedSet= new Set();
var sum = arr.reduce(function(curr,next){
    console.log(addedSet);
   if(addedSet.has(next)){
     addedSet.delete(next);
     return curr - next;
   }else{
      addedSet.add(next);
      return curr + next;
   }

},0);

var minus =0;
for (let num of addedSet) {
    minus +=num;
}
console.log(sum);
console.log(minus);
console.log(sum - minus);

