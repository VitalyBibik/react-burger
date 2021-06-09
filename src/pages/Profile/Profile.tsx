import style from './Profile.module.scss'
import React, { memo, useRef, useState } from 'react';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { ROUTES } from "../../constants/routes";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { OrderHistory } from "../../components/OrdersHistory";
import { OrderHistoryDetailCard } from "../OrderHistoryDetailCard";


export const Profile = memo(() => {
  const { path, url } = useRouteMatch()
  const isCard = !!useRouteMatch(`${path}${ROUTES.ORDERS}`);
  const isOrderId = !!useRouteMatch(`${path}${ROUTES.ORDERS}/:id`)
  const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    })
    const handleInputChange = (event: { target: any; }) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setState({
            ...state,
            [name]: value
        });
    }
  const onIconClick = () => {
      alert('Icon Click')
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
                <Route path={`${path}`} exact>
                    <span className={cn('text text_type_main-default text_color_inactive', style.info)}>
                        В этом разделе вы можете
                        изменить свои персональные данные
                    </span>
                </Route>
                <Route path={`${path}${ROUTES.ORDERS}`} exact>
                    <span className={cn('text text_type_main-default text_color_inactive', style.info)}>
                   В этом разделе вы можете просмотреть свою историю заказов
                    </span>
                </Route>
            </div>
        </div>
        <ul className={cn(style.container, style.cards, {
            [style.cards_margin]: isCard,
        }, {
            [style.cards_height]: !isCard,
        }, 'ml-15')}>
            <Switch>
                <Route path={path} exact>
                    <form className={style.login}>
                        <Input
                            onChange={handleInputChange}
                            type={'text'}
                            placeholder={'Имя'}
                            value={state.name}
                            name={'name'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            icon={"EditIcon"}
                            onIconClick={onIconClick}
                        />
                        <Input
                            onChange={handleInputChange}
                            type={'text'}
                            placeholder={'Логин'}
                            value={state.email}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            icon={"EditIcon"}
                            onIconClick={onIconClick}
                        />
                        <Input
                            onChange={handleInputChange}
                            type={'password'}
                            placeholder={'Пароль'}
                            value={state.password}
                            name={'password'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            icon={"EditIcon"}
                            onIconClick={onIconClick}
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

