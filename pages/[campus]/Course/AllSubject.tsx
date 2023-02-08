import React from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CategoryButton from '@/components/Button/CategoryButton';
import useFetch from '@/hooks/useFetch';
import SearchIcon from './search.svg';
import { debounce } from "lodash";

export default function AllSubject() {
  const [value,setValue] = React.useState('');
  const { data, error,mutate } = useFetch('/subject/list?campusId=1',"get",{
    name: value
  });
  const randomColor = ['red', 'blue', 'yellow', 'green', 'pink', 'purple']
  const debounceSearch = debounce((value)=>{
    mutate()
  },500)
  const handleChange = (e)=>{
    setValue(e.target.value)
    debounceSearch(value)
  }
  return (
    <CommonLayout className="pb-16">
        <Header title="课程评价"></Header>
        <div className="space-y-2 mt-4">
        <div className="form-control w-full rounded-xl bg-white mb-4">
          <label className="input-group input-group-md w-full rounded-xl bg-white">
            <span className='bg-white'><SearchIcon></SearchIcon></span>
            <input
              type="text"
              value={value}
              onBlur={()=>{
              if(!value || value==='') return

              }}
              onChange={(e)=>{handleChange(e)}}
              placeholder="搜索学科"
              className="bg-white hover:outline-none -ml-4 input border-none input-bordered w-full input-md"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          {
            data?.data?.map((item,index) => {
              return (
                <CategoryButton data={item} key={item.id} color={randomColor[index%6]}>
                </CategoryButton>
              )
            })
          }
        </div>
      </div>
    </CommonLayout>
  )
}
