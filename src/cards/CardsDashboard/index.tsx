import { Suspense } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import CircularProgressCards from 'components/CircularProgressCards'
import MainCard from 'components/MainCard'

import { CardsPropsType } from 'types/cards'
import formatDashboard from 'utils/dashboard'

import DifferenceText from './DifferenceText'
import ValueDisplay from './ValueDisplay'

interface CardHeaderProps {
  title: string
  linkButton?: React.ReactNode
}

const CardHeader: React.FC<CardHeaderProps> = ({ title, linkButton }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="space-between"
    sx={{ pb: 1 }}
  >
    <Typography variant="h6" color="text.secondary">
      {title}
    </Typography>
    {linkButton && (
      <Stack direction="row" spacing={1}>
        {linkButton}
      </Stack>
    )}
  </Stack>
)

interface CardContentProps {
  latest: ReturnType<typeof formatDashboard>[0]
  previous: ReturnType<typeof formatDashboard>[1]
}

const CardContent: React.FC<CardContentProps> = ({ latest, previous }) => (
  <>
    <ValueDisplay value={latest.value} unit={latest.unit} rate={latest.rate} />
    <Typography variant="caption" color="text.secondary">
      {latest.timeName}
    </Typography>
    <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="text.secondary">
        {previous.timeName}から
        <DifferenceText difference={latest.difference} unit={latest.unit} />
      </Typography>
    </Box>
  </>
)

const CardsDashboard: React.FC<CardsPropsType> = async ({
  title,
  document,
  linkButton,
}) => {
  const [latest, previous] = formatDashboard(document)

  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <CardHeader title={title} linkButton={linkButton} />
      <Suspense fallback={<CircularProgressCards />}>
        <CardContent latest={latest} previous={previous} />
      </Suspense>
    </MainCard>
  )
}

export default CardsDashboard
