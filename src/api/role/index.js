import request from "../request.js";

//请求前缀
const PREFIX = "/role";

export function findRoleList(pageNo,pageSize,param) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/list/${pageNo}/${pageSize}`,
    method: "GET",
    params: param,
  });
}

export function queryRoleList() {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/list`,
    method: "GET",
  });
}

export function addRole(data) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/add`,
    method: "POST",
    data: data,
  });
}

export function savePermission(data,roleId) {
  return request({
    //模板字符串拼接参数
    url: `${PREFIX}/save/permission/${roleId}`,
    method: "POST",
    data: data,
  });
}