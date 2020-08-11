<template>
    <transition name="c-m-fade">
        <div
            :style="{left: position.x + 'px', top: position.y + 'px'}"
            ref="contentMenu"
            tabindex="100"
            @blur="onBlur"
            class="content-menu native light" v-show="isShow">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
  export default {
    name: "content-menu",
    props: {
      isChild: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        show: false,
        position: {
          x: 0,
          y: 0
        },
      }
    },
    methods: {
      // 打开菜单
      activeMenu(position = {x: 0, y: 0}) {
        let viewSize = this.$viewTool.getGlobalViewSize()
        setTimeout(()=>{
          this.$refs.contentMenu.focus()
        }, 100)

        this.show = true
        this.position.x = position.x
        this.position.y = position.y - 26

        console.log(
          position,
          viewSize
        )
      },
      onBlur() {
        this.show = false
      }
    },
    computed: {
      isShow() {
        return this.isChild ? true : this.show
      }
    }
  }
</script>

<style lang="scss">
    .c-m-fade-enter-active, .c-m-fade-leave-active {
        transition: opacity .3s;
    }
    .c-m-fade-enter, .c-m-fade-leave-to {
        opacity: 0;
    }
    .content-menu {
        position: absolute;
        width: 280px;
        border-radius: 6px;
        backdrop-filter: blur(6px);
        box-sizing: border-box;
        padding: 10px 0;
    }
    .content-menu:focus {
        outline: none;
    }
    .content-menu.light {
        background-color: rgba(255, 255, 255, .7);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .3);
    }
    .content-menu.dark {
        background-color: rgba(3, 3, 3, .7);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .3);
    }
</style>
