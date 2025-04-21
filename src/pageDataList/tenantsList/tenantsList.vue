<script setup lang="ts">
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getWindowInfo()

// tabs 数据
const orderTabs = ref([
  { orderState: 0, title: '全部用户' },
  { orderState: 1, title: '欠费用户' },
  { orderState: 2, title: '停电用户' },
  { orderState: 3, title: '停水用户' },
])
// 获取页面参数
defineProps<{
  type: string
}>()

const tab = ref(0)

</script>

<template>
  <view class="viewport">
    <!-- tabs -->
    <wd-tabs v-model="tab">
      <block v-for="item in orderTabs" :key="item.orderState">
        <wd-tab :title="item.title">
        </wd-tab>
      </block>
    </wd-tabs>
    <!-- 滑动容器 -->
    <swiper class="swiper" :current="tab" @change="tab = $event.detail.current">
      <!-- 滑动项 -->
      <swiper-item v-for="item in orderTabs" :key="item.title">
        <!-- 订单列表 -->
        <scroll-view scroll-y class="orders">
          <view class="card" v-for="item in 10" :key="item">
            <view class="header">
              <view class="icons" :class="item % 2 === 0 ? 'icon-qiyong' : 'icon-tingyong'"></view>
              <view class="type">啊手机都放辣椒收到啦放假啦 </view>
            </view>
            <!-- 订单信息 -->
            <navigator v-for="sku in 1" :key="sku" class="goods" :url="`/pagesOrder/detail/detail?id=1`"
              hover-class="none">
              <view class="cover icon-dianbiao">
              </view>
              <view class="meta">
                <view class="name">名称:小碎花泡泡袖</view>
                <view class="id">表号:1354384116841</view>
              </view>
              <view class="payment">
                <text class="symbol">¥-991566.16</text>
              </view>
            </navigator>
          </view>
          <!-- 底部提示文字 -->
          <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
            {{ true ? '没有更多数据~' : '正在加载...' }}
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>

<style lang="scss">
page {
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;

  .center {
    height: 100%;
    line-height: 100%;
  }

}

// 订单列表
.orders {
  height: 100%;

  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .icons {
        font-size: 40rpx;
      }

      .type {
        line-height: 1.8;
        padding: 0 15rpx;
        margin-top: 10rpx;
        font-size: 24rpx;
        align-self: flex-start;
        border-radius: 4rpx;
        color: #888;
        background-color: #f7f7f8;
      }
    }
  }

  .goods {
    display: flex;
    margin-top: 20rpx;

    .cover {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 170rpx;
      height: 170rpx;
      font-size: 100rpx;
      margin-right: 20rpx;
      border-radius: 10rpx;
      overflow: hidden;
      position: relative;
    }

    .quantity {
      position: absolute;
      bottom: 0;
      right: 0;
      line-height: 1;
      padding: 6rpx 4rpx 6rpx 8rpx;
      font-size: 24rpx;
      color: #fff;
      border-radius: 10rpx 0 0 0;
      background-color: rgba(0, 0, 0, 0.6);
    }

    .meta {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }


    .id {
      font-size: 26rpx;
      color: #444;
    }

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }

    .payment {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      line-height: 1;
      padding: 20rpx 0;
      text-align: right;
      color: #8D97AB;
      font-size: 28rpx;

      .symbol {
        margin-top: 50rpx;
      }
    }
  }



  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}

:deep(.wd-tabs__nav--wrap>.data-v-c72f40b5 ::-webkit-scrollbar) {
  display: none !important;
}

/* 适配小程序的 enhanced 模式 */
:deep(.wd-tabs__nav--wrap>.data-v-c72f40b5) {
  --scrollbar-width: 0 !important;
}

/* tab 标签底部颜色 */
:deep(.wd-tabs__line.data-v-c72f40b5) {
  background-color: #3AAE98 !important;
}
</style>
