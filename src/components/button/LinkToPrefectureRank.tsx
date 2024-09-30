'use client'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import ExportOutlined from '@ant-design/icons/ExportOutlined'

import useURL from 'hooks/useURL'

interface Props {
  pageId: string
}

export default function LinkToPrefectureRank({ pageId }: Props) {
  const { fieldId, menuId } = useURL()
  const url = `/${fieldId}/${menuId}/prefecture-rank/${pageId}`

  return (
    <Tooltip title="ランキングを見る">
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
