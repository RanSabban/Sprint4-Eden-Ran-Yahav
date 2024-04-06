import { useSelector } from 'react-redux';
import { TaskPreview } from './TaskPreview'
import { updateCell } from '../../store/board.actions';


export function TaskList({ groupId }) {
    const tasks = useSelector(storeState =>
        storeState.boardModule.board.groups.find(group => group._id === groupId)?.tasks || []
    );

    async function onUpdateTask(cell,taskId) {
        try { 
            await updateCell(cell,taskId,groupId)
        }
        catch (err) {

        }
    }
    
        

    return (<>
        {
            tasks.map(task => (
                <div className='list-item' key={task._id}>
                    <TaskPreview task={task} onUpdateTask={onUpdateTask} />
                </div>
            ))
        }
    </>
    )
}