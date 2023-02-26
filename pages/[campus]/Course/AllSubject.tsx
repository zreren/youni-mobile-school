import React, { useEffect, useMemo, useState } from 'react';
import CommonLayout from '@/components/Layout/CommonLayout';
import Header from '@/components/Header';
import CategoryButton from '@/components/Button/CategoryButton';
import useFetch from '@/hooks/useFetch';
import SearchIcon from './search.svg';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { InfiniteScroll, List } from 'antd-mobile';
export default function AllSubject() {
  const [value, setValue] = React.useState('');
  const router = useRouter();
  const { data, error, size, mutate, setSize, isLoading } = useFetch(
    '/subject/list',
    'page',
    {
      keyword: value,
      campusId: router.query.campusId,
      pageSize: 20,
    },
  );
  const [isLoadingMoreState, setIsLoadingMore] = useState(false);
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 20);
  const issues = useMemo(() => {
    return data
      ? issues
        ? [...issues].concat(...data)
        : [].concat(...data).filter((item) => item !== null)
      : null;
  }, [data, size, isLoading]);
  useEffect(() => {
    console.log(data, issues, 'AllSubjectdata');
  }, [issues]);
  useEffect(() => {
    mutate();
  }, [router.query.campusId]);
  const randomColor = ['red', 'blue', 'yellow', 'green', 'pink', 'purple'];
  const debounceSearch = debounce((value) => {
    mutate();
  }, 500);
  const handleChange = (e) => {
    setValue(e.target.value);
    debounceSearch(value);
  };
  return (
    <CommonLayout className="pb-16">
      <Header title="课程评价"></Header>
      <div className="space-y-2 mt-4">
        <div className="form-control w-full rounded-xl bg-white mb-4">
          <label className="input-group input-group-md w-full rounded-xl bg-white">
            <span className="bg-white">
              <SearchIcon></SearchIcon>
            </span>
            <input
              type="text"
              value={value}
              onBlur={() => {
                if (!value || value === '') return;
              }}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="搜索学科"
              className="bg-white hover:outline-none -ml-4 input border-none input-bordered w-full input-md"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 min-h-screen">
          {issues?.map((item, index) => {
            return (
              <CategoryButton
                data={item}
                key={item?.id}
                color={randomColor[index % 6]}
              ></CategoryButton>
            );
          })}
        </div>
        <div
            onClick={() => {
              return new Promise<void>((resolve, reject) => {
                setSize((pre) => {
                  return pre + 1;
                });
                resolve();
              });
            }}
            className="relative w-full flex justify-center bottom-0"
          >
            {isLoading ? null : (
              <InfiniteScroll
                threshold={50}
                loadMore={async () => {
                  if (isLoadingMoreState) {
                    return;
                  }
                  setIsLoadingMore(true);
                  await setSize(size + 1);
                  setIsLoadingMore(false);
                }}
                hasMore={!isReachingEnd && !isLoading}
              />
            )}
          </div>
      </div>
    </CommonLayout>
  );
}
