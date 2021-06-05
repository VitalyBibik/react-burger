import style from './Profile.module.scss'
import { memo, useRef, useState } from 'react';
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";
import { ROUTES } from "../../constants/routes";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { NavLink } from "react-router-dom";

type LoginProps = {
  close?: () => void
}

export const Profile = memo(({ close }: LoginProps) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const onIconClick = () => {

  }
  return (
      <div className={style.box}>
        <div className={style.container}>
            <div className={style.links}>
                <NavLink to='/profile' exact className={cn('text text_type_main-default', style.link)} activeClassName={style.active}>Профиль</NavLink>
                <NavLink to='/profile/orders/:id' exact className={cn('text text_type_main-default', style.link)} activeClassName={style.active}>История заказов</NavLink>
                <NavLink to='/cabinet' exact className={cn('text text_type_main-default', style.link)} activeClassName={style.active}>Выход</NavLink>
            </div>
        </div>

        <div className={style.container}>
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
        </div>
      </div>
  );
})

