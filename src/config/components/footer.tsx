import React, { VFC, VFCX } from 'react';
import { useRecoilCallback } from 'recoil';
import styled from '@emotion/styled';
import { useSnackbar } from 'notistack';

import { storeStorage } from '@common/plugin';

import { storageState } from '../states';

type Props = {
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: VFCX<Props> = ({ className, onSaveButtonClick, onBackButtonClick }) => (
  <div {...{ className }}>
    <button
      onClick={onSaveButtonClick}
    >
      設定を保存
    </button>
    <button
      onClick={onBackButtonClick}
    >
      プラグイン一覧へ戻る
    </button>
  </div>
);

const StyledComponent = styled(Component)`
  position: sticky;
  bottom: 24px;
  margin-top: 20px;
  background-color: #fff;
  border-top: 1px solid #eee;

  button {
    margin: 8px;
  }
`;

const Container: VFC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const onBackButtonClick = () => history.back();

  const onSaveButtonClick = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const storage = await snapshot.getPromise(storageState);

        storeStorage(storage!, () => true);
        enqueueSnackbar('設定を保存しました', {
          variant: 'success',
          action: (
            <button color='inherit' onClick={onBackButtonClick}>
              プラグイン一覧に戻る
            </button>
          ),
        });
      },
    []
  );

  return <StyledComponent {...{ onSaveButtonClick, onBackButtonClick }} />;
};

export default Container;
