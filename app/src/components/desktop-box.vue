<template>
    <div class="desktop-box page-full native" @contextmenu="onConTextMenuClick">
        <div class="super-flex-app full2">
            <div class="full2 flex-drag-box">

                <div
                    class="app-site"
                    v-for="(item, index) in getAppItem"
                    @mouseenter="onDraggableMouseEnter(item, index)"
                    @mouseleave="onDraggableMouseLeave(item)"
                    :class="{
                      'hover-draggable' : item.activeEmpty,
                      'ac-empty': draggableSave.activeType === 'empty',
                      'ac-app': draggableSave.activeType === 'app',
                    }"
                    :key="item.site">

                    <draggable
                            :img="item.child.icon"
                            @draggable-change="onDraggableChange"
                            @draggable-mouseup="onDraggableMouseUp"
                            @draggable-mousedown="onDraggableMouseDown(item)"
                            v-if="item.child">
                        <div class="app-item native type-app" v-if="item.child.type === 'app'">
                            <div class="app-icon">
                                <div class="icon-target" :style="{backgroundImage: `url(toto://${item.child.icon})`}"></div>
                            </div>
                            <div class="app-name text-flow-2">{{item.child.name}}</div>
                        </div>
                        <div class="app-item native type-collection" v-if="item.child.type === 'collection'">
                            <div class="app-icon">
                                <div class="icon-target no-scroll">

                                    <div class="icon-target-scroll">
                                        <div class="inner-icon"
                                             v-for="(inItem, index) in item.child.children"
                                             :key="index">
                                            <div class="inner-icon-cover"  :style="{backgroundImage: `url(toto://${inItem.icon})`}">

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="app-name text-flow-2">{{item.child.name}}</div>
                        </div>

                        <div class="app-item native type-folder" v-if="item.child.type === 'folder'">
                            <div class="app-icon">
                                <div class="icon-target" :style="{backgroundImage: `url(${getFolderIcon})`}">
                                    <div class="folder-icon">
                                        <a-icon type="github" />
                                    </div>
                                </div>
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

  import systemConfig from '../config/system'

  export default {
    name: "desktop-box",
    data() {
      return {
        appList: [],
        maxAppLength: 100,
        isDraggable: false,

        draggableSave: {
          nowTarget: null,
          nowActiveItem: null,
          activeEmptyIndex: -1,
          activeType: 'empty', // empty | app
        },

        dialog: {
          newCollectionRename: false
        },
        form: {
          newCollectionRename: {
            name: ''
          }
        }
      }
    },
    mounted() {
      this.getDesktopIcons()
    },
    components: {
    },
    computed: {
      getFolderIcon() {
        return systemConfig.icons.system.folder
      },
      getAppItem() {
        let item = []

        for(let i=0; i<this.maxAppLength; i++) {

          let row = {
            site: i,
            child: null,
            activeEmpty: this.draggableSave.activeEmptyIndex === i, //对于空的位置 hover
          }

          this.appList.forEach(function (inSite) {
            if(inSite.site === row.site) {
              row.child = inSite
            }
          })

          item.push(row)
        }

        return item
      }
    },
    methods: {
      hideNewCollectionRenameDialog() {

      },
      onDraggableMouseDown(item) {
        this.draggableSave.nowActiveItem = item
      },
      onDraggableMouseUp() {
        if( this.draggableSave.nowTarget && this.isDraggable) {

          this.draggableSave.activeEmptyIndex = -1

          if(!this.draggableSave.nowTarget.child) {
            // 把此对象放置到 now target 位置
            this.draggableSave.nowActiveItem.child.site = this.draggableSave.nowTarget.site
          } else {

            switch (this.draggableSave.nowTarget.child.type) {
              case 'app':
                if(this.draggableSave.nowActiveItem.child.type ===  this.draggableSave.nowTarget.child.type) {
                  // 新建分组
                  // 根据 id查找

                  let nowActive = null
                  let nowTarget = null

                  this.appList.forEach( (inSite) => {
                    if(inSite.id === this.draggableSave.nowActiveItem.child.id) {
                      nowActive = inSite
                    }
                    if(inSite.id === this.draggableSave.nowTarget.child.id) {
                      nowTarget = inSite
                    }
                  })

                  if(!nowActive || !nowTarget) {
                    return
                  }
                  // remove
                  this.appList.splice(
                    this.appList.indexOf(nowActive), 1
                  )
                  this.appList.splice(
                    this.appList.indexOf(nowTarget), 1,
                    {
                      "site": nowTarget.site,
                      "type": "collection",
                      "name": "no name",
                      "children": [
                        nowActive,
                        nowTarget
                      ]
                    }
                  )
                }
                break;

                case 'collection':
                  if(this.draggableSave.nowActiveItem.child.type === 'app') {
                    // app 合并到 合集
                    let nowActive = this.appList.find( item =>{
                      return item.id === this.draggableSave.nowActiveItem.child.id
                    })

                    // remove
                    this.appList.splice(
                      this.appList.indexOf(nowActive), 1
                    )

                    // append
                    this.draggableSave.nowTarget.child.children.unshift(
                      nowActive
                    )
                  }

                  break;
            }


          }
        }

        this.draggableSave.nowTarget = null
      },
      onDraggableChange(status) {
        this.isDraggable = status
      },
      onDraggableMouseEnter(target, index) {
        if(this.isDraggable) {

          if(!target.child) {
            this.draggableSave.activeEmptyIndex = index
            this.draggableSave.activeType = 'empty'
          } else {

            if (target.site !== this.draggableSave.nowActiveItem.site) {
              this.draggableSave.activeEmptyIndex = index
              this.draggableSave.activeType = 'app'
            } else {
              this.draggableSave.activeType = ''
            }
          }

          this.draggableSave.nowTarget = target
          // target.child.activeEmpty = true
        }
      },
      onDraggableMouseLeave() {
        if(this.isDraggable) {
          this.draggableSave.activeEmptyIndex = -1
          this.draggableSave.nowTarget = null
        }
      },
      testClick(){
        console.log('xxxxxxxxxxxxxx')
      },
      getDesktopIcons() {
        /*
        let list = this.$database.getDesktop()
        list.forEach((item, index)=>{
          item.icon = encodeURIComponent(item.icon)
          item.site = index
        })
        console.log(
          JSON.stringify(list)
        )
        */
        this.appList = [{
          "name": "FSCapture.exe",
          "icon": "%5Caccess%5Cicons%5CBCA_C62Nu.png",
          "target": "F:\\BaiduNetdiskDownload\\红绿小工具\\FScapture7.2 中文绿色特别版\\FSCapture.exe",
          "cwd": "F:\\BaiduNetdiskDownload\\红绿小工具\\FScapture7.2 中文绿色特别版",
          "id": "fb36f336-b8f5-4e58-809f-cd26e93b7b201",
          "site": 0,
          "type": "app"
        }, {
          "name": "getIpQrCode.exe - 快捷方式",
          "icon": "%5Caccess%5Cicons%5Cr6vQWZsZN.png",
          "target": "E:\\work\\apk\\getipqrcode\\getIpQrCode.exe",
          "cwd": "E:\\work\\apk\\getipqrcode",
          "id": "6d806a7c-a1d2-4994-9365-e33d0869f7e32",
          "site": 1,
          "type": "app"
        }, {
          "name": "HeidiSQL",
          "icon": "%5Caccess%5Cicons%5CSWhDjL2F1r.png",
          "target": "D:\\Program Files\\HeidiSQL\\heidisql.exe",
          "cwd": "D:\\Program Files\\HeidiSQL",
          "id": "7a54c2fa-35b3-49d1-ac91-87da341c543d3",
          "site": 2,
          "type": "app"
        }, {
          "name": "KeyManager",
          "icon": "%5Caccess%5Cicons%5C4MREf86K7.png",
          "target": "C:\\Users\\Administrator\\AppData\\Local\\Programs\\keymanager\\KeyManager.exe",
          "cwd": "C:\\Users\\Administrator\\AppData\\Local\\Programs\\keymanager",
          "id": "e91d4222-1f8e-4928-a61a-c92f88013ee94",
          "site": 3,
          "type": "app"
        }, {
          "name": "Photoshop.exe - 快捷方式",
          "icon": "%5Caccess%5Cicons%5C-SCMVnsTeD.png",
          "target": "D:\\Program Files\\adobe\\ps\\Adobe Photoshop CC 2019\\Photoshop.exe",
          "cwd": "D:\\Program Files\\adobe\\ps\\Adobe Photoshop CC 2019",
          "id": "7ff018ab-2707-4584-bc0b-f87dd159c2675",
          "site": 4,
          "type": "app"
        }, {
          "name": "v2rayN.exe - 快捷方式",
          "icon": "%5Caccess%5Cicons%5CIjCMy8NKx.png",
          "target": "E:\\work\\apk\\Core-Windows\\v2rayN-Core\\v2rayN.exe",
          "cwd": "E:\\work\\apk\\Core-Windows\\v2rayN-Core",
          "id": "dcfd31f2-c236-4f92-a01d-7754ac55fcf96",
          "site": 5,
          "type": "app"
        }, {
          "name": "webstorm64.exe - 快捷方式",
          "icon": "null",
          "target": "C:\\Program Files\\JetBrains\\WebStorm 2019.3.3\\bin\\webstorm64.exe",
          "cwd": "C:\\Program Files\\JetBrains\\WebStorm 2019.3.3\\bin",
          "id": "843784a8-4727-4c5d-85d9-5c3a09fa476d7",
          "site": 6,
          "type": "app"
        }, {
          "name": "东方财富",
          "icon": "%5Caccess%5Cicons%5Czoc0LlF1e.png",
          "target": "D:\\eastmoney\\swc8\\mainfree.exe",
          "cwd": "D:\\eastmoney\\swc8",
          "id": "fa00a640-a559-4218-861a-67c4d91cebd38",
          "site": 7,
          "type": "app"
        }, {
          "name": "东方财富证券交易",
          "icon": "%5Caccess%5Cicons%5CVhaCbQdMl.png",
          "target": "D:\\eastmoney\\swc8\\maintrade.exe",
          "cwd": "D:\\eastmoney\\swc8",
          "id": "44b28f29-dfc7-47c8-bc9c-db01d3b1dd5d9",
          "site": 8,
          "type": "app"
        }, {
          "site": 9,
          "type": "collection",
          "name": "合集测试",
          "children": [
            {
              "name": "微信开发者工具",
              "icon": "%5Caccess%5Cicons%5CnTv0qnatA.png",
              "target": "D:\\Program Files (x86)\\Tencent\\微信web开发者工具\\微信开发者工具.exe",
              "cwd": "D:\\Program Files (x86)\\Tencent\\微信web开发者工具",
              "id": "fc621cc5-4f38-466e-a02d-c5cecea20f5fa1",
              "site": -1
            },
            {
              "name": "东方财富证券交易",
              "icon": "%5Caccess%5Cicons%5CVhaCbQdMl.png",
              "target": "D:\\eastmoney\\swc8\\maintrade.exe",
              "cwd": "D:\\eastmoney\\swc8",
              "id": "44b28f29-dfc7-47c8-bc9c-db01d3b1dd5da2",
              "site": 8,
              "type": "app"
            },
            {
              "name": "Photoshop.exe - 快捷方式",
              "icon": "%5Caccess%5Cicons%5C-SCMVnsTeD.png",
              "target": "D:\\Program Files\\adobe\\ps\\Adobe Photoshop CC 2019\\Photoshop.exe",
              "cwd": "D:\\Program Files\\adobe\\ps\\Adobe Photoshop CC 2019",
              "id": "7ff018ab-2707-4584-bc0b-f87dd159c267a3",
              "site": 4,
              "type": "app"
            },
            {
              "name": "v2rayN.exe - 快捷方式",
              "icon": "%5Caccess%5Cicons%5CIjCMy8NKx.png",
              "target": "E:\\work\\apk\\Core-Windows\\v2rayN-Core\\v2rayN.exe",
              "cwd": "E:\\work\\apk\\Core-Windows\\v2rayN-Core",
              "id": "dcfd31f2-c236-4f92-a01d-7754ac55fcf9a4",
              "site": 5,
              "type": "app"
            },
            {
              "name": "微信开发者工具",
              "icon": "%5Caccess%5Cicons%5CnTv0qnatA.png",
              "target": "D:\\Program Files (x86)\\Tencent\\微信web开发者工具\\微信开发者工具.exe",
              "cwd": "D:\\Program Files (x86)\\Tencent\\微信web开发者工具",
              "id": "fc621cc5-4f38-466e-a02d-c5cecea20f5fa5",
              "site": -1
            },
            {
              "name": "东方财富证券交易",
              "icon": "%5Caccess%5Cicons%5CVhaCbQdMl.png",
              "target": "D:\\eastmoney\\swc8\\maintrade.exe",
              "cwd": "D:\\eastmoney\\swc8",
              "id": "44b28f29-dfc7-47c8-bc9c-db01d3b1dd5da6",
              "site": 8,
              "type": "app"
            }
          ]
        }, {
          "name": "工作!==生活",
          "target": "D:\\Program Files (x86)\\Tencent\\微信web开发者工具\\微信开发者工具.exe",
          "cwd": "D:\\Program Files (x86)\\Tencent\\微信web开发者工具",
          "id": "fc621cc5-4f38-466e-a02d-c5cecea20f5f111",
          "site": 10,
          "type": "folder",
          "folder-icon": "some",
          "folder-icon-color": "#ccc"
        }]
      },
      async chooseFile() {
        let result = await this.$totoroNative.showChooseFileDialog({
          filters: [
            { name: 'app', extensions: ['exe'] }
          ]
        })
        let path = result.result.filePaths[0]

        let iconPath = await this.$totoroNative.getEXEIconFormPath(path)

        console.log(iconPath, 'iconPath')
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
                    transition: box-shadow, background-color  .3s ease;
                    border-radius: 10px;
                    background-color: rgba(255, 255, 255, .0);

                }
                .app-site.hover-draggable.ac-empty {
                    box-shadow: 0 0 0 3px rgba(255, 255, 255, .3);
                }
                .app-site.hover-draggable.ac-app {
                    background-color: rgba(255, 255, 255, .3);
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


                .app-item.type-app {
                    .icon-target {
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: top center;
                    }
                }
                .app-item.type-app:active {
                    .app-icon {
                        box-shadow: 1px 1px 4px rgba(0, 0, 0, .1);
                        background-color: rgba(255, 255, 255, .1);
                    }
                }

                .app-item.type-collection {

                    .icon-target {
                        background-color: rgba(255, 255, 255, .5);
                        backdrop-filter: blur(3px);
                        border-radius: 10px;
                        box-sizing: border-box;
                        padding: 6px;
                        overflow-y: auto;

                        .icon-target-scroll {
                            display: flex;
                            flex-wrap: wrap;
                            overflow: hidden;
                        }

                        .inner-icon {
                            width: 50%;
                            height: 40px;
                            box-sizing: border-box;
                            padding: 1px;

                            .inner-icon-cover {
                                width: 100%;
                                height: 100%;
                                background-size: contain;
                                background-repeat: no-repeat;
                                background-position: top center;
                            }
                        }
                    }
                }

                .app-item.type-folder {
                    .icon-target {
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: top center;

                        .folder-icon {
                            width: 100%;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            > i {
                                font-size: 30px;
                            }
                        }
                    }
                }
            }


        }
    }
</style>
