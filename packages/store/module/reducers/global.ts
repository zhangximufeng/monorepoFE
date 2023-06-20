import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GlobalState } from "../interface";

type ObjToKeyValUnion<T> = {
  [K in keyof T]: { key: K; value: T[K] };
}[keyof T];

// 修改默认值之后，需清除 localStorage 数据
const globalState: GlobalState = {
  // 布局模式 (vertical)
  layout: "vertical",
  // antd 组件大小 ("small" | "middle" | "large")
  componentSize: "middle",
  // antd 紧凑主题
  compactAlgorithm: false,
  // 当前系统语言
  language: null,
  // antd border radius
  borderRadius: 6,
  // 当前页面是否全屏
  maximize: false,
  // 主题颜色
  primary: "#1677ff",
  // 深色模式横向：transverse
  isDark: false,
  // 灰色模式
  isGrey: false,
  // 色弱模式
  isWeak: false,
  // 折叠菜单
  isCollapse: false,
  // 面包屑导航
  breadcrumb: true,
  // 面包屑导航图标
  breadcrumbIcon: true,
  // 标签页
  tabs: true,
  // 标签页图标
  tabsIcon: true,
  // 页脚
  footer: true,
  // 主题框显示状态
  themeDrawerVisible: false
};

const globalSlice = createSlice({
  name: "hooks-global",
  initialState: globalState,
  reducers: {
    setGlobalState<T extends keyof GlobalState>(state: GlobalState, { payload }: PayloadAction<ObjToKeyValUnion<GlobalState>>) {
      state[payload.key as T] = payload.value as GlobalState[T];
    }
  }
});

export const { setGlobalState } = globalSlice.actions;
export default globalSlice.reducer;
