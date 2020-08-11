<template>
    <div class="status-bar native light">
        <div class="bar-item">
            <sb-time></sb-time>
        </div>
    </div>
</template>

<script>
  export default {
    name: "status-bar"
  }
</script>

<style lang="scss">
    @import "../assets/scss/baseSize";

    .status-bar.light {
        background-color: rgba(255, 255, 255, .2);
        box-shadow: 0 2px 2px rgba(0, 0, 0, .1);

        .bar-item:hover {
            background-color: rgba(255, 255, 255, .4);
        }
    }
    .status-bar.dark {
        background-color: rgba(3, 3, 3, .2);
        box-shadow: 0 2px 2px rgba(0, 0, 0, .1);

        .bar-item:hover {
            background-color: rgba(255, 255, 255, .15);
        }
    }

    .status-bar {
        height: $statusBarHeight;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 10px;
        backdrop-filter: blur(40px);
        .bar-item {
            border-radius: 4px;
            transition: background-color .2s ease;
        }

        .bar-item:hover {
            border-radius: 4px;
        }

        .text-define {
            text-shadow: 1px 1px 4px rgba(0, 0, 0, .8);
        }
    }
</style>
