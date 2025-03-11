<template>
  <view class="house-status-card">
    <view class="card-header">
      <view class="title">设备运行情况</view>
    </view>
    <view class="status-chart">
      <navigator url="/pageDataList/tenantsList/tenantsList" hover-class="none" class="chart-item">
        <view class="progress-circle">
          <view class="number">12</view>
        </view>
        <view class="label">总租户</view>
      </navigator>
      <navigator url="/pageDataList/Collector/Collector" hover-class="none" class="chart-item">
        <view class="progress-circle vacant">
          <view class="number">2</view>
        </view>
        <view class="label">采集器</view>
      </navigator>
      <navigator url="/pageDataList/failData/failData" hover-class="none" class="chart-item">
        <view class="progress-circle maintenance">
          <view class="number">1</view>
        </view>
        <view class="label">失败数</view>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
.house-status-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .card-header .title {
      font-size: 16px;
      color: #333333;
      font-weight: 500;
    }
  }

  .status-chart {
    display: flex;
    justify-content: space-around;

    .chart-item {
      text-align: center;


      .chart-item .label {
        font-size: 14px;
        color: #666666;
      }

      .progress-circle {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        display: flex;
        background-color: #aecdf1;
        align-items: center;
        justify-content: center;
        margin-bottom: 16rpx;


        .progress-circle .number {
          font-size: 24px;
          font-weight: bold;
        }
      }

      .progress-circle.vacant {
        background-color: #eed0a5;
      }

      .progress-circle.maintenance {
        background-color: #f1a4a0;
      }

    }
  }
}
</style>
