import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import request from "@/api";

/**
 * @description   用户登录
 * @author Liam
 * @date 2023-06-13
 */
export const loginApi = (params: Login.ReqLoginForm) => {
  return request.post<Login.ResLogin>(PORT1 + `/login`, params, { noLoading: true });
};
