import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { OneOf as FieldProperty } from '@kintone/rest-api-client/lib/src/KintoneFields/types/property';
import { getUserDefinedFields } from '@common/kintone-api';
import DeleteButton from './DeleteButton';
import { plugin } from '../../../types/plugin';
import OptionsInput from './OptionsInput';
import Input from './Input';

type ContainerProps = {
  condition: plugin.Condition; index: number;
  setCondition: (index: number, key: keyof plugin.Condition, value: string | string[]) => void;
  deleteCondition: (index: number) => void;
};

export default function ConditionForm({ condition, index, setCondition, deleteCondition }: ContainerProps) {
  const [appFields, setAppFields] = useState<FieldProperty[]>();
  const options = condition.options ?? [];
  function setOptions(item: ((ops: string[]) => string[]) | string[]) {
    setCondition(index, 'options', typeof item === "function" ? item(options) : item);
  }
  useEffect(() => {
    (async () => {
      const result = await getUserDefinedFields();
      console.log('fields', result);
      setAppFields(result);
    })();
  }, []);

  function handleChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const { name, value } = e.target;
    setCondition(index, name as keyof plugin.Condition, value);
  }
  return (
    <details open={true} className='p-4 border-2 border-slate-300 rounded'>
      <summary className="inline-flex content-center gap-3">
        設定{index + 1}
        <DeleteButton {...{ index, deleteCondition }} />
      </summary>
      <div className="px-4 flex flex-col p-4 gap-2">
        <h3 className='text-xl'>対象フィールド</h3>
        <div className='ml-2 p-2 border-l-2 border-solid border-slate-400 flex flex-row gap-4'>
          <label className="inline-flex gap-2">フィールド名
            <select
              name='field'
              value={condition?.field}
              onChange={handleChange}
              className='input gaia-argoui-select border-solid border-2 border-slate-400 rounded-md shadow-sm hover:ring-blue-300'
            >
              {appFields ? Object.values(appFields).map(({ code, label }) => (
                <option className="gaia-argoui-select-label" key={code} value={code}>
                  {label}({code})
                </option>
              )) : <></>}
            </select>
          </label>
        </div>
        <h3 className='text-xl'>Attributes</h3>
        <div className="ml-2 p-2 border-l-2 border-solid border-slate-400 flex flex-col gap-4">
          <label className="inline-flex gap-2">タイプ<select
            name='type'
            value={condition?.type}
            onChange={handleChange}
            className='input border-solid border-2 border-slate-400 rounded-md shadow-sm hover:ring-blue-300'
          >
            {[
              ["色", "color",],
              ["日付", "date",],
              ["日時", "datetime-local",],
              ["メールアドレス", "email",],
              ["年月", "month",],
              ["数字", "number",],
              ["パスワード", "password",],
              ["範囲", "range",],
              ["電話番号", "tel",],
              ["テキスト", "text",],
              ["時間", "time",],
              ["URL", "url",],
              ["週", "week",],
            ].map(([label, type]) => (
              <option className="gaia-argoui-select-label" key={type} value={type}>
                {label}({type})
              </option>
            ))}
          </select></label>
          {[
            "date",
            "datetime-local",
            "month",
            "number",
            "range",
            "time",
            "week",
          ].includes(condition?.type ?? "") && <>
              <label className="inline-flex gap-2">最小値<Input
                type={condition?.type}
                value={condition?.min}
                onChange={e => setCondition(index, 'min', e.target.value)}
              /></label>
              <label className="inline-flex gap-2">最大値<Input
                type={condition?.type}
                value={condition?.max}
                onChange={e => setCondition(index, 'max', e.target.value)}
              /></label>
            </>}
          {[
            "email",
            "password",
            "tel",
            "text",
            "url"
          ].includes(condition?.type ?? "") && <>
              <label className="inline-flex gap-2">最小文字数<Input
                type="number"
                value={condition?.minLength}
                onChange={e => setCondition(index, 'minLength', e.target.value)}
              /></label>
              <label className="inline-flex gap-2">最大文字数<Input
                type="number"
                value={condition?.maxLength}
                onChange={e => setCondition(index, 'maxLength', e.target.value)}
              /></label>
            </>}
          {/* <AttributeInput condition={condition} handleChange={(key, value) => setCondition(index, key, value)} /> */}
          <fieldset className="bg-slate-50">
            <legend>選択肢の設定</legend>
            <OptionsInput
              options={options}
              onChange={e => setOptions(ops => [...ops.map((op, i) => i === parseInt(e.target.name) ? e.target.value : op)])}
              add={() => setOptions(ops => [...ops, ''])}
              remove={i => setOptions(ops => ops.filter((_, j) => i !== j))}
            />
          </fieldset>
        </div>
      </div>
    </details>
  );
};
