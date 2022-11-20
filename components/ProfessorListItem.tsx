import React,{FC} from 'react';
import CRating from './Rating/CRating';
interface TProfessorCard  {
  data: {
    avatar: string;
    name: string;
    score: number;
  };
  onClick?: React.MouseEventHandler
}
const ProfessorCard:React.FunctionComponent<TProfessorCard>=(props)=> {
  const { data } = props;
  return (
    <div onClick={props.onClick} className="w-4/4 bg-white flex justify-between shadow-sm rounded items-center overflow-hidden	">
      <div className="flex items-center space-x-3 ml-4">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-6">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div className="text-xl font-light text-gray-500">{data.name}</div>
      </div>
      <CRating score={data.score}></CRating>
    </div>
  );
}
export default ProfessorCard;