import React from 'react';

type ContainerProps = Readonly<{ index: number,deleteCondition:(index: number) => void }>;

const DeleteButton = ({ index, deleteCondition }:ContainerProps) => {
  const onClick = () => {
    deleteCondition(index);
  };

  return   <button onClick={onClick}
  className="recordlist-remove-gaia">
    <img className="recordlist-remove-icon-gaia" src="https://static.cybozu.com/contents/k/image/argo/component/recordlist/record-delete.png" alt="" />
  </button>;
};

export default DeleteButton;
