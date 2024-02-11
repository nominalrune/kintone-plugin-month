import React, { VFC } from 'react';
import { useSetRecoilState } from 'recoil';
import { produce } from 'immer';

import { getNewCondition } from '@common/plugin';

import { storageState } from '../../states';

type Props = Readonly<{ addCondition: () => void }>;

const Component: VFC<Props> = ({ addCondition }) => (
  <button
    onClick={addCondition}
    className="save"
  >
    新しい設定
  </button>
);

const Container: VFC = () => {
  const setStorage = useSetRecoilState(storageState);

  const addCondition = () => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions.push(getNewCondition());
      })
    );
  };

  return <Component {...{ addCondition }} />;
};

export default Container;
