import { Color } from '@voyage/types'

export const colors: Record<Color, { stroke: string; fill: string }> = {
  pink: { stroke: 'rgba(192, 36, 255)', fill: 'rgba(225, 150, 255)' },
  green: { stroke: 'rgba(0, 201, 27)', fill: 'rgba(122, 255, 140)' },
  blue: { stroke: 'rgba(0, 129, 184)', fill: 'rgba(79, 202, 255)' },
  red: { stroke: 'rgba(158, 0, 0)', fill: 'rgba(255, 117, 117)' },
  orange: { stroke: 'rgba(242, 149, 0)', fill: 'rgba(255, 205, 125)' },
} as const

export const getRandomColor = (): Color => {
  const keys = Object.keys(Color) as Color[]
  const randomKey = keys[Math.floor(Math.random() * keys.length)]
  return Color[randomKey]
}
