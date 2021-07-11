import style from './ForgotPassword.module.scss'
import { memo, useEffect, useState } from 'react'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { ROUTES } from '../../utils/routes/routes'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from '../../services/hooks/hooks'
import { forgotUserPassword, resetError } from '../../services/ducks/auth'
import { getForgotPasswordError } from '../../services/ducks/auth/selectors'
import { Error } from '../../components/Error'

export const ForgotPassword = memo(() => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const errorUser = useSelector(getForgotPasswordError)

  useEffect(() => {
    dispatch(resetError())
  }, [dispatch])

  const submit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(forgotUserPassword(value))
  }
  return (
    <div className={style.container}>
      <form className={style.login} onSubmit={submit}>
        <h2 className={cn('text text_type_main-medium', style.title)}>Восстановление пароля</h2>
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
        {errorUser !== null ? <Error msg={errorUser} /> : null}
        <span className={cn('text text_type_main-default text_color_inactive', 'mt-20')}>
          Вспомнили пароль?{' '}
          <Link to={ROUTES.LOGIN} className={style.move}>
            Войти
          </Link>
        </span>
      </form>
    </div>
  )
})
