<template>
    <div
        @mousedown="dragMouseDown"
        class="draggable">

        <slot></slot>

        <div class="app-ghost" v-show="ghostShow" :style="ghostStyle">
            <div
                 class="ghost-img"
                 :style="{backgroundImage: `url(toto://${img})`}">
            </div>
        </div>
    </div>
</template>

<script>
  import tween from '@tweenjs/tween.js'

  export default {
    name: "draggable",
    props: {
      img: {
        type: String
      }
    },
    computed: {
      ghostStyle() {
        return {
          left: this.save.now.x + 'px',
          top: this.save.now.y + 'px',
          transform: `rotate(${this.save.deg}deg)`
        }
      }
    },
    data() {
      return {
        isDown: false,
        ghostShow: false,

        event: {
          globalMouseMove: null,
          globalMouseUp: null,
        },

        save: {
          before: {
            x: 0
          },
          now: {
            x: 0,
            y: 0
          },
          deg: 0,
          beforeTime: null,
          baseDeg: 45,
          updateValue: -3,
          maxDeg: 80,
        },
        isUpdateValue: false
      }
    },
    mounted() {
      document.addEventListener('mousemove', this.event.globalMouseMove = this.globalMouseMove.bind(this))
      document.addEventListener('mouseup', this.event.globalMouseUp = this.globalMouseUp.bind(this))
    },
    methods: {
      dragMouseDown(e) {
        if(e.which === 1){
          this.isDown = true
          this.save.before.x = e.clientX
          this.$emit('draggable-mousedown')
        }
      },
      globalMouseMove(e) {
        if(this.isDown) {

          if(!this.isUpdateValue) {
            this.isUpdateValue = true
            this.updateV3()
            this.$emit('draggable-change', true)
          }

          this.ghostShow = true

          this.save.now.x = e.clientX
          this.save.now.y = e.clientY + 4

          this.save.deg += (this.save.now.x - this.save.before.x)

          if(this.save.deg >= this.save.baseDeg + this.save.maxDeg) {
            this.save.deg = this.save.baseDeg + this.save.maxDeg
          }
          if(this.save.deg <= this.save.baseDeg - this.save.maxDeg) {
            this.save.deg = this.save.baseDeg - this.save.maxDeg
          }

          this.save.before.x = this.save.now.x
        }
      },
      globalMouseUp() {
        if(this.isDown) {
          this.isDown = false

          this.isUpdateValue = false
          clearInterval( this.save.beforeTime )
          // this.tweenBottom()

          this.ghostShow = false
          this.save.deg = 0
          this.$emit('draggable-mouseup')
          this.$emit('draggable-change', false)
        }
      },


      tweenBottom() {

        let coords = {y: this.save.now.y}
        let target = this.save.now.y + 1000

        console.log(coords)
        console.log(target)

        let root = this
        function animate(time) {
          if(root.save.now.y <= target) {
            requestAnimationFrame(animate)
          }
          tween.update(time)
        }
        requestAnimationFrame(animate)

        new tween.Tween(coords) // Create a new tween that modifies 'coords'.
          .to({y: target}, 4000) // Move to (300, 200) in 1 second.
          .easing(tween.Easing.Sinusoidal.In) // Use an easing function to make the animation smooth.
          .onUpdate(() => {
            // Called after tween.js updates 'coords'.
            // Move 'box' to the position described by 'coords' with a CSS translation.
            console.log(coords.y, 'coords.y')
            this.save.now.y = coords.y
          }).start()

      },

      updateV3() {
        this.save.beforeTime = setInterval(()=>{

          // 这里的写法是故意产生抖动
          if(this.save.deg > this.save.baseDeg) {
            this.save.deg += this.save.updateValue
          } else if(this.save.deg <= this.save.baseDeg) {
            this.save.deg -= this.save.updateValue
          }

        }, 10)
      }
    },
    beforeDestroy() {
      document.removeEventListener('mousemove', this.event.globalMouseMove)
      document.removeEventListener('mouseup', this.event.globalMouseUp)
    }
  }
</script>

<style lang="scss">
    .draggable {
        position: relative;
        .app-ghost {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 4000;
            transform-origin: left top;

            .ghost-img {
                width: 100px;
                height: 100px;
                background-size: contain;
            }
        }
    }
</style>
