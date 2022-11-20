import React  from 'react'
import classnames from 'classnames'
interface TProfessorCard  {
    isSelect:boolean;
}
const CButton2 = function(props) {
    const {isSelect} = props;
    const classNames = classnames('bg-white text-sm m-1 p-2 h-8 w-auto hover:bg-yellow-50  rounded-md',props.className
    )
  return (
    <div className={classNames} onClick={()=>{

    }}>
        {props.children}
    </div>
  )
}
export default CButton2;