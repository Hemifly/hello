<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="listShow">
        <div class="left">
          <div class="logo-wrapper">
            <div class="logo" :class="{hightlight: totalCount > 0}">
              <i class="icon-shopping_cart" :class="{hightlight: totalCount > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{hightlight: totalPrice > 0}">￥{{totalPrice}}</div>
          <div class="desc" v-if="totalPrice < seller.minPrice">另需配送费{{seller.deliveryPrice}}元</div>
          <div class="desc" v-else>为您配送</div>
        </div>
        <div class="right" v-if="totalPrice === 0">{{seller.minPrice}}元起送</div>
        <div class="right" v-else-if="totalPrice < seller.minPrice">还需{{seller.minPrice - totalPrice}}元起送</div>
        <div class="right pay" v-else @click.stop="pay">去结算</div>
      </div>
      <transition name="show">
        <div class="shopcart-list" v-show="totalCount&&cartshow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="list">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="mask">
      <div class="list-mask" v-show="totalCount&&cartshow" @click="listShow"></div>
    </transition>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  export default {
    props: {
      seller: {
        type: Object
      },
      selectFoods: {
        type: Array,
        default () {
          return [{
            price: 0,
            count: 0
          }]
        }
      }
    },
    data () {
      return {
        totalCount: 0,
        cartshow: false
      }
    },
    components: {
      cartcontrol
    },
    computed: {
      totalPrice () {
        let total = 0
        this.totalCount = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
          this.totalCount += food.count
        })
        return total
      }
    },
    methods: {
      listShow () {
        if (!this.totalCount) {
          this.cartshow = false
          return false
        }
        this.cartshow = !this.cartshow
        let show = this.cartshow
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.list, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return show
      },
      empty () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
        this.cartshow = false
      },
      pay () {
        alert(`需要支付${this.totalPrice}元`)
      }
    }
  }
</script>
<style lang="stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background: #141d27
      .left
        flex: 1
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0 8px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.hightlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.hightlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            border-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0)
        .price
          display: inline-block
          margin-top: 12px
          line-height: 24px
          padding-right: 10px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255, 255, 255, 0.4)
          vertical-align: top
          &.hightlight
            color: #fff
        .desc
          display: inline-block
          line-height: 24px
          margin: 12px 0 0 8px
          font-size: 12px
          color: rgba(255, 255, 255, 0.4)
          vertical-align: top
      .right
        flex: 0 0 105px
        width: 105px
        font-size: 14px
        font-weight: 700
        height: 24px
        font-height: 24px
        padding: 16px 0
        color: rgba(255, 255, 255, 0.4)
        text-align: center
        background: #2b343c
        &.pay
          background: rgba(59, 246, 7, 0.53)
          color: #fff
    .shopcart-list
      position: absolute
      left: 0
      bottom: 48px
      z-index: -1
      width: 100%
      transition: all .5s
      &.show-enter, &.show-leave-active
        transform: translate3d(0, 100%, 0)
      &.show-leave
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
            float: right
            font-size: 12px
            color: rgb(0, 150, 220)
      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    transition: all .5s
    background: rgba(7, 17, 27, 0.5)
    &.mask-enter, &.mask-leave-active
      opacity: 0
    &.mask-leave
      opacity: 1
</style>