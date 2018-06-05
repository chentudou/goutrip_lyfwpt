

/* 搜索防抖 */
module.exports=(fn,delay)=>{
    let timer = null;
    return function () {
        let self = this,
            args = arguments;
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(self,args);
        },delay);
    }  
}
