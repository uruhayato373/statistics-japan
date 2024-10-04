/**
 * 数値の配列の合計を計算する
 * @param {number[]} numbers - 合計を求める数値の配列
 * @returns {number} 合計値
 */
export const calcSum = (numbers: number[]): number => {
  return numbers.reduce((acc, cur) => acc + cur, 0)
}

/**
 * 数値の配列の平均を計算する
 * @param {number[]} numbers - 平均を求める数値の配列
 * @returns {number} 平均値
 */
export const calcAverage = (numbers: number[]): number => {
  return calcSum(numbers) / numbers.length
}

/**
 * 配列の中央値を計算する
 * @param {number[]} numbers - 中央値を求める数値の配列
 * @returns {number} 中央値
 */
export const calcMedian = (numbers: number[]): number => {
  if (numbers.length === 0) return 0

  const sorted = numbers.slice().sort((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  } else {
    return sorted[middle]
  }
}

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
