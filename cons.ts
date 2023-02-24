// declare module '@bedrock-layout/masonry-grid'
const globalAny: any = global;

globalAny.Cons = {
  // BASEURL: 'https://youni-admin.kuizuo.cn',
  BASEURL: process.env.BASEURL,
  LANGUAGE:
    typeof window !== 'undefined'
      ? localStorage.getItem('language')?.replace('"', '')?.replace('"', '')
      : null,
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
      DELETE: '/curriculum/delete',
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
  TOKEN:
    'pk.eyJ1IjoieW91bmljbHViIiwiYSI6ImNsY2M5ZHVydDNqdTAzeGxrazJuNzhzbWoifQ.wWLnf7hdCNENhcFEuY3vPw',
};

export {};
