import Typography from '@mui/material/Typography'

import { Options } from 'highcharts'

import CardsHighchartsPrefectureRankingChart from 'cards/CardsHighchartsPrefectureRankingChart'
import CardsReactPrefectureRankingTable from 'cards/CardsReactPrefectureRankingTable'

import { RouterPropsType } from 'types/apps'
import { CardsPropsType } from 'types/cards'

import GridItem from './GridItem'

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
