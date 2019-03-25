<template>
<section class="loginContainer">
  <div class="loginInner">
    <div class="login_header">
      <h2 class="login_logo">vue外卖</h2>
      <div class="login_header_title">
        <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">短信登录</a>
        <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">密码登录</a>
      </div>
    </div>
    <div class="login_content">
      <form @submit.prevent="login">
        <div :class="{on: !loginWay}">
          <section class="login_message">
            <input type="tel" maxlength="11" placeholder="手机号" v-model.trim="phone">
            <button :disabled="!rightPhone" class="get_verification" @click.prevent="getcode" :class="{aaa: rightPhone}">{{computeTime > 0?`已发送(${computeTime}s)`: '获取验证码'}}</button>
          </section>
          <section class="login_verification">
            <input type="tel" maxlength="8" placeholder="验证码" v-model.trim="code">
          </section>
          <section class="login_hint">
            温馨提示：未注册外卖帐号的手机号，登录时将自动注册，且代表已同意
            <a href="javascript:;">《用户服务协议》</a>
          </section>
        </div>
        <div :class="{on: loginWay}">
          <section>
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model.trim="name">
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="密码" v-show="pwds" v-model.trim="pwd">
              <input type="password" maxlength="8" placeholder="密码" v-show="!pwds" v-model.trim="pwd">
              <mt-switch v-model="pwds" class="switch_button">
              </mt-switch>
            </section>
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="验证码" v-model.trim="captcha">
              <img class="get_verification" :src="captchas" @click="getCaptchas">
            </section>
          </section>
        </div>
        <button class="login_submit">登录</button>
      </form>
      <a href="javascript:;" class="about_us">关于我们</a>
    </div>
    <a href="javascript:" class="go_back" @click="$router.back()">
      <i class="iconfont icon-jiantou2"></i>
    </a>
  </div>
</section>
</template>

<script>
import { MessageBox } from 'mint-ui';
import {reqSendCode, reqPwdLogin, reqSmsLogin} from '../../api'
export default {
  data(){
    return {
      loginWay: false,// true代表短信登陆, false代表密码
      phone: '',//手机号
      computeTime: 0,// 计时的时间
      setTimeoutId: 0,//计算器
      pwds: true,
      pwd: '',// 密码
      name: '',// 用户名
      captchas: 'http://localhost:4000/captcha',//图片验证码
      captcha: '',//验证码
      alertText: '', // 提示文本
      alertShow: false, // 是否显示警告框,
      code: '',// 短信验证码
    }
  },
  methods: {
    //点击获取验证码显示倒计时
    async getcode(){
      if(!this.computeTime){
        //设置为30秒
        this.computeTime = 30
        //倒计时
         this.setTimeoutId = setInterval(()=> {
          this.computeTime--
          if(!this.computeTime) {
            //清除定时器
            clearInterval(this.setTimeoutId)
          }
        },1000)
      }
      const result = await reqSendCode(this.phone)
      if(result.code===1){
        MessageBox('提示', result.msg);
        if(this.setTimeoutId){
          //清除定时器
          this.computeTime = 0
        }
      }
    },
    //点击验证码图片重新获取验证码图
    getCaptchas(){
      this.captchas = 'http://localhost:4000/captcha?key='+Date.now()
    },
    async login(){
      //存储用户信息
      let result = 0
      if(!this.loginWay){ 
        //短信登录
        const {rightPhone, phone, code} = this
        // 手机号不正确
        if(!phone) return MessageBox('提示', '请输入手机号码');
        //手机格式不正确
        if(!rightPhone) return MessageBox('提示', '手机号不正确');
        // 验证不正确
        if(!code) return MessageBox('提示', '请输入验证码');
        //登录账号
        result = await reqSmsLogin(phone, code)
      }else{// 密码登陆
        const {name, pwd, captcha} = this
        // 用户名必须指定
        if(!name) return MessageBox('提示', '请输入用户名');
        // 密码必须指定
        if(!pwd) return MessageBox('提示', '请输入密码');
        // 验证码必须指定
        if(!captcha) return MessageBox('提示', '请输入验证码');
        // 发送ajax请求密码登陆
        result = await reqPwdLogin({name, pwd, captcha})
      }
      // 停止计时
      if(this.computeTime) {
        this.computeTime = 0
        clearInterval(this.intervalId)
        this.intervalId = undefined
      }
      // 根据结果数据处理
      if(result===0) {
        // 去个人中心界面
        this.$router.push('/profile')
      }else{
        this.captchas = 'http://localhost:4000/captcha?key='+Date.now()
        // 显示警告提示
        const msg = result.msg
        MessageBox('提示', msg)
        return 
      }
    }
  },
  computed: {
    //判断手机格式是否合格
    rightPhone(){
      return /^1\d{10}$/.test(this.phone)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.loginContainer
  width 100%
  height 100%
  background #fff
  .loginInner
    padding-top 60px
    width 80%
    margin 0 auto
    .login_header
      .login_logo
        font-size 40px
        font-weight bold
        color #0096ff
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            color #0096ff
            font-weight 700
            border-bottom 2px solid #0096ff
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            width 100%
            height 100%
            padding-left 10px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
            &:focus
              border 1px solid #02a774
          .login_message
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .get_verification
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
              border 0
              color #ccc
              font-size 14px
              background transparent
              &.aaa
                color #000
          .login_verification
            position relative
            margin-top 16px
            height 48px
            font-size 14px
            background #fff
            .switch_button
              position absolute
              top 50%
              right 10px
              transform translateY(-50%)
          .login_hint
            margin-top 12px
            color #999
            font-size 14px
            line-height 20px
            >a
              color #02a774
        .login_submit
          display block
          width 100%
          height 42px
          margin-top 30px
          border-radius 4px
          background #0096ff
          color #fff
          text-align center
          font-size 16px
          line-height 42px
          border 0
      .about_us
        display block
        font-size 12px
        margin-top 20px
        text-align center
        color #999
    .go_back
      position absolute
      top 5px
      left 5px
      width 30px
      height 30px
      >.iconfont
        font-size 20px
        color #999
</style>
