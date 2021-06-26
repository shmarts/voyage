import WebSocket from 'ws'
import View from '../src/models/view'
import Client from '../src/models/client'

describe('View class', () => {
  const view = new View('example.com')

  test('creating view for given url', () => {
    expect(view.id).toBe('example.com')
    expect(view.state.length).toBe(0)
  })

  test('client joining a view', () => {
    const client = new Client({} as WebSocket)
    view.clientJoin(client)
    expect(view.state.length).toBe(1)
  })
})
