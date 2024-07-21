/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { fetchResasApi } from './fetchAPI'

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

/**
 * RESAS APIから市区町村情報を取得するための関数。
 */
const resasCity = () => {
  return {
    fetchItems: async (prefCode?: number) => fetchItems(prefCode),
  }
}

export default resasCity

/**
 * RESAS APIから市区町村情報を取得します。
 * @param {number} [prefCode] - 都道府県コード。指定された場合、その都道府県の市区町村情報のみを取得。
 * @returns {Promise<ResasCityType[]>} RESAS APIから取得した市区町村情報の配列
 */
const fetchItems = async (prefCode?: number): Promise<ResasCityType[]> => {
  const resasParams = prefCode
    ? { url: 'api/v1/cities', prefCode }
    : { url: 'api/v1/cities' }

  const data = await fetchResasApi(resasParams)
  return data.result
}
