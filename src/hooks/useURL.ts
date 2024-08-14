import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { kind, prefecture, city } from 'atoms'
import { CityType } from 'utils/city'
import { KindType } from 'utils/kind'
import { handlePage } from 'utils/page'
import { PrefectureType } from 'utils/prefecture'
import { RouterProps } from 'utils/props'

import { useAtom } from 'jotai'

/**
 * URLに関連する状態を管理し、URL操作機能を提供するカスタムフック
 */
export default function useURL() {
  const [atomKind] = useAtom<KindType>(kind)
  const [atomPrefecture] = useAtom<PrefectureType>(prefecture)
  const [atomCity] = useAtom<CityType>(city)

  const pathname = usePathname()

  const [currentRouterProps, setCurrentRouterProps] = useState<RouterProps>({
    fieldId: null,
    menuId: null,
    kindId: null,
    pageId: null,
    prefCode: null,
    cityCode: null,
  })

  useEffect(() => {
    // pathnameからrouterPropsを取得する
    const [, fieldId, menuId, kindId, prefCodeOrPageId, cityCode] =
      pathname.split('/')

    // prefecture-rankの場合はpageId、それ以外の場合はprefCode
    const {
      prefCode = kindId === 'prefecture-rank' ? null : prefCodeOrPageId,
      pageId = kindId === 'prefecture-rank' ? prefCodeOrPageId : null,
    } = {}

    // routerPropsをセット
    setCurrentRouterProps({
      fieldId: fieldId,
      menuId: menuId,
      kindId: kindId,
      pageId: pageId || null,
      prefCode: prefCode || null,
      cityCode: cityCode || null,
    })
  }, [pathname])

  /**
   * Drawer Nav をクリックしたときのURLを生成
   */
  const currentKindURL = () => {
    return changeKindURL(atomKind)
  }

  /**
   * Drawer Nav をクリックしたときのURLを生成
   */
  const navURL = (fieldId: string, menuId: string) => {
    const kindId = atomKind.kindId
    const pageId = handlePage().items(menuId)[0].pageId
    switch (kindId) {
      case 'japan':
        return `/${fieldId}/${menuId}/${kindId}`
      case 'prefecture-rank':
        return `/${fieldId}/${menuId}/${kindId}/${pageId}`
      case 'prefecture':
        return `/${fieldId}/${menuId}/${kindId}/${atomPrefecture.prefCode}`
      default:
        return ''
    }
  }

  /**
   * 統計種別を変更した場合のURLを生成
   */
  const changeKindURL = (newKind: KindType): string => {
    if (!currentRouterProps.fieldId) return ''
    const { fieldId, menuId } = currentRouterProps
    const pageId = handlePage().items(menuId)[0].pageId

    switch (newKind.kindId) {
      case 'japan':
        return `/${fieldId}/${menuId}/${newKind.kindId}`
      case 'prefecture-rank':
        return `/${fieldId}/${menuId}/${newKind.kindId}/${pageId}`
      case 'prefecture':
        return `/${fieldId}/${menuId}/${newKind.kindId}/${atomPrefecture.prefCode}`
      case 'city':
        return `/${fieldId}/${menuId}/${newKind.kindId}/${atomPrefecture.prefCode}/${atomCity.cityCode}`
      default:
        return ''
    }
  }

  /**
   * 都道府県を変更した場合のURLを生成
   */
  const changePrefURL = (newCode: string): string => {
    const { fieldId, menuId, kindId, cityCode } = currentRouterProps
    switch (kindId) {
      case 'prefecture':
        return `/${fieldId}/${menuId}/${kindId}/${newCode}`
      case 'city':
        return `/${fieldId}/${menuId}/${kindId}/${newCode}/${cityCode}`
    }
  }

  /**
   * 都道府県を変更した場合のURLを生成
   */
  const changePageURL = (newId: string): string => {
    const { fieldId, menuId } = currentRouterProps

    return `/${fieldId}/${menuId}/prefecture-rank/${newId}`
  }

  /**
   * 市区町村を変更した場合のURLを生成
   */
  const changeCityURL = (newCode: string): string => {
    const { fieldId, menuId, kindId, prefCode } = currentRouterProps
    return `/${fieldId}/${menuId}/${kindId}/${prefCode}/${newCode}`
  }

  return {
    ...currentRouterProps,
    changeKindURL,
    changePrefURL,
    changeCityURL,
    currentKindURL,
    changePageURL,
    navURL,
  }
}
