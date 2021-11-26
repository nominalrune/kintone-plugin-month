import { getCurrentRecord, setCurrentRecord } from '@common/kintone';
import { useEffect, VFC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { pluginConditionState, valueState } from '../states';

const Container: VFC = () => {
  const condition = useRecoilValue(pluginConditionState);
  const [value, setValue] = useRecoilState(valueState);

  useEffect(() => {
    if (!condition?.field) {
      return;
    }

    console.log('initializing');

    const { record } = getCurrentRecord();

    setValue(Number(record[condition.field].value || 0));
  }, [condition]);

  useEffect(() => {
    if (!condition?.field) {
      return;
    }

    const { record } = getCurrentRecord();

    record[condition.field].value = String(value);

    setCurrentRecord({ record });
  }, [value]);

  return null;
};

export default Container;
