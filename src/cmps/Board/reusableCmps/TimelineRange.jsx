import React, { useEffect, useRef, useState } from "react"
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service"

export function TimelineRange({ setDatePickerOpen, taskId, cell, onUpdateCell }) {
    const [selected, setSelected] = useState()
    const referenceElem = useRef()

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!referenceElem.current.contains(event.target)) {
                setDatePickerOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [setDatePickerOpen])

    const handleDayClick = async (date) => {
        try {
            const timestamp = date.getTime()
            cell.date = timestamp
            await onUpdateCell(cell, taskId)
            setSelected(date)
            setDatePickerOpen(false)
            showSuccessMsg(`Changed due date in task ${taskId}`)
        } catch (err) {
            showErrorMsg(`Can't change due date in task ${taskId}`)
        }
    }

    return (
        <div className="task-date" ref={referenceElem}>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleDayClick}
                modifiersStyles={{
                    today: { border: '2px solid red' },
                    selected: { backgroundColor: 'blue', color: 'white' }
                }}
            />
        </div>
    )
}
