import style from './ModalOverlay.module.scss';
import { memo } from 'react';

type ModalOverlayProps = {
  close?: () => void;
};

export const ModalOverlay = memo(({ close }: ModalOverlayProps) => {
  return <div className={style.overlay} onClick={close} />;
});
