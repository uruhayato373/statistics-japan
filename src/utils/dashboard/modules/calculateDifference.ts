const calculateDifference = (
  currentValue: number,
  previousValue?: number
): number => {
  return previousValue !== undefined ? currentValue - previousValue : 0
}

export default calculateDifference
