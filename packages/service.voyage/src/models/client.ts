import { v4 as uuid } from 'uuid'
import WebSocket from 'ws'
import { MessageResponse } from '@voyage/types'

export default class Client {
  id: string
  ws: WebSocket

  constructor(ws: WebSocket) {
    this.id = uuid()
    this.ws = ws
  }

  send(payload: MessageResponse): void {
    const p = JSON.stringify(payload)
    this.ws.send(p)
  }
}
