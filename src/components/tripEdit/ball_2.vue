<template>
  <div class="box">
    <transition
      v-for="(ball, index) in balls"
      :key="index"
      name="ballslist"
      @appear="appear"
      @after-appear="afterAppear">
      <div
        v-if="ball.show"
        class="ball"
        :data-id="ball.id"
        :style="{transform: `translate3d(${ball.x}px, ${ball.y}px, 0)`}"></div>
    </transition>
    <div class="targetEle"></div>
    <div id="addThis">b</div>
    <div id="addedList">a</div>
  </div>
</template>

<script>
import  parabola  from '@/handler/parabolaBall'
export default {
  name: 'flyball',
      
   /*  props:{
        target: {
            type: Object,
            default: {}
        },
        el: {
            type: Object,
            default: {}
        },
    }, */
  data () {
    return {
      balls: [],
      // 控制小球运动速度
      speed: 2,
      // 购物车坐标
      //target: {x: 600, y: 600},
      parabola:""
    }
  },
  mounted () {
    //this.click2Show()
    this.clickToShowFlyBall()
  },
  methods: {
      clickToShowFlyBall() {
        document.querySelector('body').addEventListener('click', (e)=> {
        this.showFlyBall(e)
        })
    },
    showFlyBall(e) {
        console.log('eee:', e.pageY, e.pageX);
        let dom=document.getElementById('addThis');
        dom.style.position='fixed';
        dom.style.top=e.pageY+"px";
        dom.style.left=e.pageX+"px";
        let balls = this.balls
        let newball ={
        id: new Date().getTime(),
        position: {
            x: e.pageX,
            y: e.pageY
        }
        }
        balls.push(newball);
        console.log('balls:',balls,);
        let options;
        
        let add=document.getElementById('addedList');
        this.parabola = new parabola(dom, add, options)
        this.parabola.run()
    }
  }
}
</script>

<style scoped>
.ball,#addThis{
  
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: skyblue;
}
#addedList {
  width: 40px;
  height: 40px;
  background-color: yellowgreen;
  transform: translate(580px, 600px);
}
</style>
