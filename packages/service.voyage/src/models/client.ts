import { v4 as uuid } from 'uuid'
import WebSocket from 'ws'
import { MessageResponse } from '@types'

export default class Client {
  constructor(ws: WebSocket) {
    this.id = uuid()
    this.ws = ws
    this.color = '@TODO'
  }

  id: string
  ws: WebSocket
  color: string

  send(payload: MessageResponse): void {
    const p = JSON.stringify(payload)
    this.ws.send(p)
  }
}
