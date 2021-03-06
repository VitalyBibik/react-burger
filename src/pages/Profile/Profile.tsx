import style from './Profile.module.scss'
import React, { memo, SyntheticEvent, useEffect, useState } from 'react'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { ROUTES } from '../../utils/routes/routes'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { OrderHistory } from '../../components/OrdersHistory'
import { OrderHistoryDetailCard } from '../OrderHistoryDetailCard'
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks'
import { getUser, patchUser, signOut } from '../../services/ducks/auth'
import { Loader } from '../../components/Loader'
import { getRefreshToken } from '../../utils/functions/tokens'
import { getProfileData, getUserSending } from '../../services/ducks/auth/selectors'
import { wsActionsAuth, wsAuthInit } from '../../services/ducks/orders/slice'

import { getUserOrders } from '../../services/ducks/orders/selectors'

export const Profile = memo(() => {
  const { path, url } = useRouteMatch()
  const isCard = !!useRouteMatch(`${path}${ROUTES.ORDERS}`)
  const isOrderId = !!useRouteMatch(`${path}${ROUTES.ORDERS}/:id`)
  const [state, setState] = useState({
    name: 'user',
    email: 'user@mail.ru',
    password: '',
    emailIsDisabled: true,
    nameIsDisabled: true,
    passwordIsDisabled: true,
  })
  const dispatch = useAppDispatch()

  const isLoading = useAppSelector(getUserSending)
  const profileData = useAppSelector(getProfileData)
  const orders = useAppSelector(getUserOrders)

  const handleInputChange = (event: { target: HTMLInputElement }) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setState({
      ...state,
      [name]: value,
    })
  }
  const nameRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  const iconName = state.nameIsDisabled ? 'EditIcon' : 'CloseIcon'
  const iconEmail = state.emailIsDisabled ? 'EditIcon' : 'CloseIcon'
  const iconPassword = state.passwordIsDisabled ? 'EditIcon' : 'CloseIcon'

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault()
    let data = {}
    data = state.name !== profileData.user.name ? { ...data, name: state.name } : data
    data = state.email !== profileData.user.email ? { ...data, email: state.email } : data
    data = state.password.length !== 0 ? { ...data, password: state.password } : data
    dispatch(patchUser(data))
    dispatch(getUser())
  }

  const onIconClickName = () => {
    setTimeout(() => nameRef?.current?.focus(), 0)
    setState(prevState => {
      return { ...prevState, nameIsDisabled: !prevState.nameIsDisabled }
    })
  }
  const onIconEmail = () => {
    setTimeout(() => emailRef?.current?.focus(), 0)
    setState(prevState => {
      return { ...prevState, emailIsDisabled: !prevState.emailIsDisabled }
    })
  }
  const onIconClickPassword = () => {
    setTimeout(() => passwordRef?.current?.focus(), 0)
    setState(prevState => {
      return {
        ...prevState,
        passwordIsDisabled: !prevState.passwordIsDisabled,
      }
    })
  }
  const logout = () => {
    dispatch(signOut(getRefreshToken() as string))
  }
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault()
    setState({
      ...state,
      name: profileData.user.name,
      email: profileData.user.email,
      password: '',
      nameIsDisabled: true,
      emailIsDisabled: true,
      passwordIsDisabled: true,
    })
  }

  useEffect(() => {
    dispatch(getUser())
    setState(prevState => {
      return { ...prevState, email: prevState.email, name: prevState.name }
    })
  }, [dispatch])
  useEffect(() => {
    if (profileData) {
      setState(prevState => {
        return {
          ...prevState,
          email: profileData.user.email,
          name: profileData.user.name,
        }
      })
    }
  }, [profileData])
  useEffect(() => {
    dispatch(wsAuthInit())
    return () => {
      dispatch(wsActionsAuth.onClose)
    }
  }, [dispatch])

  const render = () => {
    return (
      <div className={style.box}>
        <div
          className={cn(
            {
              [style.container_hidden]: isOrderId,
            },
            style.container,
          )}
        >
          <div className={cn(style.links)}>
            <Route path={[`${path}`, `${path}${ROUTES.ORDERS}`]} exact>
              <NavLink to={url} exact className={cn('text text_type_main-default', style.link)} activeClassName={style.active}>
                ??????????????
              </NavLink>
              <NavLink to={`${url}${ROUTES.ORDERS}`} exact className={cn('text text_type_main-default', style.link)} activeClassName={style.active}>
                ?????????????? ??????????????
              </NavLink>
              <NavLink
                to={ROUTES.MAIN}
                exact
                className={cn('text text_type_main-default', style.link)}
                activeClassName={style.active}
                onClick={logout}
              >
                ??????????
              </NavLink>
            </Route>
            <Route path={`${path}`} exact>
              <span className={cn('text text_type_main-default text_color_inactive', style.info)}>
                ?? ???????? ?????????????? ???? ???????????? ???????????????? ???????? ???????????????????????? ????????????
              </span>
            </Route>
            <Route path={`${path}${ROUTES.ORDERS}`} exact>
              <span className={cn('text text_type_main-default text_color_inactive', style.info)}>
                ?? ???????? ?????????????? ???? ???????????? ?????????????????????? ???????? ?????????????? ??????????????
              </span>
            </Route>
          </div>
        </div>
        <ul
          className={cn(
            style.container,
            style.cards,
            {
              [style.cards_margin]: isCard,
            },
            {
              [style.cards_height]: !isCard,
            },
            'ml-15',
          )}
        >
          <Switch>
            <Route path={path} exact>
              <form className={style.login} onSubmit={submit}>
                <Input
                  onChange={handleInputChange}
                  type={'text'}
                  placeholder={'??????'}
                  value={state.name || ''}
                  name={'name'}
                  error={false}
                  errorText={'????????????'}
                  size={'default'}
                  icon={iconName}
                  onIconClick={onIconClickName}
                  ref={nameRef}
                  disabled={state.nameIsDisabled}
                />
                <Input
                  onChange={handleInputChange}
                  type={'text'}
                  placeholder={'??????????'}
                  value={state.email || ''}
                  name={'email'}
                  error={false}
                  errorText={'????????????'}
                  size={'default'}
                  icon={iconEmail}
                  onIconClick={onIconEmail}
                  ref={emailRef}
                  disabled={state.emailIsDisabled}
                />
                <Input
                  onChange={handleInputChange}
                  type={'password'}
                  placeholder={'????????????'}
                  value={state.password || ''}
                  name={'password'}
                  error={false}
                  errorText={'????????????'}
                  size={'default'}
                  icon={iconPassword}
                  onIconClick={onIconClickPassword}
                  ref={passwordRef}
                  disabled={state.passwordIsDisabled}
                />
                {profileData ? (
                  !isLoading && !(state.email === profileData.user.email && state.name === profileData.user.name && state.password.length === 0) ? (
                    <div className={style.buttons}>
                      {
                        <Button
                          type="secondary"
                          size="medium"
                          // @ts-ignore
                          onClick={(e: SyntheticEvent) => handleClick(e)}
                        >
                          ????????????
                        </Button>
                      }
                      <Button type="primary" size="medium">
                        C????????????????
                      </Button>
                    </div>
                  ) : null
                ) : null}
              </form>
            </Route>
            <Route path={`${path}${ROUTES.ORDERS}`} exact>
              {orders.map((el, index) => (
                <OrderHistory order={el} key={index} />
              ))}
            </Route>
          </Switch>
        </ul>
        <Switch>
          <Route path={`${path}${ROUTES.ORDERS}/:id`} exact>
            <OrderHistoryDetailCard />
          </Route>
        </Switch>
      </div>
    )
  }
  if (isLoading) return <Loader />
  return render()
})
