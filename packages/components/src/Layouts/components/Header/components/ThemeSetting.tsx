import { useAppDispatch } from "hooks";
import { setGlobalState } from "store";

const ThemeSetting: React.FC = () => {
  const dispatch = useAppDispatch();

  const setThemeDrawerVisible = () => {
    dispatch(setGlobalState({ key: "themeDrawerVisible", value: true }));
  };

  return <i className="iconfont icon-zhuti" onClick={setThemeDrawerVisible}></i>;
};
export default ThemeSetting;
