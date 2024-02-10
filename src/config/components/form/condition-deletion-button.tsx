  import React, { VFC } from 'react';
import { useSetRecoilState } from 'recoil';
import { produce } from 'immer';

import { storageState } from '../../states';

type ContainerProps = Readonly<{ index: number }>;
type Props = Readonly<{ onClick: () => void }>;

const Component: VFC<Props> = ({ onClick }) => (
  <button onClick={onClick}>
    X
  </button>
);

const Container: VFC<ContainerProps> = ({ index }) => {
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
