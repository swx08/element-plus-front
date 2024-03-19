//对于axios进行二次封装
import axios from "axios";

const requests = axios.create({
	baseURL:"/api",
    timeout:5000,
});

//请求拦截器
requests.interceptors.request.use((config)=>{
	//config：配置对象，对象里面有一个属性很重要，headers请求头
    return config;
})

//响应拦截器
requests.interceptors.response.use((res)=>{
    //响应成功的回调
    return res.data;
},(error)=>{
    //响应失败的回调
    return Promise.reject(new Error('faile'));
});

//对外暴露
export default requests;