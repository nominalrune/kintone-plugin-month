import React from 'react';
import PrimaryButton from '@common/components/PrimaryButton';
const AddButton = ({add}:{add:() => void}) => {
  const addCondition = () => {
    add();
  };
  return <PrimaryButton
    onClick={addCondition}
    className="m-2"
  >
    新しいフィールド設定
  </PrimaryButton>;
};

export default AddButton;
