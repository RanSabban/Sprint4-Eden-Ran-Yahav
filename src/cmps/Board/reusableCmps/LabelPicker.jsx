import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { onHideModalLabel, updateCell } from "../../../store/actions/board.actions"
import { useParams } from 'react-router'

export function LabelPicker() {
    const modalProps = useSelector(storeState => storeState.boardModule.modalProps)
    const { target, clmType, cell, task, isOpen, groupId, callBackFunc } = modalProps
    const dispatch = useDispatch()
    // console.log(modalProps)
    const [cellToUpdate, setCellToUpdate] = useState(cell)
    // setSelected(cellToUpdate)
    const { boardId } = useParams()

    const pickerRef = useRef(null)
    
    useEffect(() => {
        if (!isOpen || !target) return
        // console.log(cell._id)

        const updatePosition = () => {
            const rect = target.getBoundingClientRect()
            const picker = pickerRef.current
            if (!picker) return

            picker.style.visibility = 'hidden'
            picker.style.display = 'block'
            const pickerHeight = picker.offsetHeight

            const spaceAbove = rect.top
            const spaceBelow = window.innerHeight - rect.bottom

            console.log(spaceAbove, spaceBelow)

            let topPosition
            if (spaceBelow > pickerHeight || spaceBelow > spaceAbove) {
                topPosition = rect.bottom + window.scrollY
                if (topPosition + pickerHeight > window.innerHeight) {
                    topPosition = window.innerHeight - pickerHeight
                }
            } else {
                topPosition = rect.top - pickerHeight + window.scrollY
                if (topPosition < 0) {
                    topPosition = 0
                }
            }

            picker.style.position = 'fixed'
            picker.style.left = `${rect.left + window.scrollX}px`
            picker.style.top = `${topPosition}px`

            picker.style.visibility = 'visible'
        }

        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                dispatch(onHideModalLabel())
            }
        }

        const handleScroll = () => {
            const rect = target.getBoundingClientRect()
            const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0
            if (!isInViewport) {
                onHideModalLabel()
            } else {
                updatePosition()
            }
        }

        updatePosition()
        document.addEventListener('mousedown', handleClickOutside)
        window.addEventListener('scroll', handleScroll, true)

        return () => { // Cleanup
            document.removeEventListener('mousedown', handleClickOutside)
            window.removeEventListener('scroll', handleScroll, true)
        }
    }, [isOpen, target, cellToUpdate])

    if (!isOpen || !target) return null

    async function onUpdateCell(labelId) {
        const newCell = { ...cellToUpdate, dataId: labelId }
        setCellToUpdate(newCell)
        try {
            console.log(cellToUpdate);
            updateCell(cellToUpdate, task._id, groupId, boardId)
            onHideModalLabel()
            // setSelected(labelId)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="label-picker-container" ref={pickerRef}>
            <div className="cell-target-indicator" style={{
                height: '20px',
                width: '100%',
                backgroundColor: '#f0f0f0',
                textAlign: 'center',
                lineHeight: '20px',
                borderTopLeftRadius: '0.6em',
                borderTopRightRadius: '0.6em'
            }}>
                Targeted Cell Indicator
            </div>


            {/* <DynamicCmp 
                        clmType={clmType}
                        cmpType={cell.type}
                        // clmType={getClmType(cell._id)}
                        cell={cell}
                        onUpdateCell={onUpdateCell}
                        onClick={openDynModal}
                        onClickLabel={onClickLabel}
                    /> */}

            <div className="label-picker-content">
                <ul>
                    {clmType.data.map((label) => (
                        <li key={label.id} className="label" onClick={() => onUpdateCell(label.id)} style={{
                            backgroundColor: label.color,
                            width: '130px',
                            height: '35px'
                        }}>
                            <span className="label-txt">{label.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}



function DynamicCmp(props) {
    switch (props.clmType) {
        case 'label':
            return <StatusCellComponent {...props} />
        case 'members':
            return <MembersCellComponent {...props} />
        case 'txt':
            return <TextCellComponent {...props} />
        case 'date':
            return <DateCellComponent {...props} />
        case 'timelines':
            return <TimelinesComponent {...props} />
        default: <span>NoNo</span>

    }
}
