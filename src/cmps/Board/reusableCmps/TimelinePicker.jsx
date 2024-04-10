import React, { useEffect, useState } from "react"
import { usePopper } from "react-popper"
import { format, addMonths } from 'date-fns'

import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { updateTask as modifyTask, updateCell } from "../../../store/actions/board.actions"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service"
import { Icon } from "monday-ui-react-core"
import { CloseSmall, Calendar } from "monday-ui-react-core/icons"

export function TimelinePicker({ dueDate, boardId, groupId, taskId, cell, onUpdateCell }) {
    const [selected, setSelected] = useState(dueDate ? new Date() : null)
    const [isDatePickerOpen, setDatePickerOpen] = useState(false)

    const [referenceElem, setReferenceElem] = useState(null)
    const [popperElem, setPopperElem] = useState(null)
    const [arrowElem, setArrowElem] = useState(null)
    const today = new Date();
    const nextMonth = addMonths(new Date(), 1);

    const { styles, attributes } = usePopper(referenceElem, popperElem, {
        modifiers: [{ name: 'arrow', options: { element: arrowElem } }],
    })
    const modifiers = {
        today: new Date(),
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            setDatePickerOpen(false);

        }

        document.addEventListener('mousedown', handleOutsideClick)

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [popperElem, referenceElem])

    async function onChangeDueDate(date) {
        // ev.preventDefault()

        if (!date) return
        const timestamp = date.getTime()
        try {
            cell.date = timestamp
            await onUpdateCell(cell, taskId)
            console.log(timestamp);
            showSuccessMsg(`Changed due date in task ${taskId}`)
            setSelected()
        } catch (err) {
            showErrorMsg(`Can't change due date in task ${taskId}`)
        }
    }

    async function clearTaskDueDate(ev) {
        ev.preventDefault()
        try {
            await updateCell(boardId, groupId, taskId)
            setSelected(null)
        } catch (err) {
            showErrorMsg('Something went wrong')
        }
    }

    const footer = selected ? <p>You picked {format(selected, 'PP')}.</p> : <p>Please pick a day.</p>

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

    return (

        <div className="task-date"
            ref={setReferenceElem}
            onClick={() => setDatePickerOpen(!isDatePickerOpen)}>
            {isDatePickerOpen &&
                <div ref={setPopperElem}
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
                    <div ref={setArrowElem}
                        style={styles.arrow} />
                </div>
            }
        </div>


    )
}
