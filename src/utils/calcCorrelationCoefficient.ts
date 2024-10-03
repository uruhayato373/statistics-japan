export default function calcCorrelationCoefficient(
  data: Array<[number, number]>
) {
  const n = data.length
  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0,
    sumY2 = 0

  for (let i = 0; i < n; i++) {
    const [x, y] = data[i]
    sumX += x
    sumY += y
    sumXY += x * y
    sumX2 += x * x
    sumY2 += y * y
  }

  const numerator = n * sumXY - sumX * sumY
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
  )

  return numerator / denominator
}
