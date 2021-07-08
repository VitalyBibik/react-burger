import React, { FC } from 'react'
import style from './Error.module.scss'
import cn from 'classnames'

type TErrorProps = {
  msg: string
}

export const Error: FC<TErrorProps> = ({ msg }) => <span className={cn('text text_type_main-default', style.error)}>{msg}</span>
