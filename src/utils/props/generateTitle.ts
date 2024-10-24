import { KindType } from 'utils/kind'
import { PageType } from 'utils/page'
import { PrefectureType } from 'utils/prefecture'

import { MenuType } from 'types/contents'

type Args = {
  menu: MenuType
  kind: KindType
  page?: PageType
  prefecture?: PrefectureType
}

const generatePageTitle = ({ menu, kind, page, prefecture }: Args): string => {
  switch (kind.kindId) {
    case 'japan':
      return `日本の${menu.menuTitle}`
    case 'prefecture-rank':
      return `都道府県の${page.pageTitle}ランキング`
    case 'prefecture':
      return `${prefecture.prefName}の${menu.menuTitle}`
    default:
      return ''
  }
}

export default generatePageTitle
