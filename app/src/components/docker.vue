<template>
    <div class="docker-controller">
        <div class="item">x</div>
        <div class="item">x</div>
        <div class="item">x</div>
        <div class="item">x</div>
        <div class="item">x</div>
        <div class="item">x</div>
    </div>
</template>

<script>
  export default {
    name: "docker"
  }
</script>

<style lang="scss">
    @import "../assets/scss/baseSize";

    .docker-controller {
        width: 100%;
        height: $dockerHeight;
        background-color: rgba(255, 255, 255, .6);
        backdrop-filter: blur(4px);
    }
</style>
