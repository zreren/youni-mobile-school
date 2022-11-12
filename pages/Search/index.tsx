import React from 'react';
import CustomizedTabs from '@/components/Menu/Header-menu';
import Title from '@/components/Title/Title';
import DeleteIcon from './delete.svg';
import SearchIcon from './search.svg';
import { useRouter } from 'next/router';
const SearchTag = (props)=>{
  const {title} = props;
  return  (
    <div className='bg-bg m-1 text-xs font-light h-8 p-2'>
      {title}
    </div>
  )
}
export default function index() {
  const history = [
    'ADMS1000',
    'Natalie Guriel',
    'yorku',
    'Eli Bartner',
    'John Amanatides'
  ]
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
              placeholder="Type here"
              className="bg-bg hover:outline-none input border-none input-bordered w-full input-md"
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
        <Title title="搜索历史">
          <DeleteIcon></DeleteIcon>
        </Title>
        <div className='flex  flex-wrap w-7/10'>
          {history.map((item)=>{
            return (
              <SearchTag title={item}></SearchTag>
            )
          })}
        </div>
      </div>
    </div>
  );
}
