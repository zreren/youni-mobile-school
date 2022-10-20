import React from 'react';

export default function CommonLayout(props) {
  const { children } = props;
  return <div className="bg-bg min-h-screen p-4">{children}</div>;
}
