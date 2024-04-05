import React, { useEffect, useState, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { ThreePoints } from "../../services/svg.service"

export function BoardList({ boards, onAddBoard, onRemoveBoard, onUpdateBoard }) {
    const navigate = useNavigate('')
    const [isEdit, setIsEdit] = useState(false)
    const [isShown, setIsShown] = useState(false)
    const [editedTitle, setEditedTitle] = useState("")
    const inputRef = useRef(null)


    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (inputRef.current && !inputRef.current.contains(event.target)) {
    //             setIsEdit(false)
    //             setIsShown(false)

    //             if (editedTitle.trim() !== "") {
    //                 onUpdateBoard(editedTitle)
    //             }
    //             setEditedTitle("")
    //         }
    //     }

    //     document.addEventListener("mousedown", handleClickOutside)

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside)
    //     }
    // }, [editedTitle, onUpdateBoard])

    function changeBoardName(board) {
        console.log(board);
        if (!isEdit) setEditedTitle(board.title)
        setIsEdit(!isEdit)
    }

    function onSubmitTitle(ev,board) {
        ev.preventDefault()
        console.log(board);
        board.title = editedTitle
        onUpdateBoard(board)
        setIsEdit(!isEdit)
    }

    // function handleChange() {

    // }

    function removeBoard(board) {
        onRemoveBoard(board)
        setIsShown(!isShown)
    }

    function duplicateBoard(board) {
        setIsShown(!isShown)
    }

    function addToFavorites(board) {
        setIsShown(!isShown)
    }

    function openInNewTab(board) {
        setIsShown(!isShown)
        window.open(`http://localhost:5173/board/${board._id}`, '_blank', 'noopener')
    }

    return (
        <section className="board-list">
            {boards.map((board) => (
                <NavLink
                    className="board-side-preview"
                    style={{ textDecoration: "none", display: "flex", gap: "1em", color: "#323338" }}
                    to={`/board/${board._id}`}
                    key={board._id}
                >
                    <svg
                        lineHeight="0.1em"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                        ></path>
                    </svg>
                    {!isEdit && (
                        <div>
                            <div className="board-option-sidebar">{board.title}</div>
                            <button onClick={() => setIsShown(!isShown)} className="preview-three-points">
                                <ThreePoints />
                            </button>
                            <div style={{ display: isShown ? "block" : "none" }} className={`actions-border-side`}>

                                <div
                                    onChange={() => setIsShown(!isShown)}
                                    onClick={() => openInNewTab(board)}
                                    style={{ lineHeight: "20px" }}
                                    className="action-side"
                                >
                                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Open Board in New Tab" class="icon_90dcd5fe7a icon-service-icon noFocusStyle_770b8cdd79" data-testid="icon"><path d="M4.07692 3.75C3.99022 3.75 3.90706 3.78444 3.84575 3.84575C3.78444 3.90706 3.75 3.99022 3.75 4.07692V15.9231C3.75 16.0098 3.78444 16.0929 3.84575 16.1542C3.90706 16.2156 3.99022 16.25 4.07692 16.25H15.9231C16.0098 16.25 16.0929 16.2156 16.1542 16.1542C16.2156 16.0929 16.25 16.0098 16.25 15.9231V11.0769C16.25 10.6627 16.5858 10.3269 17 10.3269C17.4142 10.3269 17.75 10.6627 17.75 11.0769V15.9231C17.75 16.4076 17.5575 16.8723 17.2149 17.2149C16.8723 17.5575 16.4076 17.75 15.9231 17.75H4.07692C3.59239 17.75 3.12771 17.5575 2.78509 17.2149C2.44248 16.8723 2.25 16.4076 2.25 15.9231V4.07692C2.25 3.59239 2.44248 3.12771 2.78509 2.78509C3.12771 2.44248 3.59239 2.25 4.07692 2.25H8.92308C9.33729 2.25 9.67308 2.58579 9.67308 3C9.67308 3.41421 9.33729 3.75 8.92308 3.75H4.07692ZM12.4808 3C12.4808 2.58579 12.8166 2.25 13.2308 2.25H17C17.2005 2.25 17.3825 2.32864 17.5171 2.45675C17.5262 2.46537 17.535 2.47422 17.5436 2.48328C17.6073 2.55021 17.6562 2.62602 17.6904 2.70659C17.7288 2.79671 17.75 2.89588 17.75 3V6.76923C17.75 7.18344 17.4142 7.51923 17 7.51923C16.5858 7.51923 16.25 7.18344 16.25 6.76923V4.81066L10.5303 10.5303C10.2374 10.8232 9.76256 10.8232 9.46967 10.5303C9.17678 10.2374 9.17678 9.76256 9.46967 9.46967L15.1893 3.75H13.2308C12.8166 3.75 12.4808 3.41421 12.4808 3Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                    <p>Open Board in New Tab</p>
                                </div>
                                <hr style={{ width: '100%', color: "#323338" }} />
                                <div
                                    onClick={() => removeBoard(board)}
                                    style={{ lineHeight: "20px" }}
                                    className="action-side"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M8.30035 1.86462C7.77994 1.86462 7.29477 2.08976 6.94732 2.46719C6.60179 2.84253 6.41724 3.33927 6.41724 3.84552V4.32642H4.901H2.63477C2.22055 4.32642 1.88477 4.6622 1.88477 5.07642C1.88477 5.49063 2.22055 5.82642 2.63477 5.82642H4.151V16.1545C4.151 16.6608 4.33556 17.1575 4.68109 17.5328C5.02853 17.9103 5.51371 18.1354 6.03411 18.1354H13.9659C14.4863 18.1354 14.9715 17.9103 15.3189 17.5328C15.6645 17.1575 15.849 16.6608 15.849 16.1545V5.82642H17.3652C17.7794 5.82642 18.1152 5.49063 18.1152 5.07642C18.1152 4.6622 17.7794 4.32642 17.3652 4.32642H15.099H13.5828V3.84552C13.5828 3.33927 13.3982 2.84253 13.0527 2.46719C12.7053 2.08976 12.2201 1.86462 11.6997 1.86462H8.30035ZM7.16447 5.82642C7.16539 5.82642 7.16631 5.82642 7.16724 5.82642H12.8328C12.8337 5.82642 12.8346 5.82642 12.8356 5.82642H14.349V16.1545C14.349 16.3012 14.2948 16.4306 14.2153 16.5169C14.1378 16.6012 14.0465 16.6354 13.9659 16.6354H6.03411C5.95348 16.6354 5.86223 16.6012 5.78468 16.5169C5.7052 16.4306 5.651 16.3012 5.651 16.1545V5.82642H7.16447ZM12.0828 4.32642V3.84552C12.0828 3.69887 12.0286 3.56943 11.9491 3.4831C11.8716 3.39886 11.7803 3.36462 11.6997 3.36462H8.30035C8.21972 3.36462 8.12847 3.39886 8.05091 3.4831C7.97144 3.56943 7.91724 3.69887 7.91724 3.84552V4.32642L12.0828 4.32642Z"></path>
                                    </svg>
                                    <p>Delete</p>
                                </div>
                                <div
                                    onClick={() => changeBoardName(board)}
                                    style={{ lineHeight: "20px" }}
                                    className="action-side"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M13.8542 3.59561C13.8541 3.59568 13.8542 3.59555 13.8542 3.59561L4.80915 12.6503L3.81363 16.189L7.35682 15.1957L16.4018 6.14C16.4746 6.06722 16.5161 5.96795 16.5161 5.86503C16.5161 5.76221 16.4753 5.6636 16.4026 5.59083C16.4025 5.59076 16.4026 5.59091 16.4026 5.59083L14.4038 3.59568C14.3309 3.52292 14.232 3.48197 14.1289 3.48197C14.026 3.48197 13.927 3.52297 13.8542 3.59561ZM12.8051 2.54754C13.1562 2.19695 13.6324 2 14.1289 2C14.6254 2 15.1016 2.19693 15.4527 2.54747C15.4527 2.5475 15.4527 2.54745 15.4527 2.54747L17.4515 4.54263C17.8026 4.89333 18 5.36914 18 5.86503C18 6.36091 17.8028 6.8365 17.4518 7.18719L8.26993 16.3799C8.17984 16.4701 8.06798 16.5356 7.94516 16.57L2.94244 17.9724C2.68418 18.0448 2.4069 17.9723 2.21725 17.7829C2.0276 17.5934 1.95512 17.3165 2.02768 17.0586L3.43296 12.0633C3.46728 11.9413 3.53237 11.8301 3.62199 11.7404L12.8051 2.54754Z"></path>
                                    </svg>
                                    <p>Rename Board</p>
                                </div>

                                <div
                                    onClick={() => duplicateBoard(board)}
                                    style={{ lineHeight: "20px" }}
                                    className="action-side"
                                >
                                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Duplicate Board" class="icon_90dcd5fe7a icon-service-icon noFocusStyle_770b8cdd79" data-testid="icon"><path d="M7.82576 3.7273C7.82576 3.58922 7.93769 3.47729 8.07576 3.47729H9.76937H13.1567C13.2184 3.47729 13.278 3.50016 13.3239 3.54147L15.94 5.89592C15.9927 5.94334 16.0227 6.01088 16.0227 6.08175V13.3637C16.0227 13.5017 15.9108 13.6137 15.7727 13.6137H8.07576C7.93769 13.6137 7.82576 13.5017 7.82576 13.3637V3.7273ZM8.07576 1.97729C7.10926 1.97729 6.32576 2.7608 6.32576 3.7273V4.88639H5.16667C4.20017 4.88639 3.41667 5.66989 3.41667 6.63639V16.2727C3.41667 17.2392 4.20018 18.0228 5.16667 18.0228H11.8939C12.8604 18.0228 13.6439 17.2392 13.6439 16.2727V15.1137H15.7727C16.7392 15.1137 17.5227 14.3302 17.5227 13.3637V6.08175C17.5227 5.58565 17.3122 5.11286 16.9434 4.78098L14.3274 2.42653C14.006 2.13732 13.589 1.97729 13.1567 1.97729H9.76937H8.07576ZM12.1439 15.1137H8.07576C7.10927 15.1137 6.32576 14.3302 6.32576 13.3637V6.38639H5.16667C5.0286 6.38639 4.91667 6.49831 4.91667 6.63639V16.2727C4.91667 16.4108 5.0286 16.5227 5.16667 16.5227H11.8939C12.032 16.5227 12.1439 16.4108 12.1439 16.2727V15.1137Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                    <p>Duplicate Board</p>
                                </div>

                                <div
                                    onClick={() => addToFavorites(board)}
                                    style={{ lineHeight: "20px" }}
                                    className="action-side"
                                >
                                    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" aria-label="Add to favorites" class="icon_90dcd5fe7a icon-service-icon noFocusStyle_770b8cdd79" data-testid="icon"><path d="M10 3.90449L8.30061 7.34943C8.20168 7.5491 8.05582 7.72182 7.87554 7.85278C7.69525 7.98374 7.4859 8.06904 7.26543 8.10138L3.46267 8.65796L6.21005 11.3431C6.21018 11.3432 6.20992 11.343 6.21005 11.3431C6.37003 11.499 6.48998 11.6919 6.55878 11.9044C6.6275 12.1167 6.64348 12.3425 6.60534 12.5624C6.60528 12.5628 6.60521 12.5632 6.60514 12.5636L5.95599 16.3534L9.3594 14.563C9.5569 14.4592 9.77687 14.4048 10 14.4048C10.2231 14.4048 10.4429 14.4591 10.6404 14.5629L14.0349 16.3477L13.3857 12.5579C13.3856 12.5574 13.3856 12.5569 13.3855 12.5565C13.3474 12.3367 13.3634 12.1109 13.4321 11.8987C13.5009 11.6862 13.6204 11.4936 13.7804 11.3378C13.7805 11.3376 13.7803 11.3379 13.7804 11.3378L16.5322 8.65463L12.7353 8.10149C12.5148 8.06915 12.3048 7.98374 12.1245 7.85278C11.9442 7.72182 11.7983 7.54911 11.6994 7.34943L10 3.90449ZM10.5623 3.34904L11.2344 3.01626C11.1205 2.78619 10.9446 2.59254 10.7265 2.45714C10.5083 2.32175 10.2567 2.25 10 2.25C9.74328 2.25 9.49166 2.32175 9.27355 2.45714C9.05543 2.59254 8.87949 2.78619 8.76558 3.01626L6.98466 6.6265L2.99539 7.21037L2.99209 7.21086C2.73857 7.24912 2.50078 7.35743 2.30552 7.52359C2.11027 7.68974 1.9653 7.90714 1.88697 8.15127C1.80864 8.39539 1.80006 8.65655 1.8622 8.90529C1.92422 9.15357 2.05423 9.37963 2.23762 9.55808C2.23796 9.55842 2.2383 9.55875 2.23865 9.55909L5.11621 12.3715L4.43615 16.3417C4.43605 16.3422 4.43594 16.3428 4.43584 16.3434C4.39159 16.5975 4.41961 16.8589 4.51674 17.0979C4.6141 17.3374 4.77694 17.5446 4.98662 17.6958C5.1963 17.8471 5.44434 17.9362 5.70233 17.953C5.95874 17.9697 6.21467 17.9142 6.44115 17.793L10 15.9209L13.5498 17.7874C13.7763 17.9085 14.0322 17.964 14.2885 17.9473C14.5465 17.9305 14.7946 17.8414 15.0042 17.6901C15.2139 17.5389 15.3768 17.3317 15.4741 17.0922C15.5712 16.8532 15.5993 16.5918 15.555 16.3378C15.5549 16.3372 15.5548 16.3365 15.5547 16.3359L14.8747 12.3658L17.7568 9.55566C17.7571 9.55536 17.7574 9.55505 17.7577 9.55475C17.9412 9.37628 18.0712 9.15018 18.1332 8.90186C18.1954 8.65312 18.1868 8.39196 18.1085 8.14784C18.0301 7.90371 17.8852 7.68632 17.6899 7.52016C17.4946 7.354 17.2569 7.24569 17.0033 7.20743L13.0153 6.62645L11.2349 3.01724L10.5623 3.34904Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                                    <p>Add to favorites</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {isEdit && <form onSubmit={(ev) => onSubmitTitle(ev,board)}><input type="text" ref={inputRef} value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /></form>}
                </NavLink>
            ))}
        </section>
    )
}