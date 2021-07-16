import Client from '@models/client'
import { MessageResponse, Position } from '@voyage/types'

type State = {
  client: Client
  position: Position
}[]

export default class View {
  constructor(id: string) {
    this.id = id
    this.state = []
  }

  id: string
  state: State

  clientJoin(client: Client): void {
    this.state.push({ client, position: [0, 0] })
  }

  clientMove(client: Client, position: Position): void {
    const i = this.getClientIndex(client)
    this.state[i].position = position
  }

  getClientIndex(client: Client): number {
    return this.state.findIndex(({ client: { id } }) => id === client.id)
  }
}
