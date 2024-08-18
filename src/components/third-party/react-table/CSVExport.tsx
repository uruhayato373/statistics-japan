'use client'

import { useTheme } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'

import DownloadOutlined from '@ant-design/icons/DownloadOutlined'
import { CSVLink } from 'react-csv'

export default function CSVExport({ data, filename, columns }) {
  const theme = useTheme()

  return (
    <CSVLink data={data} filename={filename} headers={columns}>
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
