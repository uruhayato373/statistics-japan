import items from 'data/contents/field/fieldList.json'

import { FieldType } from 'types/contents'

const handleField = () => {
  return {
    items,
    findItem: (fieldId: string) => findItem(fieldId),
  }
}

const findItem = (fieldId: string): FieldType | undefined => {
  return items.find((f) => f.fieldId === fieldId)
}

export default handleField
