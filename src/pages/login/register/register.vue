<template>
  <div class="register" :style="`height:${conHeight}px`">
      <public-head></public-head>
      <div class="mainBody">
        <div class="companyRegister">
            <div class="opacityBg"></div>
            <p class="companyTit">企业注册</p>
            <form class="formBox">
                <div class="formItem clearfix">
                    <p class="iptName fl">公司名称</p>
                    <div class="inputBox fl">
                        <input type="text" v-model="companyName" :class="{errorShow:companyNameFrame}" placeholder="请输入公司名称">
                        <span class="errorTips">请填写公司名称</span>
                    </div>
                </div>
                <div class="formItem clearfix">
                    <p class="iptName fl">品牌名称</p>
                    <div class="inputBox fl">
                        <input type="text" v-model="brandName" :class="{errorShow:brandNameFrame}" placeholder="请输入品牌名称">
                        <span class="errorTips">请填写品牌名称</span>
                    </div>
                </div>
                <div class="formItem clearfix">
                    <p class="iptName fl">公司地址</p>
                    <div class="inputBox fl">
                        <textarea class="textareaStyle" v-model="companyAddress" :class="{errorShow:companyAddressFrame}" placeholder="(国家-城市-区域-街道-门牌号)"></textarea>
                        <span class="errorTips">请填写公司地址</span>
                    </div>
                </div>
                <div class="formItem clearfix">
                    <p class="iptName fl">联系人</p>
                    <div class="inputBox fl">
                        <input type="text" class="userName" v-model="userName" :class="{errorShow:userNameFrame}" placeholder="请输入真实名称">
                        <span class="errorTips">请填写联系人姓名</span>
                    </div>
                    <div class="fl chened">
                        <p class="inputRadio fl">
                            <input type="radio" name="sex" value="1" checked v-model="sex" id="male" >
                            <label for="male">先生</label>
                        </p>
                        <p class="inputRadio fl">
                            <input type="radio" name="sex" value="2" v-model="sex" id="female">
                            <label for="female">女士</label>
                        </p>
                    </div>
                </div>
                <div class="formItem clearfix">
                    <p class="iptName fl">联系电话</p>
                    <div class="inputBox fl">
                        <input type="text" v-model="commonTel" :class="{errorShow:commonTelFrame}" placeholder="请输入常用号码">
                        <span class="errorTips">请填写联系电话</span>
                    </div>
                </div>
                <div class="formItem clearfix">
                    <p class="iptName fl">联系邮箱</p>
                    <div class="inputBox fl">
                        <input type="email" v-model="commonEmail" :class="{errorShow:commonEmailFrame}" placeholder="请输入常用邮箱">
                        <span class="errorTips">请填写常用邮箱</span>
                    </div>
                </div>
                <div class="">
                    <div class="deal">
                        <label for="agree">
                            <input type="checkbox" id="agree" v-model="isAgree">
                            我已阅读并同意 
                            <el-button type="text" @click="registerAgreement = true">《中国旅游服务平台用户协议》</el-button>
                            及
                            <el-button type="text" @click="disclaimer = true">《免责声明》</el-button>
                    
                        </label>
                    </div>
                    <span id="insert" @click="register" type="submit" class="btn submitBtn checkedAgree">提交注册申请</span>
                </div>
                <transition name="fade">
                    <p v-show="controlErrMeg" class="prompt">{{errMeg}}</p>
                </transition>
            </form>
            <div class="companyLogin">
                <div class="loginBg">
                    <p></p>
                    已有企业账号？<router-link :to="{name:'login'}">立即登录</router-link>
                </div>
            </div>
        </div>
    </div>
    <public-foot></public-foot>
    <!--用户注册协议 模态框-->
    <el-dialog title="用户注册协议" :visible.sync="registerAgreement" width="40%" center>  
        <EasyScrollBar :barOption="scrollOption">
            <div class="wraper" style="max-height:300px">
                <div class="paragraphBox">
                    <div class="paragraph">
                        <p>
                            请务必认真阅读和理解本《用户服务协议》（以下简称《协议》）中规定的所有权利和限制。除非您接受本《协议》条款，否则您无权注册、登录或使用本协议所涉及的相关服务。您一旦注册、登录、使用或以任何方式使用本《协议》所涉及的相关服务的行为将视为对本《协议》的接受，即表示您同意接受本《协议》各项条款的约束。如果您不同意本《协议》中的条款，请不要注册、登录或使用本《协议》相关服务。</p>
                    </div>
                    <div class="paragraph">
                        <h3>一、总则</h3>
                        <p>1.1 中国旅游服务平台的所有权和运营权归北京汇智纵横信息技术有限公司所有。</p>
                        <p>1.2
                            用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与中国旅游服务平台之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。</p>
                        <p>1.3 本协议则可由中国旅游服务平台随时更新，用户应当及时关注并同意本平台不承担通知义务。本平台的通知、公告、声明或其它类似内容是本协议的一部分。</p>
                    </div>
                    <div class="paragraph">
                    <h3>二、服务内容</h3>
                    <p>2.1 中国旅游服务平台的具体内容由本平台根据实际情况提供。</p>
                    <p>2.2
                        本平台仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。</p>
                    </div>
                    <div class="paragraph">
                        <h3>三、用户帐号</h3>
                        <p>3.1 经本平台注册系统完成注册程序的用户即成为正式用户，可以获得本平台规定用户所应享有的一切权限。</p>
                        <p>3.2
                            用户只能按照注册要求使用公司名称、品牌名称、真实姓名及电话、邮箱注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本平台不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本平台。因黑客行为或用户的保管疏忽导致帐号非法使用，本平台不承担任何责任。</p>
                    </div>                                                
                    <div class="paragraph">
                        <h3>四、使用规则</h3>
                        <p>4.1
                            遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。 </p>
                        <p>4.2 用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在本平台任何页面发布、转载、传送含有下列内容之一的信息，否则本平台有权自行处理并不通知用户：</p>
                        <p>(1)违反宪法确定的基本原则的；</p>
                        <p>(2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；</p>
                        <p>(3)损害国家荣誉和利益的；</p>
                        <p>(4)煽动民族仇恨、民族歧视，破坏民族团结的；</p>
                        <p>(5)破坏国家宗教政策，宣扬邪教和封建迷信的；</p>
                        <p>(6)散布谣言，扰乱社会秩序，破坏社会稳定的；</p>
                        <p>(7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</p>
                        <p>(8)侮辱或者诽谤他人，侵害他人合法权益的；</p>
                        <p>(9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；</p>
                        <p>(10)以非法民间组织名义活动的；</p>
                        <p>(11)含有法律、行政法规禁止的其他内容的。</p>
                        <p>4.3
                            用户承诺对其发表或者上传于本平台的所有信息(即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等)均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成本平台被第三人索赔的，用户应全额补偿本平台一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)；</p>
                        <p>4.4
                            当第三方认为用户发表或者上传于本平台的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本平台发送权利通知书时，用户同意本平台可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本平台将不会自动恢复上述删除的信息；</p>
                        <p>(1)不得为任何非法目的而使用网络服务系统；</p>
                        <p>(2)遵守所有与网络服务有关的网络协议、规定和程序；</p>
                        <p>(3)不得利用本平台进行任何可能对互联网的正常运转造成不利影响的行为；</p>
                        <p>(4)不得利用本平台进行任何不利于本平台的行为。</p>
                        <p>4.5
                            如用户在使用网络服务时违反上述任何规定，本平台有权要求用户改正或直接采取一切必要的措施(包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利)以减轻用户不当行为而造成的影响。</p>
                    </div>                                   
                    <div class="paragraph">
                        <h3>五、隐私保护</h3>
                        <p>5.1 本平台不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本平台的非公开内容，但下列情况除外：</p>
                        <p>(1)事先获得用户的明确授权；</p>
                        <p>(2)根据有关的法律法规要求；</p>
                        <p>(3)按照相关政府主管部门的要求；</p>
                        <p>(4)为维护社会公众的利益。</p>
                        <p>5.2 本平台可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本平台同等的保护用户隐私的责任，则本平台有权将用户的注册资料等提供给该第三方。</p>
                        <p>5.3 在不透露单个用户隐私资料的前提下，本平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p>
                    </div>
                    <div class="paragraph">
                        <h3>六、版权声明</h3>
                        <p>6.1 本平台的文字、图片、音频、视频等版权均归北京汇智纵横信息技术有限公司享有，未经本平台许可，不得任意转载。</p>
                        <p>6.2 本平台特有的标识、版面设计、编排方式等版权均属北京汇智纵横信息技术有限公司享有，未经本平台许可，不得任意复制或转载。</p>
                        <p>6.3 恶意转载本平台内容的，本平台保留将其诉诸法律的权利。</p>
                    </div>
                    <div class="paragraph">
                        <h3>七、责任声明</h3>
                        <p>7.1 用户明确同意其使用本平台网络服务所存在的风险及一切后果将完全由用户本人承担，中国旅游服务平台对此不承担任何责任。</p>
                        <p>7.2 本平台无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。</p>
                        <p>7.3 本平台不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本平台实际控制的任何网页上的内容，本平台不承担任何责任。</p>
                        <p>7.4 对于因不可抗力或本平台不能控制的原因造成的网络服务中断或其它缺陷，本平台不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。</p>
                        <p>7.5 对于站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本平台无需承担任何责任：</p>
                        <p>(1)本平台向用户免费提供的各项网络服务；</p>
                        <p>(2)本平台向用户赠送的任何产品或者服务。</p>
                        <p>7.6 本平台有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本平台对用户和任何第三人均无需承担任何责任。</p>
                    </div>
                    <div class="paragraph">
                        <h3>八、附则</h3>
                        <p>8.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p>
                        <p>8.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p>
                        <p>8.3 本协议解释权及修订权归深圳北京汇智纵横信息技术有限公司所有。</p>
                    </div>
                </div>
            </div>           
        </EasyScrollBar>
        <span slot="footer" class="dialog-footer">
            <el-button class="haveRead" type="primary" @click="registerAgreement= false">我已阅读</el-button>
        </span>
    </el-dialog>
    <!--免责声明 模态框-->
    <el-dialog title="免责声明" :visible.sync="disclaimer" width="40%" center>
        <EasyScrollBar :barOption="scrollOption">
            <div class="wraper" style="max-height:300px">
            <div class="paragraphBox">
                <div class="paragraph">
                    <p>
                        1、中国旅游服务平台不承担由于用户自身过错、技术或其它不可控原因（包括因互联网本身的原因以及黑客入侵等原因）导致网站页面信息或其它方面的错误而给用户造成的损失，除非现行的法律法规另有明文规定。但本网站将尽力减少因此而给用户造成的损失和影响；</p>
                </div>
                <div class="paragraph">
                    <p>
                        2、为方便用户（包括企业或个人，下同），本网站内设有与其它网站或网页的链接，但本网站不保证所设置的外部链接的准确性和完整性，亦并不对这些网站或网页进行维护，用户启用该网站或网页链接所产生的一切风险，本网站概不承担法律责任；</p>
                </div>
                <div class="paragraph">
                    <p>3、如果本网站的服务内容与中国旅游服务平台的相关规章、规定及与客户签订的合同、向客户发出的通知、须知等内容不符或相冲突的，以该相关规章、规定、合同、通知、须知为准。</p>
                </div>
                <div class="paragraph">
                    <p>4、中国旅游服务平台不保证为了向您提供便利而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由中国旅游服务平台实际控制的任何网页上的内容，中国旅游服务平台不承担任何责任。</p>
                </div>
                <div class="paragraph">
                    <p>
                        5、您完全理解并同意，您通过中国旅游服务平台预订碎片化旅游产品或服务或此后新的产品和服务，应按照相关网页中展示的说明、规定或政策等履行相关义务，享有相关权利，该等说明、规定或政策等与本服务协议共同构成您和中国旅游服务平台的整体协议，您必须严格遵守。</p>
                </div>
                <div class="paragraph">
                    <p>
                        6、您完全理解并同意，您通过去中国旅游服务平台预订现有旅游产品或服务或此后新的产品和服务时，您在预定产品或服务后应当按中国旅游服务平台站说明及时付款；您在预定产品或服务后未全额支付前，您尚未完成购买上述产品或服务。因上述产品或的服务的价格、舱位、数量或库存等实时更新或变化而造成您的额外费用、损失或无库存等，由您自行承担，中国旅游服务平台不承担任何责任。您完全理解并同意，您在支付过程中，因网络中断、银行反馈信息错误等非中国旅游服务平台的原因造成的付款失败，由您自行承担，中国旅游服务平台不承担任何责任。</p>
                </div>
                <div class="paragraph">
                    <p>
                        7、请您及时保存或备份您的交易信息、文字、图片等其他信息，您完全理解并同意，由于中国旅游服务平台储存设备有限、设备故障、设备更新或设备受到攻击等设备原因或人为原因，您使用网路服务储存的信息或数据等全部或部分发生删除、毁损、灭失或无法恢复的风险，均由您须自行承担，中国旅游服务平台不承担任何责任。</p>
                </div>
                <div class="paragraph">
                    <p>
                        8、不论在何种情况下，中国旅游服务平台均不对由于信息网络正常的设备维护，信息网络连接故障，电脑、通讯或其他系统的故障，黑客，电脑病毒，电力故障，罢工，劳动争议，暴乱，起义，骚乱，生产力或生产资料不足，火灾，洪水，风暴，爆炸，战争，政府行为，司法行政机关的命令，第三方原因等其他中国旅游服务平台不能预测或控制的行为而造成的不能服务或延迟服务承担责任，但将尽力减少因此而给您造成的损失和影响。</p>
                </div>
                <div class="paragraph">
                    <p>
                        9、任何单位或个人认为通过中国旅游服务平台的内容可能涉嫌侵犯其合法权益，应该及时向中国旅游服务平台或服务网站书面反馈，并提供身份证明、权属证明及详细侵权情况证明，中国旅游服务平台在收到上述法律文件后，将会尽快移除被控侵权内容。</p>
                </div>
                <div class="paragraph">
                    <p>本声明适用中华人民共和国法律。如其中任何条款与中华人民共和国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它条款依旧具有法律效力。我们保留随时更改上述免责声明的权利。</p>
                </div>    
            </div>
            </div>           
        </EasyScrollBar>
            <span slot="footer" class="dialog-footer">
                <el-button class="haveRead" type="primary" @click="disclaimer = false">我已阅读</el-button>
            </span>
    </el-dialog>     
<!--5.16双双新增 结束-->  
</div>
</template>
<script>
import Head from "@/components/head";
import Foot from "@/components/foot";
import api from "@/handler/tranfer";
import { Button, Dialog ,Message } from "element-ui";
import EasyScroll from "easyscroll";

export default {
  name: "register",
  components: {
    publicHead: Head,
    elButton: Button,
    elDialog: Dialog,
    EasyScrollBar: EasyScroll,
    publicFoot: Foot
  },
  data() {
    return {
      companyName: "",
      brandName: "",
      companyAddress: "",
      userName: "",
      sex: "1",
      commonTel: "",
      commonEmail: "",
      companyNameFrame: false,
      brandNameFrame: false,
      companyAddressFrame: false,
      userNameFrame: false,
      commonTelFrame: false,
      commonEmailFrame: false,
      isAgree: true,
      controlErrMeg: false,
      errMeg: "",
      disclaimer: false,
      registerAgreement: false,
      scrollOption: {
        barColor: "#959595", //滚动条颜色
        barWidth: 6, //滚动条宽度
        railColor: "#eee",
        barMarginRight: 0, //垂直滚动条距离整个容器右侧距离单位（px）
        barMaginBottom: 0, //水平滚动条距离底部距离单位（px)
        barOpacityMin: 0.3, //滚动条非激活状态下的透明度
        zIndex: "auto", //滚动条z-Index
        autohidemode: true
      },
      conHeight:
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight),
    };
  },
  methods: {
    register: function() {
      if (!this.companyName) {
        this.prompt("公司名称不能为空", "companyNameFrame");
        return false;
      } else if (!this.brandName) {
        this.prompt("品牌名称不能为空", "brandNameFrame");
        return false;
      } else if (!this.companyAddress) {
        this.prompt("公司地址不能为空", "companyAddressFrame");
        return false;
      } else if (!this.userName) {
        this.prompt("联系人姓名不能为空", "userNameFrame");
        return false;
      } else if (!this.commonTel || !/^1[34578]\d{9}$/.test(this.commonTel)) {
        this.prompt("联系电话不能为空或格式错误", "commonTelFrame");
        return false;
      } else if (
        !this.commonEmail ||
        !/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
          this.commonEmail
        )
      ) {
        this.prompt("联系邮箱不能为空或格式错误", "commonEmailFrame");
        return false;
      } else if (!this.isAgree) {
        this.prompt("请阅读《中国旅游服务平台用户协议》和《免责声明》，并同意");
        return false;
      } else {
        let params = {
          companyName: this.companyName,
          brandName: this.brandName,
          address: this.companyAddress,
          contactName: this.userName,
          sex: this.sex,
          mobile: this.commonTel,
          email: this.commonEmail
        };
        api.post("/login/register", params).then(res => {
          //console.log(res);
          if (res.rescode == "200") {
            Message({
                type:"success",
                message:"申请已提交，客服将在48小时内审核，请耐心等待。"
            });
            setTimeout(()=>{
                console.log("register---44444");
                 this.$router.push({ path: "/" });
            },3000)
          }
        });
      }
    },
    //错误提示
    prompt: function(msg, el) {
      this.controlErrMeg = true;
      this.errMeg = msg;
      this[el] = true;
      //console.log(this[el]);
      setTimeout(() => {
        this.controlErrMeg = !this.controlErrMeg;
        this.errMeg = "";
        this[el] = false;
      }, 3000);
    }
  }
};
</script>
<style scoped>
@import "./register.css";
</style>
   