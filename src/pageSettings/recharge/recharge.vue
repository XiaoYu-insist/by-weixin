<script lang="ts" setup>
import { getOrderLog } from "@/services/exhibitList";
import { getRegionMoneyIncomeInfo } from "@/services/region";
import { useReginStore } from "@/stores";
import type { onOrderLog } from "@/types/exhibitList";
import { onLoad } from "@dcloudio/uni-app";
import { onMounted, ref } from "vue";

const regionStore = useReginStore()
const RecordData = ref<boolean>(false)

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

// 弹出窗口
const showBillDetail = (bill: onOrderLog) => {
  uni.showModal({
    title: "账单详情",
    content: `用户名称：${bill.user_name}
    用户编号：${bill.user_id}
    所在楼栋：${bill.room_num}
    充值金额：${bill.order_amount}元
    充值时间：${bill.order_time}`,
    showCancel: false,
  });
};
// 日期或按钮修改调用
const data = async () => {
  BillDetails.value = []
  status.value = 'loading'
  await regionMoneyIncomeInfoData(range.value[0], range.value[1])
  status.value = 'noMore'
}

//暂无数据
const noData = ref(false)

// 收入
const BillDetails = ref<onOrderLog[]>()


// 选择或者日期收入
const regionMoneyIncomeInfoData = async (start: string, end: string) => {
  try {
    noData.value = false
    const res = await getRegionMoneyIncomeInfo({
      cmd: 'get_month_money', regionid: regionStore.regionId!,
      startDate: start + ' 00:00:00',
      endDate: end + ' 23:59:59',
    })
    if (res.state === '0000') {
      BillDetails.value = res.Table
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

    <!-- 账单列表 -->
    <scroll-view class="bill-list" scroll-y>
      <view class="status-tip" v-if="noData">
        <wd-status-tip image="search" tip="暂无数据" />
      </view>
      <view v-else>
        <view v-for="(item, index) in BillDetails" :key="index" class="bill-item cursor-pointer"
          @tap="showBillDetail(item)">
          <view class="bill-left">
            <view class="icon-wrapper icon-chongzhijiaofei">
            </view>
            <view class="bill-info">
              <text class="bill-title">{{ item.user_name }}<text></text></text>
              <text class="bill-time">{{ item.order_time }}</text>
            </view>
          </view>
          <view class="bill-amount">
            <text>{{ item.order_amount }}</text>
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
  font-size: 16px;
  color: #4caf50;
  font-weight: 500;
}
</style>
