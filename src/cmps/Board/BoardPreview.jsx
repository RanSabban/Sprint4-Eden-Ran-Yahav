
import { DragDropContext } from "react-beautiful-dnd";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { addTask, dragAndDropGroup, dragAndDropTask, loadBoard } from "../../store/actions/board.actions";
import { GroupList } from "./GroupList";
import { RenderHeaders } from "./RenderHeaders";
import { DatePicker, DialogContentContainer } from "monday-ui-react-core";
import { useSelector } from "react-redux";
import { LabelPicker } from "./reusableCmps/LabelPicker";
import { useEffect, useState } from "react";


export function BoardPreview({ board, onAddGroup }) {
    const currBoard = useSelector(state => state.boardModule.board)
    const [placeholderProps, setPlaceholderProps] = useState("");

    // const gridStyle = {
    //     '--column-widths': columnWidths.map(width => `${width}px`).join(' '),
    // };


    // useEffect(() => {
    //     // Convert columnWidths array to a string, appending 'px' to each value
    //     const widthsString = columnWidths.map(width => `${width}px`).join(' ');
    //     // Update the CSS variable on the root element
    //     document.documentElement.style.setProperty('--dynamic-column-widths', widthsString);
    // }, [columnWidths]);

    const groups = board.groups
    const clmTypes = board.clmTypes

    async function onAddTask(groupId, taskTitle) {
        try {
            // console.log(groupId);
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

        const { destination, source, type } = result
        // console.log(type);
        try {
            if (type === 'TASK') {
                dragAndDropTask(source, destination, board._id)
                showSuccessMsg('Tasks swiped!')
            } else if (type === 'GROUP') {
                dragAndDropGroup(source, destination, board._id)
                showSuccessMsg('Tasks swiped!')
            }
        } catch (err) {
            // console.log('Error drag and drop', err);
            showErrorMsg('Cannot swipe sorry AVATAR!!!')
        }
        finally {
            setPlaceholderProps({})
        }
        console.log(destination, source);
    }

    const queryAttr = "data-rbd-drag-handle-draggable-id";

    function onDragUpdate(update) {
        if (!update.destination) {
            return;
        }
        const draggableId = update.draggableId;
        const destinationIndex = update.destination.index;

        const domQuery = `[${queryAttr}='${draggableId}']`;
        const draggedDOM = document.querySelector(domQuery);

        if (!draggedDOM) {
            return;
        }
        const { clientHeight, clientWidth } = draggedDOM;

        const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
            .slice(0, destinationIndex)
            .reduce((total, curr) => {
                const style = curr.currentStyle || window.getComputedStyle(curr);
                const marginBottom = parseFloat(style.marginBottom);
                return total + curr.clientHeight + marginBottom;
            }, 0);

        setPlaceholderProps({
            clientHeight,
            clientWidth,
            clientY,
            clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
        });
    };

    if (!groups) return <div>LOADING</div>
    return (


        <section className="board-preview">
            <LabelPicker />
            <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={onDragUpdate} >
                <GroupList
                    placeholderProps={placeholderProps}
                    clmTypes={clmTypes}
                    groups={groups}
                    onAddTask={onAddTask}
                    boardType={board.type}
                    boardId={board._id}
             
                    onAddGroup={onAddGroup} />
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