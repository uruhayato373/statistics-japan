const roundToDecimalPlaces = (
  value: number,
  decimalPlaces: number = 1
): number => {
  const multiplier = Math.pow(10, decimalPlaces)
  return Math.round(value * multiplier) / multiplier
}

export default roundToDecimalPlaces
