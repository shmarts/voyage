import WebSocket, { Server } from 'ws'
import Client from '@models/client'
import View from '@models/view'
import {
  MessageConnectResponse,
  MessageJoinRequestPayload,
  MessageJoinResponse,
  MessageMoveRequestPayload,
  MessageRequest,
  MessageType,
  MessageUpdateResponse,
} from '@voyage/types'

export default class WsService {
  constructor({ wsServer }: { wsServer: Server }) {
    this.wsServer = wsServer
    this.clients = {}
    this.views = {}
  }

  wsServer: Server
  clients: {
    [clientId: string]: Client
  }
  views: {
    [viewId: string]: View
  }

  init(): void {
    this.wsServer.on('connection', (ws) => {
      this.handleConnect(ws)

      ws.on('message', (m) => {
        const message: MessageRequest = JSON.parse(m.toString())
        if (message[0] === MessageType.Join) {
          this.handleMessageJoin(message[1])
        } else if (message[0] === MessageType.Move) {
          this.handleMessageMove(message[1])
        }
      })
    })

    setInterval(() => {
      this.broadcastState()
    }, 100)
  }

  handleConnect(ws: WebSocket): void {
    const client = new Client(ws)
    this.clients[client.id] = client
    const response: MessageConnectResponse = [MessageType.Connect, { clientId: client.id }]
    client.send(response)
  }

  handleMessageJoin(payload: MessageJoinRequestPayload): void {
    let view = this.views[payload.viewId]
    if (!view) {
      view = new View(payload.viewId)
      this.views[payload.viewId] = view
    }

    const client = this.clients[payload.clientId]
    view.clientJoin(client)

    const response: MessageJoinResponse = [
      MessageType.Join,
      {
        viewId: view.id,
        clients: view.state.map(({ client: { id, color } }) => ({ id, color })),
      },
    ]
    client.send(response)
  }

  handleMessageMove(payload: MessageMoveRequestPayload): void {
    const client = this.clients[payload.clientId]
    const view = this.views[payload.viewId]
    view.clientMove(client, payload.position)
  }

  broadcastState(): void {
    Object.values(this.views).forEach((view) => {
      const response: MessageUpdateResponse = [
        MessageType.Update,
        {
          viewId: view.id,
          state: view.state.map((s) => {
            return { clientId: s.client.id, position: s.position }
          }),
        },
      ]

      view.broadcast(response)
    })
  }
}
