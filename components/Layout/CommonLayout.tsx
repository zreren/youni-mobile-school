import React from 'react';
import LabelBottomNavigation from '../Menu/Buttom-menu';
import classnames from 'classnames';
export default function CommonLayout(props) {
  const { children, isBottom,className } = props;
  return (
    <div
      className={classnames('bg-bg min-h-screen p-4 ', { 'pb-20': isBottom },className)}
    >
      {children}
      {/* <div style={!isBottom?{display: 'none'}:{display: 'block'}}>
        <LabelBottomNavigation></LabelBottomNavigation>
      </div> */}
    </div>
  );
}
