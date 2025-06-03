<script lang="ts" setup>
import { getAllUsersAPI, getAllUsersCountAPI, getSearchRegionList, getSearcUserList } from '@/services/tenants';
import { useReginStore } from '@/stores';
import type { PageParams } from '@/types/global';
import type { onAllUsersList, onSearchRegionList, onSearchUserList, SeatchRegionList, SeatchUserList } from '@/types/tenants';
import { sendMessage } from '@/utils/webSocket';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
const { safeArea } = uni.getWindowInfo()
const searchText = ref('');
const regionStore = useReginStore()

// 分页参数
const pageParams: Required<PageParams> = {
  page: 0,
  pageSize: 100,
  pass: 0,
  total: 0
}

// 加载状态
const finish = ref<boolean>(false)

// 暂无数据
const noData = ref(false)

// 搜索框显示
const show = ref(false)

// 搜索
const RegionList = ref<onSearchRegionList[]>() // 区域列表

const UserList = ref<onSearchUserList[]>() // 用户列表

const searchReigonList = async () => {
  // 区域搜索
  const regions: SeatchRegionList = {
    cmd: 'get_search_quyu_list',
    tels: regionStore.regionPhone!,
    names: searchText.value,
    regionid: regionStore.regionId!
  }
  // 用户搜索
  const users: SeatchUserList = {
    cmd: 'get_search_user_list',
    tels: regionStore.regionPhone!,
    names: searchText.value,
    regionid: regionStore.regionId!
  }
  if (!(searchText.value === '')) {
    const res = await Promise.all([getSearchRegionList(regions), getSearcUserList(users)])
    if (res[0].state === '0000' && res[1].state === '0000') {
      RegionList.value = res[0].Table
      UserList.value = res[1].Table
      show.value = true
    } else {
      uni.showToast({
        title: "未查找到用户，请重新搜索",
        icon: 'none'
      });
    }
  }
}

// // 按钮添加新用户
// const handleAddDevice = () => {
//   uni.navigateTo({
//     url: `/pageDataList/AddDevice/AddDevice`,
//   });
// };

/* 扫描二维码 或者 条形码 */
const onScanCode = () => {
  uni.scanCode({
    success: function (res) {
      if (res.result.substring(0, 5) === 'login') {
        const address = res.result.split(",");
        sendMessage(`scan,${address[1]},${regionStore.regionPhone},${regionStore.regionId},${regionStore.token}`)
        uni.showToast({
          title: '登录成功！',
        })
      }

      // uni.navigateTo({
      //   url: `/pageDataList/AddDevice/AddDevice?code=${res.result}`,
      // });
      // console.log('条码类型：' + res.scanType);
      // console.log('条码内容：' + res.result);
    }
  })
}

/**
 * 点击切换区域按钮
 * @param item 返回的区域信息
 */
const onToggleRegion = async (item: onSearchRegionList) => {
  regionStore.regionId = item.region_id
  regionStore.regionName = item.region_name
  regionStore.authority = item.bind_power
  searchText.value = ''


  // 切换区域后，重新加载数据
  uni.switchTab({
    url: '/pages/index/index',
    success: () => {
      let page = getCurrentPages().pop()
      if (page == undefined || page == null) return;
      page.onLoad!()
    },
  });
  // 重置数据
  resetData()
  // 获取页面用户
  await Promise.all([getAllUsersData(),
  getAllUsersCount()
  ])
  // 关闭弹出层
  show.value = false

}

/**
 * 点击切换用户按钮
 * @param item 返回的用户信息
 */
const onToggleUser = (item: onSearchUserList) => {
  console.log(item)
  uni.navigateTo({ url: '/pages/device/device' })
  // 关闭弹出层
  show.value = false
}

// 用户数量
const userCount = ref<number>(0)

/**
 * 获取区域用户数量
 */
const getAllUsersCount = async () => {
  noData.value = false
  const res = await getAllUsersCountAPI({ cmd: 'all_user_count', regionid: regionStore.regionId! })
  if (Number(res.Table![0].Column1) > 0) {
    userCount.value = Number(res.Table![0].Column1)
    pageParams.total = Math.ceil(userCount.value / pageParams.pageSize)
  } else {
    noData.value = true
  }
}

/**
 * 获取用户信息
 */
const tenantsList = ref<onAllUsersList[]>([])
const getAllUsersData = async () => {
  if (finish.value === true) {
    return
  }
  pageParams.pass = pageParams.page === 0 ? 0 : pageParams.page * pageParams.pageSize - 1
  const res = await getAllUsersAPI(
    {
      cmd: 'all_user_info', regionid: regionStore.regionId!,
      pass: pageParams.pass, pageSize: pageParams.pageSize
    })
  if (res.state === '0000') {
    tenantsList.value.push(...res.Table!)
  }
  if (pageParams.page < pageParams.total) {
    // 页码累加
    pageParams.page++
  } else if (pageParams.page >= pageParams.total) {
    finish.value = true
  }
}


onLoad(async () => {
  await Promise.all([getAllUsersData(),
  getAllUsersCount()
  ])
})
// 重置数据
const resetData = () => {
  pageParams.page = 0
  tenantsList.value = []
  finish.value = false
}

// 触底触发
const onScrolltolower = async () => {
  await getAllUsersData()
}

//下拉刷新触发
const isTriggered = ref(false)
const onRefresherrefresh = async () => {
  //开启加载
  isTriggered.value = true
  // 清除数据
  resetData()
  //加载数据
  await Promise.all([getAllUsersData(), getAllUsersCount()])
  //关闭加载
  isTriggered.value = false
  uni.showToast({
    title: '刷新成功！',
    icon: 'none'
  })
}
</script>

<template>
  <view class="container" :style="{ paddingTop: safeArea!.top + 'px' }">
    <text class="tenants-name">租户</text>
    <!-- 搜索栏 -->
    <view class="search-bar">
      <uni-icons type="scan" size="20" color="#999" @tap="onScanCode" />
      <input type="text" confirm-type="search" @confirm="searchReigonList" placeholder="搜索名称/编号/房间号"
        class="search-input" v-model="searchText" />
      <uni-icons type="search" size="20" color="#999" @tap="searchReigonList" />
    </view>
    <!-- 无用户 -->
    <view class="status-tip" v-if="noData">
      <wd-status-tip image="search" tip="暂无数据" />
    </view>
    <!-- 设备列表 -->
    <scroll-view refresher-enabled @refresherrefresh="onRefresherrefresh" :refresher-triggered="isTriggered"
      @scrolltolower="onScrolltolower" v-else class="device-list" scroll-y>
      <view class="room-section" v-for="item in tenantsList" :key="item.user_id">
        <view v-if="item.watthour_meter_id || item.water_meter_id || item.hot_meter_id || item.locker_id">
          <view class="room-header">
            <view class="room-title">
              <uni-icons type="home" size="20" color="#666" />
              <text>{{ item.room_num }}室</text>
              <view class="room-device">
                <text class="icon-dianbiao" v-if="item.watthour_meter_id" />
                <text class="icon-lengshuibiao" v-if="item.water_meter_id" />
                <text class="icon-reshuibiao1" v-if="item.hot_meter_id" />
                <text class="icon-mensuo" v-if="item.locker_id" />
              </view>
            </view>
            <text class="tenant-name">楼幢：{{ item.block_num }}</text>
          </view>
          <navigator
            :url="`/pages/device/device?id=${item.user_id}&watthour=${item.watthour_meter_id}&water=${item.water_meter_id}&hot=${item.hot_meter_id}&locker=${item.locker_id}`"
            hover-class="none" class="device-card">
            <view class="card-left">
              <view class="device-info">
                <text class="device-name">{{ item.user_name }}</text>
                <text class="device-id">编号：{{ item.user_id }}</text>
              </view>
            </view>
            <view class="card-right">
              <text class="reading">剩余余额：{{ item.user_balance }}元
              </text>
              <text class="status" :class="[item.user_state === '0' ? 'inuse' : 'unused']">
                {{ item.user_state === '0' ? '未使用' : '使用中' }}
              </text>
            </view>
          </navigator>
        </view>
      </view>
      <view class="loading-text">
        {{ finish ? '没有更多数据~' : '正在加载...' }}
      </view>
    </scroll-view>
    <!-- 搜索框结果 -->
    <wd-popup v-model="show" position="bottom" custom-style="max-height: 80%;">
      <scroll-view scroll-y>
        <view class="popup-bottom">
          <button class="region-info" hover-class="none" v-for="regions in RegionList" :key="regions.region_id"
            @tap="onToggleRegion(regions)">
            <uni-icons class="region-icon" type="map-pin-ellipse" size="20"></uni-icons>
            <view class="region-name">{{ regions.region_name }}</view>
            <view class="region-id">区域编号：{{ regions.region_id }}</view>
          </button>
          <button class="user-info" hover-class="none" v-for="users in UserList" :key="users.user_id"
            @tap="onToggleUser(users)">
            <uni-icons class="user-icon" type="person-filled" size="20"></uni-icons>
            <view class="user-name">{{ users.user_name }}</view>
            <view class="user-id">用户编号：{{ users.user_id }}</view>
            <view class="user-bottom">
              <text class="user-phone">手机：{{ users.user_phone }}</text>
              <text class="user-block">楼栋：{{ users.block_num }}</text>
            </view>
          </button>
        </view>
      </scroll-view>
    </wd-popup>
    <!-- 添加设备按钮 -->
    <!-- <view class="add-button " @tap="handleAddDevice">
      <uni-icons type="plusempty" size="24" color="#FFFFFF" />
    </view> -->
  </view>
</template>



<style lang="scss">
page {
  height: 100%;
  background-color: #f5f5f5;
}

// 页面
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

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

  .tenants-name {
    margin: 30rpx 0;
    text-align: center;
  }

  /*搜索框*/
  .search-bar {
    display: flex;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 16rpx;
    padding: 20rpx 30rpx;
    margin: 0 20rpx;

    .search-input {
      flex: 1;
      margin-left: 20rpx;
      font-size: 14px;
    }
  }

  .popup-bottom {
    padding: 25rpx;
    background-color: rgb(241, 242, 236);

    .region-info,
    .user-info {
      margin: 15rpx;
      padding: 10rpx;
      border-radius: 10rpx;
      font-size: 25rpx;

      .region-icon,
      .user-icon {
        position: absolute;
        top: 0;
        left: 20rpx;

      }
    }

    .user-info {
      .user-bottom {
        display: flex;
        justify-content: space-evenly;
        color: #666;
      }
    }
  }

  /* 主体 用户设备 */
  .device-list {
    flex: 1;
    overflow: auto;
    margin: 30rpx 0;

    .room-section {
      margin: 0 20rpx 30rpx;

      .room-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;

        .room-title {
          display: flex;
          align-items: center;

          text {
            font-size: 16px;
            color: #333;
            margin-left: 10rpx;
            font-weight: 500;
          }
        }

        .tenant-name {
          font-size: 14px;
          color: #666;
        }
      }
    }

    .device-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx;
      background-color: #FFFFFF;
      border-radius: 16rpx;
      margin-bottom: 20rpx;

      .card-left {
        display: flex;
        align-items: center;

        .device-info {
          margin-left: 20rpx;

          .device-name {
            font-size: 16px;
            color: #333;
            margin-bottom: 8rpx;
            display: block;
          }

          .device-id {
            font-size: 12px;
            color: #999;
          }
        }
      }

      .card-right {
        text-align: right;

        .reading {
          font-size: 14px;
          color: #333;
          margin-bottom: 8rpx;
          display: block;
        }

        .status {
          font-size: 12px;
          padding: 4rpx 16rpx;
          border-radius: 4rpx;
        }

        .status.unused {
          color: #4CAF50;
          background-color: #E8F5E9;
        }

        .status.inuse {
          color: #FF9800;
          background-color: #FFF3E0;
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


}


.add-button {
  position: fixed;
  right: 40rpx;
  bottom: 140rpx;
  width: 100rpx;
  height: 100rpx;
  background-color: #67B469;
  border-radius: 50rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
}
</style>
