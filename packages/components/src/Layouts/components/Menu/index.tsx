import { useState } from "react";
import { Menu, MenuProps } from "antd";
import { useAppSelector } from "hooks";
import { HomeOutlined, AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";

const LayoutMenu: React.FC = () => {
  const { isDark } = useAppSelector(state => state.global);
  const { authMenuList } = useAppSelector(state => state.auth);

  console.log("Menu------------->", authMenuList);

  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    theme?: "dark" | "light"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      theme
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem("Option Hone", "0", <HomeOutlined />),

    getItem("Navigation One", "sub1", <MailOutlined />, [
      getItem("Option 1", "1"),
      getItem("Option 2", "2"),
      getItem("Option 3", "3"),
      getItem("Option 4", "4")
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [getItem("Option 7", "7"), getItem("Option 8", "8")])
    ]),
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12")
    ])
  ];
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const [openKeys, setOpenKeys] = useState(["sub4"]);

  const onOpenChange: MenuProps["onOpenChange"] = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      theme={isDark ? "dark" : "light"}
      mode={"inline"}
      defaultSelectedKeys={["10"]}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={items}
    />
  );
};

export default LayoutMenu;
