import React, { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function TimelinePicker({ setDatePickerOpen, taskId, cell, onUpdateCell }) {
    const [selected, setSelected] = useState(null)
    // const [selectedDay, setSelectedDay] = useState<Date>()

    const referenceElem = useRef()
    const popperElem = useRef()
    const styles = { popper: {}, arrow: {} }
    const attributes = { popper: {} }

       const modifiers = {
        today: new Date(),
    }
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!referenceElem.current.contains(event.target)) {
                setDatePickerOpen(false)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [setDatePickerOpen])

    async function handleDayClick(date) {
        const timestamp = date.getTime()
        try {
            console.log(date)
            setSelected(date)

            cell.date = timestamp
            await onUpdateCell(cell, taskId)
            console.log('Date updated:', format(date, 'PPP'))
            setDatePickerOpen(false)
        } catch (err) {
            console.error('Failed to update date:', err)
        }
    }

    return (
        <div ref={referenceElem} className="task-date">
            <div ref={popperElem}
                style={styles.popper}
                {...attributes.popper}
                className="date-picker-modal">
                <DayPicker
                    mode="single"
                    selected={selected}
                    onSelect={handleDayClick}
                    onDayClick={handleDayClick}

                    modifiersClassNames={{
                        selected: 'my-selected',
                        today: 'my-today'
                    }}
                    modifiersStyles={{
                        selected: {
                            border: '2px solid #0060b9',
                            backgroundColor: '#0060b9',
                            color: 'white'
                        },
                    }}
                />
            </div>
        </div>
    )
}

// const pickerCss = `
// .my-selected:not([disabled]) { 
//     border-radius: 2px
//     background-color: $bgc-main
//     color : white
//   }
//   .my-selected:hover:not([disabled]) { 
//     background-color: #0060b9
//     border : 1px solid black
//     color: black
//   }
//   .my-today { 
//     border-radius: 2em
//     border : 1px solid #0060b9
//   }
//   .my-selected { 
//     border-radius: 2em
//     border : 1px solid #0060b9
//   }
// `


// return (
//     <>
//         <div className="task-date"
//             ref={referenceElem}
//         >

//             <div ref={popperElem}
//                 style={styles.popper}
//                 {...attributes.popper}
//                 className="date-picker-modal">
//                 <style>{pickerCss}</style>
//                 <DayPicker
//                     mode="single"
//                     selected={selectedDate}
//                     onSelect={onChangeDueDate}
//                     // footer={footer}
//                     showOutsideDays
//                     modifiers={modifiers}
//                     modifiersClassNames={{
//                         selected: 'my-selected',
//                         today: 'my-today',
//                     }}
//                     modifiersStyles={{
//                         today: { border: '2px solid #ff6347' },
//                         selected: { backgroundColor: '#00bfff' }
//                     }}
//                 />
//                 <div ref={popperElem} className="date-picker-modal"></div>
//             </div>
//         </div>
//     </>
// )
// }