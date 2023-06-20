import { Provider, TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";

import { configureStore, combineReducers, Middleware, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import global from "./reducers/global";
import user from "./reducers/user";
import auth from "./reducers/auth";
import tabs from "./reducers/tabs";
import { fetchMenuList, setAuthMenuList } from "./reducers/auth";
import { setGlobalState } from "./reducers/global";
import { addTabs, removeTabs } from "./reducers/tabs";
import { setToken, setUserInfo } from "./reducers/user";

// create reducer
const reducer = combineReducers({ global, user, auth, tabs });

// redux persist
const persistConfig = {
  key: "redux-state",
  storage
};

const persistReducerConfig = persistReducer(persistConfig, reducer);

// redux middleWares(self configuration)
const middleWares: Middleware[] = [reduxThunk];

// store
const store = configureStore({
  reducer: persistReducerConfig,
  middleware: middleWares,
  devTools: true
});

// create persist store
const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export { store, Provider, useSelector, useDispatch, persistor };

export { setGlobalState, fetchMenuList, addTabs, removeTabs, setToken, setUserInfo, setAuthMenuList };

export type { RootState, AppDispatch, TypedUseSelectorHook };
