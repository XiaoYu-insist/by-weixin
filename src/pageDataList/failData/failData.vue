<script setup lang="ts">
import { failList } from '@/services/failData';
import { useReginStore } from '@/stores';
import type { failListRes } from '@/types/failData';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const regionStore = useReginStore()

// 暂无数据
const noData = ref(false)
// 响应式数据
const errorList = ref<failListRes[]>([]);
const loading = ref(false);
const getfailListData = async () => {
  noData.value = false
  const res = await failList({ cmd: 'get_device_error_list', regionid: regionStore.regionId! })
  if (res.state === '0000') {
    errorList.value = res.Table!.map((item => {
      item.task_ids = item.task_id === '3' ? '停电失败' : item.task_id === '6' ? '停水失败' : '采集失败'
      item.icon = item.device_type === '0' ? 'icon-dianbiao' : item.device_type === '1' ? 'icon-lengshuibiao' : item.device_type === '2' ? 'icon-reshuibiao1' : ''
      return item
    }))
  } else {
    errorList.value = []
    noData.value = true
  }
}


onLoad(async () => {
  await getfailListData()
})
</script>

<template>
  <!-- 失败列表 -->
  <scroll-view scroll-y>
    <view class="error-list">
      <!-- 空状态 -->
      <view v-if="noData" class="status-tip">
        <wd-status-tip image="search" tip="暂无数据" />
      </view>
      <!-- 列表内容 -->
      <view v-else v-for="item, index in errorList" :key="index" class="error-item">
        <navigator class="item-detailed" hover-class="none" :url="`/pages/device/device?id=${item.user_id}`">
          <view class="icon-wrapper icon-shibai"> </view>
          <view class="error-device">
            <view class="error-title">{{ item.user_name }}-[{{ item.block_num }}]</view>
            <view class="error-text">
              <text class="error-desc">编号:{{ item.user_id }}</text>
              <text class="error-desc">表号:{{ item.device_id }}</text>
              <view class="surface-icon" :class="item.icon"></view>
            </view>
          </view>
        </navigator>
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

  .status-tip {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .wd-status-tip {
      transform: translateY(50%);
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
