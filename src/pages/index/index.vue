<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue';
import PaymentCard from './components/PaymentCard.vue';
import DeviceRun from './components/DeviceRun.vue';
import Electroanalysis from './components/Electroanalysis.vue';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import PageSkeleton from './components/PageSkeleton.vue';
import { useReginStore } from '@/stores';
import { getCollectorState, getDeviceFailCount, getRegionIncomeInfo, getRegionInfo, getRegionMoneyIncomeInfo, getRegionUserState } from '@/services/region';
import type { onIncomeInfo, onRegionUserState } from '@/types/region';
const regionStore = useReginStore()

// 区域名称标题
const regionInfoData = async () => {
  const res = await getRegionInfo({ cmd: 'get_quyu_info', regionid: regionStore.regionId! })
  if (res.state === '0000') {
    regionStore.regionName = res.Table![0].region_name
  }
}

// 区域月份收入信息
const regionMoneyIncomeData = ref()
const regionMoneyIncomeInfoData = async () => {
  const res = await getRegionMoneyIncomeInfo({
    cmd: 'get_money_money', regionid: '000090',
    startDate: '2024-08-01',
    endDate: '2025-08-31',
  })
  regionMoneyIncomeData.value = res.Table!
  console.log('区域月份收入信息', regionMoneyIncomeData.value)
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
  regionUserState.value = res.Table![0]
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
    collectorStateData(), deviceFailCountDate(), regionMoneyIncomeInfoData()
    ])
  } else {
    uni.showToast({
      title: '请先登录！',
      icon: 'none'
    })
  }
  Skeleton.value = false
})

//下拉刷新触发
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  //开启加载
  isTriggered.value = true
  //加载数据
  await Promise.all([regionInfoData(), regionIncomeInfoData(), regionUserStateData(),
  collectorStateData(), deviceFailCountDate(), regionMoneyIncomeInfoData()
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
        <Electroanalysis />
      </view>
    </scroll-view>
  </template>
</template>

<style lang="scss">
.main-content {
  flex: 1;
  padding: 30rpx;
  overflow-y: auto;
}
</style>
