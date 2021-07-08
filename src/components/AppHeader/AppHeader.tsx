import { FC, memo } from 'react'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import style from './AppHeader.module.scss'
import { NavLink, useRouteMatch } from 'react-router-dom'
import { ROUTES } from '../../utils/routes/routes'

export const AppHeader = memo(() => {
  const isConstructor = !!useRouteMatch({ path: ROUTES.MAIN, exact: true })
  const isFeed = !!useRouteMatch(ROUTES.FEED)
  const isProfile = !!useRouteMatch(ROUTES.PROFILE)

  return (
    <header className={cn(style.header, style.header__position)}>
      <div className={style.header__container}>
        <div className={style.container}>
          <div className={style.container__position}>
            <NavLink to={ROUTES.MAIN} activeClassName={style.activeLink} className={style.clearLink} exact>
              <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
              <span className={cn('text text_type_main-default', style['header__text-position'])}>Конструктор</span>
            </NavLink>
          </div>
          <NavLink to={ROUTES.FEED} activeClassName={style.activeLink} className={style.clearLink}>
            <ListIcon type={isFeed ? 'primary' : 'secondary'} />
            <span className={cn('text text_type_main-default', style['header__text-position'])}>Лента Заказов</span>
          </NavLink>
        </div>
        <div className={style.container__logo}>
          <Logo />
        </div>
        <div className={style.container}>
          <NavLink to={ROUTES.PROFILE} activeClassName={style.activeLink} className={style.clearLink}>
            <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
            <span className={cn('text text_type_main-default', style['header__text-position'])}>Личный Кабинет</span>
          </NavLink>
        </div>
      </div>
    </header>
  )
})
AppHeader.displayName = 'AppHeader'
