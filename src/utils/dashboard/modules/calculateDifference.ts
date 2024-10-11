const calculateDifference = (
  currentValue: number,
  previousValue?: number,
  decimalPlaces?: number
): number => {
  const difference = currentValue - previousValue
  return Number(difference.toFixed(decimalPlaces))
}

export default calculateDifference
