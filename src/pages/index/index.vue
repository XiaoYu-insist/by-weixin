<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue';
import PaymentCard from './components/PaymentCard.vue';
import DeviceRun from './components/DeviceRun.vue';
import Electroanalysis from './components/Electroanalysis.vue';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import PageSkeleton from './components/PageSkeleton.vue';
import { useReginStore } from '@/stores';
import { getCollectorState, getDeviceFailCount, getRegionIncomeInfo, getRegionInfo, getRegionUserState } from '@/services/region';
import type { onIncomeInfo, onRegionUserState } from '@/types/region';
const regionStore = useReginStore()

// 区域名称标题
const regionInfoData = async () => {
  const res = await getRegionInfo({ cmd: 'get_quyu_info', regionid: regionStore.regionId! })
  if (res.state === '0000') {
    regionStore.regionName = res.Table![0].region_name
  }
}

// 区域收入信息
const regionIncomeData = ref<onIncomeInfo>()
const regionIncomeInfoData = async () => {
  const res = await getRegionIncomeInfo({ cmd: 'get_t_order_info', regionid: regionStore.regionId! })
  regionIncomeData.value = res.Table![0]
}

// 获取设备运行情况
const regionUserState = ref<onRegionUserState>()
const regionUserStateData = async () => {
  const res = await getRegionUserState({ cmd: "get_region_user_state", regionid: regionStore.regionId! })
  if (res.state === '0000') {
    regionUserState.value = res.Table![0]
  } else {
    regionUserState.value = 0 as any
  }
}

// 获取采集器总数量
const collectorCount = ref<number>()
const collectorStateData = async () => {
  const res = await getCollectorState({ cmd: 'get_data_collector_state', regionid: regionStore.regionId! })
  if (res.state === '0000') {
    collectorCount.value = res.Table!.reduce((sum, num) => Number(sum) + Number(num.count), 0)
  } else {
    collectorCount.value = 0
  }
}

// 获取设备失败数量
const deviceFailCount = ref<number>()
const deviceFailCountDate = async () => {
  const res = await getDeviceFailCount({ cmd: 'get_collect_error_list', regionid: regionStore.regionId! })
  if (res.state === '0000') {
    deviceFailCount.value = res.Table!.reduce((sum, num) => Number(sum) + Number(num.count), 0)
  } else {
    deviceFailCount.value = 0
  }
}

// 骨架加载
const Skeleton = ref(false)
// 初始化加载
onLoad(async () => {
  Skeleton.value = true
  if (regionStore.token) {
    await Promise.all([regionInfoData(), regionIncomeInfoData(), regionUserStateData(),
    collectorStateData(), deviceFailCountDate(),
    ])
  } else {
    uni.showToast({
      title: '请先登录！',
      icon: 'none'
    })
  }
  Skeleton.value = false
})
// 图表下拉刷新调用
const electroanalysisRef = ref()
//下拉刷新触发
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  //开启加载
  isTriggered.value = true
  //加载数据
  await Promise.all([regionInfoData(), regionIncomeInfoData(), regionUserStateData(),
  collectorStateData(), deviceFailCountDate(), electroanalysisRef.value.getLine()
  ])
  //关闭加载
  isTriggered.value = false
  uni.showToast({
    title: '刷新成功！',
    icon: 'none'
  })
}
</script>

<template>
  <CustomNavbar />
  <template>
    <PageSkeleton v-if="Skeleton" />
    <scroll-view refresher-enabled @refresherrefresh="onRefresherrefresh" :refresher-triggered="isTriggered"
      class="viewport" scroll-y v-else>
      <view class="main-content">
        <!-- 收款卡片 -->
        <PaymentCard :list="regionIncomeData!" />
        <!-- 设备运行情况 -->
        <DeviceRun :listUser="regionUserState!" :collectorCount="collectorCount!" :deviceFailCount="deviceFailCount!" />
        <!-- 用电分析卡片 -->
        <Electroanalysis ref="electroanalysisRef" />
      </view>
    </scroll-view>
  </template>
</template>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.main-content {
  flex: 1;
  padding: 30rpx;
  overflow-y: auto;
}
</style>
