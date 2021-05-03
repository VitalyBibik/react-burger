import React from 'react';
import cn from 'classnames';
import style from './Popup.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const Popup = ({open}: any) => {
  console.log(open)
  return (
   <div className={style.container}>
     <CloseIcon type="primary" />
     <p className={cn("text text_type_digits-large", style['container__digits'])}>03456</p>
   </div>
  );
};
