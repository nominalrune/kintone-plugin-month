// import React from 'react';
import { getFieldId } from '@common/cybozu';
import { restoreStorage } from '@common/plugin';
// import Input from './input'
// import {createRoot} from "react-dom/client";
const events: kintone.EventType[] = [
  'app.record.create.show',
  'app.record.edit.show',
  'app.record.index.edit.show',
];

const action: launcher.Action = async (event, pluginId) => {
  const config = restoreStorage(pluginId);

  for (const condition of config.conditions) {
    if (!condition.field) {
      continue;
    }

    const fieldId = getFieldId(condition.field);
    const nativeInput = document.querySelector<HTMLInputElement>(`.value-${fieldId} input`);
    if (nativeInput) {
      nativeInput.type = 'month';
      nativeInput.min = condition.min;
      nativeInput.max = condition.max;
    }
    // const wrapper =
    //   document.querySelector<HTMLDivElement>(`.value-${fieldId} > div`) ||
    //   document.querySelector<HTMLDivElement>(`.value-${fieldId}`);
    // if (!wrapper) {
    //   return event;
    // }

    // const nativeInput = document.querySelector<HTMLInputElement>(`.value-${fieldId} input`);
    // if (nativeInput) {
    //   nativeInput.style.display = 'none';
    // }

    // const div = document.createElement('div');
    // wrapper.prepend(div);

    // const fieldValue = event.record[condition.field].value;

    // const initialValue = fieldValue ?? condition.min;

    // const root = createRoot(div);
    // root.render(<Input condition={condition} initialValue={initialValue} />);
  }

  console.log('プラグインが有効です', { pluginId, event, config });
  return event;
};

export default { events, action };
