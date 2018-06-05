<template>
    <p class="frame" >
        <span>{{name}}：</span>
        <input :class="{only:onlyRead}" @blur="outwardMsg" v-model="modelVal" :type="inputType" :placeholder="placeholderVal" :readonly="onlyRead">
    </p>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["newSubaccountStatus", "newTripStatus"])
  },
  watch: {
    newSubaccountStatus(a) {
      if (a.val == "200") {
        this.modelVal = "";
      }
    },
    newTripStatus(a) {
      if (a.val == "200") {
        this.modelVal = "";
      }
    }
  },
  created() {
    this.resetStatus();
  },
  props: {
    name: String,
    onlyRead: {
      type: Boolean,
      default: false
    },
    inputType: {
      type: String,
      default: "text"
    },
    placeholderVal: String,
    id: String
  },
  data() {
    return {
      modelVal: ""
    };
  },
  methods: {
    /* 失去焦点是向外传递输入框里的内容 */
    outwardMsg() {
      let params = {
        key: this.id,
        val: this.modelVal
      };
      this.$emit("listenChild", params);
    },
    /* 重置新子账户、新行程的状态 */
    resetStatus() {
      this.$store.dispatch("newSubaccountStatus", 0);
      this.$store.dispatch("newTripStatus", 0);
    }
  }
};
</script>
<style scoped lang="scss">
 @import "../assets/css/color.scss";
.frame {
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding-bottom: 12px;
  margin-bottom: 60px;
}
.frame:last-child {
  margin-bottom: 30px;
}
span {
  font-size: 14px;
  padding-right: 12px;
  color: $_fond6;display: inline-block;
}
input {
  border: 0;
  width: 82%;
  font-size: 14px;
  vertical-align: top;
  height: 21px;
}
.only::-webkit-input-placeholder{
  color: #333!important;
}
.only:-moz-placeholder{
  color: #333!important;
}
.only::-moz-placeholder{
  color: #333!important;
}

</style>
