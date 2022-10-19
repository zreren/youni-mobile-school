import React, { ReactNode, FC } from 'react';
import classnames from 'classnames'
import classNames from 'classnames';
type TSize = 'normal' |'full'
interface TCButton {
  children: React.ReactNode;
  className?: string;
  size:TSize
}
export const CButton: FC<TCButton> = (props: TCButton) => {
  const { children, className, size,...restProps } = props;
  // const classes = classNames('btn', className, {
  //     [`btn-${btnType}`]: btnType,
  //     [`btn-${size}`]: size,
  //     'disabled': (btnType === 'link') && disabled
  //   })
  const sizeTable = {
    'normal':'14',
    'full':'full',
  }
  const classNames = classnames('btn',className,{
     'text-gray-50':true,
      [`w-${sizeTable[size]}`]:true,
     'btn-primary':true,
    'max-h-7':true,
    [`rounded-3xl`]: true,
    'text-sm':true,
  })
  return (
    <div>
      <button
        className={classNames}
      >
        <span> {children}</span>
      </button>
    </div>
  );
};

export default CButton;
