<template>
  <div class="error" :style="`height:${conHeight}px`">
        <p>您访问的页面不存在，<i>{{i}}</i>秒后自动跳转</p>
  </div>
</template>
<script>
export default {
    data () {
        return {
            conHeight:
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) - 60,
          i:3
        }
    },
  created () {
      setInterval(()=>{
          this.i--;
          if(!this.i) this.timingLink();
      },1000)
  },
  methods: {
      timingLink(){
          let loginStatus=sessionStorage.loginStatus;
          console.log("error--Page--11111111111",loginStatus)
          loginStatus?this.$router.push('/manage'):this.$router.push('/')
      }
  }
}
</script>
<style scoped>
.error{
    width:100%;
    background: url('./../assets/images/404.png');background-repeat: no-repeat;    background-size: 100%;
}
p{
    color:#fff;    position: absolute;
    top: 30%;
    left: 38%;
    font-size: 20px;
}
</style>
