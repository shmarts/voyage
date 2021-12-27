import { Server } from 'http'
import wsLoader from '@/loaders/ws'

export default async ({ httpServer }: { httpServer: Server }): Promise<void> => {
  wsLoader({ httpServer })
}
