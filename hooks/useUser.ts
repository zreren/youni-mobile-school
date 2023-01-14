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
  if(token){
    const { data, error } = useFetch('/profile', 'get')
    const loading = !data?.data && !error;
    const loggedOut = error || data?.code === 1102 || !data?.data;
    console.log(data,'fetch user data')
    console.log(loggedOut,"loggedOut")
    if(loggedOut){
      router.push("/Login/signin")
    }
    return {
      loading,
      loggedOut,
      user: data?data.data:null,
    };
  }else{
    useEffect(()=>{
      router.push("/Login/signin")
    },[])
  }
  return  {
    loading:false,
    loggedOut:true,
    user: null,
  }
}


