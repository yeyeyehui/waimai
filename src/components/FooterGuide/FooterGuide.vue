<template>
    <footer class="footer_guide border-1px">
    <span class="guide_item" :class="{on: '/msite' === $route.path}" @click="goto('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span class="sear">首页</span>
    </span>
    <span class="guide_item" :class="{on: '/search' === $route.path}" @click="goto('/search')">
      <span class="item_icon">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="sear">搜索</span>
    </span>
    <span class="guide_item" :class="{on: '/order' === $route.path}" @click="goto('/order')">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span class="sear">订单</span>
    </span>
    <span class="guide_item" :class="{on: '/profile' === $route.path}" @click="goto('/profile')">
      <span class="item_icon">
        <i class="iconfont icon-weibiaoti2fuzhi12"></i>
      </span>
      <span class="sear">我的</span>
    </span>
  </footer>
</template>

<script>
export default {
  methods: {
    goto (url) {
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
.footer_guide
  top-border-1px(#e4e4e4)
  position relative
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  background-color #fff;
  width: 100%
  height 50px
  display flex
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    margin 5px
    color #999
    padding-top 8px
    i
    font-size 15px
    .sear
      font-size 8px
      margin-top 3px
    &.on
      color #0096FF
      span
      margin-bottom 2px
</style>
