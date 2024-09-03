import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import MainCard from 'components/MainCard'

export default function SourceAnnotation() {
  return (
    <MainCard sx={{ mt: 1 }} content={false}>
      <Box sx={{ p: 2 }}>
        <List sx={{ py: 0 }}>
          <ListItem>
            <Stack spacing={1}>
              <Typography>出典</Typography>
              <Typography color="secondary" variant="body2">
                政府統計の総合窓口 e-Stat 「社会・人口統計体系」
                <Link href="https://www.e-stat.go.jp/dbview?sid=0000010103">
                  C 経済基盤
                </Link>
              </Typography>
              <Typography color="secondary" variant="body2">
                政府統計の総合窓口 e-Stat 「社会・人口統計体系」
                <Link href="https://www.e-stat.go.jp/dbview?sid=0000010112">
                  L 家計
                </Link>
              </Typography>
            </Stack>
          </ListItem>
          <ListItem>
            <Stack spacing={1}>
              <Typography>注釈</Typography>
              <Typography color="secondary" variant="body2">
                農業就業人口は販売農家を対象とする。
              </Typography>
            </Stack>
          </ListItem>
        </List>
      </Box>
    </MainCard>
  )
}
