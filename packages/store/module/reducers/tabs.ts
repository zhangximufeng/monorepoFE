import { TabsState, TabsListProp } from "../interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const tabsState: TabsState = {
  tabsList: [{ icon: "HomeOutlined", title: "首页", path: "/home/index", closable: false }]
};

const tabsSlice = createSlice({
  name: "hooks-tabs",
  initialState: tabsState,
  reducers: {
    addTabs(state, { payload }: PayloadAction<TabsListProp>) {
      if (state.tabsList.every(item => item.path !== payload.path)) {
        state.tabsList.push(payload);
      }
    },
    removeTabs(state, { payload }: PayloadAction<{ tabPath: string; isCurrent: boolean }>) {
      const tabsList = state.tabsList;
      if (payload.isCurrent) {
        tabsList.forEach((item: { path: string }, index: number) => {
          if (item.path !== payload.tabPath) return;
          const nextTab = tabsList[index + 1] || tabsList[index - 1];
          if (!nextTab) return;
          window.location.hash = nextTab.path;
        });
      }
      state.tabsList = tabsList.filter((item: { path: string }) => item.path !== payload.tabPath);
    },
    setTabsList(state, { payload }: PayloadAction<TabsState["tabsList"]>) {
      state.tabsList = payload;
    }
  }
});

export const { addTabs, removeTabs, setTabsList } = tabsSlice.actions;
export default tabsSlice.reducer;
