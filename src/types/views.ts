import { KindType } from 'utils/kind'
import { PageType } from 'utils/page'
import { PrefectureType } from 'utils/prefecture'

import { RouterPropsType } from 'types/apps'
import { MenuType, FieldType } from 'types/contents'

export interface ViewsPropsType {
  routerProps: RouterPropsType
}

export type BreadcrumbsPropsType = {
  fields: FieldType[]
  currentField: FieldType
  menus: MenuType[]
  currentMenu: MenuType
  kinds: KindType[]
  currentKind: KindType
  pages?: PageType[]
  currentPage?: PageType
  prefectures?: PrefectureType[]
  currentPrefecture?: PrefectureType
  pageTitle: string
}
