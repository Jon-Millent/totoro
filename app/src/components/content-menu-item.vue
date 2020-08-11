<template>
    <div
        class="content-menu-item"
        @mousedown="onMouseClick"
        @mouseleave="onMouseLeave"
        @mouseenter="onMouseEnter">
        <div class="content-target" :class="getEnterClass">
            <div class="l-con">
                <div class="con-icon"></div>
                <div class="con-label">{{label}}</div>
            </div>

            <div class="r-con">
                <a-icon type="caret-right" :class="subColor" v-if="children" />
            </div>
        </div>

        <div class="children-layer" v-if="children" v-show="childrenDisplay">
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "content-menu-item",
    props: {
      label: {
        type: String
      },
      icon: {
        type: String
      },
      children: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        childrenDisplay: false,
        isEnter: false
      }
    },
    computed: {
      subColor() {
        return 'sub-light'
      },
      getEnterClass() {
        return this.isEnter ? 'active' : ''
      }
    },
    methods: {
      onMouseEnter() {
        if( this.children ) {
          this.childrenDisplay = true
        }
        this.isEnter = true
      },
      onMouseLeave() {
        if( this.children ) {
          this.childrenDisplay = false
        }
        this.isEnter = false
      },
      onMouseClick() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
    .content-menu-item {
        position: relative;
    }
    .content-menu-item > {
        .content-target {
            display: flex;
            justify-content: space-between;
            height: 26px;
            line-height: 26px;
            align-items: center;

            .l-con {
                display: flex;
                .con-icon {
                    width: 20px;
                }
                color: #404240;
            }

            .sub-light {
                color: #404240;
            }
            .r-con {
                padding-right: 10px;
            }
        }
        .content-target.active {
            background-color: #4488EE;

            .l-con {
                color: #fff;
            }
            .sub-light {
                color: #fff;
            }
        }

        .children-layer {
            position: absolute;
            left: 100%;
            top: 0;
        }
    }
</style>
