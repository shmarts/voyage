import config from '@/config'
import { Ref } from 'vue'
import {
  MessageJoinRequest,
  MessageMoveRequest,
  MessageRequest,
  MessageResponse,
  MessageType,
  Position,
} from '@voyage/types'

import { State } from '@/types'

export default ({
  url,
  position,
}: {
  url: Ref<string>
  position: Ref<Position>
}): { clientId: Ref<string>; state: Ref<State> } => {
  const clientId = ref('')
  const state = ref<State>([])

  const ws = new WebSocket(config.voyageWsUrl)

  ws.onmessage = (message) => {
    const res: MessageResponse = JSON.parse(message.data)
    console.log(res[0], res[1])
    if (res[0] === MessageType.Connect) {
      clientId.value = res[1].clientId
      messageJoin(url.value)
    } else if (res[0] === MessageType.Update) {
      state.value = res[1].state
    }
  }

  const send = (message: MessageRequest) => {
    ws.send(JSON.stringify(message))
  }

  const messageJoin = (viewId: string) => {
    const payload: MessageJoinRequest = [
      MessageType.Join,
      { clientId: clientId.value, viewId },
    ]
    send(payload)
  }

  const messageMove = (position: Position) => {
    const payload: MessageMoveRequest = [
      MessageType.Move,
      { clientId: clientId.value, viewId: url.value, position },
    ]
    send(payload)
  }

  watch(url, (val) => {
    messageJoin(val)
  })

  setInterval(() => {
    messageMove(position.value)
  }, 100)

  return {
    clientId,
    state,
  }
}
