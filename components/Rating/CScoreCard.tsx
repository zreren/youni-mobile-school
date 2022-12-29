import React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';

export default function CScoreCard(props) {
  const { color, type } = props;
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
            4.5
          </div>
          <div className={classnames('text-xs', textColorTable[color])}>
            教授综合评分
          </div>
        </div>
      );
    case 2:
      return (
        <div className="w-24 h-14">
          <div className="w-full text-blueTitle text-lg h-1.8/3 bg-gray-200 text-center rounded-t-lg font-medium">
            3.2
          </div>
          <div className="w-full h-1.2/3 bg-gray-100 text-center text-gray-400">
            内容评分
          </div>
        </div>
      );
  }
}
