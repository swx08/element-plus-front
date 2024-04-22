import request from "../request.js";

//请求前缀
const PREFIX = "/user";

export function doLogin(data) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/login`,
    method: "POST",
    data: data,
  });
}

export function getUserInfo() {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/info`,
    method: "GET"
  });
}