import { Link, NavLink, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { CloseSidebar, Home, Home2, MyWork, OpenSidebar, OpenWorkSpace, PlusTool, SearchTool, ThreePoints } from "../../services/svg.service"
import { BoardList } from "./BoardList"
import { Tooltip, Search } from "monday-ui-react-core";
import { loadBoards, removeBoard, updateBoard, addBoard } from "../../store/actions/board.actions"
import { useSelector } from "react-redux"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import  loader  from '/img/loader.gif'
import { setIsLoading } from "../../store/actions/system.actions.js";


export function BoardSideBar() {
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
    const boards = useSelector(storeState => storeState.boardModule.boards)

    const { boardId } = useParams()
    const dynClasse = !boardId ? '#cce5ff' : ''
    // console.log(boardId)

    useEffect(() => {
        loadBoards()
    }, [])

    async function onRemoveBoard(boardId) {
        try {
            await removeBoard(boardId)
            showSuccessMsg('We successfully deleted the board')
        } catch (err) {
            showErrorMsg('Cannot remove board')
        }
    }

    async function onAddBoard() {
        // const board = boardService.getEmptyBoard()
        // console.log('-----', board)
        try {
            const savedBoard = await addBoard()
            // showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add board')
        }
    }

    async function onUpdateBoard(board) {

        try {
            const savedBoard = await updateBoard(board)
            loadBoards()
            showSuccessMsg(`Board updated`)
        } catch (err) {
            showErrorMsg('Cannot update board')
        }
    }

    const [isOpen, setIsOpen] = useState(true)
    const [isWorkspace, setIsWorkspace] = useState(true)
    const dynClass = isOpen ? 'open-sidebar' : 'close-sidebar'
    const dynWorkspace = isWorkspace ? 'none' : 'block'
    const dynPad = isOpen ? '255px' : '30px'


    function addBoardOnClick(ev) {
        ev.preventDefault()
        onAddBoard()
    }

    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    if (!boards) return (<div style={{ display: 'inline' }}></div>)


    return (

        <section className={`board-sidebar ${dynClass}`} >
            <div className="sidebar-container">
                <Tooltip position='right' content='Close navigation'
                    animationType="expand"><button className="button-sidebar" style={{ transform: !isOpen ? 'rotate(180deg)' : '' }} onClick={() => setIsOpen(!isOpen)}><OpenSidebar /></button> </Tooltip>
                <div className={`lower-sidebar ${dynClass}`}>
                    <div className="all-sidebar" style={{ display: "flex", flexDirection: "column" }}>
                        <div className="upper-actions">
                            <NavLink style={{ backgroundColor: dynClasse, borderRadius: '6px', maxWidth: '16.2em' }} className="actions-sidebar-upper" to="/board"> <Home /> Home</NavLink>
                            <NavLink className="actions-sidebar-upper-second"><MyWork /><div className="home-sidebar">My work</div></NavLink>
                        </div>

                        <section className="sidebar-workspace">
                            <div className="main-back">M <Home2 /></div>
                            <Tooltip content="Main workspace" animationType="expand" > <div className="main-workspace">Main workspace <span className="arrow-workspace" style={{ ght: "2.5em" }} onClick={() => setIsWorkspace(!isWorkspace)}><OpenWorkSpace /></span></div> </Tooltip>
                            <button className="three-points"><ThreePoints /></button>
                        </section>

                        <div style={{ position: 'absolute', display: dynWorkspace }} className="actions-workspace">
                            <Search
                                placeholder="Search for a workspace"
                                wrapperClassName="monday-storybook-search_size"
                            />
                            <div className="flex column">
                                <div className="favorites"><svg viewBox="0 0 20 20" fill="#ffcb00" width="20" height="20" className="favorite"><path d="M11.2336 3.01626L10.5614 3.34904L11.234 3.01724L13.0145 6.62645L17.0025 7.20743C17.256 7.24569 17.4938 7.354 17.6891 7.52016C17.8843 7.68632 18.0293 7.90371 18.1076 8.14784C18.1859 8.39196 18.1945 8.65312 18.1324 8.90186C18.0703 9.15018 17.9403 9.37628 17.7569 9.55475L17.7559 9.55566L14.8738 12.3658L15.5539 16.3359L15.5542 16.3378C15.5984 16.5918 15.5704 16.8532 15.4733 17.0922C15.3759 17.3317 15.2131 17.5389 15.0034 17.6901C14.7937 17.8414 14.5457 17.9305 14.2877 17.9473C14.0313 17.964 13.7754 17.9085 13.5489 17.7874L9.99916 15.9209L6.4403 17.793C6.21381 17.9142 5.95789 17.9697 5.70148 17.953C5.44349 17.9362 5.19545 17.8471 4.98577 17.6958C4.77609 17.5446 4.61324 17.3374 4.51589 17.0979C4.41876 16.8589 4.39073 16.5975 4.43499 16.3434L4.4353 16.3417L5.11535 12.3715L2.23779 9.55909L2.23676 9.55808C2.05337 9.37963 1.92336 9.15357 1.86134 8.90529C1.79921 8.65655 1.80779 8.39539 1.88612 8.15127C1.96445 7.90714 2.10941 7.68974 2.30467 7.52359C2.49993 7.35743 2.73772 7.24912 2.99123 7.21086L2.99453 7.21037L6.9838 6.6265L8.76473 3.01626C8.87864 2.78619 9.05458 2.59254 9.27269 2.45714C9.49081 2.32175 9.74242 2.25 9.99915 2.25C10.2559 2.25 10.5075 2.32175 10.7256 2.45714C10.9437 2.59254 11.1197 2.78619 11.2336 3.01626Z"></path></svg><p>Favorites</p></div>
                                <div style={{ fontSize: "14px" }}>My workspaces</div>

                                <Tooltip content="Main workspace" animationType="expand" > <section className="sidebar-workspace">
                                    <div className="main-back">M <Home2 /></div>
                                    <div className="main-workspace">Main workspace</div>
                                </section> </Tooltip>
                            </div>
                        </div>

                        <section className="sidebar-workspace-second">
                            <section style={{ marginBottom: "0" }} className="sidebar-workspace-third">

                                {/* <input className="input-sidebar" name="title" type="search" placeholder={` Search`} autoComplete="off"></input> */}
                                {/* <div style={{width:"11.6em", height:'2em'}}> */}

                                <Search
                                    size="Search.sizes.MEDIUM"
                                    placeholder="Search"
                                    wrapperClassName="monday-storybook-search_size"
                                />

                                {/* </div> */}
                                <Tooltip className='tool'  zIndex='99999999' content="Add item to workspace" animationType="expand" ><button onClick={addBoardOnClick} className="plus-button"><PlusTool /></button></Tooltip>
                            </section>
                        </section>

                        <div className="board-sidebar-lower">

                            <BoardList boards={boards} dynClasse={dynClasse} onAddBoard={onAddBoard} onRemoveBoard={onRemoveBoard} onUpdateBoard={onUpdateBoard} />

                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}