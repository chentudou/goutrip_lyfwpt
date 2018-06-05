<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./assets/css/color.scss";
  @import "./assets/css/public.css";
#app{
  position: relative;
    width: 100%;
    height: 100%;
}
.el-loading-spinner i{
  color: $_colorMain !important;
}
  .el-loading-spinner .el-loading-text{
    color: $_colorMain !important;
  }
</style>
