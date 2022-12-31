function getWeekNum(startTime: Date, endTime: Date,time?: Date): number {
    // 获取当前时间
    const now = time || new Date();
    // 判断当前时间是否在学期时间内
    if (now < startTime || now > endTime) {
        return 0;
    }
    // 计算时间差
    const timeDiff = now.getTime() - startTime.getTime();
    // 计算周数
    const weekNum = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
    return weekNum;
}
interface Term {
    id: number;
    name: string;
    year: string;
    startDate: string;
    endDate: string;
}

interface CourseType {
    id: number;
    ename: string;
    cname: string;
}

interface Course {
    id: number;
    ename: string;
    cname: string;
    type: CourseType;
}

interface Student {
    id: number;
    nickName: string;
    avatar: string;
}

interface Section {
    id: number;
    name: string;
    course: Course;
    students: Student[];
}

interface ClassSchedule {
    id: number;
    name: string;
    dayOfWeek: number;
    period: number;
    time: string;
    classroom: string;
    color: string;
    term: Term;
    section: Section;
}
function getPastWeekDates(): [Date, Date] {
    const today = new Date();
    const startDate = new Date();
    const dayOfWeek = startDate.getDay();
    startDate.setDate(today.getDate() - dayOfWeek - 6);
    const endDate = new Date();
    endDate.setDate(today.getDate() - dayOfWeek);
    return [startDate, endDate];
}
function getCourses(coursesData: ClassSchedule[], startTime: Date,endTime:Date): any[] {
    // 获取当前周数
    const weekNum = getWeekNum(startTime, endTime);
    // 计算最近一周的周数
    const recentWeekNum = weekNum % 2 === 0 ? weekNum - 1 : weekNum;
    // 过滤出最近一周的课程
    const recentCourses = coursesData?.filter(courseData => {
       if (courseData.period === 0) return true;
       return courseData.period === recentWeekNum % 2 + 1;
    });
    return recentCourses;
}
function convertISODateString(isoDateString: string): string {
    const date = new Date(isoDateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}
function darkenHexColor(hexColor: string, amount: number): string {
    // Convert the hex color string to a number
    let color = parseInt(hexColor.slice(1), 16);

    // Get the red, green, and blue components of the color
    let r = (color >> 16) & 0xff;
    let g = (color >> 8) & 0xff;
    let b = color & 0xff;

    // Decrease the values of the components by the specified amount
    r -= amount;
    g -= amount;
    b -= amount;

    // Make sure the values are in the range 0-255
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Convert the modified color back to a hex string
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function convertHexColor(colorHex: string): string {
    return "#" + colorHex[1] + "72" + colorHex[5] + colorHex[6];
}
function getOtherColor(color: string): string {
    // 首先将颜色值转换为数字
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);

    // 然后将每个数字取反
    const rPrime = r / 1.39;
    const gPrime = g / 2;
    const bPrime = b / 1.0583333333;

    // 最后将数字转换回十六进制颜色值
    return `rgb(${rPrime},${gPrime},${bPrime})`;

}

function addFullStartDate(array: any[], pastWeekDates: [Date, Date]) {
    for (const item of array) {
        const startTimeRange = item.time;
        const dayOfWeek = item.dayOfWeek;
        const startTime = startTimeRange.split("-")[0];
        console.log(startTime.split(".")[0],"startTime")
        const endTime = startTimeRange.split("-")[1];

        const startDate = new Date(pastWeekDates[0]);
        startDate.setDate(startDate.getDate() + dayOfWeek );
        startDate.setHours(startTime.split(".")[0],startTime.split(".")[1]);
        // startDate.setMinutes(startTime.split(":")[1]);
        const endDate = new Date(pastWeekDates[0]);
        endDate.setDate(endDate.getDate() + dayOfWeek );
        endDate.setHours(endTime.split(".")[0],endTime.split(".")[1]);
        // endDate.setMinutes(endTime.split(":")[1])
        item.title = item.name
        item.extendedProps = {
            section:"",
            department:"",
            online:true
        }
        item.extendedProps.section = item.section.name
        item.start = convertISODateString(startDate.toString());
        item.end = convertISODateString(endDate.toString());
        item.description= 'Lecture';
        item.type = 0;
        item.borderColor = getOtherColor(item.color)
        item.textColor = getOtherColor(item.color)
        // delete item.color
    }
}
export {getCourses,getWeekNum,addFullStartDate}
