<template>
    <div class="on">
      <section class="msite">
        <headertop :title="address.name">
          <span class="header_search" slot="left">
            <i class="iconfont icon-icon-test dinwei"></i>
          </span>
        </headertop>
        <!--首页导航-->
        <nav class="msite_nav">
          <div class="swiper-container" v-if="categorysArr.length">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                <a href="javascript:" class="link_to_food" v-for="(item, index) in categorys" :key="index">
                  <div class="food_container">
                    <img :src="baseImageUrl+item.image_url">
                  </div>
                  <span>{{item.title}}}</span>
                </a>
              </div>
            </div>
          </div>
          <img src="./images/msite_back.svg" alt="back" v-else>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont icon-xuanxiang"></i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <shoplist></shoplist>
        </div>
      </section>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import headertop from '../../components/headerTop/headerTop.vue'
import shoplist from '../../components/shopList/shopList.vue'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  data(){
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getCategorys')
  },
  methods: {
  },
  components: {headertop, shoplist},
  computed: {
    ...mapState(['address', 'categorys']),
    //把获取的一位数组转换为2维数组
    categorysArr(){
      const {categorys} = this
      let arr = []
      let arrmin = []
      categorys.forEach(h => {
        if(arrmin.length===8) {
            arrmin = []
          }
          // 如果minArr是空的, 将小数组保存到大数组中
          if(arrmin.length===0) {
            arr.push(arrmin)
          }
          // 将当前分类保存到小数组中
          arrmin.push(h)
      });
      return arr
    }
  },
  watch: {
    //界面更新完毕使用swiper
    categorys(){
      this.$nextTick(()=> {
        new Swiper('.swiper-container', {
          direction: 'vertical', // 垂直切换选项
          loop: true // 循环模式选项
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
          width 100%
          .msite_nav
            bottom-border-1px(#e4e4e4)
            margin-top 45px
            height 200px
            background #fff
            .swiper-container
              width 100%
              height 100%
              .swiper-wrapper
                width 100%
                height 100%
                .swiper-slide
                  display flex
                  justify-content center
                  align-items flex-start
                  flex-wrap wrap
                  .link_to_food
                    width 25%
                    .food_container
                      display block
                      width 100%
                      text-align center
                      padding-bottom 10px
                      font-size 0
                      img
                        display inline-block
                        width 50px
                        height 50px
                    span
                      display block
                      width 100%
                      text-align center
                      font-size 13px
                      color #666
              .swiper-pagination
                >span.swiper-pagination-bullet-active
                  background #02a774
          .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>
