<template>
    <div class="status-bar native">
        <div class="bar-item">
            <sb-time></sb-time>
        </div>
    </div>
</template>

<script>
  import SbTime from "./status-bar/sb-time";
  export default {
    name: "status-bar",
    components: {SbTime}
  }
</script>

<style lang="scss">
    @import "../assets/scss/baseSize";

    .status-bar {
        background-color: rgba(255, 255, 255, .6);
        height: $statusBarHeight;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 22px;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
    }
</style>
