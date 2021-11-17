<template>
  <div
    id="floatball"
    class="floatball"
    :style="{ top: position.y + 'px', left: position.x + 'px' }"
    @mousedown="down"
    @touchstart.stop="down"
    @mousemove="move"
    @touchmove.stop="move"
    @mouseup="end"
    @touchend.stop="end"
  >
    奖励规则
  </div>
</template>

<script>
// 鼠标位置和div的左上角位置 差值
var dx, dy
var screenWidth = window.screen.width
var screenHeight = window.screen.height

export default {
  name: 'Ademo',
  data() {
    return {
      flags: false,
      position: {
        x: 320,
        y: 60,
      },
    }
  },

  methods: {
    // 实现移动端拖拽
    down(event) {
      this.flags = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      console.log('鼠标点所在位置', touch.clientX, touch.clientY)
      console.log('div左上角位置', event.target.offsetTop, event.target.offsetLeft)
      dx = touch.clientX - event.target.offsetLeft
      dy = touch.clientY - event.target.offsetTop
    },
    move() {
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        // 定位滑块的位置
        this.position.x = touch.clientX - dx
        this.position.y = touch.clientY - dy
        // 限制滑块超出页面
        // console.log('屏幕大小', screenWidth, screenHeight )
        if (this.position.x < 0) {
          this.position.x = 0
        } else if (this.position.x > screenWidth - touch.target.clientWidth) {
          this.position.x = screenWidth - touch.target.clientWidth
        }
        if (this.position.y < 0) {
          this.position.y = 0
        } else if (this.position.y > screenHeight - touch.target.clientHeight) {
          this.position.y = screenHeight - touch.target.clientHeight
        }
        //阻止页面的滑动默认事件
        document.addEventListener(
          'touchmove',
          function () {
            event.preventDefault()
          },
          false
        )
      }
    },
    //鼠标释放时候的函数
    end() {
      console.log('end')
      this.flags = false
    },
  },
}
</script>

<style>
.floatball {
  color: white;
  height: 50px;
  width: 50px;
  padding: 5px;
  z-index: 990;
  position: fixed;
  top: 60px;
  right: 320px;
  border-radius: 50%;
  background-color: rgba(29, 157, 237, 0.8);
}
</style>
