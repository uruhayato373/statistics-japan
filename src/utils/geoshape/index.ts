import { promises as fs } from 'fs'
import path from 'path'

import { Topology, GeometryCollection } from 'topojson-specification'

import fetchTopojson from './fetchTopojson'
import generateURL from './generateURL'

export type TopoJSONData = Topology<{
  [key: string]: GeometryCollection
}>

interface GeoshapeHandlers {
  fetchAPI: (prefCode?: string) => Promise<TopoJSONData>
  readJson: () => Promise<TopoJSONData>
  apiURL: (prefCode?: string) => string
}

const handleGeoshape = (type: 'prefecture' | 'city'): GeoshapeHandlers => {
  return {
    fetchAPI: async (prefCode?: string) => {
      const url = generateURL(type, prefCode)

      return await fetchTopojson(url)
    },
    readJson: async () => {
      const filePath = path.join(
        process.cwd(),
        'src',
        'data',
        'topojson',
        `prefecture.json`
      )
      const fileContents = await fs.readFile(filePath, 'utf8')
      return JSON.parse(fileContents) as TopoJSONData
    },
    apiURL: (prefCode?: string) => generateURL(type, prefCode),
  }
}

export default handleGeoshape
