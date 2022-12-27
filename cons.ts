// declare module '@bedrock-layout/masonry-grid'
const globalAny: any = global;

globalAny.Cons = {
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
          HOT:"/course/hot"
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