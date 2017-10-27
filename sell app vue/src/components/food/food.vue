<template>
  <transition name="show">
    <div class="food" v-show="isshow" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="isshow = false">
            <i class="icon-arrow_left"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span>月售{{food.sellCount}}份 &nbsp 好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" v-show="food.count ? false : true" @click.stop="getcart($event)">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="rating-item" v-for="rating in food.ratings" v-show="needshow(rating.rateType, rating.text)">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" width="12" height="12" class="avatar">
                </div>
                <div class="time">{{rating.rateTime | now}}</div>
                <p class="text"><span :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"></span>{{rating.text}}</p>
              </li>
            </ul>
            <div class="no-rating" v-show="noshow">没有更多了</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import ratingselect from 'components/ratingselect/ratingselect'
  import split from 'components/split/split'
  import timer from 'components/timer/timer'
  export default {
    props: {
      food: {
        tope: Object
      }
    },
    data () {
      return {
        isshow: false,
        noshow: true,
        selectType: {
          num: 2
        },
        onlyContent: {
          on: false
        },
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    filters: {
      now (time) {
        return timer(time)
      }
    },
    components: {
      cartcontrol,
      split,
      ratingselect
    },
    methods: {
      show () {
        this.isshow = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      getcart (e) {
        if (!e._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
      },
      needshow (type, text) {
        if (this.onlyContent.on && !text) {
          this.noshow = true
          return false
        }
        if (this.selectType.num === 2) {
          this.noshow = false
          return true
        } else {
          (type === this.selectType.num) && (this.noshow = false)
          return type === this.selectType.num
        }
      }
    },
    watch: {
      selectType: {
        deep: true,
        handler: function () {
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        }
      },
      onlyContent: {
        deep: true,
        handler: function () {
          this.$nextTick(() => {
            this.scroll.refresh()
          })
        }
      }
    }
  }
</script>
<style lang="stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transition: all .5s
    &.show-enter, &.show-leave-active
      transform: translate3d(100%, 0, 0)
    &.show-leave
      transform: translate3d(0, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_left
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      padding: 18px
      position: relative
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 10px
        line-height: 10px
        height: 10px
        font-size: 10px
        color: rgb(147, 153, 159)
      .price
        font-size: 24px
        font-weight: 700
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        font-size: 10px
        border-radius: 12px
        color: #fff
        background: rgb(0, 160 220)
        transition: all .5s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          transform: translate3d(50px, 0, 0)
        &.fade-enter-to, &.fade-leave
          opacity: 1
          transform: translate3d(0, 0, 0)
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17 ,27)
      .text
        line-height:24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 16px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-bottom: 1px solid rgba(7, 17, 27 ,.1)
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              font-size: 10px
              color: rgb(147, 153 ,159)
              vertical-align: top
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(7, 17, 27)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>