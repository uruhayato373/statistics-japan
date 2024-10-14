import loadValues from './modules/loadValues'
import savePrefectureRankOGP from './modules/savePrefectureRankOGP'

const handleSupabase = () => {
  return {
    loadValues,
    savePrefectureRankOGP,
  }
}

export default handleSupabase
