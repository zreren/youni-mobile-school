import axios from 'axios';
import useLocalStorage from '@/hooks/useStore';
const Cons = {
  BASEURL: 'https://youni-admin.kuizuo.cn',
};

// const token = localStorage.getItem('token')
// const [token, setToken] = useLocalStorage('token', null);
const instance = axios.create({
  baseURL: 'https://api.mapbox.com/',
  timeout: 10000,
});
export default instance;
// global.request = instance;
// export default function useRequest() {
//   return instance.defaults;
// };
