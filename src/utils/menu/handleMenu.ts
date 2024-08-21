import items from 'data/menu/menuList.json'

/**
 * アプリケーション内で使用するメニュー情報の型定義
 * @property {string} menuId - メニューID
 * @property {string} menuTitle - メニュータイトル
 * @property {string} fieldId - 分野ID
 */
export type MenuType = {
  menuId: string
  menuTitle: string
  fieldId: string
}

/**
 * メニュー情報を操作するためのユーティリティ関数
 */
const handleMenu = () => {
  return {
    items: (fieldId?: string) => {
      return fieldId ? filterItems(fieldId) : items
    },
    findItem: (menuId: string) => findItem(menuId),
  }
}

/**
 * 指定された分野IDに対応するメニュー情報を取得
 * @param {string} fieldId - 分野ID
 * @returns {MenuType[]} 対応するメニュー情報の配列
 */
const filterItems = (fieldId: string): MenuType[] => {
  return items.filter((f) => f.fieldId === fieldId)
}

/**
 * 指定されたメニューIDに対応するメニュー情報を取得
 * @param {string} menuId - メニューID
 * @returns {MenuType | undefined} 対応するメニュー情報。見つからない場合はundefinedを返す
 */
const findItem = (menuId: string): MenuType | undefined => {
  return items.find((f) => f.menuId === menuId)
}

export default handleMenu
