import Typography from '@mui/material/Typography'

import formatNumberJapanese from 'utils/value/modules/formatNumberJapanese'

const DifferenceText: React.FC<{ difference: number; unit: string }> = ({
  difference,
  unit,
}) => {
  if (difference === 0) return <>増減なし</>
  const color = difference < 0 ? 'warning' : 'primary'
  return (
    <>
      <Typography
        component="span"
        variant="caption"
        sx={{ color: `${color}.main` }}
      >
        {formatNumberJapanese(Math.abs(difference))}
      </Typography>
      {unit}
      {difference < 0 ? ' 減少' : ' 増加'}
    </>
  )
}

export default DifferenceText
