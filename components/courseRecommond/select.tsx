import React,{ useState } from 'react';
import { Select, MenuItem } from '@mui/material';

export default function MySelect(props) {
  const [selectedOption, setSelectedOption] = useState(props.value);

  const handleChange = (event) => {
    props?.change(event.target.value)
    // setSelectedOption(event.target.value);
  };
  React.useEffect(() => {
    // if()
    props?.change(props?.data?.[0]?.name)
  

  }, [props?.data])
  
  return (
    <select
      value={selectedOption}
      onChange={handleChange}
      style={{
        backgroundColor: '#F7F8F9',
        borderRadius: '4px',
        color: '#798195',
        border: 'none',
        padding: '0px 12px',
        height:'30px',
        fontWeight: 600,
        fontSize: '12px',
        outline: 'none',
      }}
    >
        {
            props?.data?.map((item)=>{
                return <option value={item.name}>{item.name}</option>
            })
        }
    </select>
  );
}
