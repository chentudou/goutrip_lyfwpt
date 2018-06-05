const scrollConf = () => {
    return {         // 滚动条设置
        barColor:"#ccc",   //滚动条颜色
        barWidth:3,           //滚动条宽度
        railColor:"#eee",    // 滚动条底色
        barMarginRight:0,     //垂直滚动条距离整个容器右侧距离单位（px）
        barMaginBottom:0,     //水平滚动条距离底部距离单位（px)
        barOpacityMin:0.3,      //滚动条非激活状态下的透明度
        zIndex:"auto",        //滚动条z-Index
        autohidemode:true,
    }
}

export { scrollConf }