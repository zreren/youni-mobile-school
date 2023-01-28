import type { NextPage } from 'next';
import React from 'react';
import { Loading } from 'react-vant';
import { useDispatch, useSelector } from "react-redux";
import { Popup } from 'react-vant';
import useLocalStorage from '@/hooks/useStore';
import { selectAuthState, setAuthState } from "@/stores/authSlice";
import { useRouter } from 'next/router';
const Home: NextPage = () => {
  const dispatch = useDispatch();
  dispatch(setAuthState(true))
  const [school,setSchool] = useLocalStorage("school","York")
  const router = useRouter()
  enum TSize {
    normal,
    full,
  }
  React.useEffect(()=>{
    console.log(school)
    setSchool("York")
    router.push(`/${school}/home`)
  },[])
  return (
    <div className="flex flex-col p-4 space-y-8 bg-gray-50">
       <Popup
        overlayClass={'Popup'}
        className="z-30 topIndexPlus rounded-full "
        visible={true}
      >
        <div className="rounded-full w-10 h-10 flex overflow-hidden justify-center items-center">
          <Loading type="spinner" color="#FED64B" />
        </div>
      </Popup>
    </div>
  );
};
export const getStaticProps = async (context) => {
  console.log(context, 'context');
  return {
    props: {
      deals: [],
    },
  };
};
export default Home;
