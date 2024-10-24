import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingFutureBurdenRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingFutureBurdenRatio'

import { RouterPropsType } from 'types/apps'

interface Props {
  routerProps: RouterPropsType
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 将来負担比率 */}
      <PrefectureRankingCards
        Section={RankingFutureBurdenRatio}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
