const formatNumberJapanese = (
  number: string | number | null | undefined
): string => {
  if (number === null || number === undefined) return 'N/A'
  const num = typeof number === 'string' ? parseFloat(number) : number
  if (isNaN(num)) return 'N/A'
  return num.toLocaleString('ja-JP', {
    minimumFractionDigits: (number.toString().split('.')[1] || '').length,
    maximumFractionDigits: 20,
  })
}

export default formatNumberJapanese
