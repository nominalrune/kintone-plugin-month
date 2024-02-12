import React, { ComponentProps } from 'react';
export default function PrimaryButton({ children, className, ...rest }: ComponentProps<"button">) {
  return <button {...rest} className={"rounded-sm bg-sky-500 text-white py-2 px-4 hover:bg-sky-600 shadow "+className}>{children}</button>;
}
