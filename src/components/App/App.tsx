import React from 'react';
import style from './App.module.scss';
import { AppHeader } from '../AppHeader';
import { BurgerUnion } from '../BurgerUnion';

export function App() {
  return (
    <div className={style.App}>
      <AppHeader />
      <BurgerUnion />
    </div>
  );
}
