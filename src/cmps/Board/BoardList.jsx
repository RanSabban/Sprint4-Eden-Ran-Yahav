import { useEffect, useState, useRef } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { DeleteSvg, DuplicateSvg, FavoritesSvg, NewTab, RenameSvg, SidePrevSvg, ThreePoints } from "../../services/svg.service"
import { Menu, MenuButton, MenuDivider, MenuItem, Tooltip } from "monday-ui-react-core"
import { showSuccessMsg } from "../../services/event-bus.service"
import loader from '/img/loader.gif'

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + '...'
    }
    return str
}

function Board({ board, onUpdateBoard, onRemoveBoard, boardId }) {

    const [isEdit, setIsEdit] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const [editedTitle, setEditedTitle] = useState(board.title)
    const [isSelected, setIsSelected] = useState(false);

    const navigate = useNavigate()
    const inputRef = useRef(null)



    useEffect(() => {
        const handleClickOutside = (event) => {

            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsEdit(false)
                setIsShown(false)

                if (editedTitle.trim() !== "" && board.title !== editedTitle) {

                    onUpdateBoard({ ...board, title: editedTitle })
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [editedTitle, board, onUpdateBoard])

    const handleOutsideClick = (event) => {
        if (isShown && !event.target.closest(".actions-border-side")) {
            setIsShown(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [isShown])

    function changeBoardName() {
        if (!isEdit) {
            setEditedTitle(board.title)
        }
        setIsEdit(!isEdit)
    }

    function onSubmitTitle(ev) {
        ev.preventDefault()
        if (board.title === editedTitle) return
        onUpdateBoard({ ...board, title: editedTitle })
        setIsEdit(false)
        setIsShown(false)
    }

    function removeBoard() {
        onRemoveBoard(board._id)
        showSuccessMsg('We successfully deleted the board!')
        setIsShown(false)
    }

    function duplicateBoard(ev) {
        ev.preventDefault()
        delete board._id
        onUpdateBoard(board)
        setIsShown(false)
    }

    function addToFavorites(ev) {
        ev.preventDefault()
        onUpdateBoard({ ...board, isStarred: !board.isStarred })
        setIsShown(false)
    }

    function openInNewTab() {
        setIsShown(false)
        window.open(`http://localhost:5173/board/${board._id}`, '_blank', 'noopener')
    }

    function onBoardNav() {
        // setIsLoading(true)
        navigate(`/board/${board._id}`)
    }

    console.log(boardId);

    return (
        <section
            className="board-side-preview"
            style={{ textDecoration: "none", color: "#323338", backgroundColor:`${board._id === boardId ? '#cce5ff' : ''}` }}
            onClick={onBoardNav}
            key={board._id}
        >

            <span className="svg-container-board-list-sidebar">
                <SidePrevSvg />
            </span>
            {!isEdit && <span className="board-option-sidebar">{board.title}</span>}

            {!isEdit && (

                <div className={`actions-border-side`}>
                    <MenuButton size='XS' onClick={(ev) => ev.stopPropagation()}>
                        <Menu id={`menu-${board._id}`} size={Menu.sizes.LARGE}>
                            <MenuItem onClick={openInNewTab} icon={NewTab} title="Open Board in New Tab" />
                            <MenuDivider />
                            <MenuItem onClick={changeBoardName} icon={RenameSvg} title="Rename Board" />
                            <MenuItem onClick={duplicateBoard} icon={DuplicateSvg} title="Duplicate Board" />
                            <MenuItem onClick={addToFavorites} icon={FavoritesSvg} title={board.isStarred ? <p>Remove from favorites</p> : <p>Add to favorites</p>} />
                            <MenuItem onClick={removeBoard} icon={DeleteSvg} title="Delete" />

                        </Menu>
                    </MenuButton>
                </div>

            )}
            {isEdit && (
                <form onSubmit={onSubmitTitle}>
                    <input className="input-sidebar-list" type="text" ref={inputRef} value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                </form>
            )}
        </section>
    )
}

export function BoardList({ onAddBoard, onRemoveBoard, onUpdateBoard }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
    const {boardId} = useParams()


    if (isLoading || !boards) return (
        <div className="loader-container">
            <img className="loader" src={loader} alt="loader" />
        </div>
    )

    return (
        <section className="board-list">
            {boards.map((board) => (
                <Board
                    key={board._id}
                    board={board}
                    onUpdateBoard={onUpdateBoard}
                    onRemoveBoard={onRemoveBoard}
                    boardId={boardId}
                />)
            )}
        </section>
    )
}




