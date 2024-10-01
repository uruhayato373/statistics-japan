// 小数点以下の桁数を取得
function getDecimalPlaces(num: number): number {
  if (Math.floor(num) === num) return 0
  const decimalPart = num.toString().split('.')[1]
  return decimalPart ? decimalPart.length : 0
}

// 配列内の最大の小数点以下の桁数を取得
function getMaxDecimalPlaces(numbers: number[]): number {
  return Math.max(...numbers.map(getDecimalPlaces))
}

export default getMaxDecimalPlaces
