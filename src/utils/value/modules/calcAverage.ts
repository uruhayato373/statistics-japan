import { calcSum } from './calcSum'
import getMaxDecimalPlaces from './getMaxDecimalPlaces'
import roundToDecimalPlaces from './roundToDecimalPlaces'

/**
 * 数値の配列の平均を計算する
 * @param {number[]} numbers - 平均を求める数値の配列
 * @returns {number} 平均値
 * @throws {Error} 配列が空の場合やNaNを含む場合
 */
export const calcAverage = (numbers: number[]): number => {
  if (numbers.length === 0) {
    throw new Error('空の配列の平均は計算できません。')
  }

  if (numbers.some(isNaN)) {
    throw new Error('配列にNaNが含まれています。')
  }

  const sum = calcSum(numbers)
  const average = sum / numbers.length
  const maxDecimalPlaces = getMaxDecimalPlaces(numbers)

  return roundToDecimalPlaces(average, maxDecimalPlaces)
}
