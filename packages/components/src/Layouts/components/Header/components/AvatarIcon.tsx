import { HomeOutlined, UserOutlined, FormOutlined, LoginOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { modal, message, useAppDispatch } from "hooks";
import { setToken, setAuthMenuList } from "store";
import { logoutApi } from "../../../../../../../apps/Hooks-Admin/src/api/modules";
import avatar from "../../../images/avatar.png";

const AvatarIcon: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    modal.confirm({
      title: "温馨提示 🧡",
      icon: <ExclamationCircleOutlined />,
      content: "是否确认退出登录？",
      okText: "确认",
      cancelText: "取消",
      maskClosable: true,
      onOk: async () => {
        await logoutApi();
        navigate("/login");
        message.success("退出登录成功！");

        dispatch(setToken(""));
        // Update authMenuList asynchronously to prevent 404 page
        setTimeout(() => dispatch(setAuthMenuList([])));
      }
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span className="dropdown-item">首页</span>,
      icon: <HomeOutlined style={{ fontSize: "14px" }} />,
      onClick: () => navigate("/dashboard/index")
    },
    {
      key: "2",
      label: <span className="dropdown-item">个人信息</span>,
      icon: <UserOutlined style={{ fontSize: "14px" }} />
    },
    {
      key: "3",
      label: <span className="dropdown-item">修改密码</span>,
      icon: <FormOutlined style={{ fontSize: "14px" }} />
    },
    {
      type: "divider"
    },
    {
      key: "4",
      label: <span className="dropdown-item">退出登录</span>,
      icon: <LoginOutlined style={{ fontSize: "14px" }} />,
      onClick: logout
    }
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]} placement="bottom" arrow>
      <Avatar className="avatar" size={42} src={avatar} />
    </Dropdown>
  );
};

export default AvatarIcon;
