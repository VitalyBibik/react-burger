import style from './Profile.module.scss'
import React, { memo, useRef, useState } from 'react';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { ROUTES } from "../../constants/routes";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { OrderHistory } from "../../components/OrdersHistory";
import { OrderHistoryDetailCard } from "../../components/OrderHistoryDetailCard";


type LoginProps = {
  close?: () => void
}

export const Profile = memo(({ close }: LoginProps) => {
  const { path, url } = useRouteMatch()
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const isCard = !!useRouteMatch(`${path}${ROUTES.ORDERS}`);
  const isOrderId = !!useRouteMatch(`${path}${ROUTES.ORDERS}/:id`)

  const onIconClick = () => {

  }

  return (
      <div className={style.box}>
        <div className={cn({
            [style.container_hiden]:isOrderId,
        }, style.container)}>
            <div className={cn(style.links)}>
                <Route path={[`${path}`, `${path}${ROUTES.ORDERS}`]} exact>
                    <NavLink to={url} exact className={cn('text text_type_main-default', style.link)} activeClassName={style.active}>Профиль</NavLink>
                    <NavLink to={`${url}${ROUTES.ORDERS}`} exact className={cn('text text_type_main-default', style.link)} activeClassName={style.active}>История заказов</NavLink>
                    <NavLink to={ROUTES.MAIN} exact className={cn('text text_type_main-default', style.link)} activeClassName={style.active}>Выход</NavLink>
                </Route>
            </div>
        </div>
        <ul className={cn(style.container, style.cards, {
            [style.cards_margin]: isCard,
        }, 'ml-15')}>
            <Switch>
                <Route path={path} exact>
                    <form className={style.login}>
                        <Input
                            onChange={e => setValue(e.target.value)}
                            type={'text'}
                            placeholder={'Имя'}
                            value={value}
                            name={'name'}
                            error={false}
                            ref={inputRef}
                            errorText={'Ошибка'}
                            size={'default'}
                            icon={"EditIcon"}
                        />
                        <Input
                            onChange={e => setValue(e.target.value)}
                            type={'text'}
                            placeholder={'Логин'}
                            value={value}
                            name={'login'}
                            error={false}
                            ref={inputRef}
                            errorText={'Ошибка'}
                            size={'default'}
                            icon={"EditIcon"}
                        />
                        <Input
                            onChange={e => setValue(e.target.value)}
                            type={'password'}
                            placeholder={'Пароль'}
                            value={value}
                            name={'name'}
                            error={false}
                            ref={inputRef}
                            errorText={'Ошибка'}
                            size={'default'}
                            icon={"EditIcon"}
                        />
                    </form>
                </Route>
                <Route path={`${path}${ROUTES.ORDERS}`} exact>
                    <OrderHistory />
                </Route>
            </Switch>
        </ul>
          <Switch>
              <Route path={`${path}${ROUTES.ORDERS}/:id`} exact>
                  <OrderHistoryDetailCard />
              </Route>
          </Switch>
      </div>
  );
})

