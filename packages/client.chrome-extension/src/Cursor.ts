import { Position } from '@voyage/types'
import { colors } from '@/colors'

export default class Cursor {
  clientId: string
  color: keyof typeof colors
  ctx: CanvasRenderingContext2D
  x: number
  velX: number
  y: number
  velY: number

  constructor({
    clientId,
    color,
    ctx,
    position,
  }: {
    clientId: string
    color: keyof typeof colors
    ctx: CanvasRenderingContext2D
    position: Position
  }) {
    this.clientId = clientId
    this.color = color
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

  draw(): void {
    const color = colors[this.color]
    const x = (n: number) => `${this.x + n}`
    const y = (n: number) => `${this.y + n}`
    const path = new Path2D(
      `M${x(9)} ${y(23)}
      L${x(0)} ${y(0)}
      L${x(23)} ${y(9)}
      L${x(14)} ${y(14)}
      L${x(9)} ${y(23)}Z`,
    )
    this.ctx.fillStyle = color.fill
    this.ctx.fill(path)
    this.ctx.strokeStyle = color.stroke
    this.ctx.lineWidth = 1
    this.ctx.stroke(path)
    this.ctx.shadowColor = color.fill
    this.ctx.shadowBlur = 6
    this.ctx.shadowOffsetX = 1
    this.ctx.shadowOffsetY = 2
  }
}
