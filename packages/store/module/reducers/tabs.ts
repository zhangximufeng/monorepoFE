import { TabsState } from "../interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tabsState: TabsState = {
  tabsList: [
    {
      icon: "HomeOutlined",
      title: "首页",
      path: "/home/index",
      closable: false
    },
    {
      icon: "ContainerOutlined",
      title: "使用 ProTable",
      path: "/proTable/useProTable",
      closable: true
    },
    {
      icon: "DashboardOutlined",
      title: "使用 TreeFilter",
      path: "/proTable/useTreeFilter",
      closable: true
    },
    {
      icon: "DatabaseOutlined",
      title: "使用 SelectFilter",
      path: "/proTable/useSelectFilter",
      closable: true
    }
  ]
};

const tabsSlice = createSlice({
  name: "hooks-tabs",
  initialState: tabsState,
  reducers: {
    setTabsList(state, { payload }: PayloadAction<TabsState["tabsList"]>) {
      state.tabsList = payload;
    }
  }
});

export const { setTabsList } = tabsSlice.actions;
export default tabsSlice.reducer;
