import React from 'react';
import { useSetRecoilState } from 'recoil';
import { produce } from 'immer';

import { storageState } from '../../states';

type ContainerProps = Readonly<{ index: number }>;
type Props = Readonly<{ onClick: () => void }>;

const Component = ({ onClick }:Props) => (
  <button onClick={onClick}
  className="recordlist-remove-gaia">
    <img className="recordlist-remove-icon-gaia" src="https://static.cybozu.com/contents/k/image/argo/component/recordlist/record-delete.png" alt="" />
  </button>
);

const Container = ({ index }:ContainerProps) => {
  const setStorage = useSetRecoilState(storageState);

  const onClick = () => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions.splice(index, 1);
      })
    );
  };

  return <Component {...{ onClick }} />;
};

export default Container;
