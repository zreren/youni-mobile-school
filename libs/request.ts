import axios from 'axios';
import useLocalStorage from '@/hooks/useStore';
const Cons = {
  BASEURL: 'https://youni-admin.kuizuo.cn',
  API: {
    STUDENT: {
      PATH: '/student',
      COURSES: '/courses',
      GRADES: '/grades',
    },
    SUBJECT: {
      QUERY: '/subject/list',
    },
    COURSE: {
      PATH: '/course',
      STUDENTS: '/students',
      DETAIL: '/course/detail',
      GRADES: '/grades',
      HOT: '/course/hot',
      List: '/course/list',
    },
    EVALUATION: {
      LIST: '/evaluation/list',
    },
    PROFESSOR: {
      QUERY: '/course/professor',
      DETAIL: '/professor/detail',
      EVALUATION: '/professor/evaluation',
    },
    CURRICULUM: {
      QUERY: '/curriculum/query',
      DETAIL: '/curriculum/detail',
      DELETE:"/curriculum/delete",
      CREATE: '/curriculum/create',
      UPDATE: '/curriculum/update',
    },
    COMMENT: {
      QUERY: '/comment/list',
      CREATE: '/comment/create',
      UPDATE: '/comment/update',
      DETAIL: '/comment/detail',
      DELETE: '/comment/delete',
    },
  },
};

// const token = localStorage.getItem('token')
// const [token, setToken] = useLocalStorage('token', null);
const instance = axios.create({
  baseURL: Cons.BASEURL,
  timeout: 1000,
  headers:{
    "authorization":typeof window !== 'undefined'?localStorage.getItem('token')?.replace("\"","").replace("\"",""):null
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
