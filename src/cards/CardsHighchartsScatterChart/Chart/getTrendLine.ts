export default function getTrendLine(
  data: Array<[number, number]>
): Array<[number, number]> {
  const n = data.length

  let sumX = 0,
    sumY = 0,
    sumXY = 0,
    sumX2 = 0

  // Calculate the sums needed for linear regression
  for (let i = 0; i < n; i++) {
    const [x, y] = data[i]
    sumX += x
    sumY += y
    sumXY += x * y
    sumX2 += x ** 2
  }

  // Calculate the slope of the trend line
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2)

  // Calculate the intercept of the trend line
  const intercept = (sumY - slope * sumX) / n

  const trendline: Array<[number, number]> = []

  // Find the minimum and maximum x-values from the scatter plot data
  const minX = Math.min(...data.map(([x]) => x))
  const maxX = Math.max(...data.map(([x]) => x))

  // Calculate the corresponding y-values for the trend line using the slope
  // and intercept
  trendline.push([minX, minX * slope + intercept])
  trendline.push([maxX, maxX * slope + intercept])

  return trendline
}
