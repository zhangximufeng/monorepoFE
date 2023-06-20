import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthMenuListApi } from "../../../../apps/Hooks-Admin/src/api/modules";
import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from "utils";
import { RouteObjectType, AuthState } from "../interface";

const authState: AuthState = {
  // 按钮权限列表
  authButtonList: {},
  // 菜单权限列表
  authMenuList: [],
  // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
  showMenuList: [],
  // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
  flatMenuList: [],
  // 递归处理后的所有面包屑导航列表
  breadcrumbAllList: {}
};

export const fetchMenuList = createAsyncThunk("hooks-auth/fetchMenuList", async () => {
  const { data } = await getAuthMenuListApi();
  return data;
});

const authSlice = createSlice({
  name: "hooks-auth",
  initialState: authState,
  reducers: {
    setAuthMenuList(state, { payload }: PayloadAction<RouteObjectType[]>) {
      state.authMenuList = payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchMenuList.fulfilled, (state, { payload }: PayloadAction<RouteObjectType[]>) => {
      state.authMenuList = payload;
      state.flatMenuList = getFlatMenuList(payload);
      state.showMenuList = getShowMenuList(payload);
      state.breadcrumbAllList = getAllBreadcrumbList(payload);
    });
  }
});

export const { setAuthMenuList } = authSlice.actions;
export default authSlice.reducer;
