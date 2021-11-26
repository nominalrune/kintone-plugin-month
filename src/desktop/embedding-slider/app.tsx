import React, { VFC } from 'react';
import { RecoilRoot } from 'recoil';

import { pluginConditionState } from './states';

import Observer from './components/observer';
import Input from './components/input';

type Props = { condition: kintone.plugin.Condition };

const Component: VFC<Props> = ({ condition }) => (
  <RecoilRoot
    initializeState={({ set }) => {
      set(pluginConditionState, condition);
    }}
  >
    <Observer />
    <Input />
  </RecoilRoot>
);

export default Component;
