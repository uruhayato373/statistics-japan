import { NextRequest, NextResponse } from 'next/server'

import { MenuType, handleMenu } from 'utils/menu'

export async function GET(
  request: NextRequest
): Promise<NextResponse<MenuType[] | MenuType>> {
  const { items, findItem } = handleMenu()

  const fieldId = request.nextUrl.searchParams.get('fieldId')
  const menuId = request.nextUrl.searchParams.get('menuId')

  const menus = items(fieldId)

  if (menuId) {
    const menu = findItem(menuId)
    return NextResponse.json(menu)
  } else {
    return NextResponse.json(menus)
  }
}
