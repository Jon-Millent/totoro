<template>
    <div class="sb-time" @click="lunchTimeControl">
        <span class="weak">{{time.weak}}</span>
        <span class="ap">{{time.date}}</span>
    </div>
</template>

<script>
  import dayjs from 'dayjs'
  export default {
    name: "sb-time",
    data() {
      return {
        time: {
          weak: '',
          date: ''
        },
        timeHandler: null
      }
    },
    mounted() {
      this.start()
    },

    methods: {
      lunchTimeControl() {
        this.$totoroNative.launchApplicationFromShell(
          this.$totoroNative.MS_SETTINGS.outlookcal
        )
      },
      getWeak(time) {
        let day = time.day()
        return '星期' + {
          0: '日',
          1: '一',
          2: '二',
          3: '三',
          4: '四',
          5: '五',
          6: '六'
        }[day]
      },
      getTime () {
        let now = dayjs()
        let weak = this.getWeak(now)

        let hour = now.hour()
        let hourString = this.getHourHan(hour)

        this.time.weak = weak
        this.time.date = hourString + now.format('hh:mm')
      },
      start() {
        this.timeHandler = setInterval(() => {
          this.getTime()
        }, 1000)
      },
      stop() {
        clearInterval(this.timeHandler)
      },

      getHourHan(hour) {

        let han = null

        let rule = [
          {
            start: 3,
            end: 6,
            han: '凌晨'
          },
          {
            start: 6,
            end: 9,
            han: '早晨'
          },
          {
            start: 9,
            end: 12,
            han: '上午'
          },
          {
            start: 12,
            end: 14,
            han: '中午'
          },
          {
            start: 14,
            end: 17,
            han: '下午'
          },
          {
            start: 17,
            end: 19,
            han: '傍晚'
          },
          {
            start: 19,
            end: 23,
            han: '晚上'
          },
          {
            start: 23,
            end: 24,
            han: '深夜'
          }
        ]

        rule.forEach(item=>{
          if(hour >= item.start && hour < item.end) {
            han = item.han
          }
        })

        return han ? han : rule[rule.length-1].han
      }
    },
    beforeDestroy() {
      this.stop()
    }
  }
</script>

<style lang="scss">
    .sb-time {
        font-size: 14px;
        color: #333;
        height: 20px;
        line-height: 20px;
        padding: 0 4px;
        border-radius: 3px;
        .weak {
            padding-right: 4px;
        }
    }
</style>
