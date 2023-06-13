import { Layout } from "antd";
import { useAppSelector } from "hooks";
import ToolBarLeft from "../components/Header/ToolBarLeft";
import ToolBarRight from "../components/Header/ToolBarRight";
import LayoutMenu from "../components/Menu";
import LayoutMain from "../components/Main";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const { Header, Sider } = Layout;

const LayoutVertical: React.FC = () => {
  const { isCollapse } = useAppSelector(state => state.global);

  return (
    <section className={`layout-vertical`}>
      <Sider width={210} collapsed={isCollapse}>
        <div className="logo">
          <img src={logo} alt="logo" className="logo-img" />
          {!isCollapse && <h2 className="logo-text">Hooks Admin</h2>}
        </div>
        <LayoutMenu />
      </Sider>
      <Layout>
        <Header>
          <ToolBarLeft />
          <ToolBarRight />
        </Header>
        <LayoutMain />
      </Layout>
    </section>
  );
};

export default LayoutVertical;
