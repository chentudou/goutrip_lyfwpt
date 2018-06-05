<template>
  <div class = "box">
    <div id="ball"></div>
  </div>
</template>
<script>
import parabola from "@/handler/parabolaBall";
export default {
  props: {
    idx: Number
  },
  data() {
    return {
      balls: [],
      parabola: ""
    };
  },
  methods: {
    getAnimateTarget(ev) {
      let added = document.getElementById("addedList");//目标元素，用来获取定位
      let el = {
        x: ev.pageX,
        y: ev.pageY
      };
      let target = {
        x: this.getLeft(added),
        y: this.getTop(added) - 30
      };
      this.showFlyBall(el, target, added);
    },
    showFlyBall(el, target, added) {
      //console.log("eee:", el, target);
      let ball = document.getElementById("ball");
      ball.style.display = "block";
      ball.style.top = el.y + "px";
      ball.style.left = el.x + "px";
      let balls = this.balls;
      let newball = {
        id: new Date().getTime(),
        position: {
          x: el.x,
          y: el.y
        }
      };
      balls.push(newball);
      //console.log("balls:", balls);
      let options;
      this.parabola = new parabola(ball, added, options);
      this.parabola.run();
    },
    getLeft(dom) {
      let left = 0;
      let parent = dom;
      while (parent) {
        left += parent.offsetLeft;
        parent = parent.offsetParent;
      }
      return left;
    },
    getTop(dom) {
      let top = 0;
      let parent = dom;
      while (parent) {
        top += parent.offsetTop;
        parent = parent.offsetParent;
      }
      return top;
    }
  }
};
</script>

<style scoped>
#ball {
  position: fixed;
  width: 20px;
  z-index: 1998;
  height: 20px;
  border-radius: 50%;
  background-color: #fd9600;
  display: none;
}
.targetEle {
  width: 40 px;
  height: 40 px;
  background-color: yellowgreen;
  transform: translate (580 px, 600 px);
}
</style>