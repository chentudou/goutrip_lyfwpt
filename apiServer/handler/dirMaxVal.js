/* 
获取文件夹下序列号最大数值的文件
*/
const fs = require("fs");

module.exports = dir => {
    let fileArr = fs.readdirSync(dir);
    let numArr = [];
    if (fileArr.length) {
        for (n = 0; n < fileArr.length; n++) {
            numArr.push(fileArr[n].slice(16, 21));
        }
        let maxNum = Math.max.apply(Math, numArr);
        //console.log('numArr,maxNum', numArr, maxNum);
        return maxNum;
    } else {
        return 0;
    }
}