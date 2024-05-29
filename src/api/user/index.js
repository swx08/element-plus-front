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
    method: "POST"
  });
}

export function findUserList(pageNo,pageSize,username) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/list/${pageNo}/${pageSize}`,
    method: "GET",
    params: username,
  });
}

export function queryRoles(userId) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/roles/${userId}`,
    method: "GET",
  });
}

export function save(data) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/save`,
    method: "POST",
    data: data,
  });
}

export function saveRoles(username, data) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/save/roles/${username}`,
    method: "POST",
    data: data,
  });
}