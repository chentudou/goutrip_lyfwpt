<template>
    <div class="tabs">
        <!--tab切换的标题部分的内容-->
        <div :class="['title', 'clearfix', { typeBorder: type === 'border' }, { typeBackground: type === 'background' }]">
            <div
                :class="['titleItem',  'fl', { active: index === titleActive }]"
                :style="'width: ' + 100 / tabData.length + '%;'"
                v-for="(item, index) in tabData"
                :key="index"
                @click.stop="changeIndex(index)"
            >{{ itemName(index) }}</div>
        </div>
        <!--
            tab切换内容部分的内容
            会生成和标题数量一样的插槽,并且都是具名插槽
            调用的时候直接调用插槽名就是里面的内容
        -->
        <div class="content">
            <div
                v-show="index === titleActive"
                v-for="(item, index) in tabData"
            >
                <slot class="tabsCenter" :name="item.contentSlot || 'tabcenter' + index"></slot>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                msg: 'tab切换',
                titleActive: 0,
            }
        },
        props: {
            // 标题的类型，背景的还是下划线的----border或者background
            type: {
                type: String,
                default: 'border'
            },
            titleIndex: {
                type: Number,
                default: 0
            },
            // 标签之间是否增加分割线
            splitLine: {
                type: Boolean,
                default: false
            },
            // 内容，可以是数组或者对象，
            tabData: {
                type: [Object, Array],
                default: []
            },
            // 如果内容是对象，需要这个参数，告知需要显示的key
            showName: {
                type: String,
                default: ''
            }
        },
        create () {
            this.titleActive = this.titleIndex
        },
        watch: {
            titleActive (val) {
                this.$emit('changeIndex', val)
            }
        },
        methods: {
            itemName (index) {
                const va = this.tabData[index][this.showName]
                return va
            },
            changeIndex (index){
                this.titleActive = index
            }
        }
    }
</script>
<style scoped lang="scss">
    @import "../../static/color.scss";
    .tabs{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .title{
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid $_borderMain;
        position: relative;
        z-index: 10;
    }
    .titleItem{
        height: 100%;
        text-align: center;
        cursor: pointer;
    }
    .typeBorder{
        .active{
            border-bottom: 2px solid $_colorMain;
        }
    }
    .typeBackground{
        .active{
            background: $_colorMain;
            color: $_fontf;
        }
    }
    .content{
        width: 100%;
        position: absolute;
        top: 0;
        padding-top: 50px;
        bottom: 0;
        >div{
            width: 100%;
            height: 100%;
        }
    }
</style>