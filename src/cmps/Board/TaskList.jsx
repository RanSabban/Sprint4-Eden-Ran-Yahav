
import { useSelector } from 'react-redux'
import { TaskPreview } from './TaskPreview'
import { addTask, removeTask, updateCell, updateTask } from '../../store/actions/board.actions'
import { useParams } from 'react-router'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { InputCell } from './reusableCmps/InputCell';
import { useEffect, useState } from 'react';
import { RenderHeaders } from './RenderHeaders'
import { Checkbox } from 'monday-ui-react-core';
import { EditableCmp } from './reusableCmps/EditableCmp'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
import { socketService } from '../../services/socket.service'
import { automationService } from '../../services/automations.service'

export function TaskList({ groupId, groupColor, placeholderProps, boardType, clmTypes, columnWidth, resizeColumn, tasks }) {
    // const tasks = useSelector(storeState =>
    //     storeState.boardModule.board.groups.find(group => group._id === groupId)?.tasks || []
    // )
    const [localTasks, setLocalTasks] = useState(tasks)
    useEffect(() => {
        if (Array.isArray(tasks)) {
            setLocalTasks(tasks);
        }
    }, [tasks])
    // console.log(localTasks)
    const [isClear, setIsClear] = useState(false)
    const { boardId } = useParams()
    async function onUpdateCell(cell, taskId) {
        try {
            if (cell.dataId === 'l101') {
                cell.animation = true
            }
            await updateCell(cell, taskId, groupId, boardId)
            if (cell.type === 'status') {
                const data = { cell, taskId, groupId, boardId }
                await automationService.runAutomation('STATUS_CHANGE', data)
            }
        }
        catch (err) {
            console.log('err update task', err)
        }
    }
    async function onUpdateTask(task) {
        try {
            updateTask(task, groupId, boardId)
        } catch (err) {
            console.log('Error update task', err)
        }
    }
    async function onRemoveTask(taskId) {
        // console.log(taskId, groupId, boardId);
        try {
            removeTask(taskId, groupId, boardId)
        } catch (err) {
            console.log('Error remove task', err);
        }
    }
    async function onAddTaskFromList(taskTitle) {
        // onAddTask(groupId, taskTitle)
        // setIsClear(true)
        console.log(taskTitle);
        try {
            console.log(groupId);
            await addTask(groupId, boardId, taskTitle)
            showSuccessMsg('Task Added')
        }
        catch (err) {
            console.log('err adding task', err);
            showErrorMsg('Cannot add task')
        }
    }
    function onAddTaskComplete() {
        setIsClear(false)
    }
    // console.log(tasks);
    return (
        <Droppable droppableId={groupId} type="TASK">
            {(provided, snapshot) => (
                <div
                    className="task-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ position: "relative" }}
                >
                    {localTasks.map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index} >
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`list-item ${snapshot.isDragging ? 'drag' : ''}`}
                                >
                                    <TaskPreview
                                        task={task}
                                        groupColor={groupColor}
                                        onUpdateCell={onUpdateCell}
                                        onUpdateTask={onUpdateTask}
                                        onRemoveTask={onRemoveTask}
                                        isLast={index === tasks.length - 1}
                                        resizeColumn={resizeColumn}
                                        columnWidth={columnWidth}
                                        clmTypes={clmTypes}
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {snapshot.isDraggingOver && (
                        <div style={{
                            position: "absolute",
                            top: placeholderProps.clientY,
                            left: placeholderProps.clientX + `60px`,
                            height: placeholderProps.clientHeight,
                            border: "1px dashed #D0D4E4",
                            borderRadius: "2px",
                            width: placeholderProps.clientWidth - `10px`,
                        }} />
                    )}
                    {provided.placeholder}
                    <div className='list-item add-task'>
                        <div className='blank-cell-add-task' style={{ width: '40px' }}>
                        </div>
                        <div className="add-task-sticky-container" style={{
                            borderLeft: `0.4em solid ${groupColor}`,
                            borderBottomLeftRadius: '0.6em',
                            // borderTop: '1px solid #D0D4E4'
                        }}>
                            <div className='dyn-cell checkbox-container'>
                                <Checkbox className='add-task-checkbox' disabled={true} />
                            </div>
                            <div className='add-task-content-container'
                                style={{ borderBottom: '1px solid #D0D4E4' }}
                            >
                                {/* <InputCell onUpdateInput={onAddTaskFromList} isClear={isClear} onAddTaskComplete={onAddTaskComplete} /> */}
                                <EditableCmp onUpdateInput={onAddTaskFromList} placeholder={'+ Add item'} />
                            </div>
                        </div>
                        <div className='add-task-fill-gap'>
                        </div>
                    </div>
                </div>
            )}
        </Droppable >
    )
}

