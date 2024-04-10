import React, { useEffect, useRef, useState } from "react"
import { usePopper } from "react-popper"
import { format, addMonths } from 'date-fns'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { updateTask as modifyTask, updateCell } from "../../../store/actions/board.actions"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service"
import { Icon } from "monday-ui-react-core"
import { CloseSmall, Calendar } from "monday-ui-react-core/icons"

export function TimelinePicker({ isDatePickerOpen, setDatePickerOpen, boardId, groupId, taskId, cell, onUpdateCell }) {
    const [selected, setSelected] = useState(new Date());
    const referenceElem = useRef()
    const popperElem = useRef(null);
    const arrowElem = useRef(null);

    const styles = { popper: {}, arrow: {} };
    const attributes = { popper: {} };

    const modifiers = {
        today: new Date(),
    }
    const footer = selected ? <p>You picked {format(selected, 'PP')}.</p> : <p>Please pick a day.</p>

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (popperElem.current && !popperElem.current.contains(event.target) &&
                referenceElem.current && !referenceElem.current.contains(event.target)) {
                setDatePickerOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [setDatePickerOpen]);


    async function onChangeDueDate(date) {
        if (!date) return
        const timestamp = date.getTime()
        try {
            setDatePickerOpen(false)
            cell.date = timestamp
            await onUpdateCell(cell, taskId)
            console.log(timestamp);
            showSuccessMsg(`Changed due date in task ${taskId}`)
            setSelected(date);
        } catch (err) {
            showErrorMsg(`Can't change due date in task ${taskId}`)
        }
    }

    return (
        <>

            <div className="task-date"
                ref={referenceElem} 
            >
                <div ref={popperElem}
                    style={styles.popper}
                    {...attributes.popper}
                    className="date-picker-modal">
                    <style>{pickerCss}</style>
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={onChangeDueDate}
                        footer={footer}
                        showOutsideDays
                        modifiers={modifiers}
                        modifiersClassNames={{
                            selected: 'my-selected',
                            today: 'my-today',
                        }}
                    />
                    <div ref={arrowElem} style={styles.arrow} />
                </div>
            </div>

        </>
    );

}



const pickerCss = `
.my-selected:not([disabled]) { 
    border-radius: var(--border-radius-small)
    background-color: $bgc-main
    color : white
  }
  .my-selected:hover:not([disabled]) { 
    background-color: #0060b9
    border : 1px solid black
    color: black
  }
  .my-today { 
    border-radius: 2em
    border : 1px solid #0060b9
  }
`