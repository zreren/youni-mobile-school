import React from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CategoryButton from '@/components/Button/CategoryButton';
import useFetch from '@/hooks/useFetch';

export default function AllSubject() {
  const { data, error } = useFetch('/subject/list?campusId=1',"get");
  const randomColor = ['red', 'blue', 'yellow', 'green', 'pink', 'purple']

  return (
    <CommonLayout className="pb-16">
        <Header title="课程评价"></Header>
        <div className="space-y-2 mt-4">
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
