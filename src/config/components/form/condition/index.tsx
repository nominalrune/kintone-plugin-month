import React, { memo, useState, VFC, VFCX } from 'react';

import ConditionForm from './condition-form';
import ConditionDeletionButton from '../condition-deletion-button';

type ContainerProps = Readonly<{ condition: kintone.plugin.Condition; index: number }>;
type Props = ContainerProps & {
  expanded: boolean;
  onChange: () => void;
};

const Component: VFCX<Props> = ({ className, condition, index, expanded, onChange }) => (
  <details {...{ expanded, onChange, className }} variant='outlined' square>
    <summary>設定{index + 1}</summary>
    <div>
      <ConditionForm {...{ condition, index }} />
    </div>
    <hr/>
    <div>
      <ConditionDeletionButton {...{ index }} />
    </div>
  </details>
);

const Container: VFC<ContainerProps> = memo(({ condition, index }) => {
  const [expanded, setExpanded] = useState<boolean>(index === 0);

  const onChange = () => setExpanded((_expanded) => !_expanded);

  return <Component {...{ condition, index, expanded, onChange }} />;
});

export default Container;
