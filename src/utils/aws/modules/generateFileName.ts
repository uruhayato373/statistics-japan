import { RouterPropsType } from 'types/apps'

const generateFileName = ({
  fieldId,
  menuId,
  kindId,
  cardId,
  prefCode,
}: RouterPropsType): string => {
  const fileName = prefCode ? `${cardId}/${prefCode}.json` : `${cardId}.json`
  return `${fieldId}/${menuId}/${kindId}/${fileName}`
}

export default generateFileName
