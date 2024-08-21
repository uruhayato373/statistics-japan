import items from 'data/kind/kindList.json'

/**
 * アプリケーション内で使用する種類情報の型定義
 * @property {string} kindId - 種類ID
 * @property {string} kindTitle - 種類タイトル
 */
export type KindType = {
  kindId: string
  kindTitle: string
}

/**
 * 種類情報を操作するためのユーティリティ関数
 */
const handleKind = () => {
  return {
    items,
    findItem: (kindId: string) => findItem(kindId),
  }
}

/**
 * 指定された種類IDに対応する種類情報を取得
 * @param {string} kindId - 種類ID
 * @returns {KindType | undefined} 対応する種類情報。
 */
const findItem = (kindId: string): KindType | undefined => {
  return items.find((f) => f.kindId === kindId)
}

export default handleKind
