/**
 * 数値の配列の合計を計算する
 * @param {number[]} numbers - 合計を求める数値の配列
 * @returns {number} 合計値
 */
export const calcSum = (numbers: number[]): number => {
  return numbers.reduce((acc, cur) => acc + cur, 0)
}
