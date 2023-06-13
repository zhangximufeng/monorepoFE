import { useAppSelector } from "hooks";
import "./index.less";

const LayoutFooter: React.FC = () => {
  const { footer } = useAppSelector(state => state.global);

  return (
    <>
      {footer && (
        <div className="footer">
          <a href="http://www.baidu.cn/" target="_blank" rel="noreferrer">
            2023 © 去选出行 By Hooks Technology.
          </a>
        </div>
      )}
    </>
  );
};

export default LayoutFooter;
