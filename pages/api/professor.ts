import axios from "axios";
import useSWR from "swr";
import { API_KEY } from "./api";
const fetcher = url => axios.get(url).then(res => res.data)


const getProfessorList = async ()=>{
    return await useSWR(API_KEY.USER.get.list,fetcher)
}

export default getProfessorList