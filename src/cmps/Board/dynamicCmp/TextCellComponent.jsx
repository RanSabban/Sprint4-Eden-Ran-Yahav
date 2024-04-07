import { InputCell } from "../reusableCmps/InputCell";

export function TextCellComponent({ clmType, cell, taskId, onUpdateCell }) {

    function onUpdateInput(value) {
        cell.txt = value
        onUpdateCell(cell,taskId)
    }

    return <span className="dyn-cell txt"><InputCell txt={cell.txt} onUpdateInput={onUpdateInput} /></span>
}