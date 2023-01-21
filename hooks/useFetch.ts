import axios from 'axios';
import useSWR from 'swr';
import config from '../public/config.json';
import useLocalStorage from '@/hooks/useStore';
import { useRouter } from 'next/router';
import instance from '@/libs/request';
export const API = Object.freeze({
  BASE_URL: config.api.baseUrl,
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
    GRADES: '/grades',
  },
  PROFESSOR: {
    QUERY: '/professor/list',
    DETAIL: '/professor/detail',
    EVALUATION: '/professor/evaluation',
  },
  CURRICULUM: {
    QUERY: '/curriculum/query',
    DETAIL: '/curriculum/detail',
    CEATE: '/curriculum/create',
    UPDATE: '/curriculum/update',
  },
  COMMENT: {
    QUERY: '/comment/list',
    CREATE: '/comment/create',
    UPDATE: '/comment/update',
    DETAIL: '/comment/detail',
    DELETE: '/comment/delete',
  },
});

function useFetch(path, method, body?) {
  const [token, setToken] = useLocalStorage('token', null);
  const router = useRouter();
  interface IData {
    data: unknown;
    code: number;
    message: string;
  }
  const { data, error,mutate  } = useSWR(`${API.BASE_URL}${path}`, (url) => {
    return instance({
      method,
      url,
      data: body,
      headers: {
        Authorization: token,
        'Accept-Language': 'zh',
      },
    })
      .then((response) => {
        // console.log(response, 'response');
        return response.data;
      })
      .catch((error) => {
        // router.push('/Login/signin');
        // console.log(error, 'error SWR');
      });
  });
  // @ts-ignore
  console.log(data, 'code');
  if (data?.code === 1102 || data?.code === 1101) {
    // if (!token) {
    //   // router.push('/Login/signin');
    //   // setToken();
    //   router.push('/Login/signin');
    // }
  }
  return { data, error ,mutate};
}

export default useFetch;
