import handleResasAPI from 'utils/resas'

/**
 * RESAS APIから取得する市区町村情報の型定義
 * @interface ResasCityType
 */
export interface ResasCityType {
  /** 都道府県コード (例: 1) */
  prefCode: number
  /** 市区町村コード (例: '01101') */
  cityCode: string
  /** 市区町村名 (例: '札幌市中央区') */
  cityName: string
  /** 政令指定都市フラグ ('0': 政令指定都市ではない, '1': 政令指定都市の区, '2': 政令指定都市) */
  bigCityFlag: '0' | '1' | '2'
}

/**
 * アプリケーション内で使用する市区町村情報の型定義
 * @interface CityType
 */
export interface CityType {
  /** 都道府県コード (例: '01000') */
  prefCode: string
  /** 市区町村コード (例: '01101') */
  cityCode: string
  /** 市区町村名 (例: '札幌市中央区') */
  cityName: string
  /** 政令指定都市フラグ */
  bigCityFlag: '0' | '1' | '2'
}

/**
 * 市区町村情報を取得・検索するための関数群を提供する
 * @returns {Object} 市区町村情報を操作するための関数オブジェクト
 */
const handleCity = () => {
  return {
    fetchItems: async (prefCode?: string) => await fetchItems(prefCode),
    findItem: async (cityCode: string) => await findItem(cityCode),
  }
}

/**
 * 市区町村情報を取得する
 * @param {string} [prefCode] - 都道府県コード（オプショナル）
 * @returns {Promise<CityType[]>} 市区町村情報の配列
 */
const fetchItems = async (prefCode?: string): Promise<CityType[]> => {
  // RESAS APIのパラメータを設定
  const resasParams = prefCode
    ? { url: 'api/v1/cities', prefCode: Number(prefCode.slice(0, 2)) }
    : { url: 'api/v1/cities' }

  const { fetchAPI } = handleResasAPI<ResasCityType[]>(resasParams)

  // APIから市区町村情報を取得
  const cities = await fetchAPI()

  // 取得したデータを内部で使用する形式に変換
  return cities.map((d) => ({
    ...d,
    prefCode: d.prefCode.toString().padStart(2, '0') + '000',
  }))
}

/**
 * 指定された市区町村コードに一致する市区町村情報を検索する
 * @param {string} cityCode - 市区町村コード
 * @returns {Promise<CityType | undefined>} 市区町村情報（見つからない場合はundefined）
 */
const findItem = async (cityCode: string): Promise<CityType | undefined> => {
  const prefCode = cityCode.slice(0, 2) + '000'
  const cities = await fetchItems(prefCode)

  return cities.find((f) => f.cityCode === cityCode)
}

export default handleCity
