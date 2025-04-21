<script lang="ts" setup>
import { ref } from "vue";

const collectors = ref([
  {
    id: 1,
    name: "采集器-A001",
    deviceId: "COL2025031201",
    location: "生产车间 A 区域",
    status: "在线",
    temperature: 25.6,
    humidity: 45,
    battery: 85,
  },
  {
    id: 2,
    name: "采集器-A002",
    deviceId: "COL2025031202",
    location: "生产车间 B 区域",
    status: "在线",
    temperature: 26.2,
    humidity: 48,
    battery: 92,

  },
  {
    id: 3,
    name: "采集器-A003",
    deviceId: "COL2025031203",
    location: "仓储区域",
    status: "离线",
    temperature: 24.8,
    humidity: 52,
    battery: 15,
  },
]);

const handleCollectorDetail = (collector: any) => {
  uni.showToast({
    title: `查看${collector.name}的详情`,
    icon: "none",
  });
};

const handleRefresh = (collector: any) => {
  // uni.showLoading({
  //   title: "刷新中...",
  // });

  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({
      title: "数据已更新",
      icon: "success",
    });
  }, 1500);
};

const handleSettings = (collector: any) => {
  uni.showActionSheet({
    itemList: ["设备详细", "设备配置", "重启设备", "删除设备"],
    success: (res) => {
      uni.showToast({
        title: `选择了${res.tapIndex}操作`,
        icon: "none",
      });
    },
  });
};
</script>
<template>
  <scroll-view scroll-y>
    <view class="content">
      <view class="stats-card">
        <view class="stat-item">
          <text class="stat-value">36</text>
          <text class="stat-label">总数量</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">28</text>
          <text class="stat-label">在线</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">8</text>
          <text class="stat-label">离线</text>
        </view>
        <view class="stat-item">
          <text class="stat-value">92%</text>
          <text class="stat-label">稳定率</text>
        </view>
      </view>
      <view class="section">
        <view class="collector-list" v-for="num in 5" :key="num">
          <view v-for="(collector, index) in collectors" :key="index" class="collector-card"
            @tap="handleCollectorDetail(collector)">
            <view class="collector-info">
              <image class="device-image" src="@/static/images/Collector.png" mode="aspectFill"></image>
              <view class="info-content">
                <view class="name-row">
                  <text class="name">{{ collector.name }}</text>
                  <text :class="['status', collector.status === '在线' ? 'active' : 'inactive']">{{ collector.status
                  }}</text>
                </view>
                <text class="device-id">设备ID: {{ collector.deviceId }}</text>
                <text class="location">{{ collector.location }}</text>
              </view>
            </view>
            <view class="metrics-info">
              <view class="metric-item">
                <text class="metric-value">{{ collector.temperature }}°C</text>
                <text class="metric-label">温度</text>
              </view>
              <view class="metric-item">
                <text class="metric-value">{{ collector.humidity }}%</text>
                <text class="metric-label">湿度</text>
              </view>
              <view class="metric-item">
                <text class="metric-value">{{ collector.battery }}%</text>
                <text class="metric-label">电量</text>
              </view>
            </view>
            <view class="action-buttons">
              <uni-icons type="refresh" size="24" color="#4CAF50" @tap="handleRefresh(collector)" />
              <uni-icons type="gear" size="24" color="#2196F3" @tap="handleSettings(collector)" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </scroll-view>
</template>



<style lang="scss">
page {
  height: 100%;
  background-color: #f8f9fa;
}


.content {
  flex: 1;
  overflow: auto;
  padding: 30rpx;

  .stats-card {
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 40rpx;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30rpx;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10rpx;

      .stat-value {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
      }

      .stat-label {
        font-size: 14px;
        color: #999999;
      }
    }
  }

  .section {
    margin-top: 30rpx;

    .collector-card {
      background-color: #ffffff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

      .collector-info {
        display: flex;
        gap: 20rpx;
        margin-bottom: 20rpx;

        .device-image {
          width: 120rpx;
          height: 120rpx;
          border-radius: 12rpx;

          .info-content {
            flex: 1;

            .name-row {
              display: flex;
              align-items: center;
              gap: 20rpx;
              margin-bottom: 10rpx;

              .name {

                font-size: 16px;
                font-weight: 500;
                color: #333333;

              }


            }

            .device-id {
              font-size: 14px;
              color: #666666;
              margin-bottom: 6rpx;
            }

            .location {
              font-size: 14px;
              color: #999999;
            }
          }
        }
      }

      .metrics-info {
        display: flex;
        gap: 40rpx;
        padding: 20rpx 0;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        margin-bottom: 20rpx;

        .metric-item {
          display: flex;
          flex-direction: column;
          gap: 6rpx;

          .metric-value {
            font-size: 16px;
            font-weight: 500;
            color: #333333;
          }

          .metric-label {
            font-size: 12px;
            color: #999999;
          }
        }
      }

      .action-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 30rpx;
      }

    }
  }
}

.status {
  margin-left: 10rpx;
  font-size: 12px;
  padding: 4rpx 12rpx;
  border-radius: 20rpx;
}

.active {
  background-color: #e8f5e9;
  color: #4caf50;
}

.inactive {
  background-color: #ffebee;
  color: #f44336;
}
</style>
