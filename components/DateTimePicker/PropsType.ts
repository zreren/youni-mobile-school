import { DatePickerPropsType } from './DatePickerPropsType';

export interface DatePickerViewPropsType extends DatePickerPropsType {
  onScrollChange?: (newValue: any, vals: any, index: number) => void;
  prefixCls?: string;
  className?: string;
  pickerPrefixCls?: string;
  local?: string;
}