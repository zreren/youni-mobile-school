import React from 'react';
import classnames from 'classnames';
import styles from './index.module.css';
import { useTranslation } from 'next-i18next';

interface TCRating {
  children?: React.ReactNode;
  className?: string;
  score?: number | null | undefined;
}
export default function CRating(props: TCRating) {
  const { score } = props;
  const {t} = useTranslation()

  const colorTable = (Score: number | undefined | null): string => {
    if (!Score || Score < 0) {
      return 'score5';
    }
    if (Score <= 2) {
      return 'score1';
    } if (Score > 2 && Score <= 3) {
      return 'score2';
    } if (Score > 3 && Score <= 4) {
      return 'score3';
    } if (Score > 4 && Score <= 5) {
      return 'score4';
    }
    return 'score5';
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
      <div className={scoreClassName}>{score || '-'}</div>
      <div className={introduceClassName}> {t('教授评分')}</div>
    </div>
  );
}
