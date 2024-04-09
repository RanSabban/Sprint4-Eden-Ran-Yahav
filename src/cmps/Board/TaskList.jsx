import { useSelector } from 'react-redux'
import { TaskPreview } from './TaskPreview'
import { removeTask, updateCell, updateTask } from '../../store/actions/board.actions'
import { useParams } from 'react-router'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { InputCell } from './reusableCmps/InputCell';
import { useState } from 'react';
import { RenderHeaders } from './RenderHeaders'
import {  Checkbox } from 'monday-ui-react-core';


export function TaskList({ groupId, onAddTask, groupColor, placeholderProps,boardType,clmTypes }) {
    const tasks = useSelector(storeState =>
        storeState.boardModule.board.groups.find(group => group._id === groupId)?.tasks || []
    )

    const [isClear, setIsClear] = useState(false)

    const { boardId } = useParams()

    async function onUpdateCell(cell, taskId) {
        try {
            await updateCell(cell, taskId, groupId)
        }
        catch (err) {
            console.log('err update task', err)
        }
    }

    async function onUpdateTask(task) {
        try {
            updateTask(task, groupId)
        } catch (err) {
            console.log('Error update task', err)
        }
    }

    async function onRemoveTask(taskId) {
        console.log(taskId, groupId, boardId);
        try {
            removeTask(taskId, groupId, boardId)
        } catch (err) {
            console.log('Error remove task', err);
        }
    }

    function onAddTaskFromList(taskTitle) {
        onAddTask(groupId, taskTitle)
        setIsClear(true)
    }

    function onAddTaskComplete() {
        setIsClear(false)
    }


    return (
        <Droppable droppableId={groupId} type="TASK">
            {(provided, snapshot) => (
                <div
                    className="task-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{ position: "relative" }}
                >
                    {tasks.map((task, index) => (

                        <Draggable key={task._id} draggableId={String(task._id)} index={index} >
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
                                        onRemoveTask={onRemoveTask} />

                                </div>
                            )}
                        </Draggable>
                    ))}
                    {snapshot.isDraggingOver && (
                        <div style={{
                            position: "absolute",
                            top: placeholderProps.clientY + 1,
                            left: placeholderProps.clientX + 10,
                            height: placeholderProps.clientHeight,
                            border: "1px dashed grey",
                            borderRadius: "2px",
                            width: placeholderProps.clientWidth - 10
                        }} />
                    )}
                    {provided.placeholder}
                    <div className='list-item add-task' >
                        <InputCell onUpdateInput={onAddTaskFromList} isClear={isClear} onAddTaskComplete={onAddTaskComplete} />
                    </div>
                </div>
            )
            }
        </Droppable >
    )
}