import { useAppSelector } from "hooks";
import LayoutVertical from "./LayoutVertical";
import ThemeDrawer from "./components/ThemeDrawer";

const LayoutIndex: React.FC = () => {
  const { layout } = useAppSelector(state => state.global);
  const LayoutComponents = {
    vertical: <LayoutVertical />
  };

  return (
    <>
      {LayoutComponents[layout]}
      <ThemeDrawer />
    </>
  );
};

export default LayoutIndex;
