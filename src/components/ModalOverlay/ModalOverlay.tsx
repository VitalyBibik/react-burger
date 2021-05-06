import style from './ModalOverlay.module.scss'

type ModalOverlayProps = {
  close: () => void
}

export const ModalOverlay = ({ close }:ModalOverlayProps) => {
  return (
    <div className={style.overlay} onClick={close}/>
  )
}

