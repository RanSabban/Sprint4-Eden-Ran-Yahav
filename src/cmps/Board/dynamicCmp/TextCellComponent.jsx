
import { AddBtn, TextEditIcon } from "../../../services/svg.service";
import { InputCell } from "../reusableCmps/InputCell";
import { EditableCell } from "./EditableCell";

export function TextCellComponent({ clmType, cell, taskId, onUpdateCell }) {

    function onUpdateInput(value) {
        cell.txt = value
        onUpdateCell(cell, taskId)
    }



    return <span className="dyn-cell txt dyn-cell-flexy">
      
        <EditableCell txt={cell.txt} onUpdateInput={onUpdateInput} />

    </span>
}