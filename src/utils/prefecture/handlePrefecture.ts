import regionsData from 'data/prefecture/regions.json'
import prefectures from 'data/prefecture/resasPrefList.json'
import { RouterProps } from 'utils/props'

/**
 * RESAS APIから取得する都道府県データの型
 * @interface ResasPrefectureType
 */
export interface ResasPrefectureType {
  /** 都道府県コード */
  prefCode: number
  /** 都道府県名 */
  prefName: string
}

/**
 * アプリケーション内で使用する都道府県データの型
 * @interface PrefectureType
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
 * @interface RegionPrefectureType
 */
export interface RegionPrefectureType {
  /** 地方名 */
  name: string
  /** 所属する都道府県のリスト */
  prefectures: PrefectureType[]
}

/**
 * 都道府県データを操作するための関数群を提供する
 * @returns {Object} 都道府県データ操作用の関数オブジェクト
 */
const handlePrefecture = () => {
  return {
    fetchItems: () => fetchItems(),
    findItem: (prefCode: string) => findItem(prefCode),
    getPrefecture: (routerProps: RouterProps) => getPrefecture(routerProps),
    fetchRegions: () => fetchRegions(),
  }
}

export default handlePrefecture

/**
 * RESAS APIから都道府県データを取得し、アプリケーション用に整形する
 * @async
 * @returns {Promise<PrefectureType[]>} 整形された都道府県データの配列
 * @throws {Error} データ取得中にエラーが発生した場合
 */
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

/**
 * 指定された都道府県コードに一致する都道府県データを検索する
 * @async
 * @param {string} prefCode - 検索対象の都道府県コード
 * @returns {Promise<PrefectureType | undefined>} 一致する都道府県データ、または undefined
 * @throws {Error} 検索中にエラーが発生した場合
 */
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
  routerProps: RouterProps
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

/**
 * 地方ごとの都道府県データを取得する
 * @async
 * @returns {Promise<RegionPrefectureType[]>} 地方ごとの都道府県データの配列
 * @throws {Error} データ取得中にエラーが発生した場合
 */
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
