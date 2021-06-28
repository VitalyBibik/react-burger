import { getCookie } from '../../../utils/functions/cookies';

export const socketMiddleware = (wsUrl: string, wsActions: any, auth: any) => {
  return (store: { dispatch: any }) => {
    let socket: WebSocket | null = null;

    return (next: (arg0: { type: any; payload: any }) => void) =>
      (action: { type: any; payload: any }) => {
        const { dispatch } = store;
        const { type, payload } = action;
        const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
          wsActions;
        const token = auth ? getCookie : null;
        if (type === wsInit.toString()) {
          socket = token
            ? new WebSocket(`${wsUrl}?token=${token}`)
            : new WebSocket(`${wsUrl}`);
          console.log(socket, 's');
        }
        if (socket) {
          socket.onopen = () => {
            dispatch(onOpen());
          };
          socket.onerror = (event) => {
            dispatch(onError(event));
          };
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success, ...restParsedData } = parsedData;
            dispatch(onMessage(restParsedData));
          };
          socket.onclose = () => {
            dispatch(onClose());
          };
          if (type === wsSendMessage.toString()) {
            const message = token ? { ...payload, token } : { ...payload };
            socket.send(JSON.stringify(message));
          }
        }

        next(action);
      };
  };
};
