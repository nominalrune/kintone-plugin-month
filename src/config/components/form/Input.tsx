import React, { ComponentProps } from 'react';

export default function Input({ ...attr }: ComponentProps<'input'>) {
  return <input
    {...attr}
    className='input border-solid border-2 border-slate-400 rounded-md shadow-sm hover:ring-blue-300'
  />;
}
