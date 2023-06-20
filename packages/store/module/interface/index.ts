import type { SizeType } from "antd/lib/config-provider/SizeContext";
import { RouteObject } from "react-router-dom";

export type LayoutType = "vertical";

export type LanguageType = "zh" | "en" | null;

export interface MetaProps {
  key?: string;
  icon?: string;
  title?: string;
  activeMenu?: string;
  isLink?: string;
  isHide?: boolean;
  isFull?: boolean;
  isAffix?: boolean;
  isKeepAlive?: boolean;
}

export type RouteObjectType = Omit<RouteObject, "children"> & {
  meta?: MetaProps;
  children?: RouteObjectType[];
};

/* GlobalState */
export interface GlobalState {
  layout: LayoutType;
  componentSize: SizeType;
  compactAlgorithm: boolean;
  borderRadius: number;
  language: LanguageType;
  maximize: boolean;
  primary: string;
  isDark: boolean;
  isGrey: boolean;
  isWeak: boolean;
  isCollapse: boolean;
  breadcrumb: boolean;
  breadcrumbIcon: boolean;
  tabs: boolean;
  tabsIcon: boolean;
  footer: boolean;
  themeDrawerVisible: boolean;
}

/* tabsMenuProps */
export interface TabsListProp {
  icon: string;
  title: string;
  path: string;
  closable: boolean;
}

/* TabsState */
export interface TabsState {
  tabsList: TabsListProp[];
}

/* UserState */
export interface UserState {
  token: string;
  userInfo: { name: string };
}

/* AuthState */
export interface AuthState {
  authButtonList: {
    [key: string]: string[];
  };
  authMenuList: RouteObjectType[];
  showMenuList: RouteObjectType[];
  flatMenuList: RouteObjectType[];
  breadcrumbAllList: {
    [key: string]: RouteObjectType[];
  };
}
