import handleResasAPI from 'utils/resas'

/**
 * RESAS APIから取得する市区町村情報の型定義
 *
 * @property {number} prefCode - 都道府県コード (例: 1)
 * @property {string} cityCode - 市区町村コード (例: '01101')
 * @property {string} cityName - 市区町村名 (例: '札幌市中央区')
 * @property {string} bigCityFlag - 政令指定都市フラグ ('0': 政令指定都市ではない, '1': 政令指定都市の区, '2': 政令指定都市)
 */
export type ResasCityType = {
  prefCode: number
  cityCode: string
  cityName: string
  bigCityFlag: '0' | '1' | '2'
}

/** アプリケーション内で使用する市区町村情報の型定義 */
export type CityType = {
  prefCode: string
  cityCode: string
  cityName: string
  bigCityFlag: '0' | '1' | '2'
}

const handleCity = () => {
  return {
    fetchItems: async (prefCode?: string) => await fetchItems(prefCode),
    findItem: async (cityCode: string) => await findItem(cityCode),
  }
}

const fetchItems = async (prefCode?: string): Promise<CityType[]> => {
  const resasParams = prefCode
    ? { url: 'api/v1/cities', prefCode: Number(prefCode.slice(0, 2)) }
    : { url: 'api/v1/cities' }
  const { fetchAPI } = handleResasAPI<ResasCityType[]>(resasParams)

  const cities = await fetchAPI()

  return cities.map((d) => {
    return {
      ...d,
      prefCode: d.prefCode.toString().padStart(2, '0') + '000',
    }
  })
}

const findItem = async (cityCode: string): Promise<CityType | undefined> => {
  const prefCode = cityCode.slice(0, 2) + '000'
  const cities = await fetchItems(prefCode)

  return cities.find((f) => f.cityCode === cityCode)
}

export default handleCity
