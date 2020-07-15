<template>
    <div class="page-full page-desktop">

        <div class="status-wrap">
            <status-bar></status-bar>
        </div>

        <div class="docker-wrap">
            <docker></docker>
        </div>
    </div>
</template>

<script>
  import Docker from "../../components/docker";
  import StatusBar from "../../components/status-bar";
  export default {
    name: "desk",
    components: {StatusBar, Docker},
    mounted() {
      this.$totoroNative.getDesktopApplications()
    }
  }
</script>

<style lang="scss">
    @import "../../assets/scss/zIndex";
    .page-desktop > {
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
    }
</style>
