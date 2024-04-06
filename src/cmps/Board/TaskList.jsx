import { useSelector } from 'react-redux';
import { TaskPreview } from './TaskPreview'


export function TaskList({ groupId }) {
    const tasks = useSelector(storeState => 
        storeState.boardModule.board.groups.find(group => group._id === groupId)?.tasks || []
      );

      
    return (<>
        {
            tasks.map(task => (
                <div className='list-item' key={task._id}>
                    <TaskPreview task={task} />
                </div>
            ))
        }
    </>
    )
}