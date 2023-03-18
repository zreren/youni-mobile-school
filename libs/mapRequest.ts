import axios from 'axios';
import useLocalStorage from '@/hooks/useStore';


const instance = axios.create({
  baseURL: 'https://api.mapbox.com/',
  timeout: 10000,
});
export default instance;
