const roundToDigit = (value: number, digit: number): number => {
  const multiplier = Math.pow(10, digit)
  return Math.round(value * multiplier) / multiplier
}

export default roundToDigit
