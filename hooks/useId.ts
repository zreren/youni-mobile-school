import useRequest from '@/libs/request';
const getCampusId = (campus: string) => {
    if(typeof window === 'undefined') return;
    if(!campus) return;
    // if(instanceof(campus) === String[]) return
    const campusId = localStorage.getItem(campus.toLowerCase());
    if(campusId) return campusId;
    useRequest.get(`/api/campus/query`,{
        params:{
          name:campus.toLowerCase()
        }
      }).then((res)=>{
        return res?.data?.id
      });
}
export default getCampusId;