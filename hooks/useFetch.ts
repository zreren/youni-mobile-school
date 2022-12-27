import axios from 'axios';
import useSWR from 'swr';
import config from '../public/config.json';

export const API = Object.freeze({
    BASE_URL: config.api.baseUrl,
    STUDENT: {
      PATH: '/student',
      COURSES: '/courses',
      GRADES: '/grades',
    },
    SUBJECT:{
      QUERY: '/subject/list',
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
  
function useFetch(path, method, body?) {
    const { data, error } = useSWR(`${API.BASE_URL}${path}`, url => {
      return axios({
        method,
        url,
        data: body,
        headers:{
          "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInB2IjoxLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzIxMTExNzF9.bicnKWVEOJ_OfOsLXRb0dmjMowQxzdmC_oUiTwZ20Qg",
        }
      })
        .then(response => response.data)
    })
  
    return { data, error }
}

export default useFetch;