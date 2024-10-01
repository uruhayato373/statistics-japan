import React from 'react'

import Chip from '@mui/material/Chip'

import FallOutlined from '@ant-design/icons/FallOutlined'
import RiseOutlined from '@ant-design/icons/RiseOutlined'

const iconSX = {
  fontSize: '0.65rem',
  color: 'inherit',
  marginLeft: '4px',
}

interface RateChipProps {
  rate: number
}

const RateChip: React.FC<RateChipProps> = ({ rate }) => (
  <Chip
    // @ts-expect-error: "combined" variant is not recognized by TypeScript but is valid for our custom implementation
    variant="combined"
    color={rate < 0 ? 'warning' : 'primary'}
    icon={
      rate < 0 ? (
        <FallOutlined style={iconSX} />
      ) : (
        <RiseOutlined style={iconSX} />
      )
    }
    label={`${rate}%`}
    sx={{
      ml: 1.25,
      pl: 1,
      height: '20px',
      '& .MuiChip-label': {
        padding: '0 6px',
        fontSize: '0.65rem',
      },
    }}
    size="small"
  />
)

export default RateChip
