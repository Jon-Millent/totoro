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
        background-color: rgba(255, 255, 255, .2);
        height: $statusBarHeight;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 10px;
        backdrop-filter: blur(40px);
        box-shadow: 0 2px 2px rgba(0, 0, 0, .1);
        .bar-item {
            border-radius: 4px;
            transition: background-color .2s ease;
        }

        .bar-item:hover {
            border-radius: 4px;
            background-color: rgba(255, 255, 255, .4);
        }

        .text-define {
            text-shadow: 1px 1px 4px rgba(0, 0, 0, .8);
        }
    }
</style>
