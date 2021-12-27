import { MessageResponse, Position } from '@voyage/types'
import Client from '@/models/client'

type State = {
  client: Client
  position: Position
}[]

export default class View {
  id: string
  state: State

  constructor(id: string) {
    this.id = id
    this.state = []
  }

  clientJoin(client: Client): void {
    this.state.push({ client, position: [0, 0] })
  }

  clientLeave(client: Client): void {
    const i = this.getClientIndex(client)
    this.state.splice(i, 1)
  }

  clientMove(client: Client, position: Position): void {
    const i = this.getClientIndex(client)
    this.state[i].position = position
  }

  getClientIndex(client: Client): number {
    return this.state.findIndex(({ client: { id } }) => id === client.id)
  }

  broadcast(message: MessageResponse): void {
    this.state.forEach((s) => s.client.send(message))
  }
}
