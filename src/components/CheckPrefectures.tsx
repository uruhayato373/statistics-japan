'use client'
import { useCallback, useEffect, Suspense } from 'react'

import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import useSWR from 'swr'

import { checkedPrefectures, prefecture } from 'atoms'
import fetcher from 'utils/fetcher'
import { RegionPrefectureType } from 'utils/prefecture'

import { useAtom } from 'jotai'

import CircularProgressCards from './CircularProgressCards'

/**
 * 都道府県チェックボックスのコンポーネント
 *
 * @remarks
 * 関東・北陸などの地域ごとにグループ化された都道府県のチェックボックスリストを表示する。
 * ユーザーは複数の都道府県を選択でき、選択状態はJotaiを使用して管理される。
 */
function CheckPrefecturesContent() {
  /**
   * 選択した都道府県をJotaiで管理
   */
  const [selectedPrefectures, setSelectedPrefectures] =
    useAtom(checkedPrefectures)

  /**
   * 初期選択都道府県をセット
   */
  const [currentPrefecture] = useAtom(prefecture)
  useEffect(() => {
    setSelectedPrefectures([currentPrefecture])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 地域別都道府県データを取得
   */
  const { data: regions } = useSWR<RegionPrefectureType[]>(
    '/api/prefecture?type=regions',
    fetcher,
    { suspense: true }
  )

  /**
   * 都道府県の選択状態を更新
   *
   * @param event - チェックボックスの変更イベント
   * @param prefCode - 都道府県コード
   * @param prefName - 都道府県名
   */
  const handlePrefectureChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      prefCode: string,
      prefName: string
    ) => {
      const isChecked = event.target.checked
      setSelectedPrefectures((prev) =>
        isChecked
          ? [...prev, { prefCode, prefName }]
          : prev.filter((pref) => pref.prefCode !== prefCode)
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Box sx={{ overflowY: 'auto', maxHeight: '400px' }}>
      {regions.map(({ name, prefectures }, index) => (
        <Box key={name} sx={{ mb: index < regions.length - 1 ? 2 : 0 }}>
          <Typography variant="caption">{name}</Typography>
          <Divider />
          <Grid container spacing={0} sx={{ pt: 0.4 }}>
            {prefectures.map((pref) => (
              <Grid item xs={4} sm={3} md={6} lg={4} key={pref.prefCode}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedPrefectures.some(
                        (p) => p.prefCode === pref.prefCode
                      )}
                      onChange={(e) =>
                        handlePrefectureChange(e, pref.prefCode, pref.prefName)
                      }
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

/**
 * Suspenseでラップ
 *
 * @remarks
 * 関東・北陸などの地域ごとにグループ化された都道府県のチェックボックスリストを表示する。
 * ユーザーは複数の都道府県を選択でき、選択状態はJotaiを使用して管理される。
 */
function CheckPrefectures() {
  return (
    <Suspense fallback={<CircularProgressCards />}>
      <CheckPrefecturesContent />
    </Suspense>
  )
}

export default CheckPrefectures
