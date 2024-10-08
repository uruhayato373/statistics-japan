import { KindType } from 'utils/kind'
import { MenuType } from 'utils/menu'
import { PageType } from 'utils/page'
import { PrefectureType } from 'utils/prefecture'

type Args = {
  menu: MenuType
  kind: KindType
  page?: PageType
  prefecture?: PrefectureType
}

/**
 * ページタイトルを生成する関数
 *
 * @param {Args} params - タイトル生成に必要なパラメータ
 * @param {MenuType} params.menu - メニュー情報
 * @param {KindType} params.kind - 種別情報
 * @param {PageType} params.page - ページ情報
 * @param {PrefectureType} params.prefecture - 都道府県情報
 *
 * @returns {string} 生成されたページタイトル
 */
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
