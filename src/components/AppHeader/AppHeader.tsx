import { memo } from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import style from './AppHeader.module.scss';

export const AppHeader = memo(() => (
  // Сделать наведения цветом, поменять праймари на другой

  <header className={cn(style.header, style.header__position)}>
    <div className={style.header__container}>
      <div className={style.container}>
        <div className={style.container__position}>
          <BurgerIcon type="primary" />
          <span
            className={cn(
              'text text_type_main-default',
              style['header__text-position']
            )}
          >
            Конструктор
          </span>
        </div>
        <ListIcon type="secondary" />
        <span
          className={cn(
            'text text_type_main-default',
            style['header__text-position']
          )}
        >
          Лента Заказов
        </span>
      </div>
      <div className={style.container__logo}>
        <Logo />
      </div>
      <div className={style.container}>
        <ProfileIcon type="secondary" />
        <span
          className={cn(
            'text text_type_main-default',
            style['header__text-position']
          )}
        >
          Личный Кабинет
        </span>
      </div>
    </div>
  </header>
));
