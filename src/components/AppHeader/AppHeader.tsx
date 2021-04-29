import React, { memo } from 'react'
import styles from './AppHeader.module.scss'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import cn from 'classnames'

export const AppHeader = memo(() => {
  // Сделать наведения цветом, поменять праймари на другой
   return (
     <header className={cn(styles.header, styles['header__position'])}>
       <div className={styles.container}>
         <div className={styles['container__position']}>
           <BurgerIcon type="primary" /><span className={cn('text text_type_main-default', styles['header__text-position'])}>Конструктор</span>
         </div>
         <ListIcon type="primary" /><span className={cn('text text_type_main-default', styles['header__text-position'])}>Лента Заказов</span>
       </div>
       <div className={styles['container__logo']}><Logo /></div>
       <div className={styles.container}>
         <ProfileIcon type="primary" /><span className={cn('text text_type_main-default', styles['header__text-position'])}>Личный Кабинет</span>
       </div>
    </header>
   )

})
