<template>
    <div class="page-full page-initialization native">
        <div class="loading-dialog">
            <h1>
                <span>loading</span>
                <img src="toto:\\access\icons\55D2Nrn4I.png" alt="">
            </h1>
        </div>
    </div>
</template>

<script>
  export default {
    name: "initialization",
    methods: {
      async check() {
        // 获取桌面上的app
        let isInit = this.$database.isInit()
        if(!isInit) {

          let startTime = new Date().getTime()
          console.log('before 初始化', 'deskAppList')
          let deskAppList = await this.$totoroNative.getDesktopApplications()

          console.log('初始化完成', deskAppList)

          this.$database.init()
          this.$database.setDesktop(deskAppList)

          if(startTime - new Date().getTime() < 3000) {
            // 如果处理时间小于3秒,则加长3秒,显得专业.
            await this.$totoroNative.sleep(3000)
          }
          await this.$router.replace('/desktop')
        } else {
          await this.$router.replace('/desktop')
        }
      }
    },
    mounted() {
      this.$router.replace('/desktop')
      // this.check()
    }
  }
</script>

<style lang="scss">
    .page-initialization {
        background-color: #F2F2F2;
        .loading-dialog {
            width: 100%;
            height: 200px;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: #333;
        }
    }
</style>
