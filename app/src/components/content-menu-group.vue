<template>
    <div class="content-menu-group">
        <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "content-menu-group"
  }
</script>

<style lang="scss">
    .content-menu-group {
        position: relative;
        &:after {
            display: block;
            content: '';
            position: absolute;
            left: 10px;
            bottom: 0;
            right: 10px;
            border-bottom: 1px solid rgba(102, 102, 102, 0.49);
        }
        margin-bottom: 4px;
        padding-bottom: 4px;
    }
    .content-menu-group:last-child:after {
        border: none;
    }
    .content-menu-group:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
    }
</style>
