import React from 'react';

export default function Title(props) {
  const { children,title } = props;
  return (
    <div className="flex justify-between mb-3 mt-3">
      <div className='text-lg  text-blueTitle font-medium'>{title}</div>
      <div>{children?children:<div></div>}</div>
    </div>
  );
}
