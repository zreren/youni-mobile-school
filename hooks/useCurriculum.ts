import useSWR from 'swr';
import axios from 'axios';
import useFetch from './useFetch';
import useLocalStorage from '@/hooks/useStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// import userFetcher from "../libs/api-user";

export default function useCurriculum() {
  //   const [token, setToken] = useLocalStorage('token', null);
  const router = useRouter();
  //   if(token){
  const { data, error, mutate } = useFetch('/curriculum/query', 'get',{
    termId:1
  });
  if(!data?.data){
    return {
        defaultCurriculum: {
            id: null,
        },
        mutate: mutate,
    }
  }
  return {
    defaultCurriculum: data ? data?.data[0] : null,
    mutate: mutate,
  };
  //   }
}
