import { useSelector } from 'react-redux';
import { TaskPreview } from './TaskPreview'
import { updateCell, updateTask } from '../../store/board.actions';
import { useParams } from 'react-router';
import { InputCell } from './reusableCmps/InputCell';
import { useState } from 'react';


export function TaskList({ groupId , onAddTask }) {
    const tasks = useSelector(storeState =>
        storeState.boardModule.board.groups.find(group => group._id === groupId)?.tasks || []
    );

    const [isClear,setIsClear] = useState(false)

    const {boardId} = useParams()

    async function onUpdateCell(cell,taskId) {
        try { 
            await updateCell(cell,taskId,groupId)
        }
        catch (err) {
            console.log('err update task', err);
        }
    }
    
    async function onUpdateTask(task) {
        try {
            updateTask(task,groupId)
        } catch (err) {
            console.log('Error update task', err);
        }
    }

    function onAddTaskFromList(taskTitle) {
        onAddTask(groupId,taskTitle)
        setIsClear(true)
    }

    function onAddTaskComplete() {
        setIsClear(flase)
    }
        

    return (<>
        {
            tasks.map(task => (
                <div className='list-item' key={task._id}>
                    <TaskPreview task={task} onUpdateCell={onUpdateCell} onUpdateTask={onUpdateTask} />
                </div>
            ))
        }
        <div className='list-item add-task' style={{opacity: '0.7'}}>
            <InputCell onUpdateInput={onAddTaskFromList} isClear={isClear} onAddTaskComplete={onAddTaskComplete}   />
        </div>
    </>
    )
}