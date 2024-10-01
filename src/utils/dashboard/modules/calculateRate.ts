const calculateRate = (current: number, previous: number): number =>
  current === 0 || previous === 0
    ? 0
    : Math.round(((current - previous) / previous) * 1000) / 10

export default calculateRate
