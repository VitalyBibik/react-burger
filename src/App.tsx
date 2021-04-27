import React from 'react';
import './App.scss';
import { AppHeader } from "./components/AppHeader";
import { BurgerUnion } from './components/BurgerUnion'

export function App() {
  return (
    <div className="App">
        <AppHeader />
        <BurgerUnion />
    </div>
  );
}


