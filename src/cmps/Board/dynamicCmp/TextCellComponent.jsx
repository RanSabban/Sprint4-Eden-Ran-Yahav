import { InputCell } from "../reusableCmps/InputCell";

export function TextCellComponent({ clmType, cell, taskId, onUpdateTask }) {



    console.log(taskId, cell);
    // { cell.txt }

    function onUpdateInput(value) {
        cell.txt = value
        console.log(cell);
        onUpdateTask(cell,taskId)
    }

    return <span className="dyn-cell txt"><InputCell txt={cell.txt} onUpdateInput={onUpdateInput} /></span>
}