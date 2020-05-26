import { Location, State, Cell, Compatible, CellChange } from '../Model';
import { getCompatibleCellAndTemplate } from './getCompatibleCellAndTemplate';

export function tryAppendChange(state: State, location: Location, cell: Compatible<Cell>): State {

    const { cell: initialCell, cellTemplate } = getCompatibleCellAndTemplate(state, location);
    if (initialCell === cell || JSON.stringify(initialCell) === JSON.stringify(cell) || cellTemplate.update === undefined)
        return state;

    const newCell = cellTemplate.update(initialCell, cell);
    if (newCell !== initialCell || JSON.stringify(newCell) !== JSON.stringify(initialCell))
        state.queuedCellChanges.push({
            initialCell,
            newCell,
            type: newCell.type,
            rowId: location.row.rowId,
            columnId: location.column.columnId
        } as CellChange);
    return { ...state };
}