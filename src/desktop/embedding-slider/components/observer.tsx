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

    try {
      const { record } = getCurrentRecord();

      record[condition.field].value = String(value);

      setCurrentRecord({ record });
    } catch (error) {}
  }, [value]);

  return null;
};

export default Container;
