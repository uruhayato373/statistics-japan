'use client'

import { useState } from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useGetMenuMaster } from 'api/menu'
import { HORIZONTAL_MAX_ITEM, MenuOrientation } from 'config'
import useConfig from 'hooks/useConfig'
import menuItem from 'menu-items'

import NavGroup from './NavGroup'
import NavItem from './NavItem'

// const menuItems = {
//   items: [
//     {
//       id: 'group-widget',
//       title: 'Widgets',
//       type: 'group',
//       children: [
//         {
//           id: 'landweather',
//           title: '国土・気象',
//           type: 'collapse',
//           icon: '...',
//           children: [
//             {
//               breadcrumbs: false,
//               id: 'total-area',
//               title: '総面積',
//               type: 'item',
//               url: '/landweather/total-area',
//             },
//             {
//               breadcrumbs: false,
//               id: 'weather',
//               title: '天候・気象',
//               type: 'item',
//               url: '/landweather/weather',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }

// Navigationコンポーネント: アプリケーションのメインナビゲーションを管理
export default function Navigation() {
  // useConfigフックからメニューの向きを取得
  const { menuOrientation } = useConfig()
  // メニューマスターの状態を取得
  const { menuMaster } = useGetMenuMaster()
  // ダッシュボードドロワーの開閉状態
  const drawerOpen = menuMaster.isDashboardDrawerOpened
  // 画面サイズがlg未満かどうかを判定
  const downLG = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  // 選択されたメニュー項目と階層を管理するstate
  const [selectedItems, setSelectedItems] = useState('')
  const [selectedLevel, setSelectedLevel] = useState(0)
  // メニュー項目の状態を管理
  const [menuItems] = useState({ items: [...menuItem.items] })

  // 水平方向のメニューかどうかを判定
  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG

  console.log(isHorizontal)

  // 水平メニューの場合の最大項目数を設定
  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null
  let lastItemIndex = menuItems.items.length - 1
  let remItems = []
  let lastItemId

  // 水平メニューの場合、最大項目数を超える項目を処理
  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id
    lastItemIndex = lastItem - 1
    // 最大項目数を超える項目を別の配列に格納
    remItems = menuItems.items
      .slice(lastItem - 1, menuItems.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
        ...(item.url && {
          url: item.url,
        }),
      }))
  }

  // ナビゲーショングループを生成
  const navGroups = menuItems.items
    .slice(0, lastItemIndex + 1)
    .map((item, index) => {
      switch (item.type) {
        case 'group':
          // URLを持つグループ項目の処理
          if (item.url && item.id !== lastItemId) {
            return (
              <List key={item.id} {...(isHorizontal && { sx: { mt: 0.5 } })}>
                {!isHorizontal && index !== 0 && <Divider sx={{ my: 0.5 }} />}
                <NavItem item={item} level={1} isParents />
              </List>
            )
          }

          // 通常のグループ項目の処理
          return (
            <NavGroup
              key={item.id}
              setSelectedItems={setSelectedItems}
              setSelectedLevel={setSelectedLevel}
              selectedLevel={selectedLevel}
              selectedItems={selectedItems}
              lastItem={lastItem}
              remItems={remItems}
              lastItemId={lastItemId}
              item={item}
            />
          )
        default:
          // 不正なタイプの項目に対するエラーメッセージ
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Fix - Navigation Group
            </Typography>
          )
      }
    })

  // ナビゲーションのレンダリング
  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        ...(!isHorizontal && {
          '& > ul:first-of-type': { mt: 0 },
        }),
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block',
      }}
    >
      {navGroups}
    </Box>
  )
}
