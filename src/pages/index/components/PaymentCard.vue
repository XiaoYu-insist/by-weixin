<template>
  <view class="meter-card">
    <navigator :url="`/pageDataList/exhibitList/exhibitList?type=${0}`" hover-class="none" class="meter-info">
      <view class="meter-title">当月收入金额</view>
      <view class="meter-reading">
        <text class="number">3426.8</text>
        <text class="unit">元</text>
      </view>
    </navigator>
    <view class="usage-stats">
      <navigator :url="`/pageDataList/exhibitList/exhibitList?type=${1}`" hover-class="none" class="stat-item">
        <text class="label">今日充值</text>
        <text class="value">2笔</text>
      </navigator>
      <navigator :url="`/pageDataList/exhibitList/exhibitList?type=${2}`" hover-class="none" class="stat-item">
        <text class="label">今日收入</text>
        <text class="value increase">300元</text>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
.meter-card {
  background: linear-gradient(135deg, #4a90e2 0%, #6366f1 100%);
  border-radius: 20rpx;
  padding: 40rpx;
  color: #ffffff;
  margin-bottom: 30rpx;

  .meter-info {
    margin-bottom: 30rpx;

    .meter-title {
      font-size: 14px;
      opacity: 0.9;
      color: #e3e3e3;
    }

    .meter-reading {
      margin-top: 20rpx;
    }

    .meter-reading .number {
      font-size: 48px;
      font-weight: bold;
    }

    .meter-reading .unit {
      font-size: 16px;
      margin-left: 10rpx;
    }

  }

  .usage-stats {
    display: flex;
    gap: 60rpx;
    margin-bottom: 30rpx;

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 8rpx;
    }

    .stat-item .label {
      font-size: 12px;
      opacity: 0.9;
      color: #e3e3e3;
    }

    .stat-item .value {
      font-size: 16px;
      font-weight: 500;

    }
  }
}
</style>
