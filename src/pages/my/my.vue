<script lang="ts" setup>
import { useReginStore, useCodeStore } from '@/stores';
import type { ImageOnErrorEvent } from '@uni-helper/uni-app-types';
import { onMounted, ref } from 'vue';
const { safeArea } = uni.getWindowInfo()
const regionStore = useReginStore()
const codeStore = useCodeStore()
const handleLogout = () => {
  uni.showModal({
    title: "提示",
    content: "确定要退出登录吗？",
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: "退出成功",
          icon: "success",
          duration: 2000,
        });
        regionStore.clearAll()
        codeStore.clearCodes()
        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/login/login",
          });
        }, 2000);
      }
    },
  });
};
// 使用响应式变量控制头像地址
const avatarUrl = ref('')

onMounted(() => {
  if (regionStore.token) {
    // 添加随机参数避免缓存
    avatarUrl.value = `http://www.boyun.club/upload/user/${regionStore.regionPhone}.jpg?t=${Math.random()}`
  }
})

// 图片加载错误处理
const handleAvatarError = (e: ImageOnErrorEvent) => {
  avatarUrl.value = '/static/images/region_img.jpg' // 使用绝对路径
}
</script>
<template>
  <view class="head" :style="{ paddingTop: safeArea!.top + 'px' }">
    <!-- 用户信息区域 -->
    <!-- 未登陆 -->
    <view class="user-section" v-if="regionStore.token">
      <view class="avatar-container">
        <image class="avatar" :src="avatarUrl" @error="handleAvatarError" mode="aspectFill" />
        <view class="username">{{ regionStore.regionName }}</view>
      </view>
    </view>
    <!-- 已登录 -->
    <view class="user-section" v-else>
      <navigator class="avatar-container" hover-class="none" url="/pages/login/login">
        <image class="avatar" src="@/static/images/region_img.jpg" mode="aspectFill" />
        <view class="username">你好</view>
      </navigator>
    </view>
    <!-- 功能列表 -->
    <view class="menu-list">
      <navigator class="menu-item cursor-pointer" hover-class="none" url="/pageSettings/house/house">
        <view class="menu-item-left">
          <text class="icon-xinzengbangding" />
          <text>房东管理</text>
        </view>
        <uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
      </navigator>

      <navigator class="menu-item cursor-pointer" hover-class="none" :url="`/pageSettings/recharge/recharge`">
        <view class="menu-item-left">
          <text class="icon-chongzhijilu" />
          <text>充值记录</text>
        </view>
        <uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
      </navigator>

      <navigator class="menu-item cursor-pointer" hover-class="none" :url="`/pageSettings/usage/usage`">
        <view class="menu-item-left">
          <text class="icon-ele_bill" />
          <text>操作记录</text>
        </view>
        <uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
      </navigator>

      <view class="menu-item cursor-pointer" @tap="handleLogout">
        <view class="menu-item-left">
          <text class="icon-tuichu" />
          <text>退出登录</text>
        </view>
        <uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.head {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.user-section {
  padding: 60rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
  border-radius: 80rpx;
  border: 4rpx solid #ffffff;
}

.username {
  font-size: 50rpx;
  color: #333333;
}

.menu-list {
  padding: 30rpx;
  flex: 1;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
}

.menu-item-left {
  display: flex;
  align-items: center;
  gap: 20rpx;

  .menu-item-left text {
    font-size: 28rpx;
    color: #333333;
  }
}
</style>
