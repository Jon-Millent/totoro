<template>
    <div class="desktop-box page-full native" @contextmenu="onConTextMenuClick">
        <div class="super-flex-app full2">
            <div class="full2 flex-drag-box">

                <div
                    class="app-site"
                    v-for="(item) in deskAppItem"
                    @mouseenter="onDraggableMouseEnter(item)"
                    @mouseleave="onDraggableMouseLeave(item)"
                    :class="{ 'hover-draggable' : item.activeEmpty }"
                    :key="item.site">

                    <draggable
                            :img="item.child.icon"
                            @draggable-change="onDraggableChange"
                            @draggable-mouseup="onDraggableMouseUp"
                            v-if="item.child">
                        <div class="app-item native">
                            <div class="app-icon">
                                <div class="icon-target" :style="{backgroundImage: `url(toto://${item.child.icon})`}"></div>
                            </div>
                            <div class="app-name text-flow-2">{{item.child.name}}</div>
                        </div>
                    </draggable>

                </div>


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
        appList: [],
        maxAppLength: 100,
        isDraggable: false,

        deskAppItem: [],

        draggableSave: {
          nowTarget: null
        }
      }
    },
    mounted() {
      this.getDesktopIcons()
    },
    components: {
    },
    methods: {
      onDraggableMouseUp() {
        if( this.draggableSave.nowTarget ) {

          this.draggableSave.nowTarget.activeEmpty = false

          if(!this.draggableSave.nowTarget.child) {
            //
          }

        }
      },
      onDraggableChange(status){
        this.isDraggable = status
      },
      onDraggableMouseEnter(target) {
        if(this.isDraggable) {
          if(!target.child) {
            target.activeEmpty = true
          }

          this.draggableSave.nowTarget = target
          // target.child.activeEmpty = true
        }
      },
      onDraggableMouseLeave(target) {
        if(this.isDraggable) {
          if(target.activeEmpty) {
            target.activeEmpty = false
          }

          this.draggableSave.nowTarget = null
        }
      },
      testClick(){
        console.log('xxxxxxxxxxxxxx')
      },
      getDesktopIcons() {
        let list = this.$database.getDesktop()
        list.forEach((item, index)=>{
          item.icon = encodeURIComponent(item.icon)
          item.site = index
        })
        this.appList = list
        this.deskAppItem = this.getAppItem()
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
      },
      getAppItem() {
        let item = []

        for(let i=0; i<this.maxAppLength; i++) {

          let row = {
            site: i,
            child: null,
            activeEmpty: false, //对于空的位置 hover
          }

          this.appList.forEach(function (inSite) {
            if(inSite.site === row.site) {
              row.child = inSite
            }
          })

          item.push(row)
        }

        console.log(item, 'item')
        return item
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
                grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
                grid-template-rows: repeat(auto-fill, minmax(130px, 1fr));
                grid-row-gap: 10px;
                grid-column-gap: 16px;
                grid-auto-flow: column;
                width: 100%;
                height: 100%;
                position: relative;

                .app-site {
                    position: relative;
                    box-shadow: 0 0 0 3px rgba(255, 255, 255, .0);
                    transition: box-shadow, border-radius  .3s ease;
                    border-radius: 0;

                }
                .app-site.hover-draggable {
                    box-shadow: 0 0 0 3px rgba(255, 255, 255, .3);
                    border-radius: 10px;
                }

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
