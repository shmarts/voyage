import { createServer } from 'http'
import config from '@/config'
import loaders from '@/loaders'

const start = async () => {
  const httpServer = createServer()

  await loaders({ httpServer })

  httpServer.listen(config.port, () => {
    console.log(`Listening on ${config.port}`)
  })
}

start()
