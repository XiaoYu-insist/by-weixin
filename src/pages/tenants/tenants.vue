<script lang="ts" setup>
import { ref } from 'vue';
const { safeArea } = uni.getWindowInfo()
const searchText = ref('');
const selectedDevice = ref<any>(null);
const selectedRoom = ref<any>(null);


const handleDeviceClick = (device: any, room: any) => {
  selectedDevice.value = device;
  selectedRoom.value = room;
  console.log(device, room)
};

// const handleAddDevice = () => {
//   uni.showToast({
//     title: '添加新设备',
//     icon: 'none'
//   });
// };
/* 扫描二维码 或者 条形码 */
const onScanCode = () => {
  uni.scanCode({
    success: function (res) {
      console.log('条码类型：' + res.scanType);
      console.log('条码内容：' + res.result);
    }
  })
}
</script>
z
<template>
  <view class="container" :style="{ paddingTop: safeArea!.top + 'px' }">
    <text class="tenants-name">租户</text>
    <!-- 搜索栏 -->
    <view class="search-bar">
      <uni-icons type="scan" size="20" color="#999" @tap="onScanCode" />
      <input type="text" placeholder="搜索设备名称/编号/房间号" class="search-input" v-model="searchText" />
      <uni-icons type="search" size="20" color="#999" />
    </view>
    <!-- 设备列表 -->
    <scroll-view class="device-list" scroll-y>
      <view class="room-section" v-for="room in 10" :key="room">
        <view class="room-header">
          <view class="room-title">
            <uni-icons type="home" size="20" color="#666" />
            <text>11室</text>
            <view class="room-device">
              <text class="icon-dianbiao" />
              <text class="icon-lengshuibiao" />
              <text class="icon-reshuibiao1" />
              <text class="icon-mensuo" />
            </view>
          </view>
          <text class="tenant-name">租户：阿瑟费嘎</text>
        </view>
        <navigator url="/pages/device/device" hover-class="none" v-for="device in 1" :key="device" class="device-card"
          @tap="handleDeviceClick(device, room)">
          <view class="card-left">
            <view class="device-info">
              <text class="device-name">123123</text>
              <text class="device-id">编号：0012351234</text>
            </view>
          </view>
          <view class="card-right">
            <text class="reading">剩余余额：100元
            </text>
            <text :class="['status', 'unused' === 'unused' ? 'unused' : 'inuse']">
              {{ 'unused' === 'unused' ? '未使用' : '使用中' }}
            </text>
          </view>
        </navigator>
      </view>
    </scroll-view>
    <!-- 添加设备按钮 -->
    <!-- <view class="add-button " @tap="handleAddDevice">
      <uni-icons type="plusempty" size="24" color="#FFFFFF" />
    </view> -->
  </view>
</template>



<style lang="scss">
page {
  height: 100%;
  background-color: #f5f5f5;
}

// 页面
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .tenants-name {
    margin: 30rpx 0;
    text-align: center;
  }

  /*搜索框*/
  .search-bar {
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding: 20rpx 30rpx;
    margin: 0 20rpx;

    .search-input {
      flex: 1;
      margin-left: 20rpx;
      font-size: 14px;
    }
  }

  /* 主体 用户设备 */
  .device-list {
    flex: 1;
    overflow: auto;
    margin: 30rpx 0;

    .room-section {
      margin: 0 20rpx 30rpx;

      .room-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .room-title {
          display: flex;
          align-items: center;

          text {
            font-size: 16px;
            color: #333;
            margin-left: 10rpx;
            font-weight: 500;
          }
        }

        .tenant-name {
          font-size: 14px;
          color: #666;
        }
      }
    }

    .device-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      background-color: #FFFFFF;
      border-radius: 16rpx;
      margin-bottom: 20rpx;

      .card-left {
        display: flex;
        align-items: center;

        .device-info {
          margin-left: 20rpx;

          .device-name {
            font-size: 16px;
            color: #333;
            margin-bottom: 8rpx;
            display: block;
          }

          .device-id {
            font-size: 12px;
            color: #999;
          }
        }
      }

      .card-right {
        text-align: right;

        .reading {
          font-size: 14px;
          color: #333;
          margin-bottom: 8rpx;
          display: block;
        }

        .status {
          font-size: 12px;
          padding: 4rpx 16rpx;
          border-radius: 4rpx;
        }

        .status.unused {
          color: #4CAF50;
          background-color: #E8F5E9;
        }

        .status.inuse {
          color: #FF9800;
          background-color: #FFF3E0;
        }
      }
    }
  }


}


.add-button {
  position: fixed;
  right: 40rpx;
  bottom: 140rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #4CAF50;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}
</style>
