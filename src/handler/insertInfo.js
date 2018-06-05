
/* import { designSizeDate } from './designSizeDate';
 */
/* 在指定位置之前或之后插入数组一项 */

module.exports = function (arr, location, currLocation, item){
    //console.log('arr, location, currLocation, item',arr, location, currLocation, item)
    /* arr:要操作的数组，location：之前还是之后插入  0（之前）1（之后）,currLocation:当前位置，item：要插入的对象 */
    if (!location) {
        return arr.splice(currLocation, 0, item);
    } else {
        return arr.splice(currLocation, 0, item);
    }
};