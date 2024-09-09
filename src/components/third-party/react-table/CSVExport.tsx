'use client'

import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import DownloadOutlined from '@ant-design/icons/DownloadOutlined'
import { CSVLink } from 'react-csv'

interface Props {
  data: {
    [key: string]: string
  }[]
  headers: { label: string; key: string }[]
  filename: string
}

export default function CSVExport({ data, headers, filename }: Props) {
  return (
    <CSVLink data={data} filename={filename} headers={headers}>
      <Tooltip title="CSV Download">
        <IconButton
          size="small"
          sx={{
            border: '0.5px solid',
            borderColor: 'grey.400',
            '&:hover': { bgcolor: 'transparent' },
          }}
        >
          <DownloadOutlined />
        </IconButton>
      </Tooltip>
    </CSVLink>
  )
}
