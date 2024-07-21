const BASE_URL = 'https://geoshape.ex.nii.ac.jp/city/topojson/20230101/'

const generateURL = (type: 'prefecture' | 'city', prefCode?: string) => {
  const code = prefCode ? prefCode.replace('000', '') : null
  return type === 'prefecture'
    ? `${BASE_URL}jp_pref.l.topojson`
    : `${BASE_URL}${code}/${code}_city.l.topojson`
}

export default generateURL
