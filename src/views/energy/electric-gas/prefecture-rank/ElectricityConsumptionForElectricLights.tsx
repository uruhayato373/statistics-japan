import MainView from 'components/views//MainView'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingElectricityConsumptionForElectricLights from 'sections/energy/electric-gas/prefecture-rank/RankingElectricityConsumptionForElectricLights'
import { ViewsPropsType } from 'types/views'

export default async function ElectricityConsumptionForElectricLights({
  routerProps,
}: ViewsPropsType) {
  return (
    <MainView routerProps={routerProps}>
      {/* 電灯使用電力量 */}
      <PrefectureRankingCards
        Section={RankingElectricityConsumptionForElectricLights}
        routerProps={routerProps}
      />
    </MainView>
  )
}
