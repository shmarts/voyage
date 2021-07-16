import { v4 as uuid } from 'uuid'
import WebSocket from 'ws'
import { MessageResponse } from '@voyage/types'

export default class Client {
  id: string
  ws: WebSocket
  color: string

  constructor(ws: WebSocket) {
    this.id = uuid()
    this.ws = ws
    this.color = '@TODO'
  }

  send(payload: MessageResponse): void {
    const p = JSON.stringify(payload)
    this.ws.send(p)
  }
}
