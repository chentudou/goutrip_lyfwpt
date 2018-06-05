<template>
    <div>
        <div
            v-loading="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-text="拼命加载中"
        ></div>
        <div v-if="!loading" class="loadingNoneText">{{ loadingNoneText }}</div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Loading } from 'element-ui';
    Vue.use(Loading)
    export default {
        data () {
            return {
                msg: '列表底部的菊花加载',
                loadingNoneText: '没有更多了'
            }
        },
        props: {
            loading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../../static/color.scss";
    .loadingNoneText{
        padding: 10px 0;
        text-align: center;
        font-size: 14px;
        color: $_fond6;
    }
</style>