import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { kind, prefecture } from 'atoms'
import { RouterPropsType } from 'types/apps'
import { KindType } from 'utils/kind'
import handlePage from 'utils/page'
import { PrefectureType } from 'utils/prefecture'

import { useAtom } from 'jotai'

/**
 * URLに関連する状態を管理し、URL操作機能を提供するカスタムフック
 */
export default function useURL() {
  const [atomKind] = useAtom<KindType>(kind)
  const [atomPrefecture] = useAtom<PrefectureType>(prefecture)

  const pathname = usePathname()

  const [currentRouterPropsType, setCurrentRouterPropsType] =
    useState<RouterPropsType>({
      fieldId: null,
      menuId: null,
      kindId: null,
      pageId: null,
      prefCode: null,
    })

  useEffect(() => {
    // pathnameからrouterPropsを取得する
    const [, fieldId, menuId, kindId, prefCodeOrPageId] = pathname.split('/')

    // prefecture-rankの場合はpageId、それ以外の場合はprefCode
    const {
      prefCode = kindId === 'prefecture-rank' ? null : prefCodeOrPageId,
      pageId = kindId === 'prefecture-rank' ? prefCodeOrPageId : null,
    } = {}

    // routerPropsをセット
    setCurrentRouterPropsType({
      fieldId: fieldId,
      menuId: menuId,
      kindId: kindId,
      pageId: pageId || null,
      prefCode: prefCode || null,
    })
  }, [pathname])

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
  const changeKindURL = (newKindId: string): string => {
    if (!currentRouterPropsType.fieldId) return ''
    const { fieldId, menuId } = currentRouterPropsType
    const pageId = handlePage().items(menuId)[0].pageId

    switch (newKindId) {
      case 'japan':
        return `/${fieldId}/${menuId}/${newKindId}`
      case 'prefecture-rank':
        return `/${fieldId}/${menuId}/${newKindId}/${pageId}`
      case 'prefecture':
        return `/${fieldId}/${menuId}/${newKindId}/${atomPrefecture.prefCode}`
      default:
        return ''
    }
  }

  /**
   * Menuを変更した場合のURLを生成
   */
  const changeMenuURL = (newId: string): string => {
    const { fieldId, kindId } = currentRouterPropsType
    const pageId = handlePage().items(newId)[0].pageId
    switch (kindId) {
      case 'japan':
        return `/${fieldId}/${newId}/${kindId}`
      case 'prefecture-rank':
        return `/${fieldId}/${newId}/${kindId}/${pageId}`
      case 'prefecture':
        return `/${fieldId}/${newId}/${kindId}/${atomPrefecture.prefCode}`
      default:
        return ''
    }
  }

  /**
   * 都道府県を変更した場合のURLを生成
   */
  const changePrefURL = (newCode: string): string => {
    const { fieldId, menuId, kindId } = currentRouterPropsType
    switch (kindId) {
      case 'prefecture':
        return `/${fieldId}/${menuId}/${kindId}/${newCode}`
    }
  }

  /**
   * 都道府県を変更した場合のURLを生成
   */
  const changePageURL = (newId: string): string => {
    const { fieldId, menuId } = currentRouterPropsType
    return `/${fieldId}/${menuId}/prefecture-rank/${newId}`
  }

  return {
    ...currentRouterPropsType,
    changeKindURL,
    changePrefURL,
    changePageURL,
    changeMenuURL,
    navURL,
  }
}
