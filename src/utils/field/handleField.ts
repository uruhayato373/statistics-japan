import items from 'data/contents/field/fieldList.json'

/**
 * アプリケーション内で使用する分野情報の型定義
 * @property {string} fieldId - 分野ID
 * @property {string} fieldName - 分野名
 */
export type FieldType = {
  fieldId: string
  fieldTitle: string
}

/**
 * 分野情報を操作するためのユーティリティ関数
 */
const handleField = () => {
  return {
    items,
    findItem: (fieldId: string) => findItem(fieldId),
  }
}

/**
 * 指定された分野IDに対応する分野情報を取得
 * @param {string} fieldId - 分野ID
 * @returns {FieldType | undefined} 対応する分野情報
 */
const findItem = (fieldId: string): FieldType | undefined => {
  return items.find((f) => f.fieldId === fieldId)
}

export default handleField
