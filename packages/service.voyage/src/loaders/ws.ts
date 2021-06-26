import WsService from '@ws'
import { Server as HttpServer } from 'http'
import { Server as WsServer } from 'ws'

export default ({ httpServer }: { httpServer: HttpServer }): WsServer => {
  const wsServer = new WsServer({ server: httpServer })
  const service = new WsService({ wsServer })
  service.init()
  return wsServer
}
