import items from 'data/contents/page/index'

export type PageType = {
  pageId: string
  pageTitle: string
  menuId: string
}

/**
 * ページ情報を操作するためのユーティリティ関数
 */
const handlePage = () => {
  return {
    items: (menuId: string) => filterItems(menuId),
    findItem: (pageId: string) => findItem(pageId),
  }
}

/**
 * 指定されたmenuIdに対応するページ情報を取得
 * @param {string} menuId
 * @returns {PageType[]} 対応するページ情報の配列
 */
const filterItems = (menuId: string): PageType[] => {
  console.log(items)
  return items.filter((f) => f.menuId === menuId)
}

/**
 * 指定されたメニューIDに対応するページ情報を取得
 * @param {string} pageId
 * @returns {PageType | undefined} 対応するページ情報。見つからない場合はundefinedを返す
 */
const findItem = (pageId: string): PageType | undefined => {
  return items.find((f) => f.pageId === pageId)
}

export default handlePage
