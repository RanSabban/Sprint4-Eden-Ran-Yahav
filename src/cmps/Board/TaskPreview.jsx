import { useSelector } from 'react-redux'
import { DateCellComponent } from './dynamicCmp/DateCellComponent'
import { StatusCellComponent } from './dynamicCmp/StatusCellComponent'
import { PriorityCellComponent } from './dynamicCmp/PriorityCellComponent'
import { MembersCellComponent } from './dynamicCmp/MembersCellComponent'
import { TextCellComponent } from './dynamicCmp/TextCellComponent'
import { LastUpdatedComponent } from './dynamicCmp/LastUpdatedComponent'
import { FilesComponent } from './dynamicCmp/FilesComponent'
import { TimelinesComponent } from './dynamicCmp/TimelinesComponent'
import { Button, Checkbox, Menu, MenuButton, MenuItem } from 'monday-ui-react-core'
import { AddSmall, AddUpdate, Delete, Update } from 'monday-ui-react-core/icons'
import { InputCell } from './reusableCmps/InputCell'
import { LabelPicker } from './reusableCmps/LabelPicker'
import { useState } from 'react'
import { onOpenModalLabel } from '../../store/actions/board.actions'
import { Link, useParams } from 'react-router-dom'
import { EditableCellTitle } from './reusableCmps/EditableCellTitle'
import { useEffect } from 'react'

export function TaskPreview({ groupId, task, onUpdateCell, onUpdateTask, onRemoveTask, groupColor, isLast, columnWidth, resizeColumn }) {

    const clmTypes = useSelector(storeState => storeState.boardModule.board.clmTypes)
    const modalProps = useSelector(storeState => storeState.boardModule.modalProps)
    const [isEditing, setIsEditing] = useState(false)
    const [selectedCell, setSelectedCell] = useState(null)

    const { boardId } = useParams()
    const { cells } = task

    const dynShadow = isEditing ? 'active-cell' : ''

    useEffect(() => {
        const update = async () => {
            if (selectedCell) {
                setIsEditing(true)
                await onUpdateCell(selectedCell, task._id)
                setSelectedCell(null)
            } else {
                setIsEditing(false)
            }
        };
        update()
    }, [selectedCell])


    async function onChange(cell) {
        try {
            const labelsList = currClmType.data
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleCheckboxChange = () => {
        setIsEditing(!isEditing)
    }

    function openDynModal(clmType) {
        console.log("almost")
    }

    function getClmType(cellId) {
        const clmToReturn = clmTypes.find(clmTypeToReturn => (clmTypeToReturn._id === cellId))
        // setSelected(clmToReturn)
        return clmToReturn
    }

    function onUpdateTitle(newTxt) {
        const taskToUpdate = { ...task, title: newTxt }
        onUpdateTask(taskToUpdate)
    }

    function onClickLabel(target, clmType, cell) {
        try {
            setIsEditing(true)
            onOpenModalLabel(target, clmType, cell, task, groupId, setSelectedCell, boardId)
        } catch (err) {
            console.log('cannot open modal', err)
        }
    }

    return (
        <>
            <span className='task-effect-box'></span>
            <section style={{}} className="task-actions">
                <MenuButton size='XS'>
                    <Menu id={`menu-${task._id}`} size={Menu.sizes.SMALL} style={{ zIndex: '999999' }}>
                        <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveTask(task._id)} />
                    </Menu>
                </MenuButton>
            </section>
            <div className={`task-preview-title-container ${dynShadow}`} style={{ borderLeft: `0.4em solid ${groupColor}` }}>

                <div className='dyn-cell checkbox-container'>
                    <Checkbox
                    // checked={isEditing}
                    // onChange={handleCheckboxChange}
                    />
                </div>
                <div className='task-title-cell'>
                    <span className='dyn-cell title'>
                        <EditableCellTitle
                            txt={task.title}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            onUpdateInput={onUpdateTitle} />
                    </span>
                    <div className="btn-message-container">
                        <Link to={`/board/${boardId}/task/${task._id}`}>
                            <AddUpdate />
                        </Link>
                    </div>
                </div>
            </div>
    
            {
                cells.map((cell, idx) => (

                    <DynamicCmp key={idx}
                        groupId={groupId}
                        groupColor={groupColor}
                        cmpType={cell.type}
                        onChange={onChange}
                        clmType={getClmType(cell._id)}
                        setSelectedCell={setSelectedCell}
                        cell={cell}
                        onUpdateCell={onUpdateCell}
                        taskId={task._id}
                        onClick={openDynModal}
                        onClickLabel={onClickLabel}
                        isLast={isLast}
                        setIsEditing={setIsEditing}
                        isEditing={isEditing}
                    />
                ))
            }
    
            <div className='dyn-cell infinity'></div>
        </>
    )
}


function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'status':
            return <StatusCellComponent {...props} />
        case 'priority':
            return <PriorityCellComponent {...props} />
        case 'members':
            return <MembersCellComponent {...props} />
        case 'txt':
            return <TextCellComponent {...props} />
        case 'date':
            return <DateCellComponent {...props} />
        case 'timelines':
            return <TimelinesComponent {...props} />
        case 'files':
            return <FilesComponent {...props} />
        case 'updates':
            return <LastUpdatedComponent {...props} />
        default: <span></span>
    }
}