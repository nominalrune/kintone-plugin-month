import React, { ChangeEvent,ChangeEventHandler, VFC, VFCX } from 'react';
import styled from '@emotion/styled';
import { pluginConditionState, valueState } from '../states';
import { useRecoilState, useRecoilValue } from 'recoil';

type ContainerProps = Readonly<{}>;
type Props = ContainerProps &
  Readonly<{
    condition: kintone.plugin.Condition;
    value: number;
    onValueChange: (v: number) => void;
  }>;

const Component: VFCX<Props> = ({ className, condition, value, onValueChange }) => (
  <div {...{ className }}>
    <input
    value={value}
    min={condition.min}
    max={condition.max}
    onChange={(e:ChangeEvent<HTMLInputElement>) => onValueChange(+e.target.value)}
    />
    {/* <Slider
      sx={{ width: 200 }}
      value={value}
      onChange={(_, value) => onValueChange(value as number)}
      valueLabelDisplay='auto'
      step={condition.usesStep && condition.step ? condition.step : 1}
      marks={condition.usesStep}
      min={condition.min}
      max={condition.max}
    /> */}
  </div>
);

const StyledComponent = styled(Component)``;

const Container: VFC<ContainerProps> = () => {
  const condition = useRecoilValue(pluginConditionState);
  const [value, setValue] = useRecoilState(valueState);

  const onValueChange = (v: number) => {
    setValue(v);
  };

  return condition ? <StyledComponent {...{ condition, value, onValueChange }} /> : null;
};

export default Container;
