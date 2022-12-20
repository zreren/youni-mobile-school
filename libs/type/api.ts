type Comment = {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
    children: Comment[];
    parent: Comment | null;
    evaluation: Evaluation;
    student: Student;
    deletedAt: string;
};

type Evaluation = {
    id: number;
    createdAt: string;
    updatedAt: string;
    content: string;
    professorEvaluation: number;
    contentRating: number;
    homeworkRating: number;
    examRating: number;
    status: number;
    course: Course;
    professor: Professor;
    student: Student;
    comments: Comment[];
    deletedAt: string;
  };
  
  type Student = {
    id: number;
    createdAt: string;
    updatedAt: string;
    wxAccount: string;
    googleAccount: string;
    name: string;
    email: string;
    gender: string;
    college: string;
    major: string;
    grade: string;
    birthDate: string;
    avatar: string;
    avatarUrl: string;
    evaluations: Evaluation[];
    comments: Comment[];
    likes: Like[];
    followers: Student[];
    following: Student[];
    deletedAt: string;
};
type Like = {
    likeNum: number;
    buryNum: number;
    type: number;
    itemId: number;
  };
type Section = {
    name: string;
    startTime: Date;
    endTime: Date;
    course: Course;
    professors: Professor[];
    students: Student[];
  };
type Course = {
    id: number;
    createdAt: string;
    updatedAt: string;
    code: string;
    ename: string;
    cname: string;
    desc: string;
    status: number;
    type: CourseType;
}
type CourseType = {
    id: number;
    createdAt: string;
    updatedAt: string;
    ename: string;
    cname: string;
    desc: string;
    courses: Course[];
    campus: Campus;
}

type Campus ={
    id: number;
    createdAt: string;
    updatedAt: string;
    ename: string;
    cname: string;
    shortName: string;
    config: CampusConfig;
    deptId: number;
    buildings: CampusBuilding[];
    // terms: CampusTerm[];
    subjects: Subject[];
    courses: Course[];
    professors: Professor[];
    students: Student[];
}
type Subject = {
    shortName: string;
    ename: string;
    cname: string;
    campus: Campus;
    students: Student[];
    courses: Course[];
};
  
type ProfessorTag = {
    name: string;
    professors: Professor[];
};
type Professor = {
    name: string;
    avatar: string;
    tags: ProfessorTag[];
    sections: Section[];
    evaluations: Evaluation[];
    campus: Campus;
  };
  
type CampusBuilding = {
    ename: string;
    cname: string;
    shortName: string;
    address: string;
    type: BuildingType;
    campus: Campus;
};
type BuildingType = {
    name: string;
    buildings: CampusBuilding[];
  };
type CampusConfig = {
    emailSuffix: string;
    linkSuffix: string;
    address: string;
    evaluationStatus: number;
    campus: Campus;
  };
export type { Comment, Evaluation, Student };