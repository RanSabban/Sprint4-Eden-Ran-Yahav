
import { DragDropContext } from "react-beautiful-dnd";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { addTask, dragAndDropGroup, dragAndDropTask, loadBoard } from "../../store/board.actions";
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
        // const { destination, source, draggableId } = result
        // console.log(destination,source);
        // const startIdx = currBoard.groups.find(group => group._id === source.droppableId)
        // const finishIdx = currBoard.groups.find(group => group._id === destination.droppableId)

        // if (source.index !== destination.index) {
        //     const groups = board?.groups || [];
        //     const newGroupsOrder = Array.from(groups);
        //     const [reorderedGroup] = newGroupsOrder.splice(source.index, 1);
        //     newGroupsOrder.splice(destination.index, 0, reorderedGroup);

        // }
        // const startTasks = [...startIdx.tasks]
        // startTasks.splice(source.index, 1)
        // const newStart = { ...startIdx, tasks: startTasks }
        // const task = startIdx.tasks.find(task => task.id === draggableId)
        // const finishTasks = [...finishIdx.tasks]
        // finishTasks.splice(destination.index, 0, task)
        // const newFinish = { ...finishIdx, tasks: finishTasks }
        // const newGroups = currBoard.groups.map(group => {
        //     if (group.id === startIdx.id) return newStart
        //     if (group.id === finishIdx.id) return newFinish
        //     return group
        // })
        // const newBoard = { ...currBoard, groups: newGroups }
        // console.log("result",result.destination);

        const { destination, source } = result
        try {
            if (destination.droppableId === source.droppableId)  {
                dragAndDropTask(source,destination,board._id)
                showSuccessMsg('Tasks swiped!')
            } else {
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