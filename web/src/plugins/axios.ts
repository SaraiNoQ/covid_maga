import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_BASE_URL as string
const instance: AxiosInstance = axios.create({
    baseURL,
    timeout: 10 * 1000
})


instance.interceptors.request.use((config: AxiosRequestConfig) => {
    // 增加token
    const token: string | null = localStorage.getItem('token');// 获取token方式因情况决定
    token && ((config.headers as AxiosRequestHeaders).Authorization = token);
    return config;
}, (error: any) => {
    console.log('filter resquest error:', error);
});

instance.interceptors.response.use((response: AxiosResponse) => {
    // const status: number = response.status;
    // if (status === 200) {
    //     response.data.vertified = 'success'
    // }
    // return Promise.resolve(response.data)
    return Promise.resolve({ 'success': response.data })
}, (error: any) => {
    return Promise.resolve({ 'error': error.response })
})

export default instance