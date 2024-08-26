import { CityType } from 'utils/city'
import { TimeType } from 'utils/document'
import { KindType } from 'utils/kind'
import { PrefectureType } from 'utils/prefecture'

import { atom } from 'jotai'

/**
 * 選択中の統計種類
 */
export const kind = atom<KindType>({
  kindId: 'prefecture',
  kindTitle: '都道府県の統計',
})

/**
 * 選択中の都道府県
 */
export const prefecture = atom<PrefectureType>({
  prefCode: '28000',
  prefName: '兵庫県',
})

/**
 * 選択中の市区町村
 */
export const city = atom<CityType>({
  prefCode: '28000',
  cityCode: '28100',
  cityName: '神戸市',
  bigCityFlag: '2',
})

/**
 * 選択中の年次
 * @description
 * - 都道府県ランキングのchartとtableで使用
 * - コンポーネントが初期化される際に、最新の年次を取得して初期値として設定
 */
export const time = atom<TimeType>({
  timeCode: '2020',
  timeName: '2020年度',
})

/**
 * 選択中の都道府県
 * @description
 * - 都道府県の比較Chartで使用
 * - コンポーネントが初期化される際に、上位3つの都道府県を取得して初期値として設定
 */
export const checkedPrefectures = atom<PrefectureType[]>([
  {
    prefCode: '28000',
    prefName: '兵庫県',
  },
])
