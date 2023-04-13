import useSWR from "swr";
import axios from 'axios';
import useFetch from "./useFetch";
import useLocalStorage from '@/hooks/useStore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


// import userFetcher from "../libs/api-user";

export default function useUser() {
  const [token, setToken] = useLocalStorage('token', null);
  const router = useRouter()

  if(router.query.campus){
    const { data, error,mutate } = useFetch('/campus/info', 'get',{
        alias:router.query.campus
    })
    const loading = !data?.data && !error;
    return {
      loading,
      campus: data?data.data:null,
      mutate:mutate
    };
  }
  return  {
    loading:false,
    loggedOut:true,
    user: null,
  }
}


