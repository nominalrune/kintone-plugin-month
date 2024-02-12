import React from 'react';
import Condition from './ConditionForm';
import { plugin } from '../../../types/plugin';

type Props = Readonly<{
  conditions: plugin.Condition[] | null;
  setCondition: (index: number, key: keyof plugin.Condition, value: string|string[]) => void;
  deleteCondition: (index: number) => void;
}>;

export default function Form({ conditions, setCondition, deleteCondition }: Props) {
  return <div className='flex flex-col gap-6'>
    {!conditions
      ? <p>設定情報を取得しています</p>
      : conditions.map((condition, index) => (
        <Condition key={index} condition={condition} index={index} setCondition={setCondition} deleteCondition={deleteCondition} />
      ))}
  </div>;
};
