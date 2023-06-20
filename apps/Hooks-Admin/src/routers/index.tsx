import { RouterProvider as Router, createHashRouter, RouteObject } from "react-router-dom";
import { wrappedStaticRouter } from "./modules/staticRouter";
import { useState, useEffect, lazy } from "react";
import { getFlatMenuList } from "utils";
import { LayoutIndex } from "components";
import { useAppSelector, useTheme } from "hooks";
import useMessage from "hooks/module/useMessage";
import LazyComponent from "./utils/LazyComponent";
import { RouteObjectType } from "./interface";
import NotFound from "@/components/Error/404";
import RouterGuard from "./modules/routerGuard";

const modules = import.meta.glob("@/views/**/*.tsx") as Record<string, Parameters<typeof lazy>[number]>;

const RouterProvider: React.FC = () => {
  // initTheme && useMessage
  const { initTheme } = useTheme();
  initTheme();
  useMessage();

  const authMenuList = useAppSelector(state => state.auth.authMenuList);
  const [routerList, setRouterList] = useState<RouteObjectType[]>(wrappedStaticRouter);

  const handleDynamicRouter = () => {
    const flatMenuList = getFlatMenuList(authMenuList);
    flatMenuList.forEach(item => {
      item.children && delete item.children;
      if (item.element && typeof item.element == "string") {
        const Component = LazyComponent(lazy(modules["/src/views" + item.element + ".tsx"]));
        item.element = <RouterGuard>{Component}</RouterGuard>;
        item.loader = () => {
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
    let handleRouter = authMenuList.length ? [dynamicRouter, ...wrappedStaticRouter] : wrappedStaticRouter;
    // To prevent 404 from refreshing the page, add the * route at the end
    handleRouter.forEach(item => item.path === "*" && (item.element = <NotFound />));
    setRouterList(handleRouter);
  }, [authMenuList]);

  return <Router router={createHashRouter(routerList as RouteObject[])} />;
};

export default RouterProvider;
