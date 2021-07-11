import style from './Register.module.scss'
import { memo, useEffect, useState } from 'react'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { ROUTES } from '../../utils/routes/routes'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from '../../services/hooks/hooks'
import { registerUser, resetError } from '../../services/ducks/auth'
import { getRegisterError } from '../../services/ducks/auth/selectors'
import { Error } from '../../components/Error'

export const Register = memo(() => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  })
  const dispatch = useDispatch()
  const errorUser = useSelector(getRegisterError)
  const handleInputChange = (event: { target: HTMLInputElement }) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setState({
      ...state,
      [name]: value,
    })
  }
  useEffect(() => {
    dispatch(resetError())
  }, [dispatch])
  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(registerUser(state))
  }
  return (
    <div className={style.container}>
      <form className={style.login} onSubmit={submit}>
        <h2 className={cn('text text_type_main-medium', style.title)}>Регистрация</h2>
        <Input
          onChange={handleInputChange}
          type={'text'}
          placeholder={'Имя'}
          value={state.name}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          onChange={handleInputChange}
          type={'text'}
          placeholder={'E-mail'}
          value={state.email}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput onChange={handleInputChange} value={state.password} name={'password'} />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        {errorUser !== null ? <Error msg={errorUser} /> : null}
        <span className={cn('text text_type_main-default text_color_inactive', 'mt-20')}>
          Уже зарегистрированы?{' '}
          <Link to={ROUTES.LOGIN} className={style.move}>
            Войти
          </Link>
        </span>
      </form>
    </div>
  )
})
