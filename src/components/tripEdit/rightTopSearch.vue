<template>
    <div class="routeTopInput">
        <input type="text" :placeholder="placeholder" v-model="inputChange">
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: '右侧poi数据的搜索栏',
                inputChange: ''
            }
        },
        watch: {
            inputChange (val) {
                this.$emit('search', val, this.type)
            }
        },
        props: {
            placeholder: {
                type: String,
                default: '请输入'
            },
            type: {
                type: String,
                default: ''
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../assets/css/color.scss";
    .routeTopInput{
        width: 100%;
        background: $_bacgroundNM;
        color: $_fond9;
        padding: 15px 20px;
        input{
            width: 100%;
            background: $_bacgroundNM;
        }
    }
</style>