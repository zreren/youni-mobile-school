export type Section = {
    id: number;
    name: string;
    course: { id: number; ename: string; cname: string };
    mode: { id: number; ename: string; cname: string }[];
    students: { id: number; nickName: string; avatar: string }[];
};
export type CourseData = {
  id: number;
  name: string;
  sectionName: string;
  dayOfWeek: number;
  period: number;
  time: string;
  classroom: string;
  color: string;
  term: {
    id: number;
    name: string;
    year: string;
    startDate: string;
    endDate: string;
  };
  section:Section; 
  title: string;
  extendedProps: { section: string; department: string; online: boolean };
  start: string;
  end: string;
  description: string;
  type: number;
  borderColor: string;
  textColor: string;
  backgroundColor: string;
};
