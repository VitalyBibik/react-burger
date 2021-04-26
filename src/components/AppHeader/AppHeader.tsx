import React from 'react'
import styles from './AppHeader.module.scss'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from 'classnames'

export const AppHeader = () => {
   return (
     <header className={cn(styles.header, styles['header__position'])}>
       <div className={styles.container}>
         <BurgerIcon type="primary" /><span className={cn('text text_type_main-default', styles['header__text-position'])}>Конструктор</span>
         <ListIcon type="primary" /><span className={cn('text text_type_main-default', styles['header__text-position'])}>Лента Заказов</span>
       </div>
        <Logo />
       <div className={styles.container}>
         <ProfileIcon type="primary" /><span className={cn('text text_type_main-default', styles['header__text-position'])}>Личный Кабинет</span>
       </div>
    </header>
   )

}
