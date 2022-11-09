import React from 'react';

export default function CourseIntroCard() {
  return (
    <div className="card rounded-lg w-full bg-base-100 ">
      <div className="card-body p-4">
        <p className='text-sm font-400 leading-5'>Provides an overview of the context within which modern organizations operate. The course will examine the development of organizational and managerial theories. A ...</p>
        <div className="card-actions justify-end">
          <button className="w-20 h-6 bg-yellow-100 text-yellow-400 rounded-full first-letter:
          text-sm
          ">阅读全部</button>
        </div>
      </div>
    </div>
  );
}
