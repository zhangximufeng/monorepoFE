import { RouteObject } from "react-router-dom";

export interface MetaProps {
  key?: string;
  icon?: string;
  title?: string;
  activeMenu?: string;
  isLink?: boolean;
  isHide?: boolean;
  isFull?: boolean;
  isAffix?: boolean;
  isKeepAlive?: boolean;
}

export type RouteObjectType = Omit<RouteObject, "children"> & {
  meta?: MetaProps;
  children?: RouteObjectType[];
};
