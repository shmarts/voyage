export type Position = [number, number]

export enum MessageType {
  Connect = 'CONNECT',
  Join = 'JOIN',
  Move = 'MOVE',
  Update = 'UPDATE',
}

export type MessageRequest = MessageConnectRequest | MessageJoinRequest | MessageMoveRequest

export type MessageResponse = MessageConnectResponse | MessageJoinResponse | MessageUpdateResponse

export type MessageConnectRequest = [MessageType.Connect]

export type MessageConnectResponse = [MessageType.Connect, MessageConnectResponsePayload]

export type MessageConnectResponsePayload = {
  clientId: string
}

export type MessageJoinRequest = [MessageType.Join, MessageJoinRequestPayload]

export type MessageJoinRequestPayload = {
  clientId: string
  viewId: string
}

export type MessageJoinResponse = [MessageType.Join, MessageJoinResponsePayload]

export type MessageJoinResponsePayload = {
  viewId: string
  clients: {
    id: string
    color: string
  }[]
}

export type MessageMoveRequest = [MessageType.Move, MessageMoveRequestPayload]

export type MessageMoveRequestPayload = {
  clientId: string
  viewId: string
  position: Position
}

export type MessageUpdateResponse = [MessageType.Update, MessageUpdateResponsePayload]

export type MessageUpdateResponsePayload = {
  viewId: string
  clients: {
    id: string
    position: Position
  }[]
}
