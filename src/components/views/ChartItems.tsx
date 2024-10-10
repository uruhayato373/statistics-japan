import GridItem from './GridItem'

const ChartItems = ({ routerProps, items }) => {
  return (
    <>
      {items.map(({ Section, Card, gridProps }, index) => (
        <GridItem key={`chart-${index}`} {...gridProps}>
          <Section routerProps={routerProps}>
            {(props) => <Card {...props} />}
          </Section>
        </GridItem>
      ))}
    </>
  )
}

export default ChartItems
