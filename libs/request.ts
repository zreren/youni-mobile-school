import axios from 'axios';
import useLocalStorage from '@/hooks/useStore';

// const token = localStorage.getItem('token')
// const [token, setToken] = useLocalStorage('token', null);
const instance = axios.create({
  baseURL: 'https://youni-admin.kuizuo.cn',
  timeout: 10000,
  headers:{
    "authorization":typeof window !== 'undefined'?localStorage.getItem('token')?.replace("\"","")?.replace("\"",""):null
  }
});
axios.interceptors.response.use(
  response => {
    const newToken = response.headers['new-token'];
    if (newToken) {
      localStorage.setItem('token',newToken);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default instance;
// global.request = instance;
// export default function useRequest() {
//   return instance.defaults;
// };
