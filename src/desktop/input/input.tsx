import React, { ChangeEvent, useState } from 'react';
// import { getCurrentRecord, setCurrentRecord } from '@common/kintone';

type Props = { condition: kintone.plugin.Condition|null; initialValue: string };
const Container = ( {condition, initialValue}:Props) => {
  const [value, setValue] = useState(initialValue);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!condition?.field) {
      return;
    }
    try {
      const { record } = kintone.app.record.get();

      record[condition.field].value = e.target.value;

      kintone.app.record.set({ record });
      // const { record } = getCurrentRecord();

      // record[condition.field].value = String(value);

      // setCurrentRecord({ record });
    } catch (error) {
    alert('エラーが発生しました'+error);}
  };
  if (!condition) return <></>;
  return <input
    className="input-text-cybozu"
    type="month"
    value={value}
    min={condition.min}
    max={condition.max}
    onChange={onValueChange}
  />;
};

export default Container;
