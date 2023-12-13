//axios基础封装
import axios from "axios";
// import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router';
import { useAdminStore } from '@/stores/admin'
const router = useRouter()

const httpInstance = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  //   超时时间
  timeout: 5000
})

//拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const adminStore = useAdminStore()
  
  // 2. 按照后端的要求拼接token数据
  const token = adminStore.admin?.data?.token
  if (token) {
    config.headers.token = `${token}`; 
  }
  return config
}, e => Promise.reject(e))

export default httpInstance