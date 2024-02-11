import React, { VFC, VFCX } from 'react';
import { useRecoilCallback } from 'recoil';
import styled from '@emotion/styled';
// import { useSnackbar } from 'notistack';

import { storeStorage } from '@common/plugin';

import { storageState } from '../states';

type Props = {
  onSaveButtonClick: () => void;
  onBackButtonClick: () => void;
};

const Component: VFCX<Props> = ({ className, onSaveButtonClick, onBackButtonClick }) => (
  <div {...{ className }}>
    <button
      className="save"
      onClick={onSaveButtonClick}
    >
      設定を保存
    </button>
    <button
      className="save"
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
    display: inline-block;
    box-sizing: border-box;
    padding: 0 16px;
    min-width: 163px;
    height: 48px;
    text-align: center;
    line-height: 48px;
  }
  button.save {
    border: 1px solid #e3e7e8;
    background-color: #3498db;
    box-shadow: 1px 1px 1px #fff inset;
    color: #fff;
  }
  button.cancel{
    border: 1px solid #e3e7e8;
    background-color: #f7f9fa;
    box-shadow: 1px 1px 1px #fff inset;
    color: #3498db;
  }
`;

const Container: VFC = () => {
  // const { enqueueSnackbar } = useSnackbar();

  const onBackButtonClick = () => history.back();

  const onSaveButtonClick = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const storage = await snapshot.getPromise(storageState);

        storeStorage(storage!, () => true);
        onBackButtonClick();
      },
    []
  );

  return <StyledComponent {...{ onSaveButtonClick, onBackButtonClick }} />;
};

export default Container;
