/* 
生成指定長度 值為空的數組
 */
module.exports = l => {
    var empty = ' ';
    var newArr = new Array(l);
    for (var i = 0; i < newArr.length; i++) {
        newArr[i] = empty
    };
    return newArr;
}