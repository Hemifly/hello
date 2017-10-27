<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menu">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{current: currentIndex === index}" 
          @click="selectCheck(index, $event)">
            <span class="text   borde-1px">
              <span class="icon" :class="iconMap[item.type]" v-if="item.type>0"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foods">
        <ul>
          <li class="food-list foods-hook" v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px"  @click="selected(food, $event)">
                <span class="icon" >
                  <img :src="food.icon" width="57px" height="57px"/>
                </span>
                <div class="content" style="overflow: hidden">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span>月售{{food.sellCount}}份 &nbsp 好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart :seller="seller" :selectFoods="selectFoods"></shopcart>
    </div>
    <food :food="selectFood" ref="food"></food>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontrol from 'components/cartcontrol/cartcontrol'
  import food from 'components/food/food'
  const ERR_OK = 0
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.$http.get('./api/goods').then((response) => {
        let res = response.body
        if (res.errorno === ERR_OK) {
          this.goods = res.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
      this.iconMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    data () {
      return {
        goods: [],
        iconMap: [],
        listHeight: [],
        scrollY: 0,
        selectFood: {}
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.menu, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foods, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calculateHeight () {
        let foodsList = this.$refs.foods.getElementsByClassName('foods-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodsList.length; i++) {
          let item = foodsList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectCheck (index, event) {
        if (event._constructed) {
          let foodsList = this.$refs.foods.getElementsByClassName('foods-hook')
          let el = foodsList[index]
          this.foodsScroll.scrollToElement(el, 300)
        }
      },
      selected (food, e) {
        if (!e._constructed) {
          return
        }
        this.selectFood = food
        this.$refs.food.show()
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin'
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    border-top: 1px solid rgba(7, 17, 27, 0.1)
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        &.current
          background: #FFFFFF
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          line-height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.invoice
            bg-img('invoice_3')
          &.special
            bg-img('special_3')
        .text
          display: table-cell
          width: 56px
          text-align: center
          vertical-align: middle
          font-size: 12px
          font-weight: 200
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border: none
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .name
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
          font-size: 14px
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
          span
            font-size: 10px
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
          right: 0
          bottom: 12px
            
</style>