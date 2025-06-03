import type { DeviceInfo } from "@/types/global"

// 电表数据
export const ammeter:DeviceInfo = {
  Name: '电表', //名称
  DeviceId: '000002561525', // 编号
  CollectorId:'123421341234', // 采集器编号
  Icon:'icon-dianbiao', // icon图标
  Speed: 1, // 倍率
  Price: 12, // 价格
  Coll: 3156.465, // 电量
  Type: '单项表', // 类型
  Collect:"冻结表", // 采集类型
  State: '开', // 状态
}

// 水表数据
export const water:DeviceInfo = {
  Name: '水表', //名称
  DeviceId: '209357092384', // 编号
  CollectorId:'123421341234', // 采集器编号
  Icon:'icon-lengshuibiao', // icon图标
  Speed: 1, // 倍率
  Price: 12, // 价格
  Coll: 3156.465, // 底度
  Type: 'LORA表', // 类型
  Collect:"480.30", // 频率
  State: '开', // 状态
}

// 热水表数据
export const hotwater:DeviceInfo = {
  Name: '热表', //名称
  DeviceId: ' 35415616161', // 编号
  CollectorId:'123421341234', // 采集器编号
  Icon:'icon-reshuibiao1', // icon图标
  Speed: 1, // 倍率
  Price: 12, // 价格
  Coll: 4537, // 底度
  Type: 'LORA表', // 类型
  Collect:"480.30", // 频率
  State: '开', // 状态
}

// 门锁数据
export const doorlocks = {
  Name: '门锁', //名称
  DeviceId: ' 7688673737853', // 编号
  CollectorId:'123421341234', // 采集器编号
  Permanent: '123456', // 密码
  Temporary: '' //临时密码
}

export const userBut = [
  { type: 97, name: "用户", icon: "icon-yonghu1" },
  { type: 98, name: "二维码", icon: "icon-fenxiangerweima" },
  { type: 99, name: "充值", icon: "icon-huiyuanchongzhi" },
]

/* 按钮数据 */
export const operations = [
  { type: 1, name: "开启", icon: "icon-kai" },
  { type: 2, name: "关闭", icon: "icon-guan2" },
  { type: 3, name: "更新", icon: "icon-gengxin" },
  { type: 4, name: "修改", icon: "icon-xiugai" },
  { type: 5, name: "初始化", icon: "icon-chushihuajiaobenshibai" },
  { type: 6, name: "采集器", icon: "icon-xinhaoqiangdu" },
  { type: 7, name: "操作记录", icon: "icon-caozuojilu" },
  { type: 8, name: "数据记录", icon: "icon--record" },
  { type: 9, name: "控制设备", icon: "icon-shouye-dangqianshujusuozaiweizhitubiao" },
];

// 门锁按钮
export const  lockerOperations = [
  { type: 3, name: "更新", icon: "icon-gengxin" },
  { type: 4, name: "修改", icon: "icon-xiugai" },
  { type: 5, name: "初始化", icon: "icon-chushihuajiaobenshibai" },
  { type: 6, name: "采集器", icon: "icon-xinhaoqiangdu" },
  { type: 7, name: "操作记录", icon: "icon-caozuojilu" },
  { type: 8, name: "数据记录", icon: "icon--record" },
  { type: 9, name: "控制设备", icon: "icon-shouye-dangqianshujusuozaiweizhitubiao" },
];
