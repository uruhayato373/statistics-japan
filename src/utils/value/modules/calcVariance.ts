import { calcAverage } from './calcAverage'

/**
 * 配列の分散を計算する
 * @param {number[]} numbers - 分散を求める数値の配列
 * @returns {number} 分散
 */
export const calcVariance = (numbers: number[]): number => {
  const n = numbers.length
  if (n === 0) return 0

  const mean = calcAverage(numbers)

  // 偏差の二乗の和を計算
  const squaredDifferencesSum = numbers.reduce((sum, x) => {
    const difference = x - mean
    return sum + difference * difference
  }, 0)

  // 分散を計算
  return squaredDifferencesSum / n
}
