import React, { ChangeEventHandler, VFC, VFCX } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import { Properties } from '@kintone/rest-api-client/lib/src/client/types';

import { appFieldsState, storageState } from '../../../states';

type ContainerProps = { condition: kintone.plugin.Condition; index: number; };
type Props = ContainerProps & {
  appFields: Properties;
  onFieldChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onMinChange: ChangeEventHandler<HTMLInputElement>;
  onMaxChange: ChangeEventHandler<HTMLInputElement>;
};

const Component: VFCX<Props> = ({
  className,
  condition,
  appFields,
  onFieldChange,
  onMinChange,
  onMaxChange,
}) => (
  <div {...{ className }}>
    <div>
      <h3>対象フィールド</h3>
      <label>フィールド名
        <select
          value={condition.field}
          onChange={onFieldChange}
          className='input gaia-argoui-select'
        >
          {Object.values(appFields).map(({ code, label }, i) => (
            <option className="gaia-argoui-select-label" key={i} value={code}>
              {label}
            </option>
          ))}
        </select>
      </label>
    </div>
    <div>
      <h3>年月の最小値と最大値</h3>
      <label>最小値<input
        type='month'
        value={condition.min}
        onChange={onMinChange}
        className='input input-text-cybozu'
      /></label>
      <label>最大値<input
        type='month'
        value={condition.max}
        onChange={onMaxChange}
        className='input input-text-cybozu'
      /></label>
    </div>
  </div>
);

const StyledComponent = styled(Component)`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  > div {
    padding: 8px 8px 8px 16px;
    border-left: 2px solid #0002;
    transition: all 0.25s ease;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    > h3 {
      font-weight: 500;
      margin-bottom: 16px;
    }
  }

  .input {
    min-width: 250px;
  }
`;

const Container: VFC<ContainerProps> = ({ condition, index }) => {
  const appFields = useRecoilValue(appFieldsState);
  const setStorage = useSetRecoilState(storageState);

  function setConditionProps<T extends keyof kintone.plugin.Condition>(
    key: T,
    value: kintone.plugin.Condition[T]
  ) {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index][key] = value;
      })
    );
  };

  const onFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setConditionProps('field', e.target.value);
  };

  const onMinChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.target.value;
    if (condition.max < val) {
      setConditionProps('max', val);
    }
    setConditionProps('min', val);
  };

  const onMaxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const val = e.target.value;

    if (condition.min > val) {
      setConditionProps('min', val);
    }
    setConditionProps('max', val);
  };

  return (
    <StyledComponent
      {...{
        condition,
        index,
        appFields,
        onFieldChange,
        onMinChange,
        onMaxChange,
      }}
    />
  );
};

export default Container;
