'use client'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import ExportOutlined from '@ant-design/icons/ExportOutlined'

import useURL from 'hooks/useURL'

export default function LinkToPrefecture() {
  const { changeKindURL } = useURL()
  const url = changeKindURL('prefecture')

  return (
    <Tooltip title="都道府県のデータを見る">
      <IconButton
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={{
          border: '0.5px solid',
          borderColor: 'grey.400',
          '&:hover': { bgcolor: 'transparent' },
        }}
      >
        <ExportOutlined />
      </IconButton>
    </Tooltip>
  )
}
