import input from './input'
import { modulo, bigIntChineseRemainder } from '../../../lib'

const getBusTimes = () => {
  let [departureTime, rawBuses] = input.split('\n')
  departureTime = parseInt(departureTime)

  const buses = rawBuses
    .split(',')
    .filter((bus) => bus !== 'x')
    .map(Number)

  return [departureTime, buses]
}

const getBusTimesWithOffset = () => {
  let [_, rawBuses] = input.split('\n')
  return rawBuses
    .split(',')
    .map((x, i) => [x, i])
    .filter(([x, i]) => x !== 'x')
    .map(([x, i]) => [+x, i])
}

const getEarliestBusTime = (input) => {
  let minTime = Infinity
  let busId

  const [departureTime, buses] = input

  for (const bus of buses) {
    let time = departureTime
    while (time <= departureTime + bus) {
      if (time % bus === 0 && time < minTime) {
        minTime = time
        busId = bus

        break
      }

      time++
    }
  }

  return busId * (minTime - departureTime)
}

const part1 = () => {
  const busTimes = getBusTimes()
  return `The earliest bus multiplied by the minutes waiting is ${getEarliestBusTime(
    busTimes
  )}`
}

const part2 = () => {
  const busTimes = getBusTimesWithOffset()

  const N = busTimes.map(([bus, offset]) => BigInt(bus))
  const A = busTimes.map(([bus, offset]) => BigInt(modulo(-offset, bus)))

  return `The earliest timestamp that all buses depart at offsets is ${Number(
    bigIntChineseRemainder(A, N)
  )}.`
}

export default {
  part1,
  part2,
}
