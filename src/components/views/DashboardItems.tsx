import CardsDashboard from 'cards/CardsDashboard'

import GridItem from './GridItem'

const dashboardGridProps = { xs: 12, sm: 6, md: 4, lg: 3 }

const DashboardItems = ({ routerProps, items }) => {
  return (
    <>
      {items.map(({ Component }, index) => (
        <GridItem key={index} {...dashboardGridProps}>
          <Component routerProps={routerProps}>
            {(props) => <CardsDashboard {...props} />}
          </Component>
        </GridItem>
      ))}
    </>
  )
}

export default DashboardItems
