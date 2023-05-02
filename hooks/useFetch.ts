import axios from 'axios';
import useSWR from 'swr';
import config from '../public/config.json';
import useLocalStorage from '@/hooks/useStore';
import { useRouter } from 'next/router';
import useSWRInfinite from 'swr/infinite';

import instance from '@/libs/request';
export const API = Object.freeze({
  BASE_URL: `${process.env.BASEURL}/api`,
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
  if (method !== 'get') {
    const { data, mutate, size, setSize,isValidating } = useSWRInfinite(
      (index) => path?`${'https://youni-admin.kuizuo.cn/api'}${path}?page=${index + 1}`:null,
      (url) => {
        return instance({
          method: 'get',
          url,
          // data: method !== 'get' ? body : null,
          params: body,
          headers: {
            Authorization: token,
            'Accept-Language': 'zh',
          },
        })
          .then((response) => {
            console.log(response, 'response');
            const data = {
              data: {
                data: response.data.data.items,
              },
            };
            return response.data.data.items;
          })
          .catch((error) => {
            // router.push('/Login/signin');
            // console.log(error, 'error SWR');
          });
      },
    );
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
      isEmpty || (data && data[data.length - 1]?.length < body?.pageSize);
    const isLoading = !data && isValidating;
    // const isLoadingMore =
    // const hasMore = size === data?.data.meta?.totalPages
    return { data, mutate,isLoading, size, setSize }
  }

  const { data, error, mutate } = useSWR(
    path?`${'https://youni-admin.kuizuo.cn/api'}${path}`:null,
    (url) => {
      return instance({
        method,
        url,
        data: method !== 'get' ? body : null,
        params: method === 'get' || method === 'Get' ? body : null,
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
    },
  );
  return { data, error, mutate };
}

export default useFetch;
