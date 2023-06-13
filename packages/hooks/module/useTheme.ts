import { theme } from "antd";
import { useAppSelector } from "./index";
import { getLightColor, getDarkColor } from "utils";
import themeConfig from "../styles/theme";

/**
 * @description 全局主题设置
 * */
const useTheme = () => {
  const { token }: { [key: string]: any } = theme.useToken();
  const { isDark, primary, isGrey, isWeak } = useAppSelector(state => state.global);

  // 切换暗黑模式
  const switchDark = () => {
    const html = document.documentElement as HTMLElement;
    if (isDark) html.setAttribute("class", "dark");
    else html.setAttribute("class", "");
    changePrimary();
  };

  // 切换主题颜色
  const changePrimary = () => {
    const type = isDark ? "dark" : "light";
    // custom less variable
    Object.keys(themeConfig[type]).forEach(item => document.documentElement.style.setProperty(item, themeConfig[type][item]));
    // antd less variable
    Object.keys(token).forEach(item => document.documentElement.style.setProperty(`--hooks-${item}`, token[item]));
    // antd primaryColor less variable
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--hooks-colorPrimary${i}`,
        isDark ? `${getDarkColor(primary, i / 10)}` : `${getLightColor(primary, i / 10)}`
      );
    }
  };

  // 灰色和弱色切换
  const changeGreyOrWeak = () => {
    const body = document.body as HTMLElement;
    body.setAttribute("style", "");
    if (isGrey) body.setAttribute("style", "filter: grayscale(1)");
    if (isWeak) body.setAttribute("style", "filter: invert(80%)");
  };

  // initTheme
  const initTheme = () => {
    switchDark();
    changeGreyOrWeak();
  };

  return { initTheme };
};

export default useTheme;
