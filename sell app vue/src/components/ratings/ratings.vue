<template>
  <div class="ratings" ref="rating">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-felt">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="rating in ratings">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rayeIime}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import star from 'components/star/star'
  import split from 'components/split/split'
  import ratingselect from 'components/ratingselect/ratingselect'
  const ERR_OK = 0
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        selectType: {
          num: 2
        },
        onlyContent: {
          on: false
        },
        ratings: []
      }
    },
    components: {
      star,
      split,
      ratingselect
    },
    created () {
      this.$http.get('./api/ratings').then((response) => {
        let res = response.body
        if (res.errorno === ERR_OK) {
          this.ratings = res.data
          this.$nextTick(() => {
            this._initScroll()
          })
        }
      })
    },
    methods: {
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.rating, {
          click: true
        })
      }
    }
  }
</script>
<style lang="stylus">
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .overview
      padding: 18px 0
      .overview-felt
        display: inline-block
        width: 34%
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        .score
          line-height: 28px
          font-size: 24px
          color: #EBD712
          padding: 5px 0
        .title
          line-height: 14px
          padding: 5px 0
          font-size: 14px
          color: rgb(7, 17 ,27)
        .rank
          padding: 5px 0
          line-height: 12px
          font-size: 12px
          color: rgb(147, 153 ,159)
      .overview-right
        width: 64%
        display: inline-block
        .score-wrapper
          padding-left: 25px
          margin-bottom: 8px
          line-height: 18px
          font-size: 0
          @media  only screen and (max-width: 320px)
            padding-left: 10px
          .title
            display: inline-block
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .star
            display: inline-block
            margin: 0 10px
            vertical-align: top
          .score
            display: inline-block
            line-height: 18px
            font-size: 12px
            color: rgb(255, 153 ,0)
        .delivery-wrapper
          padding-left: 25px
          font-size: 0
          @media  only screen and (max-width: 320px)
            padding-left: 10px
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153 ,159)
</style>