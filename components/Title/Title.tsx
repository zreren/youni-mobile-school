import React from 'react';
import classnames from 'classnames';
export default function Title(props) {
  const { children,title ,className} = props;
  return (
    <div className={classnames("flex items-center justify-between mb-3 mt-3",className)}>
      <div className='text-lg  text-blueTitle font-medium'>{title}</div>
      <div onClick={(e)=>{
        e.preventDefault()
        props.customClick()
      }}>{children?children:<div></div>}</div>
    </div>
  );
}
