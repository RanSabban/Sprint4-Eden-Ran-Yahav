
import { Button } from "@mui/material";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { addTask, loadBoard } from "../../store/board.actions";
import { GroupList } from "./GroupList";
import { RenderHeaders } from "./RenderHeaders";
import { DatePicker, DialogContentContainer } from "monday-ui-react-core";

export function BoardPreview({ board }) {

    const groups = board.groups
    const clmTypes = board.clmTypes

    async function onAddTask(groupId,taskTitle) {
        try {
            console.log(groupId);
            await addTask(groupId,board._id,taskTitle)
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
            <GroupList clmTypes={clmTypes} groups={groups} onAddTask={onAddTask} boardType = {board.type} boardId ={board._id} />
        </section>

    )
}



{/* <Button variend="contained" onClick={() => onAddGroup()} /> */ }




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