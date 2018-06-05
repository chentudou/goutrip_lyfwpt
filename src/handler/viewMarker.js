export default function viewMarker(markers, map, html, image, store) {　
    //console.log('markers, map, html, image, store',markers, map, image)
    this._markers = markers;
    this._div = null;
    this._html = html; //自定义参数
    this._image = image;
    this._store = store;
    this.setMap(map);
}
viewMarker.prototype = new google.maps.OverlayView();

viewMarker.prototype.onAdd = function () {
    var div = document.createElement('div');
    var divStr;
    for (var x = 0; x < this._html.length; x++) {
        divStr += `<div class="mapPopBox" style="z-index:99${x-0+1}"><div class="clearfix" style='position:relative'>
        <div class="mapMarker" id="marker_${x-0+1}" style="width: 28px;height: 35px;text-align: center;padding-top: 5px;cursor: pointer;
        font-size: 14px;color: #1493e3;display:inline-block;background:url('${this._image}');">${x-0+1}</div>
        ${this._html[x]}
        </div></div>`;
    }
    div.innerHTML = divStr.replace("undefined","");;
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);
    this._div = div;
}
viewMarker.prototype.draw = function () {
    //根据经纬度计算div的像素位置
    var pointArr = []
    for (var i = 0; i < this._markers.length; i++) {
        var latlng = new google.maps.LatLng(this._markers[i].axes[0], this._markers[i].axes[1]);
        var point = this.getProjection().fromLatLngToDivPixel(latlng);
        pointArr.push({
            pointX: point.x,
            pointY: point.y
        })
        var div = this._div;
        div.children[i].style.left = (pointArr[i].pointX - 20) + 'px'; //减掉marker宽度的一半，居中
        div.children[i].style.top = (pointArr[i].pointY - 50) + 'px'; //减掉marker高度的一半，居中
        div.children[i].style.position = 'fixed'; //减掉marker高度的一半，居中
        div.children[i].style.padding = '8px 2px 0';; //减掉marker高度的一半，居中
    }
    /* 点击出现 */
    let map = document.getElementById('map');
    if(document.addEventListener){
        map.addEventListener('mouseover', (e) => {
            let _this=this;
            mapHandler(_this,e)
        });
    }else{
        map.attachEvent('onmouseover', (e) => {
            mapHandler(e)
        });
    }
    
    
};
viewMarker.prototype.onRemove = function () {
    //this.div_.parentNode.removeChild(this.div_);
    this._div.parentNode.removeChild(this._div);
    this._div = null;
};
function mapHandler(that,e){
    var event = e || window.event;
    let target = event.target || event.srcElement;
    let targetEle=target.innerHTML;
    // 判断是否匹配目标元素
    if (target.className.toLowerCase() == 'mapmarker') {
        let poiPop=document.getElementById(`poi_${targetEle}`);/* 当前整个弹框 */
        let addToTrip=document.getElementById(`addToTrip_${targetEle}`);/* 当前弹框下的加号 */
        let popBox=poiPop.parentNode.parentNode;/* 包括弹框和marker点在内的整个盒子 */
        let currMarker=document.getElementById(`marker_${targetEle}`);/* 当前marker点 */
        popBox.style.zIndex='9999';
        /* 在弹框上面 */
        poiPop.onmouseover=(e)=>{
            popBox.style.zIndex='9999';
        };
        /* 离开弹框后 */
        poiPop.onmouseout=(e)=>{
            popBox.style.zIndex=`99${target.innerHTML}`;
        };
        /* 点击弹框时 */
        poiPop.onclick=()=>{
            let _this=that;
            poiPopDetail(_this,targetEle)
        };
        /* 离开marker点时 */
        currMarker.onmouseout=()=>{
            popBox.style.zIndex=`99${target.innerHTML}`;
        };
        /* 点击'加号'时 */
        addToTrip.onclick= e =>{
            let _this=that;
            poiToTrip(_this,e)
        };
        
    }else if (target.tagName.toLowerCase() == 'span'){
        //this._store.dispatch("showDetail", this._markers[target.getAttribute("data-addtrip")].id); 
        return;
    }
    return false;    
}
/* 点击弹框内加号时，添加到列表 */
function poiToTrip(self,e){
     e.stopPropagation();
     let addViewData={
         id:self._markers[e.target.getAttribute("data-addtrip")].id,
         index:e.target.getAttribute("data-addtrip"),
         type:self._markers[e.target.getAttribute("data-addtrip")].type,
         ev:e
     }
     self._store.dispatch("addView",addViewData);
 };
 /* 单击弹框时，右侧展示详情 */
 function poiPopDetail(self,ele){
    let showDetailData={
        id:self._markers[ele-1].id,
        index:ele-1,
        type:self._markers[ele-1].type
    }
    self._store.dispatch("showDetail", showDetailData ); 
 }