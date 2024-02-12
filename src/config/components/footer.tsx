import React, { FormEvent } from 'react';
import PrimaryButton from '@common/components/PrimaryButton';
import SecondaryButton from '@common/components/SecondaryButton';
export default function Footer({ onSubmit }: { onSubmit: (e: FormEvent) => void; }) {
  const onBackButtonClick = () => history.back();
  return <div className="sticky bottom-6 mt-3 p-2 bg-white border-t-2 border-slate-100 flex gap-5">
    <PrimaryButton
      type="submit"
      onClick={onSubmit}
    >
      設定を保存
    </PrimaryButton>
    <SecondaryButton
      type="button"
      onClick={onBackButtonClick}
    >
      プラグイン一覧へ戻る
    </SecondaryButton>
  </div>;
};
