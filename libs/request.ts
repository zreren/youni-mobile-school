import axios from 'axios';
import useLocalStorage from '@/hooks/useStore';

// const token = localStorage.getItem('token')
const [token, setToken] = useLocalStorage('token', null);
const instance = axios.create({
  baseURL: Cons.BASEURL,
  timeout: 1000,
  headers:{
    "authorization":token
  }
});
export default instance;
// global.request = instance;
// export default function useRequest() {
 
//   return instance;
// };
