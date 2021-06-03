import style from './ResetPassword.module.scss'
import { memo, useRef, useState } from 'react';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";

type LoginProps = {
  close?: () => void
}

export const ResetPassword = memo(({ close }: LoginProps) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const onIconClick = () => {

  }
  return (
      <div className={style.container}>
        <form className={style.login}>
          <h2 className={cn('text text_type_main-medium', style.title)}>
            Восстановление пароля
          </h2>
          <PasswordInput
              onChange={e => setValue(e.target.value)}
              value={value}
              name={'password'}
          />
          <Input
              onChange={e => setValue(e.target.value)}
              type={'text'}
              placeholder={'Введите код из письма'}
              value={value}
              name={'code'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
          />
          <Button type="primary" size="medium">
            Сохранить
          </Button>
          <span className={cn("text text_type_main-default text_color_inactive", 'mt-20')}>
            Вспомнили пароль? <Link to={ROUTES.LOGIN} className={style.move}>Войти</Link>
          </span>
        </form>
      </div>

  );
})

