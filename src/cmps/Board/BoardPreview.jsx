
import { DragDropContext } from "react-beautiful-dnd";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { addTask, dragAndDropGroup, dragAndDropTask, loadBoard } from "../../store/actions/board.actions";
import { GroupList } from "./GroupList";
import { RenderHeaders } from "./RenderHeaders";
import { DatePicker, DialogContentContainer } from "monday-ui-react-core";
import { useSelector } from "react-redux";

export function BoardPreview({ board }) {
    const currBoard = useSelector(state => state.boardModule.board)

    const groups = board.groups
    const clmTypes = board.clmTypes

    async function onAddTask(groupId, taskTitle) {
        try {
            console.log(groupId);
            await addTask(groupId, board._id, taskTitle)
            showSuccessMsg('Task Added')
        }
        catch (err) {
            console.log('err adding task', err);
            showErrorMsg('Cannot add task')
        }
    }

    async function handleOnDragEnd(result) {
        if (!result.destination) return

        const { destination, source , type} = result
        console.log(type);
        try {
            if (type=== 'TASK')  {
                dragAndDropTask(source,destination,board._id)
                showSuccessMsg('Tasks swiped!')
            } else if (type === 'GROUP') {
                dragAndDropGroup(source,destination, board._id)
                showSuccessMsg('Tasks swiped!')
            }
        } catch (err) {
            console.log('Error drag and drop', err);
            showErrorMsg('Cannot swipe sorry AVATAR!!!')
        }
        console.log(destination, source);
    }


    if (!groups) return <div>LOADING</div>
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