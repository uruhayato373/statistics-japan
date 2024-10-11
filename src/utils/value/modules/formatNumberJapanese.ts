const formatNumberJapanese = (
  number: string | number | null | undefined
): string => {
  if (number === null || number === undefined) return ''
  const num = typeof number === 'string' ? parseFloat(number) : number
  if (isNaN(num)) return ''
  return num.toLocaleString('ja-JP', {
    minimumFractionDigits: (number.toString().split('.')[1] || '').length,
    maximumFractionDigits: 20,
  })
}

export default formatNumberJapanese
