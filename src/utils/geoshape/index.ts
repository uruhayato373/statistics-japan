import { Topology, GeometryCollection } from 'topojson-specification'

import fetchTopojson from './fetchTopojson'
import generateURL from './generateURL'

export type TopoJSONData = Topology<{
  [key: string]: GeometryCollection
}>

interface GeoshapeHandlers {
  fetchAPI: (prefCode?: string) => Promise<TopoJSONData>
  apiURL: (prefCode?: string) => string
}

const handleGeoshape = (type: 'prefecture' | 'city'): GeoshapeHandlers => {
  return {
    fetchAPI: async (prefCode?: string) => {
      const url = generateURL(type, prefCode)
      return await fetchTopojson(url)
    },
    /**
     * API のエンドポイント URL を生成する
     */
    apiURL: (prefCode?: string) => generateURL(type, prefCode),
  }
}

export default handleGeoshape
