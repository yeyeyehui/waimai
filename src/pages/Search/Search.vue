<template>
  <section class="search">
    <form class="search_form" action="#">
      <div style="position: relative">
        <i class="iconfont icon-search"></i>
        <input type="search" name="search" placeholder="输入商家、商品名称" class="search_input">
      </div>
      <input type="submit" name="submit" class="search_submit" value="搜索">
    </form>
  </section>
</template>

<script>
export default {
  methods: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f8f8f8
          font-size 14px
          color #745
          background-color #f8f8f8
          padding-left 35px
          &::-webkit-input-placeholder
            color #adadad
            font-weight normal
        &.search_submit
          float right
          width 18%
          font-size 16px
          color #333
          background #fff
.icon-search
  position absolute
  top: 10px
  left 10px
  color #adadad
</style>
