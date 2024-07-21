import { fetchResasAPI, ResasParamsType } from './fetchAPI'

export type * from './fetchAPI'

const handleResasAPI = <T>(
  resasParams: ResasParamsType
): {
  fetchAPI: () => Promise<T>
} => {
  return {
    fetchAPI: async (): Promise<T> => {
      const response = await fetchResasAPI<T>(resasParams)
      // response は {message,result} を返すので、resultだけを取得する
      return response.result
    },
  }
}

export default handleResasAPI
