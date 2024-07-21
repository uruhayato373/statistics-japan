/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MainCard from 'components/MainCard'

import FallOutlined from '@ant-design/icons/FallOutlined'
import RiseOutlined from '@ant-design/icons/RiseOutlined'
import PropTypes from 'prop-types'

const iconSX = {
  fontSize: '0.75rem',
  color: 'inherit',
  marginLeft: 0,
  marginRight: 0,
}

export default function ApexCard({
  color = 'primary',
  title,
  count,
  percentage,
  isLoss = false,
  children,
}) {
  return (
    <MainCard content={false}>
      <Box sx={{ p: 2.25 }}>
        <Stack spacing={0.5}>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography variant="h4" color="inherit">
              {count}
            </Typography>
            {percentage && (
              <Chip
                variant="combined"
                color={color}
                icon={
                  isLoss ? (
                    <FallOutlined style={iconSX} />
                  ) : (
                    <RiseOutlined style={iconSX} />
                  )
                }
                label={`${percentage}%`}
                sx={{ ml: 1.25, pl: 1 }}
                size="small"
              />
            )}
          </Stack>
        </Stack>
      </Box>
      {children}
    </MainCard>
  )
}

ApexCard.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  children: PropTypes.any,
}
