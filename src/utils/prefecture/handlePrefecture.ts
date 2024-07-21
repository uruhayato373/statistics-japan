/**
 * 都道府県データを管理するモジュール
 */

import regionsData from 'utils/prefecture/regions.json'
import handleResasAPI from 'utils/resas'

/**
 * RESAS APIから取得する都道府県データの型
 */
export interface ResasPrefectureType {
  /** 都道府県コード */
  prefCode: number
  /** 都道府県名 */
  prefName: string
}

/**
 * アプリケーション内で使用する都道府県データの型
 * @remarks 都道府県コードは5桁の文字列として扱う
 */
export interface PrefectureType {
  /** 都道府県コード（5桁の文字列） */
  prefCode: string
  /** 都道府県名 */
  prefName: string
}

/**
 * 地方と所属する都道府県のデータ型
 */
export interface RegionPrefectureType {
  /** 地方名 */
  name: string
  /** 所属する都道府県のリスト */
  prefectures: PrefectureType[]
}

/**
 * 都道府県データを操作するための関数群を提供する
 * @returns 都道府県データ操作用の関数オブジェクト
 */
const handlePrefecture = () => {
  return {
    fetchItems: async () => await fetchItems(),
    findItem: async (prefCode: string) => await findItem(prefCode),
    fetchRegions: async () => await fetchRegions(),
  }
}

export default handlePrefecture

/**
 * RESAS APIから都道府県データを取得し、アプリケーション用に整形する
 * @returns 整形された都道府県データの配列
 */
const fetchItems = async (): Promise<PrefectureType[]> => {
  try {
    const resasParams = { url: 'api/v1/prefectures' }
    const { fetchAPI } = handleResasAPI<ResasPrefectureType[]>(resasParams)

    const prefectures = await fetchAPI()

    return prefectures.map((d) => ({
      prefCode: String(d.prefCode).padStart(2, '0') + '000',
      prefName: d.prefName,
    }))
  } catch (error) {
    console.error('都道府県データの取得中にエラーが発生しました:', error)
    throw error
  }
}

/**
 * 指定された都道府県コードに一致する都道府県データを検索する
 * @param prefCode - 検索対象の都道府県コード
 * @returns 一致する都道府県データ、または undefined
 */
const findItem = async (
  prefCode: string
): Promise<PrefectureType | undefined> => {
  try {
    const prefectures = await fetchItems()
    return prefectures.find((f) => f.prefCode === prefCode)
  } catch (error) {
    console.error('都道府県の検索中にエラーが発生しました:', error)
    throw error
  }
}
/**
 * 地方ごとの都道府県データを取得する
 * @returns 地方ごとの都道府県データの配列
 */
const fetchRegions = async (): Promise<RegionPrefectureType[]> => {
  try {
    const prefectures = await fetchItems()
    const prefectureMap = new Map(prefectures.map((p) => [p.prefName, p]))

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
