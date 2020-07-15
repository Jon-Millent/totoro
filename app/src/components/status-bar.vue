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
    .status-bar {
        background-color: rgba(255, 255, 255, .6);
        border-bottom: 1px solid #eee;
        height: 26px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 22px;
    }
</style>
