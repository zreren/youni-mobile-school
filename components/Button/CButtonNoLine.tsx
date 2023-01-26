import React from 'react'

export default function CButtonNoLine(props) {
  const { onClick } = props
  return (
    <button onClick={()=>{onClick()}} className="btn btn-outline btn-warning rounded-full btn-xs w-16">换一批</button>
  )
}
