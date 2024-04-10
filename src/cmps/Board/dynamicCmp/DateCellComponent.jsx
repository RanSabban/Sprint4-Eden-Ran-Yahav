import React, { useState } from "react";
import dayjs from "dayjs";
import { TimelinePicker } from "../reusableCmps/TimelinePicker";

export function DateCellComponent({ clmType, cell, onUpdateCell, taskId }) {
    const [showPicker, setShowPicker] = useState(false);

    function getCellDate() {
        const date = dayjs(cell.date).format('DD MMM');
        return date;
    }

    const handleOnClick = () => {
        setShowPicker(true);
    };

    function onChange() {
        onUpdateCell(cell, taskId)
    }

    return (
        <div className="dyn-cell date-container dyn-cell-flexy">
            <span className="dyn-cell date" onClick={handleOnClick}>
                {getCellDate()}
            </span>
            {showPicker && <TimelinePicker cell={cell} onUpdateCell={onUpdateCell} taskId={taskId} />}
        </div>
    );
}


// export function TextCellComponent({ clmType, cell, taskId, onUpdateCell }) {

//     function onUpdateInput(value) {
//         cell.txt = value
//         onUpdateCell(cell,taskId)
//     }

//     return <span className="dyn-cell txt"><InputCell txt={cell.txt} onUpdateInput={onUpdateInput} /></span>
// }