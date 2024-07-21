import { NextRequest, NextResponse } from 'next/server'

import { FieldType, handleField } from 'utils/field'

export async function GET(
  request: NextRequest
): Promise<NextResponse<FieldType[] | FieldType>> {
  const { items, findItem } = handleField()

  const fieldId = request.nextUrl.searchParams.get('fieldId')

  if (fieldId) {
    const field = findItem(fieldId)
    return NextResponse.json(field)
  } else {
    return NextResponse.json(items)
  }
}
