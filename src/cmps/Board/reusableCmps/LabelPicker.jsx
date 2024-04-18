import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { onHideModalLabel, updateCell, updateGroup } from "../../../store/actions/board.actions"
import { useParams } from 'react-router'
import { StatusCmp } from "../../StatusCmp"
import { MembersCellComponent } from "../dynamicCmp/MembersCellComponent"
import { MenuDivider } from "monday-ui-react-core"
import { ColorPicker } from "./ColorPicker"

export function LabelPicker() {
    const modalProps = useSelector(storeState => storeState.boardModule.modalProps)
    const { target, clmType, cell, isOpen, task, groupId, group, callBackFunc } = modalProps
    console.log("Modal Props:", modalProps);

    const dispatch = useDispatch()
    const [isUp, setIsUp] = useState('')
    const dynClass = isUp ? 'arrow-up' : 'arrow-down'

    const { boardId } = useParams()

    const pickerRef = useRef(null)
    let arrow = pickerRef.toString()

    useEffect(() => {
        if (!isOpen || !target) return
        // console.log(cell._id)
        // console.log('this is picker reffff', pickerRef)
        // console.log('this is picker target', target)

        const updatePosition = () => {
            const rect = target.getBoundingClientRect()
            const picker = pickerRef.current
            if (!picker) return

            picker.style.visibility = 'hidden'
            picker.style.display = 'flex'
            const pickerHeight = picker.offsetHeight

            const spaceAbove = rect.top
            const spaceBelow = window.innerHeight - rect.bottom

            console.log(spaceAbove, 'for sure')

            // if (spaceAbove < 450) {
            // }

            // if (spaceAbove > 450) {

            // }
            let isOpenUp

            console.log(spaceAbove, spaceBelow)
            let topPosition
            if (spaceBelow > pickerHeight || spaceBelow > spaceAbove) {
                console.log('bottom!')
                setIsUp(true)
                isOpenUp = true
                topPosition = rect.bottom + window.scrollY
                if (topPosition + pickerHeight > window.innerHeight) {
                    topPosition = window.innerHeight - pickerHeight
                }
            } else {
                topPosition = rect.top - pickerHeight + window.scrollY
                setIsUp(false)
                isOpenUp = false
                console.log('top!')
                if (topPosition < 0) {
                    topPosition = 0
                }
            }

            picker.style.position = 'fixed'
            picker.style.left = `${rect.left + window.scrollX - 25}px`

            isOpenUp ? picker.style.top = `${topPosition + 10}px` : picker.style.top = `${topPosition - 10}px`

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
    }, [isOpen, target, cell])

    if (!isOpen || !target) return null

    function onClickStatus(dataId) {
        const cellToUpdate = { ...cell, dataId }
        callBackFunc(cellToUpdate)
        onHideModalLabel()
    }

    async function onUpdateGroupData(group, key, value) {
        try {
            const updatedGroupData = { ...group, [key]: value }
            updateGroup(group._id, updatedGroupData, boardId)
            onHideModalLabel()

            console.log('Group updated successfully')

        } catch (err) {
            console.error('Error updating group:', err)
        }
    }

    console.log(cell)

    console.log(pickerRef)

    return (
        <div className="label-picker-container" ref={pickerRef}>
            <div className={`${dynClass}`} dataplacement="top"></div>

            <DynamicCmp
                clmType={clmType}
                callBackFunc={callBackFunc}
                cmpType={cell.type}
                isOpen={isOpen}
                target={target}
                boardId={boardId}
                group={clmType}
                cell={cell}
                onClickStatus={onClickStatus}
                onUpdateGroupData={onUpdateGroupData}
            />
        </div>
    )
}



export function DynamicCmp(props) {
    console.log('this is props:', props)

    let componentType = props.cmpType

    if (props.cell === 'groupColor') {
        componentType = 'colorPicker'
    }
    switch (componentType) {
        case 'status':
        case 'priority':
            return <StatusCmp {...props} />
        case 'colorPicker':
            return <ColorPicker group={props.clmType} {...props} />
        // case 'members':
        //     return <MembersCellComponent {...props} />
        default:
            return <span>No Component Found</span>
    }
}
