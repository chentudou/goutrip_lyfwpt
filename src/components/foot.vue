<template>
  <!--底部-->
        <div class="index-footer">
            <div class="indexF-top">
                <div class="indexF-top-con ">
                        <router-link :to="{}">关于我们</router-link> |
                        <router-link :to="{}">联系我们</router-link> |
                        <router-link :to="{}">商务合作</router-link> |
                        <router-link :to="{}">预订流程</router-link> |
                        <router-link :to="{}">支付方式</router-link> |
                        <router-link :to="{}">全球目的地</router-link> |
                        <router-link :to="{}">服务协议</router-link> |
                        <router-link :to="{}">服务条款</router-link>
                </div>
            </div>
            <div class="indexF-bottom">
                <p>京ICP备09041727-19 | 版权所有©2013 - 2017北京汇智纵横信息技术有限公司</p>
            </div>
        </div>    
</template>
<style scoped>
/* 尾部 */
.index-footer{
    background: #2C2C2C;
    height: 124px;
    margin-top: 121px;
}
.indexF-top{
    height: 62px;
    border: 1px solid #343434;
    line-height: 62px;
}
.indexF-top-con{width: 620px;margin: 0 auto;text-align: center;color:#9C9C9C;}

.indexF-bottom{
    width: 100%;
    height: 62px;
    line-height: 62px;
    font-size: 14px;
    color: #8a8f99;
}
.indexF-bottom p{text-align: center;}

.indexF-top-con a{display: inline-block;font-size:14px;color: #9C9C9C;}
.indexF-top-con a:hover{color:#1e90e5;}
</style>
