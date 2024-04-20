import React, { useEffect, useState, useRef } from "react"
import dayjs from "dayjs"
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { Button } from "monday-ui-react-core"

export function TimelinesComponent({ cell, groupColor, onUpdateCell, taskId }) {
    const [isDatePickerOpen, setDatePickerOpen] = useState(false)
    const [selectedRange, setSelectedRange] = useState({ from: undefined, to: undefined })

    const handleOnClick = () => {
        setDatePickerOpen(true)
    }

    const onChangeDueDate = async () => {
        if (!selectedRange.from || !selectedRange.to) return
        try {
            setDatePickerOpen(false)

            const updatedCell = {
                ...cell,
                startDate: selectedRange.from.getTime(),
                endDate: selectedRange.to.getTime()
            }
            await onUpdateCell(updatedCell, taskId)
            setDatePickerOpen(false)
        } catch (err) {
            console.error("Error updating cell:", err)
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.date-picker-modal') && !event.target.closest('.dyn-cell.timeline')) {
                setSelectedRange({ from: undefined, to: undefined })
                setDatePickerOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [])

    function calculateTimeDifference(startDate, endDate) {
        const start = dayjs(startDate)
        const end = dayjs(endDate)
        const duration = end.diff(start, 'day')

        if (duration < 0) {
            return "Invalid Date Range"
        } else if (duration === 1) {
            return "1d"
        } else {
            return `${duration}d`
        }
    }

    return (
        <div onClick={handleOnClick} className="dyn-cell timeline dyn-cell-flexy">
            {isDatePickerOpen && (
                <TimelineRange
                    selectedRange={selectedRange}
                    setSelectedRange={setSelectedRange}
                    onUpdateCell={onChangeDueDate}
                />
            )}

            <section style={{ position: 'absolute', background: (formatDisplayDate(cell.startDate, cell.endDate).key === null) ? 'gray' : 'rgb(48, 48, 48)' }} className="timeline-container">
                <div className="progress-bar-container">
                    <span className="timeline-date-txt">{formatDisplayDate(cell.startDate, cell.endDate)}</span>
                    <div className="time-difference">
                        {calculateTimeDifference(cell.startDate, cell.endDate) === 'NaNd'
                            ? 'Set Dates'
                            : calculateTimeDifference(cell.startDate, cell.endDate)}
                    </div>

                    <div style={{ width: getPercentage(cell.startDate, cell.endDate), background: groupColor, height: '100%' }} className="progress-bar"></div>
                </div>
            </section>

        </div>
    )
}

export function TimelineRange({ selectedRange, setSelectedRange, onUpdateCell }) {
    const referenceElem = useRef()
    const popperElem = useRef(null)

    const handleDateRangeSelect = (range) => {
        setSelectedRange(range)
    }
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (referenceElem.current && !referenceElem.current.contains(event.target)) {
                onUpdateCell(selectedRange)
                setSelectedRange(range)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [selectedRange, onUpdateCell, setSelectedRange, referenceElem])

    return (
        <div className="task-date" ref={referenceElem}>
            <div ref={popperElem} className="range-picker-modal">
                <DayPicker
                    mode="range"
                    selected={selectedRange || 'Add time line +'}
                    onSelect={handleDateRangeSelect}
                    showOutsideDays
                    numberOfMonths={2}
                />
                <Button onClick={onUpdateCell}>Update</Button>
            </div>
        </div>
    )
}

// Helper functions
function formatDisplayDate(startDate, endDate) {
    const start = dayjs(startDate)
    const end = dayjs(endDate)

    let formattedDate

    if (start.month() === end.month()) {
        formattedDate = `${start.format('D')} - ${end.format('D MMM')}`
    } else if (!start.month() || !end.month()) {
        formattedDate = <div className="no-timeline">-</div>
    } else {
        formattedDate = `${start.format('D MMM')} - ${end.format('D MMM')}`
    }
    return formattedDate
}

function getPercentage(startDate, endDate) {
    const now = dayjs()
    const start = dayjs(startDate)
    const end = dayjs(endDate)
    if (now.isBefore(start)) {
        return '0%'
    } else if (now.isAfter(end)) {
        return '100%'
    }

    const totalDuration = end.diff(start, 'day')
    const elapsedDuration = now.diff(start, 'day')
    const percentage = (elapsedDuration / totalDuration) * 100
    return `${percentage.toFixed(2)}%`
}

