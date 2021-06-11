import style from './ForgotPassword.module.scss'
import { memo, useState } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { ROUTES } from "../../utils/routes/routes";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { forgotUserPassword } from "../../services/ducks/auth";

export const ForgotPassword = memo(() => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const submit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(forgotUserPassword(value))
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
              errorText={'Ошибка'}
              size={'default'}
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

