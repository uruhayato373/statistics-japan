import { RouterPropsType } from 'types/apps'
import { FieldType } from 'utils/field'
import { KindType } from 'utils/kind'
import { MenuType } from 'utils/menu'
import { PageType } from 'utils/page'
import { PrefectureType } from 'utils/prefecture'

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
