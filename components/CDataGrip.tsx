import React from 'react';
import CScoreCard from '@/components/Rating/CScoreCard';
import classnames from 'classnames';
import styles from './index.module.css';
const Card = (props) => {
  const { color, score, label } = props;
  const colorStyle = [`${styles['Cbg-' + color]}`];
  const classNames = classnames(
    'w-full bg-blue-500 bg-opacity-50 rounded-lg h-20 flex flex-col items-center justify-center',
    colorStyle,
  );
  const textColorTable = {
    origin: styles.lightOrigin,
    lightOrigin: styles.origin,
  };
  return (
    <div className={classNames}>
      <div className={classnames('text-2xl', textColorTable[color])}>
        {score?score:'0.0'}
      </div>
      <div className={classnames('text-xs', textColorTable[color])}>
        {label?label:'default'}
      </div>
    </div>
  );
};
export default function CDataGrip(props) {
  const {data} = props
  return (
    <div className="card rounded-lg w-full bg-base-100 ">
      <div className="card-body p-4">
        <div className="flex space-x-2">
          <Card label="课程综合评分" score={data?.overallRatting || 0} color="origin"></Card>
          <Card label="平均成绩" score={`${data?.courseAverage?.score || 0}% ${data.courseAverage?.level || 0}`} color="lightOrigin"></Card>
        </div>
        <div className="flex justify-between mt-2">
          <CScoreCard type={2} title="内容评分" score={data?.contentRating}></CScoreCard>
          <CScoreCard type={2} title="作业评分" score={data?.homeworkRating}></CScoreCard>
          <CScoreCard type={2} title="考试评分" score={data?.examRating}></CScoreCard>
        </div>
      </div>
    </div>
  );
}
