<script setup lang="ts">

import { postSubAccountloginAPI } from '@/services/login';
import { ref } from 'vue';

// 登陆按钮切换
const switchLogin = ref(false)
const phones = ref('') // 账号
const passwords = ref('') // 密码
/**
 * 微信快捷登录
 */
const wxlogin = () => {
  wx.login({
    success(res) {
      if (res.code) {
        wx.request<WechatMiniprogram.RequestTask>({
          method: 'GET',
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: 'wx8159d7addde949df',
            secret: 'c0cb264df05b6574ecfda8ddfdfb0eae',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          success: (res) => {
            console.log("获取成功", res.data)
          }
        })

        // await getOpenidLoginAPI({cmd:'WeChat_openid',openid:})
      }
    }
  })
}

/**
 * 账号密码登录
 */
const accountlogin = async () => {
  const res = await postSubAccountloginAPI({
    cmd: 'login_btn_wz',
    phone: phones.value,
    pass: passwords.value
  })
  console.log(res)
}
</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="@/static/images/logo-icon.png"></image>
    </view>
    <view class="login">
      <!-- 网页端表单登录 -->
      <view v-if="switchLogin">
        <input class="input" type="text" v-model="phones" placeholder="请输入用户名/手机号码" />
        <input class="input" type="text" v-model="passwords" password placeholder="请输入密码" />
        <button class="button phone" @tap="accountlogin">登录</button>
      </view>


      <!-- 小程序端授权登录 -->
      <view v-else>
        <button class="button phone" @tap="wxlogin">
          手机号快捷登录
        </button>
      </view>
      <view class="extra">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 切换登录 -->
          <button @tap="switchLogin = !switchLogin">
            <text class="icon " :class="switchLogin ? 'icon-weixin' : 'icon-zhanghao'">
              {{ switchLogin ? "微信登录" : "账号登陆" }}
            </text>
          </button>
        </view>
      </view>
      <view class="tips">登录/注册即视为你同意《服务条款》和《隐私协议》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;

  image {
    width: 320rpx;
    height: 320rpx;
    margin-top: 14vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;

  }

  .phone {
    background-color: #28bb9c;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;

    .caption {
      width: 460rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;

      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;

      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      width: 6em;
      height: 6em;
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
