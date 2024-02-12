import React, { ComponentProps } from 'react';

export default function AddButton({ onClick, className, ...rest }: Omit<ComponentProps<"button">, "ref" | "children">) {
  return <button {...rest} onClick={onClick} className={"rounded-[50%] bg-sky-500 text-white w-4 h-4 hover:bg-sky-600 shadow grid content-center justify-center text-sm " + className??""}>+</button>;
}
