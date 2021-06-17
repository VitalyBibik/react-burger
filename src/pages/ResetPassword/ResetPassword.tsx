import style from './ResetPassword.module.scss';
import { memo, useEffect, useState } from 'react';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { ROUTES } from '../../utils/routes/routes';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, setUserPassword } from '../../services/ducks/auth';
import { getSetUserPasswordError } from '../../services/ducks/auth/selectors';
import { Error } from '../../components/Error';

export const ResetPassword = memo(() => {
  const [state, setState] = useState({
    password: '',
    token: '',
  });

  const handleInputChange = (event: { target: any }) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  };
  const errorUser = useSelector(getSetUserPasswordError);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(setUserPassword(state));
  };
  return (
    <div className={style.container}>
      <form className={style.login} onSubmit={submit}>
        <h2 className={cn('text text_type_main-medium', style.title)}>
          Восстановление пароля
        </h2>
        <PasswordInput
          onChange={handleInputChange}
          value={state.password}
          name={'password'}
        />
        <Input
          onChange={handleInputChange}
          type={'text'}
          placeholder={'Введите код из письма'}
          value={state.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type='primary' size='medium'>
          Сохранить
        </Button>
        {errorUser !== null ? <Error msg={errorUser.message} /> : null}
        <span
          className={cn(
            'text text_type_main-default text_color_inactive',
            'mt-20'
          )}
        >
          Вспомнили пароль?{' '}
          <Link to={ROUTES.LOGIN} className={style.move}>
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
});
