<template>
    <div class="desktop-box page-full">
        <div class="super-flex-app full2">
            <div class="app-item native">
                <div class="app-icon">
                    <div class="icon-target"></div>
                </div>
                <div class="app-name text-flow-2">截图撒大声地截图撒大声截图撒大声地截图撒大声地地</div>
            </div>
            <div class="app-item native">
                <div class="app-icon">
                    <div class="icon-target icon-target2"></div>
                </div>
                <div class="app-name text-flow-2">VSCode</div>
            </div>
            <div class="app-item native">
                <div class="app-icon">
                    <div class="icon-target icon-target3"></div>
                </div>
                <div class="app-name text-flow-2">Photo Shop</div>
            </div>
            <div class="app-item native">
                <div class="app-icon">
                    <div class="icon-target icon-target4"></div>
                </div>
                <div class="app-name text-flow-2">HeidiSql</div>
            </div>
            <div class="app-item native">
                <div class="app-icon">
                    <div class="icon-target icon-target5"></div>
                </div>
                <div class="app-name text-flow-2">PyCH</div>
            </div>
            <div class="app-item native">
                <div class="app-icon">
                    <div class="icon-target icon-target4"></div>
                </div>
                <div class="app-name text-flow-2">HeidiSql</div>
            </div>
            <div class="app-item native">
                <div class="app-icon">
                    <div class="icon-target icon-target5"></div>
                </div>
                <div class="app-name text-flow-2">PyCH</div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "desktop-box"
  }
</script>

<style lang="scss">
    @import "../assets/scss/theme";
    .desktop-box {
        .super-flex-app {
            padding: 18px 10px 10px 10px;
            position: relative;
            display: grid;
            grid-template-columns: repeat(auto-fill, 110px);
            grid-template-rows: repeat(auto-fill, 140px);
            grid-row-gap: 10px;
            grid-column-gap: 16px;
            grid-auto-flow: column;

            .app-item {
                width: 110px;

                .app-icon {
                    width: 110px;
                    height: 100px;
                    padding: 10px;
                    border-radius: $borderRadius;
                    transition: all .3s ease;
                    background-color: rgba(255, 255, 255, .06);
                    backdrop-filter: blur(2px);

                    .icon-target {
                        width: 100%;
                        height: 100%;
                        background-size: contain;
                        background-image: url("../assets/img/gYZBA-ZSe.png");
                        background-repeat: no-repeat;
                        background-position: top center;
                    }
                    .icon-target2 {
                        background-image: url("../assets/img/L4n3ufARF.png");
                    }
                    .icon-target3 {
                        background-image: url("../assets/img/uTtyXt3jM.png");
                    }
                    .icon-target4 {
                        background-image: url("../assets/img/W8cJaE8sM.png");
                    }
                    .icon-target5 {
                        background-image: url("../assets/img/Z2O8LpiK-.png");
                    }
                }
                .app-name {
                    text-align: center;
                    padding-top: 4px;
                    font-size: 14px;
                    word-wrap: break-word;
                    color: #fff;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);
                }
            }
            .app-item:hover {
                .app-icon {
                    box-shadow: 1px 1px 4px rgba(0, 0, 0, .1);
                    background-color: rgba(255, 255, 255, .2);
                }
            }
        }
    }
</style>
