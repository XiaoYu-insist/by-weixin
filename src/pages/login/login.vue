<script setup lang="ts">
import { postSubAccountloginAPI, postOpenidLoginAPI } from '@/services/login';
import { useReginStore, useCodeStore } from '@/stores';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app'
import { regionStaff } from '@/services/region';

// 存储token
const regionStore = useReginStore()
// 存储openid
const codeStore = useCodeStore()
// 登陆按钮切换
const switchLogin = ref(false)
// 切换登录按钮隐藏
const switchLoginBut = ref(true)
// 数据
const form = ref({
  phones: '15880835008', // 账号
  passwords: 'a123456.' // 密码
})
const isLoading = ref(false) // 添加加载状态控制

/**
 * 微信快捷登录
 */

// 获取 code 登录凭证
let code = ''
onLoad(async () => {
  const res = await wx.login()
  code = res.code
})

// const wxlogin = async () => {
//   if (isLoading.value) return;
//   try {
//     isLoading.value = true;
//     uni.showLoading({ title: '登录中...' });

//     const loginRes: { code: string } = await new Promise((resolve, reject) => {
//       wx.login({
//         success: resolve,
//         fail: reject
//       });
//     });
//     if (loginRes.code) {
//       wx.request({
//         method: 'GET',
//         url: 'https://api.weixin.qq.com/sns/jscode2session',
//         data: {
//           appid: 'wx8159d7addde949df',
//           secret: 'c0cb264df05b6574ecfda8ddfdfb0eae',
//           js_code: loginRes.code,
//           grant_type: 'authorization_code'
//         },
//         success: async (res: any) => {
//           const fastlogin = await postOpenidLoginAPI({
//             cmd: 'wxLogin',
//             openid: res.data.openid
//           })
//           if (fastlogin.state === '4001') {
//             uni.showToast({
//               title: '微信登录未授权账，请先登录账号授权',
//               icon: 'none'
//             })
//             switchLogin.value = true  // 切换账号密码
//             switchLoginBut.value = false  // 按钮隐藏
//             openidsStore.openids = res.data.openid // 存储openid
//             console.log(res.data.openid)
//           }
//         }
//       })
//     }
//   } catch (error) {
//     console.error("微信授权失败", error);
//     uni.showToast({
//       title: '微信授权失败',
//       icon: 'none'
//     });
//   } finally {
//     uni.hideLoading();
//     isLoading.value = false;
//   }
// }
/**
 * 账号密码登录
 */
const accountlogin = async () => {
  // 表单验证
  if (!form.value.phones.trim()) {
    return uni.showToast({
      title: '请输入用户名/手机号',
      icon: 'none'
    });
  }

  if (!form.value.passwords) {
    return uni.showToast({
      title: '请输入密码',
      icon: 'none'
    });
  }

  if (isLoading.value) return;

  try {
    isLoading.value = true;
    uni.showLoading({ title: '登录中...' });

    const res = await postSubAccountloginAPI({
      cmd: 'login_btn_wz',
      phone: form.value.phones,
      pass: form.value.passwords,
      code: switchLoginBut.value ? '' : codeStore.code
    });

    if (res.state === '0000') {
      // 登录成功处理
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      });

      // 保存用户信息到本地存储
      regionStore.token = res.token
      //
      const subregion = await regionStaff({ cmd: 'get_qubh_list', phone: form.value.phones })
      if (subregion.state === '0000') {
        regionStore.regionId = subregion.Table![0].region_id
        regionStore.authority = subregion.Table![0].bind_power
        regionStore.regionPhone = form.value.phones
      }

      // 登录成功后延迟跳转
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/index/index',
          success: () => {
            let page = getCurrentPages().pop()
            if (page == undefined || page == null) return;
            page.onLoad!()
          },
        });
      }, 500);
    } else {
      // 登录失败处理
      uni.showToast({
        title: '账号或密码错误',
        icon: 'none'
      });
      codeStore.clearCodes()
    }
  } catch (error) {
    console.error("账号登录失败", error);
    uni.showToast({
      title: '网络错误，请重试',
      icon: 'none'
    });
  } finally {
    uni.hideLoading();
    isLoading.value = false;
  }
}
/**
 * 点击按钮数据
 * @param ev 按钮参数
 */
const onGetphonenumber: UniHelper.ButtonOnGetphonenumber = async (ev) => {
  if (ev.detail.errMsg?.slice(-2) === 'ok') {
    const res = await postOpenidLoginAPI({
      cmd: 'wxLogin',
      code,
    })
    codeStore.code = code
    switchLogin.value = true  // 切换账号密码
    switchLoginBut.value = false  // 按钮隐藏
  }

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
        <input class="input" type="text" v-model="form.phones" placeholder="请输入用户名/手机号码" />
        <input class="input" type="text" v-model="form.passwords" password placeholder="请输入密码" />
        <button class="button phone" @tap="accountlogin" :disabled="isLoading">
          登录
        </button>
      </view>

      <!-- 小程序端授权登录 -->
      <view v-else>
        <button class="button phone" open-type="getPhoneNumber" @getphonenumber="onGetphonenumber"
          :disabled="isLoading">
          {{ isLoading ? '登录中...' : '手机号快捷登录' }}
        </button>
      </view>
      <view class="extra" v-if="switchLoginBut">
        <view class="caption">
          <text>其他登录方式</text>
        </view>
        <view class="options">
          <!-- 切换登录 -->
          <button @tap="switchLogin = !switchLogin" :disabled="isLoading">
            <text class="icon" :class="switchLogin ? 'icon-weixin' : 'icon-zhanghao'">
              {{ switchLogin ? "微信登录" : "账号登录" }}
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

/* 添加禁用按钮样式 */
button[disabled] {
  opacity: 0.7;
  color: rgba(255, 255, 255, 0.9) !important;
}
</style>
