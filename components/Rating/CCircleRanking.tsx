import React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';

interface TCCRating {
  children?: React.ReactNode;
  className?: string;
  score?: number | null | undefined;
}
export default function CCircleRanking(props: TCCRating) {
  const { score } = props;
  const colorTable = (Score: number | undefined | null): string => {
    if (!Score || Score < 0) {
      return 'score5';
    }
    if (Score <= 2) {
      return 'text-score1';
    } else if (Score > 2 && Score <= 3) {
      return 'text-score2';
    } else if (Score > 3 && Score <= 4) {
      return 'text-score3';
    } else if (Score > 4 && Score <= 5) {
      return 'text-score4';
    } else {
      return 'text-score5';
    }
  };
  const classNames1 = classnames('radial-progress bg-transparent', [
    `${styles[colorTable(score)]}`,
  ]);
  const textClassNames = classnames('font-bold bg-transparent text-opacity-100', [
    `${styles[`DScore${String(score).substring(0,1)}`]}`,
  ]);
  const text2ClassNames = classnames('text-xs ', [
    `${styles[`DScore${String(score).substring(0,1)}`]}`,
  ]);
  return (
    <>
      <div className={classNames1} style={{ '--value': score * 20 }}>
        <div className="w-full flex flex-col justify-center items-center">
          <div className={textClassNames}>{score}</div>
          <div className={text2ClassNames}>综合评分</div>
        </div>
      </div>
    </>
  );
}
