// 小数点以下の桁数を取得
function getDecimalPlaces(num: number | null | undefined): number {
  if (num === null || num === undefined || isNaN(num)) {
    return 0
  }
  const str = num.toString()
  if (str.includes('e')) {
    // 指数表記の場合
    const [, decimal] = str.split('e')
    return Math.abs(parseInt(decimal, 10))
  }
  const decimalPart = str.split('.')[1]
  return decimalPart ? decimalPart.length : 0
}

// 配列内の最大の小数点以下の桁数を取得
function getMaxDecimalPlaces(numbers: (number | null | undefined)[]): number {
  const validNumbers = numbers.filter(
    (num): num is number => num !== null && num !== undefined && !isNaN(num)
  )
  if (validNumbers.length === 0) {
    return 0
  }
  return Math.max(...validNumbers.map(getDecimalPlaces))
}

export default getMaxDecimalPlaces
