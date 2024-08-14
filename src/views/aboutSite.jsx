'use client'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import Avatar from 'components/@extended/Avatar'
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel'
import MainCard from 'components/MainCard'

import AimOutlined from '@ant-design/icons/AimOutlined'
import FacebookOutlined from '@ant-design/icons/FacebookOutlined'
import FileTextOutlined from '@ant-design/icons/FileTextOutlined'
import GithubOutlined from '@ant-design/icons/GithubOutlined'
import InstagramOutlined from '@ant-design/icons/InstagramOutlined'
import MailOutlined from '@ant-design/icons/MailOutlined'
import PhoneOutlined from '@ant-design/icons/PhoneOutlined'
import XOutlined from '@ant-design/icons/XOutlined'

export default function AboutSite() {
  const matchDownMD = useMediaQuery((theme) => theme.breakpoints.down('md'))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Chip label="Admin" size="small" color="primary" />
                  </Stack>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar
                      alt="admin"
                      size="xl"
                      src="/assets/images/admin.png"
                    />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">uruhayato373</Typography>
                      <Typography color="secondary">Site admin</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                  >
                    <IconButton
                      color="secondary"
                      aria-label="GitHub"
                      component="a"
                      href="https://github.com/uruhayato373"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ fontSize: '1.5rem' }}
                    >
                      <GithubOutlined />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="Twitter"
                      component="a"
                      href="https://twitter.com/uruhayato373"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ fontSize: '1.5rem' }}
                    >
                      <XOutlined />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="Facebook"
                      component="a"
                      href="https://facebook.com/yourpage"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ fontSize: '1.5rem' }}
                    >
                      <FacebookOutlined />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="Facebook"
                      component="a"
                      href="https://instagram.com/uruhayato373"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ fontSize: '1.5rem' }}
                    >
                      <InstagramOutlined />
                    </IconButton>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List
                    component="nav"
                    aria-label="main mailbox folders"
                    sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <MailOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">
                          uruhayato373@gmail.com
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">private</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AimOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">Kobe Hyogo</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FileTextOutlined />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Link
                          align="right"
                          href="https://zenn.dev/uruhayato373"
                          target="_blank"
                        >
                          Zenn
                        </Link>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Skills">
              <Grid container spacing={1.25}>
                <Grid item xs={6}>
                  <Typography color="secondary">TypeScript</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={40} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">Python</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={40} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">HTML/CSS</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={30} />
                </Grid>
                <Grid item xs={6}>
                  <Typography color="secondary">React</Typography>
                </Grid>
                <Grid item xs={6}>
                  <LinearWithLabel value={30} />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="免責事項">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Stack spacing={1}>
                    <Typography color="secondary" variant="body2">
                      当サイトに掲載する内容について、細心の注意を払っておりますが、その妥当性や正確性等について保証するものではありません。
                    </Typography>
                    <Typography color="secondary" variant="body2">
                      当サイトに掲載する内容を利用することにより直接・間接的に生じた結果・損失等に対し、当サイトは一切の責任を負いません。
                    </Typography>
                    <Typography color="secondary" variant="body2">
                      当サイトに掲載する内容は、事前の通知なしに修正・削除されることがあります。
                    </Typography>
                  </Stack>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="プライバシーポリシー">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Stack spacing={1}>
                    <Typography>個人情報の利用目的</Typography>
                    <Typography color="secondary" variant="body2">
                      当サイトでは、お問い合わせの際、名前やメールアドレス等の個人情報を入力いただく場合がございます。
                    </Typography>
                    <Typography color="secondary" variant="body2">
                      取得した個人情報は、お問い合わせに対する回答や必要な情報を電子メールなどでご連絡する場合に利用させていただくものであり、これらの目的以外では利用いたしません。
                    </Typography>
                  </Stack>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Stack spacing={1}>
                    <Typography>Googleアドセンス</Typography>
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
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="お問い合わせ">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Stack spacing={0.25}>
                    <Typography color="secondary" variant="body2">
                      お問い合わせは{' '}
                      <Link href="https://docs.google.com/forms/d/11ATT8d4twR7IB1j3sUR0FUmrwkFTZoMb3IXCAqi1ImE/edit">
                        こちら
                      </Link>
                      へお願いします。
                    </Typography>
                  </Stack>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
