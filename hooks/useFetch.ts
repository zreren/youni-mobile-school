import axios from 'axios';
import useSWR from 'swr';
import config from '../public/config.json';

const API = Object.freeze({
    BASE_URL: config.api.baseUrl,
    STUDENT: {
      PATH: '/student',
      COURSES: '/courses',
      GRADES: '/grades',
    },
    COURSE: {
      PATH: '/course',
      STUDENTS: '/students',
      GRADES: '/grades',
    },
    PROFESSOR:{
        QUERY: '/professor/list',
        DETAIL: '/professor/detail',
        EVALUATION: '/professor/evaluation',
    },
    CURRICULUM: {
        QUERY: '/curriculum/query',
        DETAIL: '/curriculum/detail',
        CEATE:'/curriculum/create',
        UPDATE:"/curriculum/update"
    },
    COMMENT:{
        QUERY:'/comment/list',
        CREATE:'/comment/create',
        UPDATE:'/comment/update',
        DETAIL:'/comment/detail',
        DELETE:'/comment/delete',
    }
})
  
function useFetch(path, method, body) {
    const { data, error } = useSWR(`${API.BASE_URL}${path}`, url => {
      return axios({
        method,
        url,
        data: body,
      })
        .then(response => response.data)
    })
  
    return { data, error }
}

export default useFetch;