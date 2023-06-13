import { Button } from "antd";
import { IconFont } from "../Icon";
import { setGlobalState } from "store";
import { useAppDispatch, useAppSelector } from "hooks";

const SwitchDark: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDark } = useAppSelector(state => state.global);

  return (
    <Button
      type="text"
      size="large"
      className="switch-dark"
      icon={<IconFont style={{ fontSize: 22 }} type={isDark ? "icon-sun" : "icon-moon1"} />}
      onClick={() => dispatch(setGlobalState({ key: "isDark", value: !isDark }))}
    ></Button>
  );
};

export default SwitchDark;
