<template>
    <div class="page-full page-desktop">

        <div class="desktop-bg page-full"></div>

        <div class="desktop-content page-full">
            <div class="status-wrap">
                <status-bar></status-bar>
            </div>

            <div class="desktop-wrap">
                <desktop-box></desktop-box>
            </div>

        </div>

        <div class="docker-wrap">
            <docker></docker>
        </div>

        <div class="app-run-cover page-full" @click="isShow = !isShow" :class="{active: isShow}">

        </div>

    </div>
</template>

<script>
  import Docker from "../../components/docker";
  import StatusBar from "../../components/status-bar";
  import DesktopBox from "../../components/desktop-box";
  export default {
    name: "desk",
    components: {DesktopBox, StatusBar, Docker},
    data() {
      return {
        icon: '',
        isShow: false
      }
    },
    mounted() {

    },
    methods: {

    },
  }
</script>

<style lang="scss">
    @import "../../assets/scss/zIndex";
    @import "../../assets/scss/baseSize";
    .page-desktop {

        .desktop-bg {
            background-size: cover;
            background-repeat: no-repeat;
            background-position: top center;
            z-index: 10;
            background-image: url("../../assets/img/2022854.jpg");
        }
        .desktop-content {
            z-index: 20;
        }

        .docker-wrap {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: $dockerWrap;
        }
        .status-wrap {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            z-index: $statusWrap;
        }
        .desktop-wrap {
            position: absolute;
            top: $statusBarHeight;
            bottom: $dockerHeight;
            left: 0;
            right: 0;
        }

        .app-run-cover {
            z-index: $appRunCover;
            backdrop-filter: blur(20px);
            background-color: rgba(0, 0, 0, .4);
            opacity: 0;
            transition: opacity .5s ease;
        }
        .app-run-cover.active {
            opacity: 1;
        }
    }
</style>
