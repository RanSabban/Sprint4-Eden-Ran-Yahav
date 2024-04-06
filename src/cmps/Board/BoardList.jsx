import React, { useEffect, useState, useRef } from "react"
import { Link, NavLink } from "react-router-dom"
import { DeleteSvg, DuplicateSvg, FavoritesSvg, NewTab, RenameSvg, SidePrevSvg, ThreePoints } from "../../services/svg.service"
import { addBoard, loadBoards } from "../../store/board.actions"
import { boardService } from "../../services/board.service.local"
import { BoardListPreview } from "./BoardListPreview"

export function BoardList({ boards, onAddBoard, onRemoveBoard, onUpdateBoard }) {
    const [isEdit, setIsEdit] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const [editedTitle, setEditedTitle] = useState("")
    const inputRef = useRef(null)
    const [currentBoard, setCurrentBoard] = useState(null)
    console.log('the current board please: ', currentBoard)
    console.log('IS IT?', isShown)

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (inputRef.current && !inputRef.current.contains(event.target)) {
    //             setIsEdit(false)
    //             setIsShown(false)

    //             if (editedTitle.trim() !== "" && currentBoard) {
    //                 const updatedBoard = { ...currentBoard, title: editedTitle }
    //                 onUpdateBoard(updatedBoard)
    //             }
    //             setEditedTitle("")
    //             setCurrentBoard(null)
    //         }
    //     }

    //     document.addEventListener("mousedown", handleClickOutside)

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside)
    //     }
    // }, [editedTitle, currentBoard, onUpdateBoard])

    function changeBoardName(board) {
        if (!isEdit) {
            setEditedTitle(board.title)
            setCurrentBoard(board)
        }
        setIsEdit(!isEdit)
    }

    function onSubmitTitle(ev, board) {
        ev.preventDefault()

        board.title = editedTitle
        onUpdateBoard(board)
        setIsEdit(!isEdit)
        setIsShown(!isShown)
    }

    function removeBoard(boardId) {
        console.log('board from remove ', boardId)
        onRemoveBoard(boardId)
        setIsShown(!isShown)
    }

    function duplicateBoard(ev, board) {
        ev.preventDefault()

        delete board._id
        onUpdateBoard(board)
        setIsShown(!isShown)
    }


    // async function duplicateBoard(ev, board) {
    //     ev.preventDefault()

    //     try {
    //         const savedBoard = await addBoard(board)
    //         setIsShown(!isShown)
    //         showSuccessMsg(`Board added (id: ${savedBoard._id})`)
    //     } catch (err) {
    //         showErrorMsg('Cannot add board')
    //     }
    // }


    function addToFavorites(ev, board) {
        ev.preventDefault()

        board.isStarred = !board.isStarred
        onUpdateBoard(board)
        setIsShown(!isShown)
    }

    function openInNewTab(board) {
        setIsShown(!isShown)
        window.open(`http://localhost:5173/board/${board._id}`, '_blank', 'noopener')
    }

    return (

        <section className="board-list">
            {boards.map((board) => (

                <Link onClick={() => setCurrentBoard(board)}
                    className="board-side-preview"
                    style={{ textDecoration: "none", display: "flex", gap: "1em", color: "#323338" }}
                    to={`/board/${board._id}`}
                    key={board._id}>
                    <SidePrevSvg />
                    {!isEdit && (
                        <div>
                            <BoardListPreview board={board}/>
                            <button onClick={() => setIsShown(!isShown)} className="preview-three-points">
                                <ThreePoints />
                            </button>
                            <div style={{ display: isShown ? "block" : "none" }} className={`actions-border-side`}>

                                <div
                                    onChange={() => setIsShown(!isShown)}
                                    onClick={() => openInNewTab(board)}
                                    style={{ lineheight: "20px" }}
                                    className="action-side"
                                >
                                    <NewTab />
                                    <p>Open Board in New Tab</p>
                                </div>
                                <hr style={{ width: '100%', color: "#323338" }} />
                                <div
                                    onClick={() => removeBoard(board._id)}
                                    style={{ lineheight: "20px" }}
                                    className="action-side"
                                >
                                    <DeleteSvg />
                                    <p>Delete</p>
                                </div>
                                <div
                                    onClick={() => changeBoardName(board)}
                                    style={{ lineHeight: "20px" }}
                                    className="action-side"
                                >
                                    <RenameSvg />
                                    <p>Rename Board</p>
                                </div>

                                <div
                                    onClick={(ev) => duplicateBoard(ev, board)}
                                    style={{ lineheight: "20px" }}
                                    className="action-side"
                                >
                                    <DuplicateSvg />
                                    <p>Duplicate Board</p>
                                </div>

                                <div
                                    onClick={(ev) => addToFavorites(ev, board)}
                                    style={{ lineheight: "20px" }}
                                    className="action-side"
                                >
                                    <FavoritesSvg />
                                    {board.isStarred ? <p>Add to favorites</p> : <p>Remove from favorites</p>}
                                </div>
                            </div>
                        </div>
                    )}
                    {isEdit && <form onSubmit={(ev) => onSubmitTitle(ev, board)}><input type="text" ref={inputRef} value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /></form>}
                </Link>
            ))
            }
        </section >
    )
}




