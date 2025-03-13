<script lang="ts" setup>

const { safeArea } = uni.getWindowInfo()

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
        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/login/login",
          });
        }, 2000);
      }
    },
  });
};
</script>
<template>
  <view class="head" :style="{ paddingTop: safeArea!.top + 'px' }">
    <!-- 用户信息区域 -->
    <view class="user-section">
      <view class="avatar-container">
        <image class="avatar" src="https://public.readdy.ai/ai/img_res/30826713d88cd23b9870782b01cdd83c.jpg"
          mode="aspectFill" />
        <view class="username">你好</view>
      </view>
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

      <navigator class="menu-item cursor-pointer" hover-class="none"
        :url="`/pageDataList/exhibitList/exhibitList?type=${0}`">
        <view class="menu-item-left">
          <text class="icon-chongzhijilu" />
          <text>充值记录</text>
        </view>
        <uni-icons type="right" size="16" color="#CCCCCC"></uni-icons>
      </navigator>

      <navigator class="menu-item cursor-pointer" hover-class="none"
        :url="`/pageDataList/exhibitList/exhibitList?type=${0}`">
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

<style>
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
  font-size: 18px;
  color: #333333;
  font-weight: 500;
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
}

.menu-item-left text {
  font-size: 16px;
  color: #333333;
}

.action-button {
  display: flex;
  align-items: center;
  background-color: #4caf50;
  padding: 12rpx 24rpx;
  border-radius: 30rpx;
  gap: 8rpx;
}

.action-button text {
  color: #ffffff;
  font-size: 14px;
}
</style>
