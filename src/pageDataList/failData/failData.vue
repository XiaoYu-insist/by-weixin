<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';

interface ErrorItem {
  userId: string;
  deviceId: string;
  house: string;
  failtype: string;
  icon: string
}

// 响应式数据
const errorList = ref<ErrorItem[]>([]);
const loading = ref(false);

const data: ErrorItem[] = [
  {
    userId: "41354011254",
    deviceId: "745274272727",
    house: "什么",
    failtype: "采集失败",
    icon: 'icon-dianbiao'
  }, {
    userId: "45378383453",
    deviceId: "78378378572453",
    house: "电脑",
    failtype: "采集失败",
    icon: 'icon-lengshuibiao'
  },
  {
    userId: "15343573",
    deviceId: "3987375375375",
    house: "手机",
    failtype: "采集失败",
    icon: 'icon-reshuibiao1'
  },
]
onLoad(() => {
  errorList.value = data
})
</script>

<template>
  <!-- 失败列表 -->
  <scroll-view scroll-y>
    <view class="error-list">
      <!-- 空状态 -->
      <view v-if="errorList.length === 0" class="empty-container">
        <text class="empty7-text">暂无失败记录</text>
      </view>

      <!-- 列表内容 -->
      <view v-for="item,  in errorList" :key="item.userId" class="error-item">
        <view class="item-detailed">
          <view class="icon-wrapper icon-shibai"> </view>
          <view class="error-device">
            <view class="error-title">{{ item.house }}</view>
            <view class="error-text">
              <text class="error-desc">编号:{{ item.userId }}</text>
              <text class="error-desc">表号:{{ item.deviceId }}</text>
              <text class="error-desc error-states">失败:{{ item.failtype }}</text>
              <view class="surface-icon" :class="item.icon"></view>
            </view>

          </view>
        </view>
      </view>
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-container">
        <uni-icons type="spinner-cycle" size="24" color="#007AFF" class="loading-icon" />
        <text class="loading-text">加载中...</text>
      </view>
    </view>
  </scroll-view>
</template>

<style lang="scss">
.error-list {
  border-radius: 12rpx;
  padding: 30rpx;

  .empty-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100rpx 0;

    .empty-text {
      color: #999;
      font-size: 28rpx;
    }


  }

  .error-item {
    display: flex;
    align-items: center;
    margin: 20rpx 0;
    padding: 30rpx;
    border-radius: 25rpx;
    background-color: #fff;


    &:last-child {
      border-bottom: none;
    }

    /** 失败列表详细数据 */
    .item-detailed {
      display: flex;
      margin-right: 20rpx;
      width: 100%;

      .icon-wrapper {
        width: 150rpx;
        height: 150rpx;
        border-radius: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 100rpx;
      }

      .error-device {
        width: 100%;
        margin-left: 10rpx;
        padding-left: 20rpx;
        border-left: 1px solid #EBEBEB;

        .error-title {
          font-size: 30rpx;
          color: #333;
          font-weight: bold;
          margin-bottom: 5rpx;
          padding-bottom: 5rpx;
          border-bottom: 1px solid #EBEBEB;
        }

        .error-text {
          position: relative;

          .error-desc {
            display: block;
            font-size: 24rpx;
            color: #999;
            line-height: 1.5;
          }

          .error-states {
            color: LightCoral;
          }

          .surface-icon {
            position: absolute;
            display: inline-block;
            font-size: 80rpx;
            right: 0;
            bottom: 0;
          }
        }
      }

    }

  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30rpx 0;

    .loading-icon {
      animation: rotate 1s linear infinite;
      margin-right: 10rpx;
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

    .loading-text {
      color: #007AFF;
      font-size: 28rpx;
    }
  }

}
</style>
