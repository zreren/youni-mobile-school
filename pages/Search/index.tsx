import React, { useEffect, useState } from 'react';
import CustomizedTabs from '@/components/Menu/Header-menu';
import Title from '@/components/Title/Title';
import DeleteIcon from './delete.svg';
import SearchIcon from './search.svg';
import { useRouter } from 'next/router';
import { useLocalStorage } from 'react-use';
const SearchTag = (props)=>{
  const {title} = props;
  return  (
    <div className='bg-bg m-1 text-xs font-light h-8 p-2'>
      {title}
    </div>
  )
}
export default function index() {
  const [history,setHistory] = useLocalStorage('history',[])
  const [value,setValue] = React.useState('');
  const [historyList,setHistoryList] = useState<any []>();
  useEffect(()=>{
    setHistoryList(history)
  },[])
  useEffect(()=>{
    setHistoryList(history)
  },[history])
  // const history = [
  //   'ADMS1000',
  //   'Natalie Guriel',
  //   'yorku',
  //   'Eli Bartner',
  //   'John Amanatides'
  // ]
  const headerMenuList = [
    {
      label: '教授',
    },
    {
      label: '课程',
    },
    {
      label: '用户',
    },
  ];
  const router = useRouter();
  const beginSearch = (value)=>{
    if(value){
      setHistory([...history,value])
    }
  }
  return (
    <div className="w-screen h-screen">
      <div>
        <CustomizedTabs
          switchMenu={() => {}}
          headerMenuList={headerMenuList}
        ></CustomizedTabs>
      </div>
      <div className='w-full p-4 flex items-center space-x-4 rounded-xl'>
        <div className="form-control w-full rounded-xl">
          <label className="input-group input-group-md w-full rounded-xl bg-bg">
            <span className='bg-bg'><SearchIcon></SearchIcon></span>
            <input
              type="text"
              value={value}
              onBlur={()=>{beginSearch(value)}}
              onChange={(e)=>{setValue(e.target.value)}}
              placeholder="Type here"
              className="bg-bg hover:outline-none -ml-4 input border-none input-bordered w-full input-md"
            />
          </label>
        </div>
        <div className='whitespace-nowrap' onClick={()=>{
          router.back()
        }}>
          取消 
        </div>
      </div>
      <div className="w-full h-full pr-5 pl-5">
        {
          value.length > 1 ? null : <>
          <Title title="搜索历史">
          <DeleteIcon onClick={()=>{setHistory([])}}></DeleteIcon>
        </Title> 
        <div className='flex  flex-wrap w-7/10'>
        {historyList?.map((item)=>{
          return (
            <SearchTag title={item}></SearchTag>
          )
        })}
      </div></>
        }
        
      </div>
    </div>
  );
}
