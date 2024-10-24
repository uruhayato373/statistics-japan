import ViewsWrapper from 'components/views//ViewsWrapper'
import PrefectureRankingCards from 'components/views/PrefectureRankingCards'

import RankingCurrentAccountRatio from 'sections/administrativefinancial/finances/prefecture-rank/RankingCurrentAccountRatio'

import { RouterPropsType } from 'types/apps'

interface Props {
  routerProps: RouterPropsType
}

export default async function PrefectureRankView({ routerProps }: Props) {
  return (
    <ViewsWrapper routerProps={routerProps}>
      {/* 経常収支比率 */}
      <PrefectureRankingCards
        Section={RankingCurrentAccountRatio}
        routerProps={routerProps}
      />
    </ViewsWrapper>
  )
}
