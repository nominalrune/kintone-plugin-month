import AddButton from '@common/components/AddButton';
import DeleteButton from '@common/components/DeleteButton';
import React, { useState, ChangeEvent, useEffect } from 'react';
import Input from './Input';
export default function OptionsInput({ options = [], onChange, add, remove }: { options?: string[]; onChange: (e: ChangeEvent<HTMLInputElement>) => void; add: () => void; remove: (index: number) => void; }) {
  const [on, setOn] = useState(options.length > 0);
  function handleToggle(e: ChangeEvent<HTMLInputElement>) {
    const _on = e.target.checked;
    setOn(_on);
    if (_on && options.length === 0) { add(); }
  }
  return <div className="ml-2 p-2 w-fit">
    <label className="text-slate-800">
      選択肢の設定を使用する
      <input type="checkbox" checked={on} onChange={handleToggle} />
    </label>
    <ul className="list-disc list-inside">
      {
        options.map((option, index) => (
          <li><div className="inline-flex gap-2 items-center">
            <Input disabled={!on} key={index} value={option} name={index.toString()} type="text" onChange={onChange} />
            <DeleteButton onClick={(e) => remove(index)} />
          </div></li>
        ))
      }
    </ul>
    <div className="flex justify-end">
      <AddButton onClick={add} />
    </div>
  </div>;
}
