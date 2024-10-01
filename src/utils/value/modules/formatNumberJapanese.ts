const formatNumberJapanese = (
  value: string | number | null | undefined
): string => {
  if (value === null || value === undefined) return 'N/A'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return 'N/A'
  return num.toLocaleString('ja-JP')
}

export default formatNumberJapanese
