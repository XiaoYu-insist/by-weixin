<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getWindowInfo()
// 获取屏幕宽度
const windowWidth = uni.getWindowInfo().safeArea.width

// tabs 数据
const orderTabs = ref([
  { orderState: 0, title: '全部用户' },
  { orderState: 1, title: '欠费用户' },
  { orderState: 2, title: '停电用户' },
  { orderState: 3, title: '停水用户' },
  { orderState: 4, title: '电表用户' },
  { orderState: 5, title: '水表用户' },
  { orderState: 6, title: '热表用户' },
  { orderState: 7, title: '气表用户' },
])
// 获取页面参数
const query = defineProps<{
  type: string
}>()
// 高亮下标
const activeIndex = ref(orderTabs.value.findIndex((v) => v.orderState === Number(query.type)))
// 在 script 中添加
const cursorWidth = ref(0)    // 游标宽度
const cursorLeft = ref(0)     // 游标左侧位置
const scrollLeft = ref(0)     // 滚动条位置

// 修改后的游标位置计算
const updateCursorPosition = () => {
  uni.createSelectorQuery()
    .selectAll('.tabs .item')
    .boundingClientRect(rects => {
      const rectArray = rects as UniApp.NodeInfo[]
      if (!rectArray || activeIndex.value >= rectArray.length) return

      const activeRect = rectArray[activeIndex.value]
      cursorWidth!.value = activeRect.width!
      cursorLeft.value = activeRect.left! - 10 // 10px 是容器的 padding
      scrollLeft.value = activeRect.left! - windowWidth / 3 + activeRect.width!
    })
    .exec()
}
// 监听 activeIndex 变化
watch(activeIndex, () => {
  updateCursorPosition()
  console.log(uni.getWindowInfo())
})
</script>

<template>
  <view class="viewport">
    <!-- tabs -->
    <view class="tabs">
      <scroll-view scroll-x :scroll-left="scrollLeft" scroll-with-animation :scroll-animation-duration="300"
        :show-scrollbar="false" class="custom-scroll">
        <text class="item" v-for="(item, index) in orderTabs" :key="item.title" @tap="activeIndex = index"
          :class="{ active: activeIndex === item.orderState }"> {{ item.title }}
        </text>
      </scroll-view>
    </view>
    <!-- 滑动容器 -->
    <swiper class="swiper" :current="activeIndex" @change="activeIndex = $event.detail.current">
      <!-- 滑动项 -->
      <swiper-item v-for="item in orderTabs" :key="item.orderState">
        <!-- 订单列表 -->
        <scroll-view scroll-y class="orders">
          <view class="card" v-for="item in 8" :key="item">
            <!-- 商品信息，点击商品跳转到订单详情，不是商品详情 -->
            <navigator v-for="sku in 1" :key="sku" class="goods" :url="`/pagesOrder/detail/detail?id=1`"
              hover-class="none">
              <view class="cover">
                <image mode="aspectFit" src="https://yanxuan-item.nosdn.127.net/c07edde1047fa1bd0b795bed136c2bb2.jpg">
                </image>
              </view>
              <view class="meta">
                <view class="name ellipsis">ins风小碎花泡泡袖衬110-160cm</view>
                <view class="type">藏青小花 130</view>
              </view>
            </navigator>
            <!-- 支付信息 -->
            <view class="payment">
              <text class="quantity">共5件商品</text>
              <text>实付</text>
              <text class="amount"> <text class="symbol">¥</text>99</text>
            </view>
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
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

// tabs
.tabs {
  display: flex;
  justify-content: space-around;
  line-height: 60rpx;
  margin: 20rpx 10rpx;
  background-color: #fff;
  box-shadow: 0 4rpx 6rpx rgba(240, 240, 240, 0.6);
  position: relative;
  z-index: 9;

  .item {
    flex: 1;
    text-align: center;
    padding: 20rpx;
    font-size: 28rpx;
    color: #999;

  }

  /* 隐藏滚动条 */
  .custom-scroll ::-webkit-scrollbar {
    display: none;
  }

  /* 适配小程序的 enhanced 模式 */
  .custom-scroll {
    --scrollbar-width: 0;
  }
}

.active {
  background-color: #b6e7dd;
  border-radius: 25%;
  color: #262626 !important;
}

// swiper
.swiper {
  background-color: #f7f7f8;
}

// 订单列表
.orders {
  .card {
    min-height: 100rpx;
    padding: 20rpx;
    margin: 20rpx 20rpx 0;
    border-radius: 10rpx;
    background-color: #fff;

    &:last-child {
      padding-bottom: 40rpx;
    }
  }

  .goods {
    display: flex;
    margin-bottom: 20rpx;

    .cover {
      width: 170rpx;
      height: 170rpx;
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

    .name {
      height: 80rpx;
      font-size: 26rpx;
      color: #444;
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

    .more {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22rpx;
      color: #333;
    }
  }

  .payment {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
    padding: 20rpx 0;
    text-align: right;
    color: #999;
    font-size: 28rpx;
    border-bottom: 1rpx solid #eee;

    .quantity {
      font-size: 24rpx;
      margin-right: 16rpx;
    }

    .amount {
      color: #444;
      margin-left: 6rpx;
    }

    .symbol {
      font-size: 20rpx;
    }
  }

  .loading-text {
    text-align: center;
    font-size: 28rpx;
    color: #666;
    padding: 20rpx 0;
  }
}
</style>
