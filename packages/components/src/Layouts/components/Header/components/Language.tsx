import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useAppDispatch, useAppSelector } from "hooks";
import { setGlobalState } from "store";
import { LanguageType } from "store/module/interface";

const Language: React.FC = () => {
  const dispatch = useAppDispatch();
  const { language } = useAppSelector(state => state.global);

  const setLanguage: MenuProps["onClick"] = val => {
    dispatch(setGlobalState({ key: "language", value: val.key as LanguageType }));
  };

  const items: MenuProps["items"] = [
    { key: "zh", label: "简体中文", disabled: language === "zh" },
    { key: "en", label: "English", disabled: language === "en" }
  ];

  const menuProps = {
    items,
    onClick: setLanguage
  };

  return (
    <Dropdown menu={menuProps} placement="bottom" arrow trigger={["click"]}>
      <i className="iconfont icon-zhongyingwen"></i>
    </Dropdown>
  );
};
export default Language;
