import Typography from '@mui/material/Typography'

import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'
import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import { Options } from 'highcharts'

import GridItem from './GridItem'

import { RouterPropsType } from 'types/apps'
import { CardsPropsType } from 'types/cards'

interface Props {
  title?: string
  Section: React.ComponentType<{
    routerProps: RouterPropsType
    children: (
      props: CardsPropsType<Options> | CardsPropsType
    ) => React.ReactNode
  }>
  routerProps: RouterPropsType
}

const PrefectureRankingCards = ({ title, Section, routerProps }: Props) => (
  <>
    {title && (
      <GridItem xs={12}>
        <Typography variant="h4">{title}</Typography>
      </GridItem>
    )}
    <GridItem xs={12} md={6}>
      <Section routerProps={routerProps}>
        {(props: CardsPropsType<Options>) => (
          <CardsHighchartsPrefectureRankingChart {...props} />
        )}
      </Section>
    </GridItem>
    <GridItem xs={12} md={6}>
      <Section routerProps={routerProps}>
        {(props: CardsPropsType) => (
          <CardsReactPrefectureRankingTable {...props} />
        )}
      </Section>
    </GridItem>
  </>
)

export default PrefectureRankingCards
