import useSWR from "swr";
import axios from 'axios';
import useFetch from "./useFetch";

// import userFetcher from "../libs/api-user";

export default function useUser() {
  const { data, error } = useFetch('/account/info', 'get')
  const loading = !data?.data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data?data.data:null,
  };
}
