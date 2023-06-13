import { useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useDebounceFn } from "ahooks";
import { setGlobalState } from "store";
import { useAppDispatch, useAppSelector } from "hooks";
import LayoutTabs from "../../components/Tabs";
import LayoutFooter from "../../components/Footer";
import "./index.less";

const LayoutMain: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCollapse } = useAppSelector(state => state.global);

  const { Content } = Layout;

  useEffect(() => {
    window.addEventListener("resize", run, false);
    return () => window.removeEventListener("resize", run);
  }, []);

  const { run } = useDebounceFn(
    () => {
      const screenWidth = document.body.clientWidth;
      if (!isCollapse && screenWidth < 1200) dispatch(setGlobalState({ key: "isCollapse", value: true }));
      if (isCollapse && screenWidth > 1200) dispatch(setGlobalState({ key: "isCollapse", value: false }));
    },
    { wait: 100 }
  );

  return (
    <>
      <LayoutTabs />
      <Content>
        <Outlet />
      </Content>
      <LayoutFooter />
    </>
  );
};

export default LayoutMain;
