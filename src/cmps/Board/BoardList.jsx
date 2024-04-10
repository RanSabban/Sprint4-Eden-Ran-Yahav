import { useEffect, useState, useRef } from "react"
import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux";

import { DeleteSvg, DuplicateSvg, FavoritesSvg, NewTab, RenameSvg, SidePrevSvg, ThreePoints } from "../../services/svg.service"
import { Menu, MenuDivider, MenuItem, Tooltip, } from "monday-ui-react-core";

import { BoardListPreview } from "./BoardListPreview"

function Board({ board, onUpdateBoard, onRemoveBoard }) {
    const [isEdit, setIsEdit] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const [editedTitle, setEditedTitle] = useState(board.title)

    const inputRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsEdit(false)
                setIsShown(false)

                if (editedTitle.trim() !== "") {
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
        onUpdateBoard({ ...board, title: editedTitle })
        setIsEdit(false)
        setIsShown(false)
    }

    function removeBoard() {
        onRemoveBoard(board._id)
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

    return (
        <NavLink
            className="board-side-preview"
            style={{ textDecoration: "none", display: "flex", gap: "1em", color: "#323338" }}
            to={`/board/${board._id}`}
            key={board._id}
        >
            <div className="board-list-prev">
                <Tooltip zIndex='100' position="right" content="This board is public, visible to all team members" animationType="expand" ><SidePrevSvg /></Tooltip>
                {!isEdit && <BoardListPreview board={board} />}
                {!isEdit && (
                    <button onClick={() => setIsShown(!isShown)} className="preview-three-points">
                        <ThreePoints />
                    </button>
                )}
            </div>
            {!isEdit && (
                <div>
                    <div style={{ display: isShown ? "block" : "none" }} className={`actions-border-side`}>

                        <Menu id="menu" size={Menu.sizes.LARGE}>
                            <MenuItem onClick={openInNewTab} icon={NewTab} title="Open Board in New Tab" />
                            <MenuDivider />
                            <MenuItem onClick={changeBoardName} icon={RenameSvg} title="Rename Board" />
                            <MenuItem onClick={duplicateBoard} icon={DuplicateSvg} title="Duplicate Board" />
                            <MenuItem onClick={addToFavorites} icon={FavoritesSvg} title={board.isStarred ? <p>Remove from favorites</p> : <p>Add to favorites</p>} />
                            <MenuItem onClick={removeBoard} icon={DeleteSvg} title="Delete" />

                        </Menu>

                    </div>
                </div>
            )}
            {isEdit && (
                <form onSubmit={onSubmitTitle}>
                    <input style={{ width: '175px' }} type="text" ref={inputRef} value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                </form>
            )}
        </NavLink>
    )
}

export function BoardList({ onAddBoard, onRemoveBoard, onUpdateBoard }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    console.log(boards)

    return (
        <section className="board-list">
            {boards.map((board) => (
                <Board
                    key={board._id}
                    board={board}
                    onUpdateBoard={onUpdateBoard}
                    onRemoveBoard={onRemoveBoard}
                />
            ))}
        </section>
    )
}




