<template>
  <div class="star" :class="starType">
    <span class="item" v-for="itemClass in itemClasses" :class="itemClass"></span>
  </div>
</template>
<script type="text/javascript">
  let ON = 'on'
  let HALF = 'half'
  let OFF = 'off'
  let LENGTH = 5
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(ON)
        }
        if (hasDecimal) {
          result.push(HALF)
        }
        while (result.length < LENGTH) {
          result.push(OFF)
        }
        return result
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  .star
    font-size: 0
    .item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-img('star48_on')
        &.half
          bg-img('star48_half')
        &.off
          bg-img('star48_off')
    &.star-36
      .item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-img('star36_on')
        &.half
          bg-img('star36_half')
        &.off
          bg-img('star36_off')
    &.star-24
      .item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-img('star24_on')
        &.half
          bg-img('star24_half')
        &.off
          bg-img('star24_off')
</style>