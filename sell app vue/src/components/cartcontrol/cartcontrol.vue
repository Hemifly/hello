<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="icon-remove_circle_outline cart-minus" v-show="food.count > 0" @click.stop="food.count--">
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-plus icon-add_circle" @click.stop="cartadd"></div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object,
        default () {
          return [{
            price: 0,
            count: 0
          }]
        }
      }
    },
    methods: {
      cartadd (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count += 1
        }
      }
    }
  }
</script>
<style lang="stylus">
  .cartcontrol
    .cart-minus, .cart-plus
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
    .cart-minus 
      &.fade-enter-active, &.fade-leave-active
        transition: all .5s linear
      &.fade-enter, &.fade-leave-to
        opacity: 0
        transform: translate3d(24px, 0, 0) rotate(-90deg)
      &.fade-enter-to, &.fade-leave
        opacity: 1
        transform: translate3d(0, 0, 0) rotate(90deg)
    .cart-count
      display: inline-block
      width: 12px
      padding-top: 6px
      line-height: 24px
      height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
      vertical-align: top
</style>