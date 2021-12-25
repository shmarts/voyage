import { Position } from '@voyage/types'

export default class Cursor {
  clientId: string
  ctx: CanvasRenderingContext2D
  x: number
  velX: number
  y: number
  velY: number

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
    this.velX = 0
    this.y = position[1]
    this.velY = 0
  }

  move(position: Position, timeDelta: number): void {
    this.velX = this.x - position[0]
    if (position[0] !== this.x) {
      this.x -= this.velX * timeDelta
    }

    this.velY = this.y - position[1]
    if (position[0] !== this.y) {
      this.y -= this.velY * timeDelta
    }
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
