import React from 'react';
import EmptyCourseIcon from './emptyCourse.svg';
import useLanguage from '@/hooks/useLanguage';
import { useTranslation } from 'next-i18next';

export default function CourseIntroCard(props) {
  const { content } = props;
  const [expand, setExpand] = React.useState(false);
  console.log(content,"content")
  const EmptyCourse = () => {
    return (
      <div className="flex w-full bg-white flex-col justify-center items-center py-8  h-[100vh-300px]  rounded-lg">
        <EmptyCourseIcon></EmptyCourseIcon>
        <div className="flex text-xs mt-6 justify-center items-center text-[#A9B0C0]">
          <span>
            {useLanguage('') === 'e' ? '目前还没有简介' : '目前还没有简介'}
          </span>
        </div>
      </div>
    );
  };
  const { t } = useTranslation();
  return (
    <div className="card rounded-lg w-full bg-base-100 ">
      <div className="card-body p-4">
        <p className="text-sm font-400 leading-5">
          {expand ? content : content?.slice(0, 160)}
          {content?.length >= 160 ? (expand ? null : '...') : null}
        </p>
        {content?.length >= 160 ? (
          <div className="card-actions justify-end">
            <button
              onClick={() => {
                setExpand(!expand);
              }}
              className="w-20 h-6 bg-yellow-100 text-yellow-400 rounded-full first-letter:
          text-sm
          "
            >
              {expand ? t('收起') : t('阅读全部')}{' '}
            </button>
          </div>
        ) : null}
        { !content?.length ? <EmptyCourse></EmptyCourse> : null}
      </div>
    </div>
  );
}
