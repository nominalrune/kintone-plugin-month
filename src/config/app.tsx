import React, { FormEvent, Suspense } from 'react';
import Form from './components/Form';
import ConditionAdditionButton from './components/Form/AddButton';
import Footer from './components/Footer';
import { Loading } from '@common/components/loading';
import useCondition from './useCondition';

import "./app.css";
function App({ pluginId }: { pluginId: string; }) {
  const { conditions, setCondition, save, deleteCondition, addCondition } = useCondition(pluginId);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    console.log({ e });
    save(conditions);
  }
  return <Suspense fallback={<Loading label='設定情報を取得しています' />}>
    <Form conditions={conditions} setCondition={setCondition} deleteCondition={deleteCondition} />
    <ConditionAdditionButton add={addCondition} />
    <Footer onSubmit={onSubmit} />
  </Suspense>;
}

export default App;
