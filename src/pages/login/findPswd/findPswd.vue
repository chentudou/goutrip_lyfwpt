<template>
  <div class="findPswd" :style="{'height':winH+'px'}">
      <public-head></public-head>
      <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
      </div>
      <public-foot></public-foot>
  </div>
</template>
<script>
import Head from "@/components/head";
import Foot from "@/components/foot";
export default {
  name: "findPswd",
  components: {
    publicHead: Head,
    publicFoot: Foot
  },
  data() {
    return {
      winH: ""
    };
  },
  created() {
    this.setHeight();
  },
  methods: {
    setHeight: function() {
      this.winH = window.innerHeight;
    }
  }
};
</script>
<style scoped>
@import "./findPswd.css";
</style>