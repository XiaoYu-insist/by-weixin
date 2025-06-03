<script lang="ts" setup>
import { getHoustUserAPI } from "@/services/house";
import { useReginStore } from "@/stores";
import type { onGetHouseUser } from "@/types/house";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const regionStore = useReginStore()

// 暂无数据
const noData = ref(false)


const handleMessage = (landlord: any) => {
  uni.showToast({
    title: '权限配置查看',
    icon: "none"
  })
};
const handleDel = (landlords: any) => {
  uni.showModal({
    title: '删除用户',
    content: `是否删除当前${landlords.phone}房东`,
    showCancel: true,
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}

// 管理人员
const houseUser = ref<onGetHouseUser[]>()
/**
 * 获取区域管理人员
 */
const getHoustUserData = async () => {
  noData.value = false
  const res = await getHoustUserAPI({ cmd: 'get_bind_user_list', regionid: regionStore.regionId! })
  if (res.state === '0000') {
    houseUser.value = res.Table!.map(item => {
      item.begin_date = item.begin_date.split(' ')[0]
      item.end_date = item.end_date.split(' ')[0]
      return item
    })
  } else {
    noData.value = true
  }
}

onLoad(() => {
  getHoustUserData()
})
</script>
<template>
  <view class="status-tip" v-if="noData">
    <wd-status-tip image="search" tip="暂无数据" />
  </view>
  <scroll-view class="content" scroll-y v-else>
    <view class="section">
      <view class="landlord-list">
        <view v-for="(landlord, index) in houseUser" :key="index" class="landlord-card ">
          <view class="landlord-info">
            <image class="avatar" src="@/static/images/user.png" mode="aspectFill"></image>
            <view class="info-content">
              <view class="name-row">
                <text class="name">{{ landlord.appuser_phone }}</text>
              </view>
              <text class="phone">{{ landlord.appuser_phone }}</text>
            </view>
            <!-- <view class="action-buttons">
              <uni-icons type="gear" size="24" color="#2196F3" @tap="handleMessage(landlord)" />
              <uni-icons type="close" color="#FF454A" size="24" @tap="handleDel(landlord)" />
            </view> -->
          </view>
          <view class="property-info">
            <view class="property-stat">
              <text class="property-count">{{ landlord.begin_date }}</text>
              <text class="property-label">起始日期</text>
            </view>
            <view class="property-stat">
              <text class="property-count">{{ landlord.end_date }}</text>
              <text class="property-label">结束日期</text>
            </view>
          </view>

        </view>
      </view>
    </view>
  </scroll-view>
</template>



<style lang="scss">
page {
  height: 100%;
  background-color: #f8f9fa;
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

.content {
  flex: 1;
  overflow: auto;

  .section {
    padding: 30rpx;

    .landlord-card {
      display: flex;
      background-color: #ffffff;
      border-radius: 16rpx;
      padding: 30rpx;
      margin-bottom: 20rpx;
      border-bottom: 1px solid #f0f0f0;
      justify-content: space-between;
      align-items: center;

      .landlord-info {
        display: flex;
        gap: 20rpx;
        margin-bottom: 20rpx;

        .avatar {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;


        }

        .info-content {
          flex: 1;

          .name-row {
            display: flex;
            align-items: center;
            gap: 20rpx;
            margin-bottom: 10rpx;

            .name {
              font-size: 16px;
              font-weight: 500;
              color: #333333;
            }
          }

          .phone {
            font-size: 14px;
            color: #666666;
            margin-bottom: 6rpx;
          }

        }

        .action-buttons {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30rpx;
          margin-right: 20rpx;
        }
      }

      .property-info {
        // display: flex;
        align-items: center;
        gap: 30rpx;

        .property-stat {
          display: flex;
          flex-direction: column;
          gap: 6rpx;
          padding: 10rpx 0;

          .property-count {
            font-size: 26rpx;
            color: #333333;
          }

          .property-label {
            font-size: 12px;
            color: #999999;
          }
        }
      }



    }
  }
}
</style>
