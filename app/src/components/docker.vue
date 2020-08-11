<template>
    <div class="docker-controller light">
        <div class="docker-target">

            <div class="docker-left">
                <div class="docker-app-item">
                    <div class="icon icon7"></div>
                </div>
                <div class="docker-app-item">
                    <div class="icon icon2"></div>
                </div>
                <div class="docker-app-item">
                    <div class="icon icon3"></div>
                </div>
                <div class="docker-app-item">
                    <div class="icon icon4"></div>
                </div>
                <div class="docker-app-item">
                    <div class="icon icon1"></div>
                </div>
                <div class="docker-app-item">
                    <div class="icon icon1"></div>
                </div>
            </div>

            <div class="docker-right">
                <div class="docker-app-item">
                    <div class="icon icon5"></div>
                </div>
                <div class="docker-app-item">
                    <div class="icon icon6"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: "docker",
    methods: {

    }
  }
</script>

<style lang="scss">
    @import "../assets/scss/baseSize";

    .docker-controller.light {
        .docker-target {
            background-color: rgba(255, 255, 255, .2);
        }
    }
    .docker-controller.dark {
        .docker-target {
            background-color: rgba(3, 3, 3, .2);
        }
    }


    .docker-controller {
        width: 100%;
        height: $dockerHeight;
        display: flex;
        justify-content: center;

        .docker-target {
            width: auto;
            display: inline-flex;
            padding: 0 20px;
            border-radius: 20px;
            height: $dockerHeight;
            backdrop-filter: blur(16px);
            align-items: center;

            .docker-right,
            .docker-left {
                display: flex;
                position: relative;
            }
            .docker-right {
                padding-left: 20px;
            }

            .docker-right:after {
                content: '';
                display: block;
                position: absolute;
                height: 60px;
                border-left: 1px solid rgba(26, 30, 42, 0.6);
                border-right: 1px solid rgba(50, 57, 77, 0.6);
                top: 50%;
                transform: translateY(-50%);
                left: 13px;
            }
            .docker-right .docker-app-item:last-child {
                margin-left: 0;
            }
            .docker-left .docker-app-item:first-child {
                margin-left: 0;
            }

            .docker-app-item {
                width: 90px;
                height: 90px;
                margin-left: 8px;
                box-sizing: border-box;
                padding: 6px;
                .icon {
                    width: 100%;
                    height: 100%;
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .icon1 {
                    background-image: url("../assets/img/Z2O8LpiK-.png");
                }
                .icon2 {
                    background-image: url("../assets/img/L4n3ufARF.png");
                }
                .icon3 {
                    background-image: url("../assets/img/gYZBA-ZSe.png");
                }
                .icon4 {
                    background-image: url("../assets/img/uTtyXt3jM.png");
                }
                .icon5 {
                    background-image: url("../assets/icon/GenericFolderIcon.png");
                }
                .icon6 {
                    background-image: url("../assets/icon/FullTrashIcon.png");
                }
                .icon7 {
                    background-image: url("../assets/icon/launchpad.png");
                }
            }
        }
    }
</style>
