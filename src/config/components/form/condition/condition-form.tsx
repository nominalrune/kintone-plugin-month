import React, { ChangeEventHandler, VFC, VFCX } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import produce from 'immer';
import { Properties } from '@kintone/rest-api-client/lib/client/types';

import { appFieldsState, storageState } from '../../../states';
import { FormControlLabel, MenuItem, Slider, Switch, TextField } from '@mui/material';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };
type Props = ContainerProps & {
  appFields: Properties;
  onFieldChange: ChangeEventHandler<HTMLInputElement>;
  onMinChange: ChangeEventHandler<HTMLInputElement>;
  onMaxChange: ChangeEventHandler<HTMLInputElement>;
  onStepChange: ChangeEventHandler<HTMLInputElement>;
  onUsesStepChange: (checked: boolean) => void;
};

const Component: VFCX<Props> = ({
  className,
  condition,
  appFields,
  onFieldChange,
  onMinChange,
  onMaxChange,
  onStepChange,
  onUsesStepChange,
}) => (
  <div {...{ className }}>
    <div>
      <h3>対象フィールド</h3>
      <TextField
        select
        value={condition.field}
        label='フィールド名'
        onChange={onFieldChange}
        className='input'
      >
        {Object.values(appFields).map(({ code, label }, i) => (
          <MenuItem key={i} value={code}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </div>
    <div>
      <h3>スライダーの最小値と最大値</h3>
      <TextField
        type='number'
        value={condition.min}
        label='最小値'
        onChange={onMinChange}
        className='input'
      />{' '}
      <TextField
        type='number'
        value={condition.max}
        label='最大値'
        onChange={onMaxChange}
        className='input'
      />
    </div>
    <div>
      <h3>スライダーの単位</h3>
      <FormControlLabel
        control={<Switch color='primary' checked={condition.usesStep} />}
        onChange={(_, checked) => onUsesStepChange(checked)}
        label='スライダーを操作できる単位を設定する'
      />
      {condition.usesStep && (
        <TextField
          type='number'
          value={condition.step}
          label='単位'
          onChange={onStepChange}
          className='input'
        />
      )}
    </div>
    <div>
      <h3>動作サンプル</h3>
      <Slider
        sx={{ width: 250 }}
        defaultValue={30}
        valueLabelDisplay='auto'
        step={condition.usesStep && condition.step ? condition.step : 1}
        marks={condition.usesStep}
        min={condition.min}
        max={condition.max}
      />
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

  const setConditionProps = <T extends keyof kintone.plugin.Condition>(
    key: T,
    value: kintone.plugin.Condition[T]
  ) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index][key] = value;
      })
    );
  };

  const onSwitchChange = (checked: boolean, option: keyof kintone.plugin.Condition) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index][option] = checked as never;
      })
    );
  };

  const onFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setConditionProps('field', e.target.value);
  };

  const onStepChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setConditionProps('step', Number(e.target.value));
  };

  const onMinChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const num = Number(e.target.value);

    if (condition.max < num) {
      setConditionProps('max', num);
    }
    setConditionProps('min', num);
  };

  const onMaxChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const num = Number(e.target.value);

    if (condition.min > num) {
      setConditionProps('min', num);
    }
    setConditionProps('max', Number(e.target.value));
  };

  const onUsesStepChange = (checked: boolean) => onSwitchChange(checked, 'usesStep');

  return (
    <StyledComponent
      {...{
        condition,
        index,
        appFields,
        onFieldChange,
        onStepChange,
        onMinChange,
        onMaxChange,
        onUsesStepChange,
      }}
    />
  );
};

export default Container;
