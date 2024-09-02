'use client'

import Link from 'next/link'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MainCard from 'components/MainCard'

export default function SourceAnnotationWeather() {
  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem>
            <Stack spacing={1}>
              <Typography>出典</Typography>
              <Typography color="secondary" variant="body2">
                政府統計の総合窓口 e-Stat
              </Typography>
              <Link href="https://www.e-stat.go.jp/dbview?sid=0000010102">
                「社会・人口統計体系」
              </Link>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack spacing={1}>
              <Typography>注釈</Typography>
              <Typography color="secondary" variant="body2">
                当サイトでは、第三者配信による広告サービス（Google
                AdSense）を利用しています。
              </Typography>
              <Typography color="secondary" variant="body2">
                広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie」(氏名、住所、メールアドレス、電話番号は含まれません)を使用することがあります。
              </Typography>
              <Typography color="secondary" variant="body2">
                Cookieを無効にする設定およびGoogleAdSenseに関する詳細は{' '}
                <Link href="https://policies.google.com/technologies/ads?hl=ja">
                  「広告 - ポリシーと規約 - Google」
                </Link>
                をご覧ください。
              </Typography>
            </Stack>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  )
}
