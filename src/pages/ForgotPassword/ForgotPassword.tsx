import style from './ForgotPassword.module.scss'
import { memo, useRef, useState } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { ROUTES } from "../../constants/routes";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../utils/api";

export const ForgotPassword = memo(() => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const onIconClick = () => {
    alert('Icon Click')
  }

  const submit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await forgotPassword(value)
      console.log(res)
    }
    catch (e) {
      console.log(e)
    }
  };
  return (
      <div className={style.container}>
        <form className={style.login} onSubmit={submit}>
          <h2 className={cn('text text_type_main-medium', style.title)}>
            Восстановление пароля
          </h2>
          <Input
              onChange={e => setValue(e.target.value)}
              type={'text'}
              placeholder={'Укажите e-mail'}
              value={value}
              name={'email'}
              error={false}
              ref={inputRef}
              errorText={'Ошибка'}
              size={'default'}
              onIconClick = {onIconClick}
          />
          <Button type="primary" size="medium">
            Восстановить
          </Button>
          <span className={cn("text text_type_main-default text_color_inactive", 'mt-20')}>
            Вспомнили пароль? <Link to={ROUTES.LOGIN} className={style.move}>Войти</Link>
          </span>
        </form>
      </div>
  );
})

