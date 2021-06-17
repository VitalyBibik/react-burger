import React from 'react';
import style from './Error.module.scss';
import cn from 'classnames';

type ErrorProps = {
  msg: string;
};

export const Error = ({ msg }: ErrorProps) => (
  <span className={cn('text text_type_main-default', style.error)}>{msg}</span>
);
