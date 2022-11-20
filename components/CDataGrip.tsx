import React from 'react';
import CScoreCard from '@/components/Rating/CScoreCard';
import classnames from 'classnames';
import styles from './index.module.css';
const Card = (props) => {
  const { color ,score ,label} = props;
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
      <div className={classnames('text-2xl', textColorTable[color])}>{score}</div>
      <div className={classnames('text-xs', textColorTable[color])}>
        {label}
      </div>
    </div>
  );
};
export default function CDataGrip() {
  return (
    <div className='card rounded-lg w-full bg-base-100 '>
      <div className='card-body p-4'>
      <div className='flex space-x-2'>
        <Card label="平均成绩" score="4.5" color="origin"></Card>
        <Card label="教授综合评分"  score="72% B" color="lightOrigin"></Card>
      </div>
      <div className="flex justify-between mt-2">
        <CScoreCard type={2}></CScoreCard>
        <CScoreCard type={2}></CScoreCard>
        <CScoreCard type={2}></CScoreCard>
      </div>
      </div>
    </div>
  );
}
