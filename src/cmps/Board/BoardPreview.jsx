
import { Button } from "@mui/material";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { addTask, loadBoard } from "../../store/board.actions";
import { GroupList } from "./GroupList";
import { RenderHeaders } from "./RenderHeaders";

export function BoardPreview({ board }) {

    const groups = board.groups
    const clmTypes = board.clmTypes

    async function onAddTask(groupId) {
        try {
            await addTask(groupId)
            showSuccessMsg('Task Added')
        }
        catch (err) {
            console.log('err adding task', err);
            showErrorMsg('Cannot add task')
        }
    }

  
    if (!board) return <div>LOADING</div>
    return (
        <section className="board-preview">
            {/* <h2>I am Board Preview</h2> */}
            <Button  variend="contained" sx={{maxWidth: "75px"}} onClick={() => onAddGroup(board._id)}>Add group</Button>
            <GroupList clmTypes={clmTypes} groups={groups} onAddTask={onAddTask} />
            {/* <Button variend="contained" onClick={() => onAddGroup()} /> */}
        </section>
    )
}







// const BoardContainer = () => {
//     const columns = useSelector(state => state.columns);
//     const tasksByColumnId = useSelector(state => state.tasksByColumnId);

//     return (
//         <div className="board">
//             {columns.map(column => (
//                 <ColumnComponent
//                     key={column.id}
//                     columnName={column.name}
//                     tasks={tasksByColumnId[column.id]}
//                 />
//             ))}
//         </div>
//     );
// };

{/* {tasks.map(task => {
                            return (        
                            <li key={task.id}>   
                                <TasksPreview task={task} />
                            </li>
                            )
                           
                        })} */}