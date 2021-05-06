import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import style from './Modal.module.scss'
import { ModalOverlay } from '../ModalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';


const modalRoot = document.getElementById('modal') as HTMLElement;

type ModalProps = {
  setModal: any,
  buttonClose:() => void,
  children: React.ReactNode,
  title:string | null,

}


export const Modal = ({ title, buttonClose, children, setModal }: ModalProps) => {

  const clear = (e:any) => {
      if (e.keyCode === 27)
        setModal({
          isShow: false,
          title: null,
          content: null,
        })
    };

  useEffect(() => {
    window.addEventListener('keydown', clear)
    return () => {
      window.removeEventListener('keydown', clear)
    }
  })
  return ReactDOM.createPortal(
    (
      <>
        <div className={cn(style.modal, 'p-10')}>
          <div className={style.header}>
            {   title &&
            <h3 className={cn('text text_type_main-medium', style.title)}>{title}</h3>
            }
            <div className={style.iconClose} onClick={buttonClose}><CloseIcon type={'primary'}/></div>
          </div>
          <div className={style.body}>
            {children}
          </div>
        </div>
        <ModalOverlay close={buttonClose}/>
      </>
    ),
    modalRoot
  )
}

