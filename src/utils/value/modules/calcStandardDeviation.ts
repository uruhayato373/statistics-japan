import { calcVariance } from './calcVariance'

/**
 * 配列の標準偏差を計算する
 * @param {number[]} numbers - 標準偏差を求める数値の配列
 * @returns {number} 標準偏差
 */
export const calcStandardDeviation = (numbers: number[]): number => {
  return Math.sqrt(calcVariance(numbers))
}

/**
 * 偏差値を計算する
 * @param {number} value - 偏差値を計算する対象の値
 * @param {number} average - 対象集団の平均値
 * @param {number} standardDeviation - 対象集団の標準偏差
 * @returns {number} 計算された偏差値
 */
export const calcDeviationValue = (
  value: number,
  average: number,
  standardDeviation: number
): number => {
  return ((value - average) / standardDeviation) * 10 + 50
}
