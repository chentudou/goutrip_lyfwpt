<template>
    <div class="tripEditPagination">
        <pagination
            small
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="pageNum"
            @current-change="currentChange"
        >
        </pagination>
    </div>
</template>
<script>
    import { pagination } from 'element-ui'
    export default {
        data () {
            return {
                msg: 'poi列表分页'
            }
        },
        props: {
            total: {
                type: Number,
                default: 0
            },
            pageNum: {
                type: Number,
                default: 1
            }
        },
        mounted () {
            //console.log(this.pageNum);
        },
        methods: {
            currentChange (index) {
                this.$emit('currentChange', index)
            }
        },
        components: {
            pagination
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../assets/css/color.scss";
    .tripEditPagination{
        text-align: right;
        padding: 20px 0;
    }
</style>