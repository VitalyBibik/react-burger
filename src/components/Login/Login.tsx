import style from './Login.module.scss'
import { memo, useRef, useState } from 'react';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";

type LoginProps = {
  close?: () => void
}

export const Login = memo(({ close }: LoginProps) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const onIconClick = () => {

  }
  return (
      <div className={style.container}>
        <form className={style.login}>
          <h2 className={cn('text text_type_main-medium', style.title)}>
            Вход
          </h2>
          <Input
              onChange={e => setValue(e.target.value)}
              type={'text'}
              placeholder={'E-mail'}
              value={value}
              name={'email'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
          />
          <PasswordInput
              onChange={e => setValue(e.target.value)}
              value={value}
              name={'password'}
          />
          <Button type="primary" size="small">
            Войти
          </Button>
          <span className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь? <Link to={ROUTES.REGISTER} className={style.move}>Зарегистрироваться</Link>
          </span>
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль? <Link to={ROUTES.PROFILE} className={style.move}>Зарегистрироваться</Link>
          </span>
        </form>
      </div>

  );
})

