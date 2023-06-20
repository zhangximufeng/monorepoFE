import { createRef, useEffect } from "react";
import { Layout } from "antd";
import { useLocation, useOutlet } from "react-router-dom";
import { useDebounceFn } from "ahooks";
import { setGlobalState } from "store";
import { useAppDispatch, useAppSelector } from "hooks";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import LayoutTabs from "../../components/Tabs";
import LayoutFooter from "../../components/Footer";
import "./index.less";

const { Content } = Layout;

const LayoutMain: React.FC = () => {
  const outlet = useOutlet();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const flatMenuList = useAppSelector(state => state.auth.flatMenuList);
  const isCollapse = useAppSelector(state => state.global.isCollapse);

  // Monitor window changes, collapse menu
  const { run } = useDebounceFn(
    () => {
      const screenWidth = document.body.clientWidth;
      if (!isCollapse && screenWidth < 1200) {
        dispatch(setGlobalState({ key: "isCollapse", value: true }));
      }
      if (isCollapse && screenWidth > 1200) {
        dispatch(setGlobalState({ key: "isCollapse", value: false }));
      }
    },
    { wait: 100 }
  );

  useEffect(() => {
    window.addEventListener("resize", run, false);
    return () => window.removeEventListener("resize", run);
  }, []);

  // Solve the transition animation that causes useEffect to execute multiple times
  // @see: http://reactcommunity.org/react-transition-group/with-react-router
  const menuList: any[] = flatMenuList.map(item => ({ ...item, nodeRef: createRef() }));
  const { nodeRef } = menuList.find(route => route.path === pathname) ?? {};

  return (
    <>
      <LayoutTabs />
      <SwitchTransition>
        <CSSTransition classNames="fade" key={pathname} nodeRef={nodeRef} timeout={300} exit={false} unmountOnExit>
          <Content ref={nodeRef}>{outlet}</Content>
        </CSSTransition>
      </SwitchTransition>
      <LayoutFooter />
    </>
  );
};

export default LayoutMain;
