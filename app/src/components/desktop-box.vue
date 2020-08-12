<template>
    <div class="desktop-box page-full" @contextmenu="onConTextMenuClick">
        <div class="super-flex-app full2">
            <div class="full2 flex-drag-box">

                <draggable
                        :key="element.id"
                        :img="element.icon"
                        v-for="(element) in appList">
                    <div class="app-item native">
                        <div class="app-icon">
                            <div class="icon-target" :style="{backgroundImage: `url(toto://${element.icon})`}"></div>
                        </div>
                        <div class="app-name text-flow-2">{{element.name}}</div>
                    </div>
                </draggable>

            </div>
        </div>

        <content-menu ref="contentMenu">
            <content-menu-group>
                <content-menu-item
                        :children="true"
                        label="新建">
                    <content-menu :is-child="true">
                        <content-menu-group>
                            <content-menu-item
                                    @click="testClick"
                                    label="文件夹">
                            </content-menu-item>
                            <content-menu-item
                                    label="应用">
                            </content-menu-item>
                        </content-menu-group>
                    </content-menu>
                </content-menu-item>
            </content-menu-group>

            <content-menu-group>
                <content-menu-item
                        @click="testClick"
                        label="终端">
                </content-menu-item>
            </content-menu-group>

            <content-menu-group>
                <content-menu-item
                        label="个性化">
                </content-menu-item>
                <content-menu-item
                        label="壁纸">
                </content-menu-item>
                <content-menu-item
                        label="颜色">
                </content-menu-item>
            </content-menu-group>

            <content-menu-group>
                <content-menu-item
                        label="显示设置">
                </content-menu-item>

                <content-menu-item
                        label="totoro设置">
                </content-menu-item>
            </content-menu-group>
        </content-menu>

    </div>
</template>

<script>

  export default {
    name: "desktop-box",
    data() {
      return {
        appList: []
      }
    },
    mounted() {
      this.getDesktopIcons()
    },
    components: {
    },
    methods: {
      testClick(){
        console.log('xxxxxxxxxxxxxx')
      },
      getDesktopIcons() {
        let list = this.$database.getDesktop()
        list.forEach(item=>{
          item.icon = encodeURIComponent(item.icon)
        })
        this.appList = list
      },
      async chooseFile() {
        let result = await this.$totoroNative.showChooseFileDialog({
          filters: [
            { name: 'app', extensions: ['exe'] }
          ]
        })
        let path = result.result.filePaths[0]

        let iconPath = await this.$totoroNative.getEXEIconFormPath(path)
        console.log(iconPath, 'resultresultresult <-------')
      },
      onConTextMenuClick(e) {
        this.$refs.contentMenu.activeMenu({
          x: e.clientX,
          y: e.clientY
        })
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

                display: grid;
                grid-template-columns: repeat(auto-fill, 100px);
                grid-template-rows: repeat(auto-fill, 130px);
                grid-row-gap: 10px;
                grid-column-gap: 16px;
                grid-auto-flow: column;
                width: 100%;
                height: 100%;
                position: relative;

                .app-item {
                    width: 110px;

                    .app-icon {
                        width: 110px;
                        height: 100px;
                        padding: 10px 10px 4px 10px;
                        border-radius: $borderRadius;
                        transition: all .3s ease;

                        .icon-target {
                            width: 100%;
                            height: 100%;
                            background-size: contain;
                            background-image: url("../assets/img/uTtyXt3jM.png");

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
                .app-item:active {
                    .app-icon {
                        box-shadow: 1px 1px 4px rgba(0, 0, 0, .1);
                        background-color: rgba(255, 255, 255, .1);
                    }
                }
            }


        }
    }
</style>
