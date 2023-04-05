import React from 'react'
import { useTranslation } from 'next-i18next';

export default function CButtonNoLine(props) {
  const {t} = useTranslation()
  const { onClick } = props
  return (
    <button onClick={()=>{onClick()}} className="btn btn-outline btn-warning rounded-full btn-xs w-16">{t("换一批")}</button>
  )
}
