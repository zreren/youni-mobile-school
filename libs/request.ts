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
  // headers:{
  //   "authorization":token
  // }
});
export default instance;
// global.request = instance;
// export default function useRequest() {
//   return instance.defaults;
// };
