import axios from 'axios';
import useLocalStorage from '@/hooks/useStore';
import {
  selectLoginModelState,
  seLoginModelState,
  selectOpen,
} from '@/stores/authSlice';
import { useDispatch } from 'react-redux';
import { Dialog } from 'react-vant';
import { useTranslation } from 'react-i18next';
import { setOpenLogin } from '../stores/authSlice';

(()=>{
 
  
})()
// const dispatch = useDispatch();
// const { t } = useTranslation();
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
    // if(response.data.code === 1102){
    //   Dialog.confirm({
    //     title: t('登录'),
    //     confirmButtonText: t('确定'),
    //     cancelButtonText: t('取消'),
    //     message: t(
    //       '登录YoUni，自由添加课表、一键导入学校课程、一键分享给朋友！',
    //     ),
    //   })
    //     .then((res) => {
    //       dispatch(setOpenLogin('login'));
    //       // router.push("/Login/signin");
    //       // console.log(res,"登录YoUni");
    //     })
    //     .catch((err) => {
    //       //  dispatch(setOpenLogin('register'))
    //     });
    // }
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
