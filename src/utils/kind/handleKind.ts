import items from 'data/contents/kind/kindList.json'

import { KindType } from 'types/contents'

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
