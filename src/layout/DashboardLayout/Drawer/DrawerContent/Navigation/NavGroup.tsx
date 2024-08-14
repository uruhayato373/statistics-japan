import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { useTheme, styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import Transitions from 'components/@extended/Transitions'
import SimpleBar from 'components/third-party/SimpleBar'

import DownOutlined from '@ant-design/icons/DownOutlined'
import RightOutlined from '@ant-design/icons/RightOutlined'

import { handlerHorizontalActiveItem, useGetMenuMaster } from 'api/menu'
import { MenuOrientation } from 'config'
import useConfig from 'hooks/useConfig'
import { MenuGroup, MenuItem } from 'menu-items'

import NavCollapse from './NavCollapse'
import NavItem from './NavItem'

// スタイル付きPopperコンポーネントの定義
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 5,
    left: 32,
    width: 12,
    height: 12,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderWidth: '6px',
    borderStyle: 'solid',
    borderColor: `${theme.palette.background.paper}  transparent transparent ${theme.palette.background.paper}`,
  },
}))

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
  const theme = useTheme()
  const pathname = usePathname()

  // 設定とメニューの状態の取得
  const { menuOrientation } = useConfig()
  const { menuMaster } = useGetMenuMaster()
  const drawerOpen = menuMaster.isDashboardDrawerOpened
  const selectedID = menuMaster.openedHorizontalItem

  // メディアクエリの使用
  const downLG = useMediaQuery(theme.breakpoints.down('lg'))

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
        console.log({ pathname })
        console.log({ ele, id })
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

  // メニューアイテムクリック時のハンドラ
  const handleClick = (event) => {
    if (!openMini) {
      setAnchorEl(event?.currentTarget)
    }
  }

  // メニューを閉じるハンドラ
  const handleClose = () => {
    setAnchorEl(null)
  }

  // アイコンの設定
  const Icon = currentItem?.icon
  const itemIcon = currentItem?.icon ? (
    <Icon
      style={{
        fontSize: 20,
        stroke: '1.5',
        color:
          selectedID === currentItem.id
            ? theme.palette.primary.main
            : theme.palette.secondary.dark,
      }}
    />
  ) : null

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
  const items = currentItem.children?.map((menu) => {
    switch (menu?.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menu.id}
            menu={menu}
            level={1}
            parentId={currentItem.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
          />
        )
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />
      default:
        return (
          <Typography key={menu?.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        )
    }
  })

  // ポップアップメニューのID
  const popperId = openMini ? `group-pop-${item.id}` : undefined

  // コンポーネントのレンダリング
  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        // 垂直方向のメニューまたは小さい画面サイズの場合のレンダリング
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
      ) : (
        // 水平方向のメニューの場合のレンダリング
        <List>
          <ListItemButton
            selected={selectedID === currentItem.id}
            sx={{
              p: 1,
              my: 0.5,
              mr: 1,
              display: 'flex',
              alignItems: 'center',
              '&.Mui-selected': { bgcolor: 'transparent' },
            }}
            onMouseEnter={handleClick}
            onClick={handleClick}
            onMouseLeave={handleClose}
            aria-describedby={popperId}
          >
            {itemIcon && (
              <ListItemIcon sx={{ minWidth: 28 }}>{itemIcon}</ListItemIcon>
            )}
            <ListItemText
              sx={{ mr: 1 }}
              primary={
                <Typography
                  variant="body1"
                  color={
                    selectedID === currentItem.id
                      ? 'primary.main'
                      : 'secondary.dark'
                  }
                >
                  {currentItem.title}
                </Typography>
              }
            />
            {openMini ? (
              <DownOutlined style={{ fontSize: 16, stroke: '1.5' }} />
            ) : (
              <RightOutlined style={{ fontSize: 16, stroke: '1.5' }} />
            )}
            {anchorEl && (
              <PopperStyled
                id={popperId}
                open={openMini}
                anchorEl={anchorEl}
                placement="bottom-start"
                style={{ zIndex: 2001 }}
              >
                {({ TransitionProps }) => (
                  <Transitions in={openMini} {...TransitionProps}>
                    <Paper
                      sx={{
                        mt: 0.5,
                        py: 1.25,
                        boxShadow: theme.shadows[8],
                        backgroundImage: 'none',
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <>
                          <SimpleBar
                            sx={{
                              minWidth: 200,
                              overflowX: 'hidden',
                              overflowY: 'auto',
                              maxHeight: 'calc(100vh - 170px)',
                            }}
                          >
                            {items}
                          </SimpleBar>
                        </>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
        </List>
      )}
    </>
  )
}
