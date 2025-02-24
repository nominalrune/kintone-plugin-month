import React from 'react';

declare module 'react' {
  type FCwC<P = Record<string, unknown>> = React.FunctionComponent<P & { children?: ReactNode }>;
  type FCwCX<P = Record<string, unknown>> = React.FunctionComponent<
    P & { children?: ReactNode; className?: string }
  >;

  /** classNameを追加したファンクションコンポーネント型 */
  type FCX<P = Record<string, unknown>> = React.FunctionComponent<P & { className?: string }>;

  /** classNameを追加した子コンポーネントを含まないファンクションコンポーネント型 */
  type VFCX<P = Record<string, unknown>> = React.VFC<P & { className?: string }>;
}
