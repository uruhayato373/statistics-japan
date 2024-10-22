import items from 'data/contents/page/index'

export type PageType = {
  pageId: string
  pageTitle: string
  menuId: string
}

const handlePage = () => {
  return {
    items: (menuId: string) => filterItems(menuId),
    findItem: (pageId: string) => findItem(pageId),
  }
}

const filterItems = (menuId: string): PageType[] => {
  return items.filter((f) => f.menuId === menuId)
}

const findItem = (pageId: string): PageType | undefined => {
  return items.find((f) => f.pageId === pageId)
}

export default handlePage
