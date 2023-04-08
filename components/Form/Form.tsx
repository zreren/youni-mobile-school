import React from 'react';
import { useTranslation } from 'next-i18next';

export default function Form(props) {
  const {t} = useTranslation();
  let { header, List } = props;
  if (!List) {
    List = [
      {
        title: '标题',
        action: 'text',
        intro: t('请输入'),
        Icon:null,
      },
    ];
  }
  return (
    <div className="w-full h-full p-0">
      <div className="mb-4 text-xs text-gray-300">{header}</div>
      {List?.map((item, index) => {
        const Icon = item.Icon;
        return (
          <div className="items-start justify-between mb-4" onClick={item.event}>
            <div className="flex justify-between">
              <div className="flex space-x-2">
                 {item.Icon ? <Icon className="mt-1"></Icon> : null}
                <div className="mb-2 text-sm font-medium text-[#798195]">{t(item.title)}</div>
              </div>
              <div className='text-sm'>{item.action}</div>
            </div>
            <div className="text-xs text-[#DCDDE1 ]">{item.intro}</div>
          </div>
        );
      })}
      <div className="h-1 m-0 divider opacity-30 mb-4"></div>
    </div>
  );
}
