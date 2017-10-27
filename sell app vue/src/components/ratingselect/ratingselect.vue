<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span @click="selected(2)" class="block positive" :class="{active: selectType.num === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="selected(0)" class="block positive" :class="{active: selectType.num === 0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="selected(1)" class="block negative" :class="{active: selectType.num === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{on:onlyContent.on}" @click="change">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
  const POSITIVE = 0
  const NEGATOVE = 1
  const ALL = 2
  export default {
    props: {
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      selectType: {
        type: Object,
        default () {
          return {
            num: ALL
          }
        }
      },
      onlyContent: {
        type: Object,
        default () {
          return {
            on: false
          }
        }
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATOVE
        })
      }
    },
    methods: {
      selected (type) {
        this.selectType.num = type
      },
      change () {
        this.onlyContent.on = !this.onlyContent.on
      }
    }
  }
</script>
<style lang="stylus">
  @import '../../common/stylus/mixin'

  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 10px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220,)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
  .switch
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid rgba(7, 17, 27 ,.1)
    color: rgb(147, 153, 159)
    font-size: 0
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      margin-right: 4px
      font-size: 24px
    .text
      font-size: 12px
      vertical-align: top
</style>