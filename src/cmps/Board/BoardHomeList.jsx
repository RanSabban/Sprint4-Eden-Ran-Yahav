import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { loadBoards } from "../../store/actions/board.actions"
import { useEffect, useState } from "react"
import { Board, DropdownChevronDown, DropdownChevronRight } from "monday-ui-react-core/icons"
import { Link } from "react-router-dom"
import boardImg from '/img/boardImg.png'
import  loader  from '/img/loader.gif'
import { Avatar } from "monday-ui-react-core"


export function BoardHomeList(screenWidth) {
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [isCollapsed, setIsCollapsed] = useState(true)


    const { boardId } = useParams()

    useEffect(() => {
        loadBoards()
    }, [])


    console.log(boards)

    if (isLoading || !boards) return (
        <div className="loader-container">
            <img className="loader" src={loader} alt="loader" />
        </div>
    )

    return <section className="board-home-grid-container">

        <section className="board-home-list-container">
            <div className="recently-visited-acord">
                {screenWidth > 880 && (
                    isCollapsed ?
                        <DropdownChevronRight onClick={() => setIsCollapsed(!isCollapsed)} /> :
                        <DropdownChevronDown onClick={() => setIsCollapsed(!isCollapsed)} />
                )}

                {/* {screenWidth > 880 ? ( */}

                <h2>Recently visited</h2>


                {/* ) : (
                    <>
                        <h2 className="activity-title" style={{ letterSpacing: '.5px', color: "#504F54" }} >What's new</h2>
                        <section className="activity-wrapper">
                            <article className="activity-card">
                                <div className="activity-card-top">
                                    <img className="activity-img" src={boardImg} alt="boardImg" />
                                    <Avatar
                                        className="activity-member"
                                        ariaLabel="Eden Gilady"
                                        src="https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195"
                                        type="img"
                                    />
                                </div>
                                <p className="activity-desc">There was a change in "Demo Launch"</p>
                                <span>1 hour ago</span>
                            </article>
                            <article className="activity-card">
                                <div className="activity-card-top">
                                    <img className="activity-img" src={boardImg} alt="boardImg" />
                                    <Avatar
                                        className="activity-member"
                                        ariaLabel="Eden Gilady"
                                        src="https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195"
                                        type="img"
                                    />
                                </div>
                                <p className="activity-desc">There was a change in "Demo Launch"</p>
                                <span>1 hour ago</span>
                            </article>
                        </section>
                    </>
                )} */}
            </div>

            {isCollapsed && (
                <>
                    <section className="board-home-list">
                        {boards.map(board => (
                            <Link to={`/board/${board._id}`}
                                className="board-home-card-container"
                                key={board._id}
                            >
                                <img className="quick-search-item-image" src="https://cdn.monday.com/images/quick_search_recent_board.svg" />
                                <img className="board-image" src={boardImg} />
                                <section className="board-home-card-title">
                                    <Board className="boardIcon" />
                                    <span>{board.title}</span>
                                </section>
                            </Link>
                        ))}
                    </section >

                    <article className="update-feed-container">
                        <h2>Update Feed</h2>
                        <section className="update-feed">
                            <div className="gif-container">
                                <img src="/img/highFive.gif" alt="highFive.gif" />
                            </div>
                            <div className="no-updates-message">
                                <h5>No unread updates</h5>
                                <p>To revisit updates you've already read, change the filter at the top left corner of your feed.</p>
                            </div>
                        </section>
                    </article>
                </>
            )}
        </section>
    </section >

}

