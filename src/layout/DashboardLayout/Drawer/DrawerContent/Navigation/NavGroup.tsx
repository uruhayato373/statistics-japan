import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
// import Popper from '@mui/material/Popper'
// import { useTheme, styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
// import useMediaQuery from '@mui/material/useMediaQuery'

import { handlerHorizontalActiveItem, useGetMenuMaster } from 'api/menu'
// import useConfig from 'hooks/useConfig'
import { MenuGroup, MenuItem } from 'menu-items'

import NavCollapse from './NavCollapse'
import NavItem from './NavItem'

// スタイル付きPopperコンポーネントの定義
// const PopperStyled = styled(Popper)(({ theme }) => ({
//   overflow: 'visible',
//   zIndex: 1202,
//   minWidth: 180,
//   '&:before': {
//     content: '""',
//     display: 'block',
//     position: 'absolute',
//     top: 5,
//     left: 32,
//     width: 12,
//     height: 12,
//     transform: 'translateY(-50%) rotate(45deg)',
//     zIndex: 120,
//     borderWidth: '6px',
//     borderStyle: 'solid',
//     borderColor: `${theme.palette.background.paper}  transparent transparent ${theme.palette.background.paper}`,
//   },
// }))

interface Props {
  item: MenuGroup
  selectedItems: string
  setSelectedItems: Dispatch<SetStateAction<string>>
  selectedLevel: number
  setSelectedLevel: Dispatch<SetStateAction<number>>
}

// NavGroupコンポーネントの定義
export default function NavGroup({
  item,
  selectedItems,
  setSelectedItems,
  selectedLevel,
  setSelectedLevel,
}: Props) {
  // テーマとパスの取得
  // const theme = useTheme()
  const pathname = usePathname()

  // 設定とメニューの状態の取得
  // const { menuOrientation } = useConfig()
  const { menuMaster } = useGetMenuMaster()
  const drawerOpen = menuMaster.isDashboardDrawerOpened
  // const selectedID = menuMaster.openedHorizontalItem

  // メディアクエリの使用
  // const downLG = useMediaQuery(theme.breakpoints.down('lg'))

  // ステートの初期化
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentItem] = useState(item)

  // ポップアップメニューの開閉状態
  const openMini = Boolean(anchorEl)

  // 親アイテムのオープン状態をチェックする関数
  const checkOpenForParent = (child: MenuItem[], id: string) => {
    child.forEach((ele) => {
      if (ele.children?.length) {
        checkOpenForParent(ele.children, currentItem.id)
      }
      if (ele.url === pathname) {
        handlerHorizontalActiveItem(id)
      }
    })
  }

  /**
   * ページロード時にメニューアイテムの選択状態をチェックし、必要に応じて更新する関数。
   * @param data - チェック対象のMenuGroup
   * @remarks
   * 現在のパスに一致するメニューアイテムを見つけた場合、対応する親アイテムをアクティブにする。
   *
   */
  const checkSelectedOnload = (data: MenuGroup) => {
    const childrens = data.children ? data.children : []
    childrens.forEach((itemCheck) => {
      if (itemCheck?.children?.length) {
        checkOpenForParent(itemCheck.children, currentItem.id)
      }
      if (itemCheck?.url === pathname) {
        handlerHorizontalActiveItem(currentItem.id)
      }
    })
  }

  // useEffectフック：コンポーネントのマウント時とパスが変更されたときに実行
  useEffect(() => {
    checkSelectedOnload(currentItem)
    if (openMini) setAnchorEl(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, currentItem])

  // // メニューアイテムクリック時のハンドラ
  // const handleClick = (event) => {
  //   if (!openMini) {
  //     setAnchorEl(event?.currentTarget)
  //   }
  // }

  // // メニューを閉じるハンドラ
  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  // アイコンの設定
  // const Icon = currentItem?.icon
  // const itemIcon = currentItem?.icon ? (
  //   <Icon
  //     style={{
  //       fontSize: 20,
  //       stroke: '1.5',
  //       color:
  //         selectedID === currentItem.id
  //           ? theme.palette.primary.main
  //           : theme.palette.secondary.dark,
  //     }}
  //   />
  // ) : null

  // 子メニューアイテムのレンダリング
  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menuItem.id}
            menu={menuItem}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            level={1}
            parentId={currentItem.id}
          />
        )
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />
      default:
        return (
          <Typography
            key={menuItem.id}
            variant="h6"
            color="error"
            align="center"
          >
            Fix - Group Collapse or Items
          </Typography>
        )
    }
  })

  // メインメニューアイテムのレンダリング
  // const items = currentItem.children?.map((menu) => {
  //   switch (menu?.type) {
  //     case 'collapse':
  //       return (
  //         <NavCollapse
  //           key={menu.id}
  //           menu={menu}
  //           level={1}
  //           parentId={currentItem.id}
  //           setSelectedItems={setSelectedItems}
  //           setSelectedLevel={setSelectedLevel}
  //           selectedLevel={selectedLevel}
  //           selectedItems={selectedItems}
  //         />
  //       )
  //     case 'item':
  //       return <NavItem key={menu.id} item={menu} level={1} />
  //     default:
  //       return (
  //         <Typography key={menu?.id} variant="h6" color="error" align="center">
  //           Menu Items Error
  //         </Typography>
  //       )
  //   }
  // })

  // ポップアップメニューのID
  // const popperId = openMini ? `group-pop-${item.id}` : undefined

  // コンポーネントのレンダリング
  return (
    <>
      <List
        subheader={
          <>
            {item.title ? (
              drawerOpen && (
                <Box sx={{ pl: 3, mb: 1.5 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.title}
                  </Typography>
                  {item.caption && (
                    <Typography variant="caption" color="secondary">
                      {item.caption}
                    </Typography>
                  )}
                </Box>
              )
            ) : (
              <Divider sx={{ my: 0.5 }} />
            )}
          </>
        }
        sx={{ mt: drawerOpen && item.title ? 1.5 : 0, py: 0, zIndex: 0 }}
      >
        {navCollapse}
      </List>
    </>
  )
}
