import { CityType } from 'utils/city'
import { KindType } from 'utils/kind'
import { MenuType } from 'utils/menu'
import { PrefectureType } from 'utils/prefecture'

type Args = {
  menu: MenuType
  kind: KindType
  prefecture: PrefectureType
  city: CityType
}

const generatePageTitle = ({ menu, kind, prefecture, city }: Args) => {
  switch (kind.kindId) {
    case 'japan':
      return `日本の${menu.menuTitle}`
    case 'prefecture-rank':
      return `都道府県の${menu.menuTitle}ランキング`
    case 'prefecture':
      return `${prefecture.prefName}の${menu.menuTitle}`
    case 'city':
      return `${city.cityName}の${menu.menuTitle}`
  }
}

export default generatePageTitle
