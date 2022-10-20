import React from 'react';

export default function Search(props) {
  const { placeholder } = props;
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder={placeholder ? placeholder : 'Search'}
        className="input w-full"
      />
    </div>
  );
}
