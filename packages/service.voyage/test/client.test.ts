import WebSocket from 'ws'
import Client from '../src/models/client'

describe('Client class', () => {
  const client = new Client({} as WebSocket)

  test('creating client', () => {
    expect(client.id).not.toBeUndefined()
  })
})
