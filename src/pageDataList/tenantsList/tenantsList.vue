<script setup lang="ts">
import { getRegionUserState } from '@/services/region';
import { tenantList } from '@/services/tenantsList';
import { useReginStore } from '@/stores';
import type { PageParams } from '@/types/global';
import type { tenantListRes, tenantsName } from '@/types/tenantsLIst';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getWindowInfo()
// 分页参数
const pageParams: Required<PageParams> = {
  page: 0,
  pageSize: 100,
  pass: 0,
  total: 0
}
const regionStore = useReginStore()
// tabs 数据
const orderTabs = ref([
  { orderState: 0, title: '全部用户' },
  { orderState: 1, title: '欠费用户' },
  { orderState: 2, title: '停电用户' },
  { orderState: 3, title: '停冷水用户' },
  { orderState: 4, title: '停热水用户' },
])
// 获取页面参数
defineProps<{
  type: string
}>()

// 获取设备运行情况
const regionUserState = ref<number>()
const regionUserStateData = async () => {
  const res = await getRegionUserState({ cmd: "get_region_user_state", regionid: regionStore.regionId! })
  if (res.state === '0000') {
    const total = Number(res.Table![0].zhs)
    regionUserState.value = Math.ceil(total / pageParams.pageSize);
  } else {
    regionUserState.value = 0
  }
}


// 已结束标记
const finish = ref(false)

// 暂无数据
const noData = ref(false)

// 获取租户列表数据
const tenantListData = ref<tenantListRes[]>([])
const getTenantListData = async (name: tenantsName,) => {
  if (finish.value === true) {
    return
  }
  noData.value = false
  pageParams.pass = pageParams.page === 0 ? 0 : pageParams.page * pageParams.pageSize - 1
  const res = await tenantList({
    cmd: 'get_all_device_list',
    regionid: regionStore.regionId!,
    devicename: name,
    pass: pageParams.pass,
    pageSize: pageParams.pageSize
  })
  if (res.state === '0000') {
    res.Table!.map((item) => {
      item.user_states = item.user_state === '1' ? 'icon-qiyong' : 'icon-tingyong'
      if (tab.value === 2) {
        item.icon = 'icon-dianbiao'
      } else if (tab.value === 3) {
        item.icon = 'icon-lengshuibiao'
      } else if (tab.value === 4) {
        item.icon = 'icon-reshuibiao1'
      } else {
        item.icon = 'icon-icon-user'
      }
      return item
    })
    tenantListData.value.push(...res.Table!)
  } else if (tenantListData.value.length === 0 && res.state === '4001') {
    noData.value = true
  }
  if (name === 'all') {
    if (pageParams.page < regionUserState.value!) {
      // 页码累加
      pageParams.page++
    } else if (pageParams.page >= regionUserState.value!) {
      finish.value = true
    }
  } else {
    finish.value = true
  }
}
// 切换tab
const tab = ref(0)
const TabIndex = async (tab: number) => {
  switch (tab) {
    case 0:
      getTenantListData('all')
      break
    case 1:
      getTenantListData('qf')
      break
    case 2:
      getTenantListData('db')
      break
    case 3:
      getTenantListData('sb')
      break
    case 4:
      getTenantListData('rb')
      break
  }
}
const onScrolltolower = () => {
  if (tab.value === 0) {
    TabIndex(tab.value)
  }
}
// 监听切换
const onSwiperChange = (Tab: number) => {
  tab.value = Tab
  resetData()
  TabIndex(Tab)
}
// 重置数据
const resetData = () => {
  pageParams.page = 0
  tenantListData.value = []
  finish.value = false
}

// 页面加载完成后获取数据
onLoad(async () => {
  await regionUserStateData()
  await getTenantListData('all')
})
</script>

<template>
  <view class="viewport">
    <!-- tabs -->
    <wd-tabs v-model="tab" slidable="always">
      <block v-for="item in orderTabs" :key="item.orderState">
        <wd-tab :title="item.title">
        </wd-tab>
      </block>
    </wd-tabs>
    <!-- 滑动容器 -->
    <swiper class="swiper" :current="tab" @change="onSwiperChange($event.detail.current)">
      <!-- 滑动项 -->
      <swiper-item v-for="item in orderTabs" :key="item.title">
        <!-- 订单列表 -->
        <scroll-view scroll-y class="orders" @scrolltolower="onScrolltolower">
          <!-- 空状态 -->
          <view v-if="noData" class="status-tip">
            <wd-status-tip image="search" tip="暂无数据" />
          </view>
          <view v-else>
            <view class="card" v-for="item, index in tenantListData" :key="index">
              <view class="header">
                <view class="icons" :class="item.user_states"></view>
                <view class="type">{{ item.block_num }} </view>
              </view>
              <!-- 订单信息 -->
              <navigator class="goods" :url="`/pages/device/device?id=${item.user_id}`" hover-class="none">
                <view class="cover" :class="item.icon">
                </view>
                <view class="meta">
                  <view class="name">名称:{{ item.user_name }}</view>
                  <view class="id">编号:{{ item.user_id }}</view>
                  <view class="id">房号:{{ item.room_num }}</view>
                </view>
                <view class="payment">
                  <text class="symbol">¥{{ item.user_balance }}</text>
                </view>
              </navigator>
            </view>
          </view>
          <!-- 底部提示文字 -->
          <view class="loading-text" :style="{ paddingBottom: safeAreaInsets?.bottom + 'px' }">
            {{ finish ? '没有更多数据~' : '正在加载...' }}
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

  .status-tip {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
    padding: 40rpx 0;
    margin-bottom: 60rpx;
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
