<template>
  <div class="creatTrip">
    <p class="componTitle">创建新行程</p>
    <div class="tripInner">
      <creat-trip @listenChild="childMsg"></creat-trip>
    </div>
  </div>
</template>
<script>
import creatTrip from "@/components/creatTrip";
export default {
  components: {
    creatTrip
  },
  created () {
    this.resetStatus();
  },
  methods: {
    childMsg(val){
      if(val=='200'){
        /* this.$router.push({
            name: 'tripEdit',params:{id:res.item.id}
        }) */
        this.$store.dispatch('newTripStatus', val);
      }
    },
    /* 进入页面重置vuex里面的状态 */
    resetStatus(){
      this.$store.dispatch('newTripStatus', 0);
    }
  }
};
</script>
<style scoped lang="scss">
@import "../../../assets/css/color.scss";
.creatTrip {
  margin-left: 8%;
}
.componTitle {
  font-size: 18px;
  color: $_fond6;
  margin-bottom: 60px;
  margin-top: 45px;
}
.creatTrip .creatTripCompon{
  padding: 0;width: 95%;
}
</style>
