import ReactDOM from 'react-dom'
import React, { memo, useEffect } from 'react'
import style from './Modal.module.scss'
import { ModalOverlay } from '../ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames'
import { useHistory } from 'react-router-dom'

type TModalProps = {
  children: React.ReactNode
  title?: string | null
}

const modalRoot = document.getElementById('modal') as HTMLElement

export const Modal = memo(({ title, children }: TModalProps) => {
  const clear = (e: KeyboardEvent) => {
    if (e.keyCode === 27) history.goBack()
  }
  const history = useHistory()

  const buttonClose = () => {
    history.goBack()
  }

  useEffect(() => {
    window.addEventListener('keydown', clear)
    return () => {
      window.removeEventListener('keydown', clear)
    }
  })
  return ReactDOM.createPortal(
    <>
      <div className={cn(style.modal, 'p-10')}>
        <div className={style.header}>
          {title && <h3 className={cn('text text_type_main-medium', style.title)}>{title}</h3>}
          <div className={style.iconClose} onClick={buttonClose}>
            <CloseIcon type={'primary'} />
          </div>
        </div>
        <div className={style.body}>{children}</div>
      </div>
      <ModalOverlay close={buttonClose} />
    </>,
    modalRoot,
  )
})
Modal.displayName = 'Modal'
