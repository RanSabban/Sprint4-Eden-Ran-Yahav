import { InputCell } from "../reusableCmps/InputCell";

export function TextCellComponent({ clmType, cell, taskId, onUpdateTask }) {

    function onUpdateInput(value) {
        cell.txt = value
        onUpdateTask(cell,taskId)
    }

    return <span className="dyn-cell txt"><InputCell txt={cell.txt} onUpdateInput={onUpdateInput} /></span>
}