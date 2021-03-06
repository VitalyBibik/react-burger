import style from './Login.module.scss'
import { memo, useEffect, useState } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { ROUTES } from '../../utils/routes/routes'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks'
import { loginUser, resetError } from '../../services/ducks/auth'
import { Error } from '../../components/Error'
import { getLoginError } from '../../services/ducks/auth/selectors'

export const Login = memo(() => {
  const [state, setState] = useState({
    login: '',
    password: '',
  })
  const dispatch = useAppDispatch()
  const errorUser = useAppSelector(getLoginError)
  const handleInputChange = (event: { target: HTMLInputElement }) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setState({
      ...state,
      [name]: value,
    })
  }

  const onIconClick = () => {
    alert('Icon Click')
  }
  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(loginUser(state))
  }
  useEffect(() => {
    dispatch(resetError())
  }, [dispatch])

  return (
    <div className={style.container}>
      <form className={style.login} onSubmit={submit}>
        <h2 className={cn('text text_type_main-medium', style.title)}>Вход</h2>
        <Input
          onChange={handleInputChange}
          type={'text'}
          placeholder={'E-mail'}
          value={state.login}
          name={'login'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          onIconClick={onIconClick}
        />
        <PasswordInput value={state.password} name={'password'} onChange={handleInputChange} />
        <Button type="primary" size="medium">
          Войти
        </Button>
        {errorUser !== null ? <Error msg={errorUser} /> : null}
        <span className={cn('text text_type_main-default text_color_inactive', 'mt-20')}>
          Вы — новый пользователь?{' '}
          <Link to={ROUTES.REGISTER} className={style.move}>
            Зарегистрироваться
          </Link>
        </span>
        <span className="text text_type_main-default text_color_inactive">
          Забыли пароль?{' '}
          <Link to={ROUTES.FORGOT_PASSWORD} className={style.move}>
            Восстановить пароль
          </Link>
        </span>
      </form>
    </div>
  )
})
