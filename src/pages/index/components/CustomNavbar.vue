<script lang="ts" setup>
import { useReginStore } from '@/stores';
const { safeArea } = uni.getWindowInfo()
const regionStore = useReginStore()
</script>
<template>
  <view class="page" :style="{ paddingTop: safeArea!.top + 'px' }">
    <!-- 个人资料 -->
    <view class="profile">
      <!-- 情况1：已登录 -->
      <view class="overview" v-if="regionStore.regionId">
        <view class="meta">
          <view class="nickname"> {{ regionStore.regionName }} </view>
          <view class="extra">
            <text class="update">{{ "区域编号：" + regionStore.regionId }}</text>
          </view>
        </view>
      </view>
      <!-- 情况2：未登录 -->
      <navigator class="overview" url="/pages/login/login" hover-class="none" v-else>
        <view class="meta">
          <view class="nickname">您好</view>
          <view class="extra">
            <text class="update">欢迎使用泊云社区</text>
          </view>
        </view>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
/* 用户信息 */
.profile {
  margin-top: 20rpx;
  position: relative;

  .overview {
    display: flex;
    justify-content: space-between;
    height: 120rpx;
    padding: 0 36rpx;
    color: #000;
  }

  .meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    line-height: 30rpx;
    padding: 16rpx 0;
    margin-left: 20rpx;
  }

  .nickname {
    max-width: 400rpx;
    margin-bottom: 25rpx;
    font-size: 45rpx;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .extra {
    display: flex;
    font-size: 20rpx;
  }

  .tips {
    font-size: 22rpx;
    color: #979a9a;
  }

  .update {
    margin-right: 10rpx;
    border-radius: 30rpx;
    color: #979a9a;
    font-size: medium;
  }
}
</style>
