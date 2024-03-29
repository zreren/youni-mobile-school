import React,{ useState } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'next-i18next';

export default function MySelect(props) {
  const [selectedOption, setSelectedOption] = useState(props.value);
  const {t} = useTranslation()

  const handleChange = (event) => {
    console.log(event.target.value,"event.target.value")
    // setSelectedOption(event.target.value)
    // props?.change(event.target.value)
    // setSelectedOption(event.target.value);
  };
  React.useEffect(() => {
    // if()

    console.log(props.value,'term')

    props?.change(props?.data?.[0]?.name)
  

  }, [props?.data])
  
  return (
    <select
      value={selectedOption}
      defaultValue={props.data[0]?.name}
      // onChange={handleChange}
      style={{
        width:'120px',
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
        {
          props?.data?.length === 0 && <option>{t('请选择学期')}</option>
        }
    </select>
  );
}
