import style from './ModalOverlay.module.scss'
import { memo } from 'react'

type TModalOverlayProps = {
  close?: () => void
}

export const ModalOverlay = memo(({ close }: TModalOverlayProps) => {
  return <div className={style.overlay} onClick={close} />
})

ModalOverlay.displayName = 'ModalOverlay'
