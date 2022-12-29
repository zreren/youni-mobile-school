// declare module '@bedrock-layout/masonry-grid'
const globalAny: any = global;

globalAny.Cons = {
    BASEURL: 'http://47.100.68.42:5001',
    API : {
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
          HOT:"/course/hot",
          List:"/evaluation/list"
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
    }
}

export { }