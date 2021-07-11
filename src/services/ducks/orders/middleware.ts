import { getCookie } from '../../../utils/functions/cookies'
import { ISocketActions } from './slice'
import { AnyAction, MiddlewareAPI } from '@reduxjs/toolkit'

export const socketMiddleware = (wsUrl: string, wsActions: ISocketActions, auth: boolean) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store
      const { type, payload } = action
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions
      const token = auth ? getCookie('token') : null
      if (type === wsInit.toString()) {
        socket = token ? new WebSocket(`${wsUrl}?token=${token}`) : new WebSocket(`${wsUrl}`)
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen())
        }
        socket.onerror = () => {
          dispatch(onError('Error'))
        }
        socket.onmessage = event => {
          const { data } = event
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData
          dispatch(onMessage(restParsedData))
        }
        socket.onclose = () => {
          dispatch(onClose())
        }
        if (type === wsSendMessage.toString()) {
          const message = token ? { ...payload, token } : { ...payload }
          socket.send(JSON.stringify(message))
        }
      }

      next(action)
    }
  }
}
