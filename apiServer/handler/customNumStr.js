/* 
生成指定个数，最大值99999 5位数 
*/

module.exports = l => {
    let str = '00000';
    var newStr = str.substr(l.toString().length);
    return newStr + l;
}