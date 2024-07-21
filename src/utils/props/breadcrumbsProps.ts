import { CityType, handleCity } from 'utils/city'
import { FieldType, handleField } from 'utils/field'
import { KindType, handleKind } from 'utils/kind'
import { MenuType, handleMenu } from 'utils/menu'
import { PrefectureType, handlePrefecture } from 'utils/prefecture'

import generatePageTitle from './generateTitle'

import { RouterProps } from '.'

export type BreadcrumbsPropsType = {
  fields: FieldType[]
  currentField: FieldType
  menus: MenuType[]
  currentMenu: MenuType
  kinds: KindType[]
  currentKind: KindType
  prefectures?: PrefectureType[]
  currentPrefecture?: PrefectureType
  cities?: CityType[]
  currentCity?: CityType
  pageTitle: string
}

const generateBreadcrumbsProps = async ({
  fieldId,
  menuId,
  kindId,
  prefCode,
  cityCode,
}: RouterProps): Promise<BreadcrumbsPropsType> => {
  try {
    const fields = handleField().items
    const currentField = handleField().findItem(fieldId)
    if (!currentField) {
      throw new Error(`Field with id ${fieldId} not found`)
    }

    const menus = handleMenu().items(fieldId)
    const currentMenu = handleMenu().findItem(menuId)
    if (!currentMenu) {
      throw new Error(`Menu with id ${menuId} not found`)
    }

    const kinds = handleKind().items
    const currentKind = handleKind().findItem(kindId)
    if (!currentKind) {
      throw new Error(`Kind with id ${kindId} not found`)
    }

    let prefectures: PrefectureType[] | undefined
    let currentPrefecture: PrefectureType | undefined
    let cities: CityType[] | undefined
    let currentCity: CityType | undefined

    if (prefCode) {
      try {
        ;[prefectures, currentPrefecture] = await Promise.all([
          handlePrefecture().fetchItems(),
          handlePrefecture().findItem(prefCode),
        ])
        if (!currentPrefecture) {
          throw new Error(`Prefecture with code ${prefCode} not found`)
        }
      } catch (error) {
        console.error('Error fetching prefecture data:', error)
        throw new Error('Failed to fetch prefecture data')
      }

      if (cityCode) {
        try {
          ;[cities, currentCity] = await Promise.all([
            handleCity().fetchItems(prefCode),
            handleCity().findItem(cityCode),
          ])

          if (!currentCity) {
            throw new Error(`City with code ${cityCode} not found`)
          }
        } catch (error) {
          console.error('Error fetching city data:', error)
          throw new Error('Failed to fetch city data')
        }
      }
    }

    const pageTitle = generatePageTitle({
      menu: currentMenu,
      kind: currentKind,
      prefecture: currentPrefecture,
      city: currentCity,
    })

    return {
      fields,
      currentField,
      menus,
      currentMenu,
      kinds,
      currentKind,
      prefectures,
      currentPrefecture,
      cities,
      currentCity,
      pageTitle,
    }
  } catch (error) {
    console.error('Error in generateBreadcrumbsProps:', error)
    throw new Error('Failed to generate breadcrumbs props')
  }
}

export default generateBreadcrumbsProps
