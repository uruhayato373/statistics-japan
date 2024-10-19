import { RouterProps } from 'utils/props'

const generateFileName = ({
  fieldId,
  menuId,
  kindId,
  cardId,
  prefCode,
}: RouterProps): string => {
  const fileName = prefCode ? `${cardId}/${prefCode}.json` : `${cardId}.json`
  return `${fieldId}/${menuId}/${kindId}/${fileName}`
}

export default generateFileName
