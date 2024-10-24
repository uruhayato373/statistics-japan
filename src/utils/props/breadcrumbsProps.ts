import { FieldType, handleField } from 'utils/field'
import { KindType, handleKind } from 'utils/kind'
import { MenuType, handleMenu } from 'utils/menu'
import handlePage, { PageType } from 'utils/page'
import handlePrefecture, { PrefectureType } from 'utils/prefecture'

import generatePageTitle from './generateTitle'

import { RouterProps } from '.'

/**
 * breadcrumbsのプロパティの型定義
 */
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

/**
 * breadcrumbsのプロパティを生成する非同期関数
 * @param props - ルーターのプロパティ
 * @returns パンくずリストのプロパティ
 * @throws エラーが発生した場合
 */
const generateBreadcrumbsProps = async ({
  fieldId,
  menuId,
  kindId,
  pageId,
  prefCode,
}: RouterProps): Promise<BreadcrumbsPropsType> => {
  try {
    // フィールドのデータ取得
    const fields = handleField().items
    const currentField = handleField().findItem(fieldId)

    // メニューのデータ取得
    const menus = handleMenu().items(fieldId)
    const currentMenu = handleMenu().findItem(menuId)

    // 種別のデータ取得
    const kinds = handleKind().items
    const currentKind = handleKind().findItem(kindId)

    // ページのデータ取得
    const pages = handlePage().items(menuId)
    const currentPage = handlePage().findItem(pageId)

    // 都道府県と市区町村のデータ取得
    const [prefectures, currentPrefecture] = await fetchLocationData(prefCode)

    // ページタイトルの生成
    const pageTitle = generatePageTitle({
      menu: currentMenu,
      kind: currentKind,
      page: currentPage,
      prefecture: currentPrefecture,
    })

    return {
      fields,
      currentField,
      menus,
      currentMenu,
      kinds,
      currentKind,
      pages,
      currentPage,
      prefectures,
      currentPrefecture,
      pageTitle,
    }
  } catch (error) {
    console.error('generateBreadcrumbsPropsでエラーが発生しました:', error)
    throw new Error('BreadcrumbsPropsの生成に失敗しました')
  }
}

export default generateBreadcrumbsProps

/**
 * 都道府県と市区町村のデータを非同期に取得する
 * @param prefCode - 都道府県コード
 * @param cityCode - 市区町村コード
 * @returns 都道府県と市区町村のデータ
 */
async function fetchLocationData(
  prefCode?: string
): Promise<[PrefectureType[] | undefined, PrefectureType | undefined]> {
  if (!prefCode) {
    return [undefined, undefined]
  }

  try {
    const [prefectures, currentPrefecture] = await Promise.all([
      handlePrefecture().fetchItems(),
      handlePrefecture().findItem(prefCode),
    ])

    if (!currentPrefecture) {
      throw new Error(`コード ${prefCode} の都道府県が見つかりません`)
    }

    return [prefectures, currentPrefecture]
  } catch (error) {
    console.error(
      '都道府県・市区町村データの取得中にエラーが発生しました:',
      error
    )
    throw new Error('都道府県・市区町村データの取得に失敗しました')
  }
}
