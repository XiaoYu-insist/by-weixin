<template name="skeleton">
  <scroll-view :enable-back-to-top="true" :scroll-y="true" class="viewport viewport">
    <view class="main-content main-content">
      <view is="pages/index/components/PaymentCard">
        <view class="meter-card PaymentCard--meter-card sk-image">
          <navigator class="meter-info PaymentCard--meter-info" hover-class="none">
            <view class="meter-title PaymentCard--meter-title sk-transparent sk-text-14-2857-379 sk-text">当月收入金额</view>
            <view class="meter-reading PaymentCard--meter-reading">
              <text class="number PaymentCard--number sk-transparent sk-text-14-2857-396 sk-text">3426.8</text>
              <text class="unit PaymentCard--unit sk-transparent sk-text-14-2857-834 sk-text">元</text>
            </view>
          </navigator>
          <view class="usage-stats PaymentCard--usage-stats">
            <navigator class="stat-item PaymentCard--stat-item" hover-class="none">
              <text class="label PaymentCard--label sk-transparent sk-text-14-2857-701 sk-text">今日充值</text>
              <text class="value PaymentCard--value sk-transparent sk-text-14-2857-23 sk-text">2笔</text>
            </navigator>
            <navigator class="stat-item PaymentCard--stat-item" hover-class="none">
              <text class="label PaymentCard--label sk-transparent sk-text-14-2857-592 sk-text">今日收入</text>
              <text
                class="value PaymentCard--value increase PaymentCard--increase sk-transparent sk-text-14-2857-370 sk-text">300元</text>
            </navigator>
          </view>
        </view>
      </view>
      <view is="pages/index/components/DeviceRun">
        <view class="house-status-card DeviceRun--house-status-card">
          <view class="card-header DeviceRun--card-header">
            <view class="title DeviceRun--title sk-transparent sk-text-14-2857-933 sk-text">设备运行情况</view>
          </view>
          <view class="status-chart DeviceRun--status-chart">
            <view class="chart-item DeviceRun--chart-item">
              <view class="progress-circle DeviceRun--progress-circle">
                <view class="number DeviceRun--number sk-transparent sk-text-14-2857-179 sk-text"
                  style="background-position-x: 50%;">12</view>
              </view>
              <view class="label DeviceRun--label sk-transparent sk-text-14-2857-23 sk-text"
                style="background-position-x: 50%;">总租户</view>
            </view>
            <view class="chart-item DeviceRun--chart-item">
              <view class="progress-circle DeviceRun--progress-circle vacant DeviceRun--vacant">
                <view class="number DeviceRun--number sk-transparent sk-opacity">2</view>
              </view>
              <view class="label DeviceRun--label sk-transparent sk-text-14-2857-420 sk-text"
                style="background-position-x: 50%;">采集器</view>
            </view>
            <view class="chart-item DeviceRun--chart-item">
              <view class="progress-circle DeviceRun--progress-circle maintenance DeviceRun--maintenance">
                <view class="number DeviceRun--number sk-transparent sk-opacity">1</view>
              </view>
              <view class="label DeviceRun--label sk-transparent sk-text-14-2857-181 sk-text"
                style="background-position-x: 50%;">失败数</view>
            </view>
          </view>
        </view>
      </view>
      <view is="pages/index/components/Electroanalysis">
        <view class="analysis-card Electroanalysis--analysis-card">
          <view class="card-header Electroanalysis--card-header">
            <text class="title Electroanalysis--title sk-transparent sk-text-14-2857-254 sk-text">用电分析</text>
            <view class="time-selector Electroanalysis--time-selector">
              <text
                class="time-option Electroanalysis--time-option active Electroanalysis--active sk-transparent sk-text-14-2857-252 sk-text">电</text>
              <text class="time-option Electroanalysis--time-option sk-transparent sk-text-14-2857-78 sk-text">水</text>
              <text class="time-option Electroanalysis--time-option sk-transparent sk-text-14-2857-694 sk-text">热</text>
            </view>
          </view>
          <view class="chart-container Electroanalysis--chart-container">
            <image class="chart Electroanalysis--chart sk-image" mode="aspectFit"></image>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<style>
.sk-transparent {
  color: transparent !important;
}

.sk-text--23-3333-440 {
  background-image: linear-gradient(transparent -23.3333%, #EEEEEE 0%, #EEEEEE 123.3333%, transparent 0%) !important;
  background-size: 100% 30.0000rpx;
  position: relative !important;
}

.sk-text {
  background-origin: content-box !important;
  background-clip: content-box !important;
  background-color: transparent !important;
  color: transparent !important;
  background-repeat: repeat-y !important;
}

.sk-text--3-3333-797 {
  background-image: linear-gradient(transparent -3.3333%, #EEEEEE 0%, #EEEEEE 103.3333%, transparent 0%) !important;
  background-size: 100% 30.0000rpx;
  position: relative !important;
}

.sk-text-14-2857-847 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2000rpx;
  position: relative !important;
}

.sk-text-14-2857-933 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 134.4000rpx;
  position: relative !important;
}

.sk-text-14-2857-97 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8000rpx;
  position: relative !important;
}

.sk-text-14-2857-845 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6000rpx;
  position: relative !important;
}

.sk-text-14-2857-902 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8000rpx;
  position: relative !important;
}

.sk-text-14-2857-423 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 33.6000rpx;
  position: relative !important;
}

.sk-text-14-2857-338 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8000rpx;
  position: relative !important;
}

.sk-text-14-2857-275 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8000rpx;
  position: relative !important;
}

.sk-text-14-2857-963 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8000rpx;
  position: relative !important;
}

.sk-text-14-2857-404 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8000rpx;
  position: relative !important;
}

.sk-opacity {
  opacity: 0 !important;
}

.sk-text-14-2857-427 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8000rpx;
  position: relative !important;
}

.sk-text-14-2857-741 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8000rpx;
  position: relative !important;
}

.sk-text-14-2857-883 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 44.8000rpx;
  position: relative !important;
}

.sk-text-14-2857-216 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2000rpx;
  position: relative !important;
}

.sk-text-14-2857-827 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2000rpx;
  position: relative !important;
}

.sk-text-14-2857-954 {
  background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
  background-size: 100% 39.2000rpx;
  position: relative !important;
}

.sk-image {
  background: #EFEFEF !important;
}

.sk-pseudo::before,
.sk-pseudo::after {
  background: #EFEFEF !important;
  background-image: none !important;
  color: transparent !important;
  border-color: transparent !important;
}

.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
  border-radius: 0 !important;
}

.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
  border-radius: 50% !important;
}

.sk-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: transparent;
}
</style>
