import React, { ReactNode, FC } from 'react';
import classnames from 'classnames';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

type TSize = 'normal' | 'full';
interface TCButton {
  // [x: string]: ReactNode;
  className?: string;
  size: TSize;
  type?: number;
  color?: string;
  onClick?: React.MouseEventHandler;
  children:ReactNode;
}
export const CButton: React.FunctionComponent<TCButton> = function (Props) {
  const {t} = useTranslation()

  const { className, size, type, color } = Props;
  // const classes = classNames('btn', className, {
  //     [`btn-${btnType}`]: btnType,
  //     [`btn-${size}`]: size,
  //     'disabled': (btnType === 'link') && disabled
  //   })
  const sizeTable = {
    normal: '14',
    full: 'full',
  };
  const getTypeColor = (type: number) => {
    switch (type) {
      case 1:
        return 'primary';
      case 2:
        return 'secondary';
      default:
        return 'primary';
    }
  };
  const classNames = classnames('btn btn-sm', className, {
    "text-gray-50": true,
    [`w-${sizeTable[size]}`]: true,
    "btn-primary": true,
    'h-8': true,
    [`rounded-3xl`]: true,
    'text-sm': true,
  });
  return (
    <div onClick={Props.onClick}>
      <button className={classNames}>
        <span> {Props.children}</span>
      </button>
    </div>
  );
};

export default CButton;
