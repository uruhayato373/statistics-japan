'use client'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import IconButton from 'components/@extended/IconButton'

import DragOutlined from '@ant-design/icons/DragOutlined'
import PropTypes from 'prop-types'
import { useDrag, useDrop } from 'react-dnd'

export default function DraggableRow({ row, reorderRow, children }) {
  const [{ isOverCurrent }, dropRef] = useDrop({
    accept: 'row',
    drop: (draggedRow) => reorderRow(draggedRow.index, row.index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  })

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    item: () => row,
    type: 'row',
  })

  return (
    <TableRow
      //previewRef could go here
      ref={previewRef}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        bgcolor: isOverCurrent ? 'primary.lighter' : 'inherit',
      }}
    >
      <TableCell ref={dropRef}>
        <IconButton
          ref={dragRef}
          size="small"
          sx={{ p: 0, width: 24, height: 24, fontSize: '1rem', mr: 0.75 }}
          color="secondary"
          disabled={row.getIsGrouped()}
        >
          <DragOutlined />
        </IconButton>
      </TableCell>
      {children}
    </TableRow>
  )
}

DraggableRow.propTypes = {
  row: PropTypes.object,
  reorderRow: PropTypes.func,
  children: PropTypes.node,
}
