<script lang="ts" setup>
import { ref } from "vue";

const activeTime = ref("electricity");

const switchTime = (time: string) => {
  activeTime.value = time;
};

</script>
<template>
  <view class="analysis-card">
    <view class="card-header">
      <text class="title">用电分析</text>
      <view class="time-selector">
        <text :class="['time-option', activeTime === 'electricity' ? 'active' : '']"
          @tap="switchTime('electricity')">电</text>
        <text :class="['time-option', activeTime === 'water' ? 'active' : '']" @tap="switchTime('water')">水</text>
        <text :class="['time-option', activeTime === 'hotwater' ? 'active' : '']" @tap="switchTime('hotwater')">热</text>
      </view>
    </view>
    <view class="chart-container">
      <image class="chart" src="https://public.readdy.ai/ai/img_res/4313381f2f7ba262dde957219f0b24c2.jpg"
        mode="aspectFit" />
    </view>
  </view>
</template>
<style lang="scss">
.analysis-card {
  background-color: #ffffff;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;

    .time-selector {
      display: flex;
      gap: 20rpx;
      background-color: #f5f6fa;
      padding: 4rpx;
      border-radius: 30rpx;

      .time-option {
        padding: 10rpx 30rpx;
        font-size: 14px;
        color: #666666;
        border-radius: 30rpx;
      }

      .time-option.active {
        background-color: #ffffff;
        color: #4a90e2;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

    }
  }

  .chart-container {
    height: 260rpx;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
