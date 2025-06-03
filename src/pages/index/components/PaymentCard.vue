<script setup lang="ts">

import { getRegionMoneyIncomeInfo } from '@/services/region';
import { useRecordStore, useReginStore } from '@/stores';
import type { onIncomeInfo } from '@/types/region';
import { onMounted, ref } from 'vue';
const regionStore = useReginStore()
const recordStore = useRecordStore()
defineProps<{
  list: onIncomeInfo,
}>()
// 区域月份收入信息
const regionMoney = ref<number>(0)
const regionMoneyIncomeInfoData = async (start: string, end: string) => {
  const res = await getRegionMoneyIncomeInfo({
    cmd: 'get_month_money', regionid: regionStore.regionId!,
    startDate: start,
    endDate: end,
  })
  if (res.state === '0000') {
    regionMoney.value = res.Table!.reduce((sum, num) => Number(sum) + Number(num.order_amount), 0)
  } else {
    regionMoney.value = 0
  }
}
const date = new Date()
// 获取当前月份
const year = date.getFullYear();
// 获取当前月份
const month = String(date.getMonth() + 1).padStart(2, '0');
// 获取当前日期
const day = String(date.getDate()).padStart(2, '0');
const start = `${year}-${month}-01`;
const end = `${year}-${month}-${day}`;
onMounted(async () => {
  await regionMoneyIncomeInfoData(start, end)
})

</script>q
<template>
  <view class="meter-card">
    <navigator :url="`/pageDataList/exhibitList/exhibitList?type=${0}&starttime=${start}&endtime=${end}`"
      hover-class="none" class="meter-info">
      <view class="meter-title">当月收入金额</view>
      <view class="meter-reading">
        <wd-count-to class="number" :startVal="0" :decimals="2" :endVal="regionMoney" :fontSize="32" suffix="元"
          color="#fff"></wd-count-to>
      </view>
    </navigator>
    <view class="usage-stats">
      <navigator :url="`/pageDataList/exhibitList/exhibitList?type=${1}`" hover-class="none" class="stat-item">
        <text class="label">今日充值</text>
        <text class="value">{{ list?.count || 0 }}笔</text>
      </navigator>
      <navigator :url="`/pageDataList/exhibitList/exhibitList?type=${1}`" hover-class="none" class="stat-item">
        <text class="label">今日收入</text>
        <text class="value increase">{{ list?.money || 0 }}元</text>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
.meter-card {
  background: linear-gradient(135deg, #4a90e2 0%, #6366f1 100%);
  border-radius: 20rpx;
  padding: 40rpx;
  color: #ffffff;
  margin-bottom: 30rpx;

  .meter-info {
    margin-bottom: 30rpx;

    .meter-title {
      font-size: 14px;
      opacity: 0.9;
      color: #e3e3e3;
    }

    .meter-reading {
      margin-top: 20rpx;
    }

    .meter-reading .number {
      font-size: 48px;
      font-weight: bold;
    }



  }

  .usage-stats {
    display: flex;
    gap: 60rpx;
    margin-bottom: 30rpx;

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 8rpx;
    }

    .stat-item .label {
      font-size: 12px;
      opacity: 0.9;
      color: #e3e3e3;
    }

    .stat-item .value {
      font-size: 16px;
      font-weight: 500;

    }
  }
}
</style>
