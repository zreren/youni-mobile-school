import React, { useState } from 'react';
import CateGoryIcon from './categoryIcon.svg';
import IOSSwitch from '../Input/ios';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import JGIcon from './jg.svg';
import { Picker } from 'react-vant';
import { DatetimePicker, Field, Toast } from 'react-vant';
import classnames from 'classnames';
import DraftIcon from './draft.svg';
import { useTranslation } from 'next-i18next';

export default function expiration(props) {
  const router = useRouter();
  const { t } = useTranslation();

  const [value, setValue] = useState(true);
  const { data: campusData, mutate: campusDataMutate } = useFetch(
    '/campus/query',
    'get',
    {
      name: router.query.campus,
    },
  );
  const campusId = React.useMemo(() => {
    return campusData?.data[0]?.id;
  }, [campusData?.data, router]);
  const { data: fetchedData, mutate } = useFetch('/campus/term/list', 'get', {
    campusId: campusId,
  });
  React.useEffect(() => {
    mutate();
  }, [campusId]);
  
  const { year, term } = props;


  function TimeComponent(props) {
    const [selectedYearRange, setSelectedYearRange] = useState(props.year);
    React.useEffect(() => {
      setSelectedYearRange(props.year);
    }, [props.year]);

    // const [value]
    function handleYearRangeChange(value) {
      console.log(value, 'term value');
      setSelectedYearRange(value);
    }

    React.useEffect(() => {
      console.log(selectedYearRange, 'selectedYearRange');
    }, [selectedYearRange]);

    const currentYear = new Date().getFullYear();
    const years = React.useMemo(() => {
      const years = [];
      for (let year = currentYear - 10; year <= currentYear + 10; year++) {
        if (year > currentYear) {
          break; // 跳出循环，不再添加大于当前年份的年份
        }
        years.push(year.toString());
      }
      return years;
    }, [currentYear]);

    const columns = [
      ['2019', '2020', '2021', '2022', '2023', '2024'], // Remove the comma after this array
      ['2019', '2020', '2021', '2022', '2023', '2024'],
    ];
    const confirmValue = () => {
      props.select(selectedYearRange);
    };
    return (
      <div className="w-full field flex justify-end">
        <Picker
          popup={{
            round: true,
          }}
          title="选择时间范围"
          columns={columns}
          value={selectedYearRange}
          onChange={handleYearRangeChange}
          onConfirm={() => {
            confirmValue();
          }}
        >
          {(val, _, actions) => {
            return (
              <Field
                readOnly
                clickable
                className="flex justify-end"
                value={selectedYearRange?.join('-')} // update the value property
                label=""
                placeholder={t("请选择日期")}
                onClick={() => actions.open()}
              />
            );
          }}
        </Picker>
      </div>
    );
  }
  const submitPost = async (form, draft) => {};

  const [termList, setTermList] = useState(props.term);
  return (
    <div
      onBlur={() => {
        props.selectTerm(termList);
      }}
      className="items-start justify-between  py-0 bg-white p-5 pb-5"
    >
      <div className="flex justify-between mb-6">
        <div className="flex items-center space-x-2">
          <CateGoryIcon></CateGoryIcon>
          {/* {item.Icon ? <Icon className="mt-1"></Icon> : null} */}
          <div className="text-blueTitle  ">{t('有效期')}</div>
        </div>
        {/* <div>{item.action}</div> */}
      </div>
      <div className="flex justify-between mb-6">
        <div className="text-[#798195] text-sm">{t('长期有效')}</div>
        <div className="flex items-center space-x-2">
          <JGIcon></JGIcon>
          <IOSSwitch
            value={value}
            onChange={() => {
              setValue((pre) => !pre);
            }}
            defaultChecked
          ></IOSSwitch>
        </div>
      </div>
      {!value && (
        <div className="flex justify-between mb-6">
        <div className="text-[#798195]  text-sm">{t('适用学年')}</div>
          <div className="flex items-center space-x-2">
            <TimeComponent
              year={year}
              select={(e) => {
                props.select(e);
              }}
            ></TimeComponent>
          </div>
        </div>
      )}

      <div className="flex">
        <div className="text-[#798195] whitespace-nowrap  text-sm mr-4">
          {t('适用学期')}
        </div>
        <div className="flex  flex-wrap w-7/10 mb-0">
          {fetchedData?.data?.map((item) => {
            return (
              <div
                onClick={() => {
                  if (termList.some((i) => i === item)) {
                    props.setTermList(item);
                    return;
                  }
                  props.setTermList(item);
                }}
                className={classnames(
                  'bg-[#F3F4F6] rounded text-[#798195] m-1  text-xs font-light h-6 px-2 flex justify-center items-center',
                  {
                    'text-yellow-500': props.term.some((i) => i.id === item.id),
                  },
                )}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
