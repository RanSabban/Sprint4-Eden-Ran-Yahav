import React, { useState } from "react";
import dayjs from "dayjs";
import { TimelinePicker } from "../reusableCmps/TimelinePicker";

export function DateCellComponent({ clmType, cell, onUpdateCell, taskId }) {
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);

    function getCellDate() {
        const date = dayjs(cell.date).format('DD MMM');
        return date;
    }

    const handleOnClick = () => {
        setDatePickerOpen(true);
        console.log(isDatePickerOpen);
    }

    return (
        <div className="dyn-cell date-container dyn-cell-flexy">
            <span className="dyn-cell date" onClick={handleOnClick}>
                {getCellDate()}
            </span>
            {isDatePickerOpen && <TimelinePicker
                cell={cell}
                onUpdateCell={onUpdateCell}
                taskId={taskId}
                isDatePickerOpen={isDatePickerOpen}
                setDatePickerOpen={setDatePickerOpen} />}
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