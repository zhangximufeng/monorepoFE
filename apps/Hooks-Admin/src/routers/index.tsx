import { RouterProvider as Router, createHashRouter, RouteObject } from "react-router-dom";
import { staticRouter } from "./modules/staticRouter";
import { useState, useEffect, lazy } from "react";
import { getFlatMenuList } from "utils";
import { LayoutIndex } from "components";
import { useAppSelector, useTheme } from "hooks";
import useMessage from "hooks/module/useMessage";
import LazyComponent from "./utils/LazyComponent";
import { RouteObjectType } from "./interface";
import NotFound from "@/components/Error/404";

const modules = import.meta.glob("@/views/**/*.tsx") as Record<string, Parameters<typeof lazy>[number]>;

const RouterProvider: React.FC = () => {
  // initTheme && useMessage
  const { initTheme } = useTheme();
  initTheme();
  useMessage();

  const { authMenuList } = useAppSelector(state => state.auth);
  const [routerList, setRouterList] = useState(staticRouter);

  const handleDynamicRouter = () => {
    const flatMenuList = getFlatMenuList(authMenuList);
    flatMenuList.forEach(item => {
      item.children && delete item.children;
      if (item.element && typeof item.element == "string") {
        item.element = LazyComponent(lazy(modules["/src/views" + item.element + ".tsx"]));
        item.loader = () => {
          const title = import.meta.env.VITE_GLOB_APP_TITLE;
          document.title = item.meta.title ? `${item.meta.title} - ${title}` : title;
          return { ...item.meta };
        };
      }
    });
    const dynamicRouter: RouteObjectType = {
      element: <LayoutIndex />,
      children: flatMenuList
    };
    return dynamicRouter;
  };

  useEffect(() => {
    const dynamicRouter = handleDynamicRouter();
    let handleRouter = [dynamicRouter, ...routerList];
    // 防止刷新页面 404，最后在添加 * 路由
    handleRouter.forEach(item => item.path === "*" && (item.element = <NotFound />));
    setRouterList(handleRouter);
  }, [authMenuList]);

  return <Router router={createHashRouter(routerList as RouteObject[])} />;
};

export default RouterProvider;
