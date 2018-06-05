<template>
  <div class="update clearfix">
    <div class="companyLogo fl">
      <img :src="logoImg || defaultLogo"  alt="">
      <span>点击上传</span>
<!--       <form id="uploadform" method="POST" enctype="multipart/form-data" action="/api/transfer/manage/imgLib" ref="uploadform">
 -->      
        <div class="file_box">
          <input class="file" name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="uploadImg"/>
        </div>  
<!--       </form>  
 -->    </div>
    <div class="componyInfo fl">
      <frame :name="componyName" :onlyRead='real' :placeholderVal="componyNameVal" />
      <frame :name="brandName" :onlyRead='real' :placeholderVal="brandNameVal" />
      <frame @listenChild="childMsg" :id="contactTelId" :name="contactTel" :onlyRead='unreal' :placeholderVal="contactTelVal" />
      <frame @listenChild="childMsg" :id="contactEmailId" :name="contactEmail" :onlyRead='unreal' :placeholderVal="contactEmailVal" />
      <frame @listenChild="childMsg" :id="contactNameId" :name="contactName" :onlyRead='unreal' :placeholderVal="contactNameVal" />
      <frame @listenChild="childMsg" :id="componyAddressId" :name="componyAddress" :onlyRead='unreal' :placeholderVal="componyAddressVal" />
      <el-button @click="dataSave" class="save" :plain="true" type="warning">保存</el-button>
    </div>
  </div>
</template>
<script>
import { Button, Message, Upload } from "element-ui";
import { mapGetters } from "vuex";
import axios from "axios";
import api from "@/handler/tranfer";
import Frame from "@/components/frame";
export default {
  created() {
    this.defaultInfo(this.member)
  },
  data() {
    return {
      logoImg: "",
      defaultLogo:"../../images/sideLogo.png",
      componyName: "公司名称",
      componyNameVal: "",
      componyNameId: "componyName",
      brandName: "品牌名称",
      brandNameVal: "",
      brandNameId: "brandName",
      contactTel: "联系电话",
      contactTelVal: "",
      contactTelId: "contactTel",
      contactEmail: "联系邮箱",
      contactEmailVal: "",
      contactEmailId: "contactEmail",
      contactName: "联系人",
      contactNameVal: "",
      contactNameId: "contactName",
      componyAddress: "公司地址",
      componyAddressVal: "",
      componyAddressId: "componyAddress",
      real: true,
      unreal: false,
      files: "",
      serverLogoImgUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    dataSave() {
      if (!this.contactTelVal || !/^1[34578]\d{9}$/.test(this.contactTelVal)) {
        Message({
          showClose: true,
          message: "联系电话不能为空或手机号码格式错误",
          type: "error"
        });
        return false;
      } else if (
        !this.contactEmailVal ||
        !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(
          this.contactEmailVal
        )
      ) {
        Message({
          showClose: true,
          message: "联系邮箱不能为空或邮箱格式错误",
          type: "error"
        });
        return false;
      } else if (!this.contactNameVal) {
        Message({
          showClose: true,
          message: "联系人不能为空",
          type: "error"
        });
        return false;
      } else if (!this.componyAddressVal) {
        Message({
          showClose: true,
          message: "公司地址不能为空",
          type: "error"
        });
        return false;
      } else {
        let params = {
          mobileNumber: this.contactTelVal,
          address: this.componyAddressVal,
          email: this.contactEmailVal,
          realname: this.contactNameVal
        };
        this.$_fetchData(params);
      }
    },
    $_fetchData(params) {
      let isPass = this.contrast(params);
      if (isPass || this.logoImg != this.member.logoImg) {
        this.serverLogoImgUrl
          ? (params.logoImg = this.serverLogoImgUrl)
          : (params.logoImg = this.member.logoImg);
        api.post("/manage/update", params).then(res => {
          if(res.rescode=='200'){
            Message({
              showClose: true,
              message: "提交成功，请稍候...",
              type: "success"
            });
            /* 修改信息后，同步vuex里面的数据，下次登录时会获取真正的后台数据 */
            this.$store.dispatch('vuexSyncData', params);
            this.defaultInfo(this.member);
          }
        });
      } else {
        Message({
          showClose: true,
          message: "未修改任何数据，请勿重复提交",
          type: "warning"
        });
      }
    },
    /* 上传头像 */
    uploadImg(e) {
      //console.log(e)
      let file = e.target.files[0] || e.target.files;
      let reader = new FileReader();
      reader.onload = e => {
        var path = e.target.result;
        this.logoImg = path;
      };
      this.files = file;
      //console.log(this.files)
      reader.readAsDataURL(file);
      let formData = new FormData(); //创建form对象
      formData.append("logoImg", this.files, this.files.name); //通过append向form对象添加数据
      api.post("/manage/imgLib", formData).then(res => {
          //console.log(res);
          this.serverLogoImgUrl = res.items[0].destUrl;
          //console.log(this.serverLogoImgUrl);
        })
        .catch(error => {
          console.log(error);
        });
    },
    /* 对比提交的修改和本地是否一致，防止恶意请求 ,一致为0，表示不可请求*/
    contrast(params) {
      //console.log("对比提交的修改", params);
      let arr1 = [
        params.mobileNumber,
        params.address,
        params.realname,
        params.email
      ];
      let arr2 = [
        this.member.mobileNumber,
        this.member.address,
        this.member.realname,
        this.member.email
      ];
      if (JSON.stringify(arr1) == JSON.stringify(arr2)) {
        return 0;
      } else {
        return 1;
      }
    },
    childMsg: function(msg) {
      let name = msg.key + "Val";
      this[name] = msg.val;
    },
    /* 默认信息 */
    defaultInfo(member){
      this.logoImg =
      member && member ? member.logoImg : member.logoImg;
    this.componyNameVal = member.companyName;
    this.brandNameVal = member.brandName;
    this.contactTelVal = member.mobileNumber;
    this.contactEmailVal = member.email;
    this.contactNameVal = member.realname;
    this.componyAddressVal = member.address;
    }
  },
  computed: {
    ...mapGetters(["member"])
  },

  components: {
    elButton: Button,
    elUpload: Upload,
    Message,
    Frame
  },
  name: "update"
};
</script>

<style scoped lang="scss">
@import "../../../../assets/css/color.scss";
.itemName {
  font-size: 14px;
  padding-right: 12px;
  color: $_fond6;
}
.companyLogo {
  width: 13%;
  position: relative;
}
.companyLogo img {
  width: 81px;
  height: 81px;
  border-radius: 50%;
  margin-bottom: 7px;
}
.companyLogo span {
  font-size: 14px;
  color: $_fond9;
  padding-left: 10px;
}
.componyInfo {
  width: 85%;
}

.save {
  width:170px;
  margin: 0 auto;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.file {
  width: 81px;
  height: 81px;
  position: absolute;
  top: 0;
  opacity: 0;
  left: 0;
}
.file_box{
  position: absolute;
  top: 0;
  left: 0;
  width: 82px;
  height: 82px;
  border: 1px solid #E5E5E5;
}
</style>
<style>

.update .frame span{
  width:90px;
}
</style>
