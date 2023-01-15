import React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';

export default function CScoreCard(props) {
  const { color, type, title, score } = props;
  const colorStyle = [`${styles[`light-${color}`]}`];
  const classNames = classnames(
    'w-full bg-blue-500 bg-opacity-50 rounded-lg h-20 flex flex-col items-center justify-center',
    colorStyle,
  );
  const textColorTable = {
    blue: styles.DScore4,
    purple: styles.DScore2,
  };
  switch (type) {
    case 1:
      return (
        <div className={classNames}>
          <div className={classnames('text-xl', textColorTable[color])}>
            {score||4.5}
          </div>
          <div className={classnames('text-xs', textColorTable[color])}>
            {title || '教授综合评分'}
          </div>
        </div>
      );
    case 2:
      return (
        <div className="w-24 h-14">
          <div className="w-full text-blueTitle text-lg h-1.8/3 bg-gray-200 text-center rounded-t-lg font-medium">
            {score  ||'4.5'}
          </div>
          <div className="w-full text-xs  h-6 bg-gray-100 flex justify-center items-center text-gray-400">
            {title || 'default'}
          </div>
        </div>
      );
    default:
      return <div>none</div>;
  }
}
