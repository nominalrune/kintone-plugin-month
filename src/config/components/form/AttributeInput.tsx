import React, { useState } from 'react';
import { plugin } from '../../../types/plugin';
import Attribute from './Attribute';
import Input from './Input';

export default function AttributeInput({ condition, handleChange }: { condition: plugin.Condition; handleChange: (key: keyof plugin.Condition, value: any) => void; }) {
  const attributes = [
    ["編集不可", "disabled",],
    ["最大値", "max",],
    ["最大文字数", "maxLength",],
    ["最小値", "min",],
    ["最小文字数", "minLength",],
    ["複数選択", "multiple",],
    ["入力パターン", "pattern",],
    ["プレースホルダー", "placeholder",],
    ["読み取り専用", "readOnly",],
    ["サイズ", "size",],
    ["ステップ", "step",],
  ] as const;
  const existingAttributes = Object.keys(condition);
  const [attribute, setAttribute] = useState<typeof attributes[number][1]>();
  function handleAttributeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setAttribute(e.target.value as typeof attributes[number][1]);
  }
  return <div className="inline-flex gap-2">
    <select name={attribute} id={attribute} onChange={handleAttributeChange}>
      {
        attributes
          .filter(i => existingAttributes.includes(i[0]))
          .map(([label, attribute]) => (
            <option key={attribute} value={attribute}>{label}({attribute})</option>
          ))
      }
    </select>
    {attribute && ["disabled", "readOnly", "multiple"].includes(attribute ?? "") && <input
      type="checkbox"
      checked={!!condition[attribute as "disabled" | "readOnly" | "multiple"]}
      onChange={e => handleChange(attribute, e.target.checked)}
      className='width-5 height-5'
    />}
    {attribute && !["disabled", "readOnly", "multiple"].includes(attribute ?? "") && <Input
      type="text"
      value={condition[attribute as Exclude<Attribute, "disabled" | "readOnly" | "multiple">]}
      onChange={e => handleChange(attribute, e.target.value)}
    />}
  </div>;
}
