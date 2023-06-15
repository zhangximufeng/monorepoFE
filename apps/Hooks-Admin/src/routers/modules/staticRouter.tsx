import { LOGIN_URL } from "@/config";
import { Navigate } from "react-router-dom";
import Login from "@/views/login/index";
import NotAuth from "@/components/Error/403";
import NotFound from "@/components/Error/404";
import NotNetwork from "@/components/Error/500";
import { RouteObjectType } from "../interface";

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteObjectType[] = [
  {
    path: "/",
    element: <Navigate to={LOGIN_URL} />
  },
  {
    path: LOGIN_URL,
    element: <Login />,
    meta: {
      key: "login",
      title: "登录"
    }
  },
  {
    path: "/403",
    element: <NotAuth />,
    meta: {
      key: "403",
      title: "403页面"
    }
  },
  {
    path: "/404",
    element: <NotFound />,
    meta: {
      key: "404",
      title: "404页面"
    }
  },
  {
    path: "/500",
    element: <NotNetwork />,
    meta: {
      key: "500",
      title: "500页面"
    }
  },
  {
    path: "*",
    element: ""
  }
];
