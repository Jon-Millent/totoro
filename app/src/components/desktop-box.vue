<template>
    <div class="desktop-box page-full">
        <div class="super-flex-app full2">

            <draggable v-model="appList"  v-bind="group" class="flex-drag-box full2">
                <transition-group>

                    <div class="app-item native" v-for="(element) in appList" :key="element.id">
                        <div class="app-icon">
                            <div class="icon-target"></div>
                        </div>
                        <div class="app-name text-flow-2">{{element.name}}</div>
                    </div>

                </transition-group>
            </draggable>

        </div>
    </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: "desktop-box",
    data() {
      return {
        group: {
          animation: 400,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        },
        appList: [
          {
            name: "HeidiSql",
            id: 1
          },
          {
            name: "PyCH",
            id: 2
          },
          {
            name: "VSCode",
            id: 3
          },
          {
            name: "Photo Shop",
            id: 4
          },
          {
            name: "HeidiSql",
            id: 5
          },
          {
            name: "PyCH",
            id: 6
          },
          {
            name: "VSCode",
            id: 7
          },
          {
            name: "Photo Shop",
            id: 8
          },
          {
            name: "HeidiSql",
            id: 9
          },
          {
            name: "PyCH",
            id: 10
          },
          {
            name: "VSCode",
            id: 11
          },
          {
            name: "Photo Shop",
            id: 12
          }
        ]
      }
    },
    mounted() {
      this.getDesktopIcons()
    },
    components: {
      draggable
    },
    methods: {
      getDesktopIcons() {
        let list = this.$database.getDesktop()
        console.log(list)

        // this.$database.unInit()
      }
    }
  }
</script>

<style lang="scss">
    @import "../assets/scss/theme";
    .desktop-box {
        .super-flex-app {
            padding: 18px 10px 10px 10px;

            .flex-drag-box {
                .app-item {
                    width: 110px;

                    .app-icon {
                        width: 100px;
                        height: 90px;
                        padding: 10px;
                        border-radius: $borderRadius;
                        transition: all .3s ease;

                        .icon-target {
                            width: 100%;
                            height: 100%;
                            background-size: contain;
                            background-image: url("../assets/img/gYZBA-ZSe.png");
                            background-repeat: no-repeat;
                            background-position: top center;
                        }
                        .icon-target2 {
                            background-image: url("../assets/img/L4n3ufARF.png");
                        }
                        .icon-target3 {
                            background-image: url("../assets/img/uTtyXt3jM.png");
                        }
                        .icon-target4 {
                            background-image: url("../assets/img/W8cJaE8sM.png");
                        }
                        .icon-target5 {
                            background-image: url("../assets/img/Z2O8LpiK-.png");
                        }
                    }
                    .app-name {
                        text-align: center;
                        padding-top: 2px;
                        font-size: 14px;
                        word-wrap: break-word;
                        color: #fff;
                        text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);
                    }
                }
                .app-item:hover {
                    .app-icon {
                        /*box-shadow: 1px 1px 4px rgba(0, 0, 0, .1);*/
                        /*background-color: rgba(255, 255, 255, .1);*/
                    }
                }
            }
            .flex-drag-box > span {
                display: grid;
                grid-template-columns: repeat(auto-fill, 110px);
                grid-template-rows: repeat(auto-fill, 140px);
                grid-row-gap: 10px;
                grid-column-gap: 16px;
                grid-auto-flow: column;
                width: 100%;
                height: 100%;
                position: relative;
            }

        }
    }
</style>
