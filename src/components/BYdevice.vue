<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { ammeter, water, hotwater, operations } from '@/data/deviceData/deviceIfon'
import { setButtonTypeProcess } from './buttonAchieve'

const query = defineProps<{
  type: number
}>()
// 设备
const deviceList = ref()
onBeforeMount(() => {
  if (query.type === 0) {
    deviceList.value = ammeter
  } else if (query.type === 1) {
    deviceList.value = water
  } else if (query.type === 2) {
    deviceList.value = hotwater
  }
})

const popup = ref(null) // 获取 uni-popup 的引用
const popupContent = ref('')
const handleButtonClick = (DeviceId: number, butType: number) => {
  // 将 popup 引用传递给处理函数
  setButtonTypeProcess(DeviceId, butType, popup.value)
}

</script>
<template>
  <!-- 设备信息卡片 -->
  <view class="device-card">
    <view class="device-info">
      <view class="device-name">
        <text>{{ deviceList?.Name }}</text>
        <text class="device-id">编号:{{ deviceList?.DeviceId }}</text>
      </view>
      <view class="device-icon" :class="deviceList?.Icon"></view>
    </view>

    <view class="device-stats">
      <view class="stat-item">
        <text class="stat-value">{{ deviceList?.Speed }}</text>
        <text class="stat-label">设备倍率</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ deviceList?.Price }}</text>
        <text class="stat-label">价格</text>
      </view>
      <view class="stat-item">
        <text class="stat-value">{{ deviceList?.Powerl }}</text>
        <text class="stat-label">使用量</text>
      </view>
      <view class="stat-item">
        <text class="stat-label">设备类型</text>
        <text class="stat-value">{{ deviceList?.Type }}</text>
      </view>
      <view class="stat-item">
        <text class="stat-label">状态</text>
        <text class="stat-value">{{ deviceList?.State }}</text>
      </view>
      <view class="stat-item">
        <text class="stat-label">采集类型</text>
        <text class="stat-value">{{ deviceList?.Collect }}</text>
      </view>
    </view>
  </view>

  <!-- 操作区域 -->
  <view class="operation-section">
    <text class="section-title">更多操作</text>
    <view class="operation-grid">
      <button class="grid-item" hover-class="none" plain v-for="(item, index) in operations" :key="index"
        @tap="handleButtonClick(query.type, item.type)">
        <view class="icon-wrapper" :class="item.icon">
        </view>
        {{ item.name }}
      </button>
    </view>
  </view>
  <uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0" background-color="#fff">
    {{ popupContent }}
  </uni-popup>
</template>
<style lang="scss">
.device-card {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;

  .device-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 30rpx;
    margin-right: 30rpx;

    .device-name {
      display: flex;
      flex-direction: column;
      gap: 10rpx;

      text:first-child {
        font-size: 20px;
        font-weight: 600;
        color: #333333;
      }
    }

    .device-id {
      font-size: 14px;
      color: #4caf50;
    }

    .device-icon {
      width: 80rpx;
      height: 80rpx;
      font-size: 100rpx;
    }
  }

  .device-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;


    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10rpx;
      padding: 20rpx 0;

      &:nth-child(-n+3) {
        border-bottom: 1px solid #f0f0f0;
      }

      .stat-value {
        font-size: 16px;
        color: #333333;
        font-weight: 500;
      }

      .stat-label {
        font-size: 14px;
        color: #999999;
      }
    }
  }


}

.operation-section {
  margin: 30rpx 0;

  .section-title {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    margin: 30rpx 0;
  }

  .operation-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20rpx;

    .grid-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10rpx;
      border: none;
      font-size: 20rpx;
      color: #666666;

      .icon-wrapper {
        width: 80rpx;
        height: 80rpx;
        border-radius: 16rpx;
        font-size: 60rpx;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

  }
}
</style>
