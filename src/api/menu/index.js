import request from "../request.js";

//请求前缀
const PREFIX = "/menu";

export function queryMenuList() {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/list`,
    method: "GET",
  });
}

export function queryMenuListByLike(data) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/list/like`,
    method: "POST",
    data: data,
  });
}

export function addMenu(data) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/add`,
    method: "POST",
    data: data,
  });
}

export function queryRoleMenu(data) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/role/query`,
    method: "POST",
    data: data
  });
}