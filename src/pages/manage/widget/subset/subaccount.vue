<template>
    <div class="subaccount">
        <ul class="itemInner clearfix" :class="isSubaccent" v-if="isSubaccent">
            <li class="serialNumber">序号</li>
            <li class="accountName">子账户名称</li>
            <li class="creationTime">创建时间</li>
            <li class="operation">操作</li>
        </ul>
        <happy-scroll resize size="2" color="rgba(51,51,51,0.2)">
            <ul style="max-height:120px">    
                <li class="itemList clearfix" v-for="(item,idx) in response" :key="idx" >
                    <span class="serialNumberVal">{{idx+1}}</span>
                    <span class="accountNameVal">{{item.realname}}</span>
                    <span class="creationTimeVal">{{ item.createTime | fromatDate }}</span>
                    <span class="operationVal" :class="{operationClk:idx==clickId}" @click="dialogForm(item.id,idx)"><i></i></span>
                </li>
            </ul>
        </happy-scroll>
        <div class="creatSubaccount">
            <p class="creatTitle">新建子账户</p>
            <frame @listenChild="childMsg" :id="creatSubNameId" :name="creatSubName" :onlyRead='unreal' :placeholderVal="creatSubNamePlace" />
            <frame @listenChild="childMsg" :id="creatSubPswdId" :name="creatSubPswd" :inputType="pswd" :onlyRead='unreal' :placeholderVal="creatSubPswdPlace" />
            <frame @listenChild="childMsg" :id="creatSubPswdAgainId" :name="creatSubPswdAgain" :inputType="pswd" :onlyRead='unreal' :placeholderVal="creatSubPswdAgainPlace" />
            <el-button @click="dataSave" class="save" :plain="true" type="warning">保存</el-button>
        </div>
        <el-dialog title="修改子账户密码" :visible.sync="dialogContent" center>
          <div class="dialogForm">
            <frame @listenChild="childMsg" :id="updateSubPswdId" :name="updateSubPswd" :inputType="pswd" :onlyRead='unreal' :placeholderVal="updateSubPswdPlace" />
            <frame @listenChild="childMsg" :id="updateSubAgainPswdId" :name="updateSubAgainPswd" :inputType="pswd" :onlyRead='unreal' :placeholderVal="updateSubAgainPswdPlace" />
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogContent = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormCommit">确 定</el-button>
          </div>
      </el-dialog>
  </div>
</template>
<script>
import api from "@/handler/tranfer";
import Frame from "@/components/frame";
import {HappyScroll} from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
import moment from "moment";
import { Button, Message, Dialog, Form } from "element-ui";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["newSubaccountStatus"]),
    isSubaccent(){
      //console.log(this.response)
      if(this.response.length){
        return true
      }
    }
  },
  created() {
    /* 子账户列表 */
    this.$_fetchData();
  },
  data() {
    return {
      /* 创建----新账号名 */
      creatSubName: "新子账户用户名",
      creatSubNameVal: "",
      creatSubNamePlace: "请输入子账户名称",
      creatSubNameId: "creatSubName",
      /* 创建----新账号密码 */
      creatSubPswd: "新子账户密码",
      creatSubPswdVal: "",
      creatSubPswdPlace: "请输入子账户密码",
      creatSubPswdId: "creatSubPswd",
      /* 创建----新账号密码再次输入 */
      creatSubPswdAgain: "确认新子账户密码",
      creatSubPswdAgainVal: "",
      creatSubPswdAgainPlace: "请再次输入子账户密码",
      creatSubPswdAgainId: "creatSubPswdAgain",
      /* 修改----子账号密码 */
      updateSubPswd: "新密码",
      updateSubPswdId: "updateSubPswd",
      updateSubPswdVal: "",
      updateSubPswdPlace: "请输入子账户密码",
      /* 修改----子账号密码再次输入 */
      updateSubAgainPswd: "确认密码",
      updateSubAgainPswdId: "updateSubAgainPswd",
      updateSubAgainPswdVal: "",
      updateSubAgainPswdPlace: "请再次输入子账户密码",
      unreal: false,
      response: "",
      pswd: "password",
      dialogContent: false,
      clickedSubId: "",
      clickId: null
    };
  },
  methods: {
    dialogFormCommit() {
      if (!this.updateSubPswdVal.length || this.updateSubPswdVal.length < 6) {
        Message({
          showClose: true,
          message: "子账户密码不能为空且长度不能少于6位",
          type: "error"
        });
        return false;
      } else if (
        !this.updateSubAgainPswdVal ||
        this.updateSubAgainPswdVal != this.updateSubPswdVal
      ) {
        Message({
          showClose: true,
          message: "请再次输入子账户密码或两次输入不一致",
          type: "error"
        });
        return false;
      } else {
        this.dialogContent = false;
        let params = {
          userId: this.clickedSubId,
          password: this.updateSubPswdVal,
          passwordconfirm: this.updateSubAgainPswdVal
        };
        api.post("/manage/updateSubPswd", params).then(res => {
          if (res.rescode == "200") {
            Message({
              showClose: true,
              message: "修改成功...",
              type: "success"
            });
          }
        });
      }
    },
    dialogForm(subId, idx) {
      this.clickedSubId = subId;
      this.dialogContent = true;
      this.clickId = idx;
    },
    dataSave() {
      if (!this.creatSubNameVal) {
        Message({
          showClose: true,
          message: "子账户名称不能为空",
          type: "error"
        });
        return false;
      } else if (!this.creatSubPswdVal || this.creatSubPswdVal.length < 6) {
        Message({
          showClose: true,
          message: "子账户密码不能为空且长度要多于6位",
          type: "error"
        });
        return false;
      } else if (this.creatSubPswdAgainVal != this.creatSubPswdVal) {
        Message({
          showClose: true,
          message: "两次输入密码不一致",
          type: "error"
        });
        return false;
      } else {
        let params = {
          name: this.creatSubNameVal,
          password: this.creatSubPswdAgainVal
        };
        api.post("/manage/addSubaccount", params).then(res => {
          if (res.rescode == "200") {
            this.$store.dispatch(
              "newSubaccountStatus",
              res.rescode
            ); /* 保存新子账户状态 */
            Message({
              showClose: true,
              message: "添加成功，请稍后...",
              type: "success"
            });
          }
        });
      }
    },
    $_fetchData() {
      api.get("/manage/subaccount").then(res => {
        this.response = res.items;
      });
    },
    childMsg: function(msg) {
      let name = msg.key + "Val";
      this[name] = msg.val;
    }
  },
  watch: {
    newSubaccountStatus(a, b) {
      if (a.val == "200") {
        this.$_fetchData();
      }
    },
    dialogContent(a, b) {
      if (!a) {
        this.clickId = null;
      }
    }
  },
  components: {
    HappyScroll,
    Frame,
    Message,
    elButton: Button,
    elForm: Form,
    elDialog: Dialog
  }
};
</script>
<style scoped lang='scss'>
@import "../../../../assets/css/color.scss";
.subaccount {
  width: 98%;
}
.itemInner {
  margin-bottom: 20px;
}

.itemInner li {
  color: $_fond6;
  font-size: 14px;
  float: left;
  width: 20%;
  text-align: center;
}
.itemInner li.accountName,
.itemInner li.creationTime {
  width: 28%;
}
.itemList {
  background: #f4f4f4;
  height: 30px;overflow: hidden;
  line-height: 30px;
  color: $_fond9;
  font-size: 0;
  margin-bottom: 2px;
}
.itemList span {
  width: 20%;
  height: 100%;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.itemList span.accountNameVal,
.itemList span.creationTimeVal {
  width: 28%;
}
.creatSubaccount {
  margin-top: 42px;
  font-size: 16px;
  color: $_fond6;
}
.creatTitle {
  margin-bottom: 45px;
}
.save {
  width: 140px;
  margin: 0 auto;
  display: block;
}
.dialogForm {
  margin: 0 40px;
}
.operationVal i {
  display: inline-block;
  background-image: url("../../images/more.png");
  background-repeat: no-repeat;
  background-position: 50%;
  background-position: 50%;
  cursor: pointer;
  width: 14px;
  height: 12px;
  -webkit-transition: all .5s ease-in-out;
  -moz-transition: all .5s ease-in-out;
  -ms-transition: all .5s ease-in-out;
  transition: all .5s ease-in-out;
}
.operationClk i {
  -webkit-transform: rotateZ(90deg);
  -moz-transform: rotateZ(90deg);
  -ms-transform: rotateZ(90deg);
  transform: rotateZ(90deg);
}
</style>
<style>

.creatSubaccount .frame span{
  width:145px;
}
</style>
