import regionsData from 'data/prefecture/regions.json'
import prefectures from 'data/prefecture/resasPrefList.json'

import { RouterPropsType } from 'types/apps'

export interface ResasPrefectureType {
  prefCode: number
  prefName: string
}

export interface PrefectureType {
  prefCode: string
  prefName: string
}

export interface RegionPrefectureType {
  name: string
  prefectures: PrefectureType[]
}

const handlePrefecture = () => {
  return {
    fetchItems: () => fetchItems(),
    findItem: (prefCode: string) => findItem(prefCode),
    getPrefecture: (routerProps: RouterPropsType) => getPrefecture(routerProps),
    fetchRegions: () => fetchRegions(),
    getStaticParams: () => getStaticParams(),
  }
}

export default handlePrefecture

const getStaticParams = () => {
  return fetchItems().map((p) => ({
    prefCode: p.prefCode,
  }))
}

const fetchItems = (): PrefectureType[] => {
  try {
    // APIから取得したデータを内部形式に変換
    return prefectures.map((d) => ({
      prefCode: String(d.prefCode).padStart(2, '0') + '000',
      prefName: d.prefName,
    }))
  } catch (error) {
    console.error('都道府県データの取得中にエラーが発生しました:', error)
    throw error
  }
}

const findItem = (prefCode: string): PrefectureType | undefined => {
  try {
    const prefectures = fetchItems()
    return prefectures.find((f) => f.prefCode === prefCode)
  } catch (error) {
    console.error('都道府県の検索中にエラーが発生しました:', error)
    throw error
  }
}

const getPrefecture = (
  routerProps: RouterPropsType
): PrefectureType | undefined => {
  const { kindId, prefCode } = routerProps
  if (kindId === 'prefecture') {
    const prefectures = fetchItems()
    return prefectures.find((f) => f.prefCode === prefCode)
  } else {
    return {
      prefCode: '00000',
      prefName: '日本',
    }
  }
}

const fetchRegions = (): RegionPrefectureType[] => {
  try {
    const prefectures = fetchItems()
    const prefectureMap = new Map(prefectures.map((p) => [p.prefName, p]))

    // regionsDataを基に、各地方の都道府県データを構築
    return regionsData.map((region) => ({
      name: region.name,
      prefectures: region.prefectures
        .map((prefName) => prefectureMap.get(prefName))
        .filter((pref): pref is PrefectureType => pref !== undefined),
    }))
  } catch (error) {
    console.error('地方データの取得中にエラーが発生しました:', error)
    throw error
  }
}
