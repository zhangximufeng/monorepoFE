import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthMenuListApi } from "../../../../apps/gochoose-admin/src/api/modules";
import { getAllBreadcrumbList } from "utils";

const authState: AuthState = {
  authButtonList: {},
  authMenuList: [],
  breadcrumbAllList: {}
};

export const fetchMenuList = createAsyncThunk("fetchMenuList", async () => {
  const { data } = await getAuthMenuListApi();
  return data;
});

const globalSlice = createSlice({
  name: "hooks-auth",
  initialState: authState,
  reducers: {
    // setAuthButtonList(state, { payload }: PayloadAction<{ [propName: string]: any }>) {
    //   state.authButtonList = payload;
    // },
    // setAuthMenuList(state, { payload }: PayloadAction<string[]>) {
    //   state.authMenuList = payload;
    // }
  },
  extraReducers: builder => {
    builder.addCase(fetchMenuList.fulfilled, (state, { payload }: PayloadAction<string[]>) => {
      state.authMenuList = payload;
      state.breadcrumbAllList = getAllBreadcrumbList(payload);
    });
  }
});

// export const { setAuthButtonList, setAuthMenuList } = globalSlice.actions;
export default globalSlice.reducer;
