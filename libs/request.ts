import axios from 'axios';
import useLocalStorage from '@/hooks/useStore';
const [token, setToken] = useLocalStorage('token',null);
const instance = axios.create({
  baseURL: Cons.BASEURL,
  timeout: 1000,
  headers: {'Authorization': token},
});
global.request = instance;
