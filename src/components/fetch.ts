import axios, { AxiosResponse, AxiosError } from 'axios'
import {notification} from 'antd'

const headers = {Auth:'token'}
const fetch = axios.create({
    baseURL:'',
    timeout:15000,
    headers
})

const codeMessage:Record<number,string> = {
    200: '服务器成功返回数据',
    201: '新建数据成功',
    401: '没有权限访问(令牌、用户名、密码错误)',
    403: '访问被禁止',
    404: '请求的地址未找到',
    500: '服务端发生错误',
    0:''
}

fetch.interceptors.response.use(function(response:AxiosResponse){
    if(response.status===200){
        return Promise.resolve(response.data)
    }
    notification.error({
        message:response.status,
        description:response.statusText
    })
    return Promise.reject(response.statusText)
},
function(error: AxiosError){
    const status = error.response?.status||0;
    const httpError = {
        hasError: true,
        status: error.response?.status,
        statusText: error.response?.statusText,
        info: codeMessage[status]
    }
    notification.error({
        message: httpError.status,
        description: httpError.statusText,
        //info: codeMessage[status]
    });
    return Promise.reject(error)
})
export default fetch;