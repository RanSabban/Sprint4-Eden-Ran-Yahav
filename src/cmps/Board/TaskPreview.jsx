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
    // console.log('this is task for reall', task)

    const clmTypes = useSelector(storeState => storeState.boardModule.board.clmTypes)
    const modalProps = useSelector(storeState => storeState.boardModule.modalProps)
    const { target, clmType, cell, isOpen, callBackFunc } = modalProps

    // const [isLabelOpen, setIsLabelOpen] = useState(false)
    const [selectedCell, setSelectedCell] = useState(null)


    const { boardId } = useParams()

    useEffect(() => {
        const update = async () => {
            if (selectedCell) {
                await onUpdateCell(selectedCell, task._id);
                setSelectedCell(null);
            }
        };
        update();
    }, [selectedCell]);

    // useEffect(() => {
    //     if(selected){
    //         console.log('😍', selected)
    //         setSelected({...cell, dataId: selected.dataId})
    //     }
    // }, [cell, selected.dataId,isOpen])
    
    // useEffect(() => {
    //     // Log whenever cell changes to see what the current value is
    //     console.log('cell changed', cell);
    //     // Update the selected state to the new cell
    //     setSelected(cell);
    // }, [cell]);  // Depend on cell to trigger this effect

    // // If you want to check for isOpen changes specifically, add another effect
    // useEffect(() => {
    //     if (isOpen) {
    //         console.log('Modal is open, current selected cell:', selected);
    //     }
    // }, [isOpen, selected]);

    async function onChange(cell) {
        try {
            const labelsList = currClmType.data
        }
        catch (err) {
            console.log(err)
        }
    }

    function openDynModal(clmType) {
        console.log("almost")
    }

    const { cells } = task
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
        // const cellToUpdate = setSelectedCell((prevSelectedCell) => cell)
        try {
            // const cellToOpen = setSelectedCell(cell)
            // console.log(selectedCell);
            onOpenModalLabel(target, clmType, cell, task, groupId, setSelectedCell, boardId)
        } catch (err) {
            console.log('cannot open modal', err)
        }
    }

    // const taskTitleCellStyle = isLast ? { } : {}

    return ( 
    
    <>


           
        
            <section style={{}} className="task-actions">
                {/* <section className="action-container" style={{zIndex: '11111111'}}> */}

                <MenuButton size='XS' >
                    <Menu id={`menu-${task._id}`} size={Menu.sizes.LARGE} style={{zIndex: '1111111'}}>
                        {/* <MenuItem icon={AddSmall} title="Add group"/> */}
                        <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveTask(task._id)} />
                    </Menu>
                </MenuButton>
                {/* </section> */}
            </section>
            <div className="task-preview-title-container" style={{
                borderLeft: `0.4em solid ${groupColor}`
            }}>

                <div className='dyn-cell checkbox-container'>
                    <Checkbox />
                </div>
                <div className='task-title-cell'>
                    <span style={{}} className='dyn-cell title'>
                        <EditableCellTitle txt={task.title} onUpdateInput={onUpdateTitle} />
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
                        // selectedCell={selectedCell}
                    />
                ))
            } 
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

        default: <span>NoNo</span>

    }
}




