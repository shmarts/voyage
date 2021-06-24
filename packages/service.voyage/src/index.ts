import { createServer } from 'http'
import WebSocket from 'ws'
import config from './config'

const server = createServer()
const wss = new WebSocket.Server({ server })

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received', message)
  })

  ws.send('you are connected')
})

server.listen(config.port, () => {
  console.log(`Listening on ${config.port}`)
})
