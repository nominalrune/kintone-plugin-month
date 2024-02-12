import { getFieldId } from '@common/cybozu';
import { restoreStorage } from '@common/plugin';
import { plugin } from '../types/plugin';
import Attribute from '../config/components/Form/Attribute';
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
      (Object.entries(condition) as [Attribute|"field"|"options", plugin.Condition[Attribute|"field"|"options"]][]).forEach(([key, value]) => {
        if (key !== 'field' && key !== 'options' && value !== undefined) {
          nativeInput.setAttribute(key, value.toString());
        }
        if(key === 'options' && value !== undefined){
          const existingList = document.getElementById(`options-${fieldId}`);
          if(existingList){
            return;
          }
          const options = value as string[];
          const list = document.createElement("datalist");
          list.id = `options-${fieldId}`;
          options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            list.appendChild(optionElement);
          });
          document.body.appendChild(list);
          nativeInput.setAttribute("list", `options-${fieldId}`);
        }
      });
    }
  }

  console.log('プラグインが有効です', { pluginId, event, config });
  return event;
};

export default { events, action };
