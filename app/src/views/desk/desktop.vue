<template>
    <div class="page-full page-desktop">
        <div class="docker-wrap">
            <docker></docker>
        </div>
    </div>
</template>

<script>
  import Docker from "../../components/docker";
  export default {
    name: "desk",
    components: {Docker}
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
    }
</style>
