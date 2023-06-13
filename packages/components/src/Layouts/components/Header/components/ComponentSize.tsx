import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useAppDispatch, useAppSelector } from "hooks";
import { setGlobalState } from "store";
import { SizeType } from "antd/es/config-provider/SizeContext";

const ComponentSize: React.FC = () => {
  const dispatch = useAppDispatch();
  const { componentSize } = useAppSelector(state => state.global);

  const setComponentSize: MenuProps["onClick"] = val => {
    dispatch(setGlobalState({ key: "componentSize", value: val.key as SizeType }));
  };

  const items: MenuProps["items"] = [
    { key: "middle", label: "默认", disabled: componentSize === "middle" },
    { key: "large", label: "大型", disabled: componentSize === "large" },
    { key: "small", label: "小型", disabled: componentSize === "small" }
  ];

  const menuProps = {
    items,
    onClick: setComponentSize
  };

  return (
    <Dropdown menu={menuProps} placement="bottom" arrow trigger={["click"]}>
      <i className="iconfont icon-contentright"></i>
    </Dropdown>
  );
};

export default ComponentSize;
