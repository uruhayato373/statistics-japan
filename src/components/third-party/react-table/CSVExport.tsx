'use client'

import { useTheme } from '@mui/material/styles'
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
  const theme = useTheme()

  return (
    <CSVLink data={data} filename={filename} headers={headers}>
      <Tooltip title="CSV Export">
        <DownloadOutlined
          style={{
            fontSize: '24px',
            color: theme.palette.text.secondary,
            marginTop: 4,
            marginRight: 4,
            marginLeft: 4,
          }}
        />
      </Tooltip>
    </CSVLink>
  )
}
