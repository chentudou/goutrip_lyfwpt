<template>
  <div class="password">
        <frame @listenChild="childMsg" :id="oldPswdId" :name="oldPswd" :inputType="pswd" :onlyRead='unreal' :placeholderVal="oldPswdPlace" />
        <frame @listenChild="childMsg" :id="newPswdId" :name="newPswd" :inputType="pswd" :onlyRead='unreal' :placeholderVal="newPswdPlace" />
        <frame @listenChild="childMsg" :id="newPswdAgainId" :name="newPswdAgain" :inputType="pswd" :onlyRead='unreal' :placeholderVal="newPswdAgainPlace" />
        <el-button @click="dataSave" class="save" :plain="true" type="warning">保存</el-button>
  </div>
</template>
<script>
import api from "@/handler/tranfer";
import Frame from "@/components/frame";
import { Button, Message } from "element-ui";

export default {
  data() {
    return {
      /* 旧 */
      oldPswd: "原登录密码",
      oldPswdVal: "",
      oldPswdPlace: "请输入原登录密码",
      oldPswdId: "oldPswd",
      /* 新 */
      newPswd: "新登录密码",
      newPswdVal: "",
      newPswdPlace: "请输入新登录",
      newPswdId: "newPswd",
      /* 再次 */
      newPswdAgain: "确认新登录密码",
      newPswdAgainVal: "",
      newPswdAgainPlace: "请再次输入新登录密码",
      newPswdAgainId: "newPswdAgain",
      unreal: false,
      pswd: "password"
    };
  },
  methods: {
    dataSave() {
      if (!this.oldPswdVal) {
        Message({
          showClose: true,
          message: "原密码不能为空",
          type: "error"
        });
        return false;
      } else if (!this.newPswdVal || this.newPswdVal.length < 6) {
        Message({
          showClose: true,
          message: "新密码不能为空且长度要多于6位",
          type: "error"
        });
        return false;
      } else if (
        this.newPswdAgainVal != this.newPswdVal
      ) {
        Message({
          showClose: true,
          message: "两次输入密码不一致",
          type: "error"
        });
        return false;
      } else {
        let params = {
          oldPassword: this.oldPswdVal,
          password: this.newPswdAgainVal
        };
        api.post("/manage/updatePswd", params).then(res => {
          //console.log('111',res)
          if (res.rescode == "200") {
            Message({
              message: "修改成功，下次登录请使用新密码", 
              type: "success"
            });
          }
        });
      }
    },
    childMsg: function(msg) {
      let name = msg.key + "Val";
      this[name] = msg.val;
    }
  },
  components: {
    elButton: Button,
    Message,
    Frame
  }
};
</script>

<style scoped>
.password {
  padding-top: 35px;width: 98%;
}
.save {
  width: 140px;
  margin: 0 auto;
  margin-top: 170px;
  display: block;
}
</style>
<style>

.password .frame span{
  width:125px;
}
</style>