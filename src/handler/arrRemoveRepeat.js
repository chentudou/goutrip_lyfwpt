
/* 对象数组去重 */
module.exports=arr=>{
    var hash = {}; 
    arr = arr.reduce(function(item, next) { 
        hash[next.a] ? '' : hash[next.a] = true && item.push(next); 
        return item 
    }, []);
}