import {
  blue, green, gold, lightGreen, ligthBlue, orange
} from './colors'

export const randomColor = () => {
  const paintbox = [blue, ligthBlue, green, lightGreen, gold, orange]
  const index = Math.floor(Math.random() * paintbox.length)
  return paintbox[index]
}
