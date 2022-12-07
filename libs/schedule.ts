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

function getCourses(coursesData: {name: string, period: number}[], startTime: Date,endTime:Date): any[] {
    // 获取当前周数
    const weekNum = getWeekNum(startTime, endTime);
    // 计算最近一周的周数
    const recentWeekNum = weekNum % 2 === 0 ? weekNum - 1 : weekNum;
    // 过滤出最近一周的课程
    const recentCourses = coursesData.filter(courseData => {
       if (courseData.period === 0) return true; 
       return courseData.period === recentWeekNum % 2 + 1;
    });
    return recentCourses;
}

export {getCourses,getWeekNum}