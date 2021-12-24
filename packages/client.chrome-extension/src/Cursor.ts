import { Position } from '@voyage/types'

export default class Cursor {
  clientId: string
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  dx: number
  dy: number

  constructor({
    clientId,
    ctx,
    position,
  }: {
    clientId: string
    ctx: CanvasRenderingContext2D
    position: Position
  }) {
    this.clientId = clientId
    this.ctx = ctx
    this.x = position[0]
    this.y = position[1]
    this.dx = 1
    this.dy = 1
  }

  move(position: Position): void {
    this.x = position[0]
    this.y = position[1]
  }

  draw(color = 'red'): void {
    this.ctx.beginPath()
    this.ctx.fillStyle = color
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2)
    this.ctx.fill()
  }

  animate(): void {
    this.draw()
  }
}
