
import { DragDropContext } from "react-beautiful-dnd"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { addTask, dragAndDropGroup, dragAndDropTask, loadBoard } from "../../store/actions/board.actions"
import { GroupList } from "./GroupList"
import { RenderHeaders } from "./RenderHeaders"
import { DatePicker, DialogContentContainer } from "monday-ui-react-core"
import { useSelector } from "react-redux"
import { LabelPicker } from "./reusableCmps/LabelPicker"
import { useEffect, useState } from "react"
import { Add } from "monday-ui-react-core/icons"
import { useParams } from "react-router"
import { socketService } from "../../services/socket.service"
import { useDispatch } from "react-redux"


export function BoardPreview({ onAddGroup, board}) {

    const [placeholderProps, setPlaceholderProps] = useState("")
    const [isCollapsedAll, setIsCollapsedAll] = useState(false)

    // const board = useSelector(storeState => storeState.boardModule.board)
    const {boardId} = useParams()
    const dispatch = useDispatch()

    const [localBoard, setLocalBoard] = useState(board)

    useEffect(() => {
        if (boardId) loadBoard(boardId)
    }, [boardId])

    useEffect(() => {
        setLocalBoard(board)
    },[board])

    // useEffect(() => {
    //     if (boardId) {
    //         dispatch(loadBoard(boardId)); // Action to load the board
    //     }
    // }, [boardId, dispatch]);

    useEffect(() => {
        socketService.emit('join-board', boardId)
        // console.log('board preview socket !');
        socketService.on('board-updated', updatedBoard => {
            if (updatedBoard._id === boardId) {
                console.log(updatedBoard);
                setLocalBoard(updatedBoard)
            }
        })

        return () => {
            socketService.off('board-updated')
            socketService.emit('leave-board', boardId)
        }

    }, [boardId])

    const groups = localBoard.groups
    const clmTypes = localBoard.clmTypes

    // console.log(clmTypes);

    async function onAddTask(groupId, taskTitle) {
        try {
            // console.log(groupId)
            await addTask(groupId, localBoard._id, taskTitle)
            showSuccessMsg('Task Added')
        }
        catch (err) {
            console.log('err adding task', err)
            showErrorMsg('Cannot add task')
        }
    }

    async function handleOnDragEnd(result) {
        if (!result.destination) return

        const { destination, source, type } = result
        // console.log(type)
        try {
            if (type === 'TASK') {
                dragAndDropTask(source, destination, localBoard._id)
                // showSuccessMsg('Tasks swiped!')
            } else if (type === 'GROUP') {
                dragAndDropGroup(source, destination, localBoard._id)
                // showSuccessMsg('Tasks swiped!')
            }
        } catch (err) {
            console.log('Error drag and drop', err)
            // showErrorMsg('Cannot swipe sorry AVATAR!!!')
        }
        finally {
            setPlaceholderProps({})
            setIsCollapsedAll(false)

        }
        console.log(destination, source)
    }



    const queryAttr = "data-rbd-drag-handle-draggable-id"

    function onDragUpdate(update) {
        if (!update.destination) {
            return
        }
        // setIsCollapsedAll(true)

        const draggableId = update.draggableId
        const destinationIndex = update.destination.index

        const domQuery = `[${queryAttr}='${draggableId}']`
        const draggedDOM = document.querySelector(domQuery)

        if (!draggedDOM) {
            return
        }
        const { clientHeight, clientWidth } = draggedDOM

        const clientY = parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) + [...draggedDOM.parentNode.children]
            .slice(0, destinationIndex)
            .reduce((total, curr) => {
                const style = curr.currentStyle || window.getComputedStyle(curr)
                const marginBottom = parseFloat(style.marginBottom)
                return total + curr.clientHeight + marginBottom
            }, 0)

        setPlaceholderProps({
            clientHeight,
            clientWidth,
            clientY,
            clientX: parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingLeft)
        })
    }

    console.log('localboard',localBoard);

    if (!groups && !localBoard) return <div>LOADING</div>
    return (


        <section className="board-preview">
            <LabelPicker />
            <DragDropContext onDragEnd={handleOnDragEnd} onDragUpdate={onDragUpdate} >
                <GroupList
                    placeholderProps={placeholderProps}
                    setPlaceholderProps={setPlaceholderProps}
                    clmTypes={clmTypes}
                    groups={groups}
                    onAddTask={onAddTask}
                    boardType={localBoard.type}
                    boardId={localBoard._id}
                    isCollapsedAll={isCollapsedAll}

                    onAddGroup={onAddGroup} />
            </DragDropContext>
            <div onClick={() => onAddGroup(localBoard._id, true)} className="add-group-bottom-container"
            style={{display: 'grid', gridAutoFlow: 'column'}}
            >
                <Add/>
                <span className="bottom-add-group-btn">Add new group</span>
            </div>
        </section>


    )
}



{/* <Button variend="contained" onClick={() => onAddGroup()} /> */ }




// const BoardContainer = () => {
//     const columns = useSelector(state => state.columns)
//     const tasksByColumnId = useSelector(state => state.tasksByColumnId)

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
//     )
// }

{/* {tasks.map(task => {
                            return (        
                            <li key={task.id}>   
                                <TasksPreview task={task} />
                            </li>
                            )
                           
                        })} */}