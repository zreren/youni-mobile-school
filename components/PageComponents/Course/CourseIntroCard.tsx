import React from 'react';

export default function CourseIntroCard(props) {
  const { content} = props;
  const [expand,setExpand] = React.useState(false)
  return (
    <div className="card rounded-lg w-full bg-base-100 ">
      <div className="card-body p-4">
        <p className='text-sm font-400 leading-5'>{expand?content:content?.slice(0,160)}{ content?.length >= 160?expand?null:'...':null}</p>
        {
          content.length >= 160?<div className="card-actions justify-end">
          <button onClick={()=>{setExpand(!expand)}} className="w-20 h-6 bg-yellow-100 text-yellow-400 rounded-full first-letter:
          text-sm
          ">{expand?'收起':'阅读全部'}</button>
        </div>:null
        } 
      </div>
    </div>
  );
}
