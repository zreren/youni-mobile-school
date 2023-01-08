// declare module '@bedrock-layout/masonry-grid'
const globalAny: any = global;

globalAny.Cons = {
  BASEURL: 'https://youni-admin.kuizuo.cn',
  API: {
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
      DETAIL: '/course/detail',
      GRADES: '/grades',
      HOT: '/course/hot',
      List: '/course/list',
    },
    EVALUATION: {
      LIST: '/evaluation/list',
    },
    PROFESSOR: {
      QUERY: '/course/professor',
      DETAIL: '/professor/detail',
      EVALUATION: '/professor/evaluation',
    },
    CURRICULUM: {
      QUERY: '/curriculum/query',
      DETAIL: '/curriculum/detail',
      DELETE:"/curriculum/delete",
      CREATE: '/curriculum/create',
      UPDATE: '/curriculum/update',
    },
    COMMENT: {
      QUERY: '/comment/list',
      CREATE: '/comment/create',
      UPDATE: '/comment/update',
      DETAIL: '/comment/detail',
      DELETE: '/comment/delete',
    },
  },
};

export {};
