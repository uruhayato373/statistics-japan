import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import ApexColumnChart from 'components/apexcharts/ApexColumnChart'
import MainCard from 'components/MainCard'

import { ApexChartTimeContentsType } from 'utils/apexcharts'

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem',
}

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none',
}

interface Props {
  title: string
  contents: ApexChartTimeContentsType
}

export default async function CardsApexColumn({ title, contents }: Props) {
  const { categories, series } = contents

  return (
    <MainCard content={false} title={title}>
      <Stack>
        <Box sx={{ pr: 2 }}>
          <ApexColumnChart contents={contents} />
        </Box>

        <List
          component="nav"
          sx={{
            p: 0,
            '& .MuiListItemButton-root': {
              py: 1.5,
              '& .MuiAvatar-root': avatarSX,
              '& .MuiListItemSecondaryAction-root': {
                ...actionSX,
                position: 'relative',
              },
            },
          }}
        >
          {series.map((item, index) => (
            <ListItemButton key={index} divider>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">{item.name}</Typography>
                }
                secondary={categories[categories.length - 1]}
              />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    {`${item.data[item.data.length - 1].toLocaleString()} ${item.unit}`}
                  </Typography>
                  {/* <Typography variant="h6" color="secondary" noWrap>
                    {item.rate}%
                  </Typography> */}
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </MainCard>
  )
}
