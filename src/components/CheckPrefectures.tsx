'use client'
import { useCallback, useEffect, Suspense, useState } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import useSWR from 'swr'

import fetcher from 'utils/fetcher'
import { RegionPrefectureType } from 'utils/prefecture'

import CircularProgressCards from './CircularProgressCards'

function CheckPrefecturesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [selectedPrefCodes, setSelectedPrefCodes] = useState<string[]>([])

  const { data: regions } = useSWR<RegionPrefectureType[]>(
    '/api/prefecture?type=regions',
    fetcher,
    { suspense: true }
  )

  // 初期レンダリング時にsearchParamsからareaCodeを取得してセット
  useEffect(() => {
    const areaCodes = searchParams.getAll('areaCode')
    setSelectedPrefCodes(areaCodes)
  }, [searchParams])

  const handlePrefectureChange = useCallback(
    (prefCode: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked
      setSelectedPrefCodes((prev) =>
        isChecked
          ? [...prev, prefCode]
          : prev.filter((code) => code !== prefCode)
      )
    },
    []
  )

  // selectedPrefCodesが変更されたらURLを更新
  useEffect(() => {
    const params = new URLSearchParams()
    selectedPrefCodes.forEach((code) => {
      params.append('areaCode', code)
    })
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }, [selectedPrefCodes, pathname, router])

  return (
    <Box sx={{ overflowY: 'auto', maxHeight: '400px' }}>
      {regions?.map(({ name, prefectures }, index) => (
        <Box key={name} sx={{ mb: index < regions.length - 1 ? 2 : 0 }}>
          <Typography variant="caption">{name}</Typography>
          <Divider />
          <Grid container spacing={0} sx={{ pt: 0.4 }}>
            {prefectures.map((pref) => (
              <Grid item xs={4} sm={3} md={6} lg={4} key={pref.prefCode}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPrefCodes.includes(pref.prefCode)}
                      onChange={handlePrefectureChange(pref.prefCode)}
                      name={pref.prefName}
                      size="small"
                    />
                  }
                  label={pref.prefName}
                  sx={{
                    margin: 0,
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.7rem',
                      lineHeight: 0.7,
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

function CheckPrefectures() {
  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CheckPrefecturesContent />
    </Suspense>
  )
}

export default CheckPrefectures
