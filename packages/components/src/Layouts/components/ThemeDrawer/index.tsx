import { Drawer, Divider, Switch, Popover } from "antd";
import { setGlobalState } from "store";
import { useAppDispatch, useAppSelector } from "hooks";
import { FireOutlined, SettingOutlined } from "@ant-design/icons";
import ColorPicker from "./components/ColorPicker";
import "./index.less";

const ThemeDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    compactAlgorithm,
    isDark,
    isGrey,
    isWeak,
    isCollapse,
    breadcrumb,
    breadcrumbIcon,
    tabs,
    tabsIcon,
    footer,
    themeDrawerVisible
  } = useAppSelector(state => state.global);

  return (
    <Drawer
      title="主题配置"
      closable={false}
      maskClosable={true}
      open={themeDrawerVisible}
      width={300}
      className="theme-drawer"
      onClose={() => dispatch(setGlobalState({ key: "themeDrawerVisible", value: false }))}
    >
      {/* 全局主题 */}
      <Divider className="divider">
        <FireOutlined />
        全局主题
      </Divider>
      <div className="theme-item">
        <span>主题颜色</span>
        <Popover placement="left" trigger="click" content={ColorPicker}>
          <label className="primary"></label>
        </Popover>
      </div>
      <div className="theme-item">
        <span>暗黑模式</span>
        <Switch
          checked={isDark}
          checkedChildren={<span className="dark-icon dark-icon-sun">🌞</span>}
          unCheckedChildren={<span className="dark-icon dark-icon-moon">🌛</span>}
          onChange={value => dispatch(setGlobalState({ key: "isDark", value }))}
        />
      </div>
      <div className="theme-item">
        <span>灰色模式</span>
        <Switch checked={isGrey} onChange={value => dispatch(setGlobalState({ key: "isGrey", value }))} />
      </div>
      <div className="theme-item">
        <span>色弱模式</span>
        <Switch checked={isWeak} onChange={value => dispatch(setGlobalState({ key: "isWeak", value }))} />
      </div>
      <div className="theme-item mb35">
        <span>紧凑主题</span>
        <Switch checked={compactAlgorithm} onChange={value => dispatch(setGlobalState({ key: "compactAlgorithm", value }))} />
      </div>

      {/* 界面设置 */}
      <Divider className="divider">
        <SettingOutlined />
        界面显示
      </Divider>
      <div className="theme-item">
        <span>折叠菜单</span>
        <Switch checked={isCollapse} onChange={value => dispatch(setGlobalState({ key: "isCollapse", value }))} />
      </div>
      <div className="theme-item">
        <span>面包屑</span>
        <Switch checked={breadcrumb} onChange={value => dispatch(setGlobalState({ key: "breadcrumb", value }))} />
      </div>
      <div className="theme-item">
        <span>面包屑图标</span>
        <Switch checked={breadcrumbIcon} onChange={value => dispatch(setGlobalState({ key: "breadcrumbIcon", value }))} />
      </div>
      <div className="theme-item">
        <span>标签栏</span>
        <Switch checked={tabs} onChange={value => dispatch(setGlobalState({ key: "tabs", value }))} />
      </div>
      <div className="theme-item">
        <span>标签栏图标</span>
        <Switch checked={tabsIcon} onChange={value => dispatch(setGlobalState({ key: "tabsIcon", value }))} />
      </div>
      <div className="theme-item">
        <span>页脚</span>
        <Switch checked={footer} onChange={value => dispatch(setGlobalState({ key: "footer", value }))} />
      </div>
    </Drawer>
  );
};

export default ThemeDrawer;
