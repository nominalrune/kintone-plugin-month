import React, { ComponentProps } from 'react';

export default function SecondaryButton({ children, className, ...rest }: ComponentProps<"button">) {
  return <button {...rest} className={"rounded-sm bg-slate-100 text-sky-600 py-2 px-4 hover:bg-slate-300 shadow "+className}>{children}</button>;
}
