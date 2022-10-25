import React from 'react';
import CScoreCard from '@/components/Rating/CScoreCard';
import classnames from 'classnames';
import styles from './index.module.css';
const Card = (props) => {
  const { color } = props;
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
      <div className={classnames('text-xl', textColorTable[color])}>4.5</div>
      <div className={classnames('text-xs', textColorTable[color])}>
        教授综合评分
      </div>
    </div>
  );
};
export default function CDataGrip() {
  return (
    <div>
      <div className='flex space-x-2'>
        <Card color="origin"></Card>
        <Card color="lightOrigin"></Card>
      </div>
      <div className="flex justify-between mt-4">
        <CScoreCard type={2}></CScoreCard>
        <CScoreCard type={2}></CScoreCard>
        <CScoreCard type={2}></CScoreCard>
      </div>
    </div>
  );
}
