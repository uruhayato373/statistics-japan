import { DocumentType } from 'utils/e-stat'

/**
 * ダッシュボードの単一コンテンツの型定義
 * @interface DashboardSingleContentsType
 */
export interface DashboardSingleContentsType {
  name: string
  curTimeName: string
  preTimeName: string
  curValue: number
  preValue: number
  rate: number // 増減率（%）
  difference: number // 増減値
  unit: string
}

/**
 * フォーマット関数の引数の型定義
 * @interface Args
 * @extends {DocumentType}
 */
interface Args extends DocumentType {
  digit: number // 小数点以下の桁数
}

/**
 * 増減率を計算する関数
 * @param {number} current - 現在の値
 * @param {number} previous - 前回の値
 * @returns {number} 増減率（%）
 */
const calculateRate = (current: number, previous: number): number =>
  current === 0 || previous === 0
    ? 0
    : Math.round(((current - previous) / previous) * 1000) / 10

/**
 * 指定された桁数で数値を丸める関数
 * @param {number} value - 丸める値
 * @param {number} digit - 小数点以下の桁数
 * @returns {number} 丸められた値
 */
const roundToDigit = (value: number, digit: number): number => {
  const multiplier = Math.pow(10, digit)
  return Math.round(value * multiplier) / multiplier
}

/**
 * ダッシュボードの単一コンテンツをフォーマットする関数
 * @param {Args} args - フォーマットに必要な引数
 * @returns {DashboardSingleContentsType} フォーマットされたダッシュボードコンテンツ
 * @throws {Error} カテゴリー数が1でない場合にエラーを投げる
 */
const formatDashboardSingle = ({
  categories,
  values,
  digit = 0,
}: Args): DashboardSingleContentsType => {
  // カテゴリーが1つであることを確認
  if (categories.length !== 1) {
    throw new Error(
      `予期しないカテゴリー数です: ${categories.length}。1つのカテゴリーが必要です。`
    )
  }

  // 有効な値をフィルタリングし、時間コードで降順にソート
  const sortedValues = values
    .filter((f) => !Number.isNaN(f.value))
    .sort((a, b) => b.timeCode.localeCompare(a.timeCode))

  console.log(sortedValues)

  const [curValue, preValue] = sortedValues

  // 増減値を計算し、指定された桁数で丸める
  const difference = roundToDigit(curValue.value - preValue.value, digit)

  return {
    name: categories[0].categoryName,
    curTimeName: curValue.timeName,
    preTimeName: preValue.timeName,
    curValue: curValue.value,
    preValue: preValue.value,
    rate: calculateRate(curValue.value, preValue.value),
    difference,
    unit: curValue.unit,
  }
}

export default formatDashboardSingle
