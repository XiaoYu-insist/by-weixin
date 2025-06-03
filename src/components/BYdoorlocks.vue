<script lang="ts" setup>
import { ref } from "vue";
import { doorlocks, lockerOperations, userBut } from "@/data/deviceData/deviceIfon";
import { setButtonTypeProcess } from './buttonAchieve'

// 按钮修改密码
const modify = ref(true)
// 按钮样式修改
const iconStyle = ref("icon-bianji")
// 点击按钮 触发
const setModify = () => {
  modify.value = !modify.value
  iconStyle.value = modify.value ? "icon-bianji" : "icon-queding"
  if (modify.value && doorlocks.Permanent.length == 6) {
    console.log("修改成功")
  }
}

// 按钮修改密码
const modify2 = ref(true)
// 按钮样式修改
const iconStyle2 = ref("icon-bianji")
// 点击按钮 触发
const setModify2 = () => {
  modify2.value = !modify2.value
  iconStyle2.value = modify2.value ? "icon-bianji" : "icon-queding"
  if (modify2.value) {
    console.log("修改成功")
  }
}

// 弹窗提示
const showPopup = ref(false)
const showIcon = () => {
  showPopup.value = !showPopup.value
  let tirm
  clearTimeout(tirm)
  tirm = setTimeout(() => {
    if (showPopup.value) {
      showPopup.value = !showPopup.value
    }
  }, 2000)

}
</script>

<template>
  <!-- 设备信息卡片 -->
  <view class="device-card">
    <view class="device-info">
      <view class="device-name">
        <text>{{ doorlocks.Name }}</text>
        <text class="device-id">编号:{{ doorlocks.DeviceId }}</text>
      </view>
      <view class="device-icon icon-mensuo"></view>
    </view>

    <view class="device-stats">
      <text class="stat-label">永久密码</text>
      <input class="stat-value" :disabled="modify" :class="{ activeTap: !modify }" v-model="doorlocks.Permanent"
        type="number" :maxlength="6" :safe-password-length="6" />
      <button class="stat-but" :class="iconStyle" hover-class="none" plain @tap="setModify">
      </button>
    </view>

    <view class="device-status">
      <view class="status-label">
        <text>临时密码</text>
        <text class="icons icon-kongxinwenhao" @tap="showIcon"></text>
        <text class="popup-prompt" :style="{ display: showPopup ? 'inline' : 'none' }">开门后失效</text>
      </view>

      <input class="status-value" :disabled="modify2" :class="{ activeTap: !modify2 }" v-model="doorlocks.Temporary"
        type="number" :maxlength="6" />
      <button class="status-but" :class="iconStyle2" hover-class="none" plain @tap="setModify2">
      </button>

    </view>
  </view>
  <!-- 通用按钮 -->
  <view class="operation-section">
    <text class="section-title">用户操作</text>
    <view class="operation-grid">
      <button class="grid-item" hover-class="none" plain v-for="(item, index) in userBut" :key="index"
        @tap="setButtonTypeProcess(3, item.type)">
        <view class="icon-wrapper" :class="item.icon">
        </view>
        {{ item.name }}
      </button>
    </view>
  </view>
  <!-- 操作区域 -->
  <view class="operation-section">
    <text class="section-title">更多操作</text>
    <view class="operation-grid">
      <button class="grid-item" hover-class="none" plain v-for="(item, index) in lockerOperations" :key="index"
        @tap="setButtonTypeProcess(3, item.type)">
        <view class="icon-wrapper" :class="item.icon">
        </view>
        {{ item.name }}
      </button>
    </view>
  </view>

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

    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 30rpx 0;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;

    .stat-label {
      font-size: 14px;
      color: #999999;

    }



    .stat-value {
      padding: 8rpx;
      box-sizing: content-box;
      font-size: 16px;
      color: #333333;
      font-weight: 500;
    }

    .activeTap {
      border-bottom: 1rpx solid #e3e3e3;
    }

    .stat-but {
      margin: 0;
      padding: 0 20rpx;
      border: none;
    }
  }

  .device-status {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 30rpx;

    .status-label {
      position: relative;
      font-size: 14px;
      color: #999999;

      .icons {
        margin: 0 10rpx;
      }

      .popup-prompt {
        position: absolute;
        top: 100%;
        left: 0;
        transform: translateX(50%);
        background-color: #333333;
        border-radius: 25rpx;
        padding: 20rpx;
        width: 100%;
        color: #f0f0f0;
        text-align: center;

      }
    }

    .status-value {
      padding: 8rpx;
      box-sizing: content-box;
      font-size: 16px;
      color: #333333;
      font-weight: 500;
    }

    .activeTap {
      border-bottom: 1rpx solid #e3e3e3;
    }

    .status-but {
      margin: 0;
      padding: 0 20rpx;
      border: none;
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
