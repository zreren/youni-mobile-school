import React from 'react';

export default function EvaluationTags(props) {
  const { content } = props;
  return (
    <div
      className="bg-gray-50
  h-6
  text-xs
  text-gray-500 p-1 m-1 w-auto whitespace-nowrap"
    >
      {content}
    </div>
  );
}
