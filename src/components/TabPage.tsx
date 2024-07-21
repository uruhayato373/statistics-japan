'use client'

import { SetStateAction, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import LineChartOutlined from '@ant-design/icons/LineChartOutlined'

import { handlePage } from 'utils/page'

function TabPage() {
  const pathname = usePathname()
  const [, fieldId, menuId, kindId, pageId] = pathname.split('/')

  const [value, setValue] = useState(pageId)

  const { items } = handlePage()
  const pages = items(menuId)

  const router = useRouter()

  const handleChange = (_: unknown, newValue: SetStateAction<string>) => {
    setValue(newValue)
    router.replace(`/${fieldId}/${menuId}/${kindId}/${newValue}`)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="account profile tab"
        >
          {pages.map((page) => (
            <Tab
              key={page.pageId}
              label={page.pageTitle}
              icon={<LineChartOutlined />}
              value={page.pageId}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Box>
    </>
  )
}

export default TabPage
