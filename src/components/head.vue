<template>
<div class="header">
    <div class="head clearfix w1000">
      <router-link class="fl" :to="{}">
          <img class="headLogo " src="./images/img_logo.png" alt="">
      </router-link>
      <span class="fl headTitle">行程制作</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'headerMaking',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headLogo{
  width:210px;height: 40px;margin: 10px 10px 10px 0;
  }
.headTitle{
  font-size: 24px;color: #fff;line-height: 24px;margin: 15px 0;border-left: 2px solid #fff;padding-left:12px; 
}  
/* .w1000 {
  width: 1000px;margin: auto;
} */
.header {
  height: 60px;
  background: rgba(0,0,0,.4);
  padding-right: 64px;
  width: 100%;
  position: absolute;
  z-index: 99;
  padding-left: 350px;
}
</style>
