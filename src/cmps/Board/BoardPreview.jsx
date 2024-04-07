
import { DragDropContext } from "react-beautiful-dnd";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { addTask, loadBoard } from "../../store/board.actions";
import { GroupList } from "./GroupList";
import { RenderHeaders } from "./RenderHeaders";
import { DatePicker, DialogContentContainer } from "monday-ui-react-core";

export function BoardPreview({ board }) {

    const groups = board.groups
    const clmTypes = board.clmTypes

    async function onAddTask(groupId) {
        try {
            console.log(groupId);
            await addTask(groupId, board._id)
            showSuccessMsg('Task Added')
        }
        catch (err) {
            console.log('err adding task', err);
            showErrorMsg('Cannot add task')
        }
    }
    function handleOnDragEnd(result) {
        if (!result.destination) return
        const { source, destination } = result
        if (source.index !== destination.index) {
            const groups = board?.groups || [];
            const newGroupsOrder = Array.from(groups);
            const [reorderedGroup] = newGroupsOrder.splice(source.index, 1);
            newGroupsOrder.splice(destination.index, 0, reorderedGroup);

        }
    }


    if (!board) return <div>LOADING</div>
    return (


        <section className="board-preview">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <GroupList
                    clmTypes={clmTypes}
                    groups={groups}
                    onAddTask={onAddTask}
                    boardType={board.type}
                    boardId={board._id} />
            </DragDropContext>

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