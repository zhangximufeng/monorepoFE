import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @description   用获取菜单列表
 * @author Liam
 * @date 2023-06-13
 */
export const getAuthMenuListApi = () => {
  return http.get<any[]>(PORT1 + `/menu/list`, {}, { noLoading: true });
};

/**
 * @description   获取按钮权限
 * @author Liam
 * @date 2023-06-13
 */
export const getAuthButtonListApi = () => {
  return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { noLoading: true });
};

/**
 * @description   用户退出登录
 * @author Liam
 * @date 2023-06-13
 */
export const logoutApi = () => {
  return http.post(PORT1 + `/logout`);
};
