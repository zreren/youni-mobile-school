import React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';
interface TCRating {
  children?: React.ReactNode;
  className?: string;
  score?: number | null | undefined;
}
export default function CRating(props: TCRating) {
  const { score } = props;
  const colorTable = (Score: number | undefined | null): string => {
    if (!Score || Score < 0) {
      return 'score5';
    }
    if (Score <= 2) {
      return 'score1';
    } else if (Score > 2 && Score <= 3) {
      return 'score2';
    } else if (Score > 3 && Score <= 4) {
      return 'score3';
    } else if (Score > 4 && Score <= 5) {
      return 'score4';
    } else {
      return 'score5';
    }
  };
  const commonStyle = 'w-16 h-14 flex flex-col justify-center items-center ';
  const classNames = classnames(commonStyle, styles[colorTable(score)]);
  const scoreClassName = classnames('font-semibold text-lg', [
    `text-${styles[colorTable(score)]}`,
  ]);
  const introduceClassName = classnames('font-semibold text-sm', [
    `text-${colorTable(score)}`,
  ]);
  return (
    <div className={classNames}>
      <div className={scoreClassName}>{score ? score : '-'}</div>
      <div className={introduceClassName}>教授评分</div>
    </div>
  );
}
