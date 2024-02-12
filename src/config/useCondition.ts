import { useState } from 'react';
import { storeStorage,restoreStorage } from '@common/plugin';

import { getNewCondition } from '@common/plugin';
export default function useCondition(pluginId: string) {
  const [storage, setStorage] = useState<plugin.Storage>(restoreStorage(pluginId));
  function setCondition(index: number, key: keyof plugin.Condition, value: plugin.Condition[keyof plugin.Condition]) {
    setStorage((storage) =>{
      storage.conditions[index][key] = value;
      return {...storage};
    });
  }
  function save(conditions: plugin.Condition[]) {
    storeStorage({...storage, conditions});
  }
  function deleteCondition(index: number) {
    setStorage((storage) =>{
      storage.conditions.splice(index, 1);
      return {...storage};
    });
  }
  function addCondition() {
    setStorage((storage) =>{
      storage.conditions.push(getNewCondition());
      return {...storage};
    });
  }
  return { conditions:storage.conditions, setCondition, save, deleteCondition, addCondition};
}
