<script lang="ts" setup>
import { getUsageAPI } from "@/services/usage";
import { useReginStore } from "@/stores";
import type { onUsageListRes } from "@/types/usage";
import { onLoad } from "@dcloudio/uni-app";
import { onMounted, ref } from "vue";
import { operationDataName } from "./usageSwitch";

const regionStore = useReginStore()
const RecordData = ref<boolean>(false)

// 暂无数据
const noData = ref(false)

// 工具函数：日期格式化
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
// 定义当前日期
const range = ref([formatDate(new Date()), formatDate(new Date())])
// 用于绑定 end 属性的日期，格式为 "YYYY-MM-DD"
const today = ref('')

// 日期或按钮修改调用
const data = async () => {
  BillDetails.value = []
  status.value = 'loading'
  await regionMoneyIncomeInfoData(range.value[0], range.value[1])
  status.value = 'noMore'
}

// 收入
const BillDetails = ref<onUsageListRes[]>()

// 选择或者日期收入
const regionMoneyIncomeInfoData = async (start: string, end: string) => {
  try {
    noData.value = false
    const res = await getUsageAPI({
      cmd: 'get_operator_log', regionid: regionStore.regionId!,
      start_time: start + ' 00:00:00',
      end_time: end + ' 23:59:59',
    })
    if (res.state === '0000') {
      BillDetails.value = res.Table!.map((item) => {
        item.operationDetails = operationDataName(item.operate_type, item)!
        return item
      })
    } else {
      noData.value = true

    }

  } catch (error: any) {
    console.error(error)
    if (error.errMsg === 'request:fail timeout' || error.errMsg === 'request:fail fail:time out') {
      uni.showToast({
        title: '请求超时，请稍后再试',
        icon: 'none'
      })
    } else {
      uni.showToast({
        title: '网络异常，请检查网络连接',
        icon: 'none'
      })
    }
  }
}
/* 修改日期 调用*/
const maskClick: UniHelper.UniDatetimePickerOnChange = () => {
  data()
}



// 底部loading加载
const status = ref<UniHelper.UniLoadMoreStatus>()

// 生命周期
onLoad(async () => {
  today.value = formatDate(new Date())
})
// 渲染完成后
onMounted(async () => {
  status.value = 'loading'
  await regionMoneyIncomeInfoData(range.value[0], range.value[1])
  status.value = 'noMore'
})
</script>

<template>
  <view class="pages">
    <!-- 顶部日期选择 -->
    <view class="header">
      <uni-datetime-picker v-model="range" type="daterange" :clear-icon="false" :end="today" @change="maskClick" />
    </view>
    <!-- 无操作记录 -->
    <!-- 账单列表 -->
    <scroll-view class="bill-list" scroll-y>
      <view class="status-tip" v-if="noData">
        <wd-status-tip image="search" tip="暂无数据" />
      </view>
      <view v-else>
        <view v-for="(item, index) in BillDetails" :key="index" class="bill-item cursor-pointer">
          <view class="bill-left">
            <view class="icon-wrapper icon-caozuo2">
            </view>
            <view class="bill-info">
              <text class="bill-title">{{ item.telphone }}</text>
              <text class="bill-time">户号：{{ item.user_id }}</text>
              <text class="bill-time">{{ item.operate_time }}</text>
            </view>
          </view>
          <view class="bill-amount">
            <text>{{ item.operationDetails }}</text>
          </view>
        </view>
        <uni-load-more :status="status" />
      </view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f8f9fa;
}

.pages {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  padding: 20rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .data-selects {
    width: 120rpx;
  }
}

.status-tip {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .wd-status-tip {
    transform: translateY(-50%);
  }
}

.bill-list {
  flex: 1;
  padding: 20rpx 0;
  overflow: auto;

  .status-tip {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .wd-status-tip {
      transform: translateY(-50%);
    }
  }

  .bill-item {
    margin: 0 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    background-color: #ffffff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;

    .bill-left {
      display: flex;
      align-items: center;
      gap: 20rpx;
    }
  }

}

.icon-wrapper {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70rpx;
}

.bill-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.bill-title {
  font-size: 16px;
  color: #333333;
}

.bill-time {
  font-size: 12px;
  color: #999999;
}

.bill-amount {
  width: 30%;

  text {
    font-size: 24rpx;
    color: #252525;
  }

}
</style>
