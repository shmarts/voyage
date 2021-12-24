import {
  MessageJoinRequest,
  MessageLeaveRequest,
  MessageMoveRequest,
  MessageRequest,
  MessageResponse,
  MessageType,
  Position,
  ViewState,
} from '@voyage/types'
import { defineStore } from 'pinia'
import config from './config'

type StoreState = {
  clientId: string
  ws?: WebSocket
  url?: string
  viewState: ViewState
}

export const useStore = defineStore('store', {
  state: (): StoreState => {
    return {
      clientId: '',
      ws: undefined,
      url: '',
      viewState: [],
    }
  },
  getters: {
    connectedClientIds: (state) => state.viewState.map((s) => s.clientId),
    filteredViewState: (state) => state.viewState.filter((s) => s.clientId !== state.clientId),
  },
  actions: {
    connect(url: string) {
      this.url = url
      this.ws = new WebSocket(config.voyageWsUrl)
      this.ws.onmessage = (message) => {
        const res: MessageResponse = JSON.parse(message.data)
        if (res[0] === MessageType.Connect) {
          this.clientId = res[1].clientId
          this.messageJoin(url)
        } else if (res[0] === MessageType.Update) {
          this.viewState = res[1].state
        }
      }
    },

    send(message: MessageRequest) {
      this.ws?.send(JSON.stringify(message))
    },

    messageJoin(viewId: string) {
      const payload: MessageJoinRequest = [MessageType.Join, { clientId: this.clientId, viewId }]
      this.send(payload)
    },

    messageLeave() {
      const payload: MessageLeaveRequest = [
        MessageType.Leave,
        { clientId: this.clientId, viewId: this.url! },
      ]
      this.send(payload)
    },

    messageMove(position: Position) {
      const payload: MessageMoveRequest = [
        MessageType.Move,
        { clientId: this.clientId, viewId: this.url!, position },
      ]
      this.send(payload)
    },
  },
})
