import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { loadBoards } from "../../store/actions/board.actions"
import { useEffect, useState } from "react"
import { Board, DropdownChevronDown, DropdownChevronRight } from "monday-ui-react-core/icons"
import { Link } from "react-router-dom"
import boardImg from '/img/boardImg.png'
import  loader  from '/img/loader.gif'
import { Avatar, Button } from "monday-ui-react-core"
import { userService } from "../../services/user.service"
import { SlackMessageCmp } from "../SlackMessageCmp"


export function BoardHomeList(screenWidth) {
    const isLoading = useSelector((storeState) => storeState.systemModule.isLoading)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [isCollapsed, setIsCollapsed] = useState(true)


    const { boardId } = useParams()

    useEffect(() => {
        loadBoards()
    }, [])

    function sendMsgToSlack(msg){
        SlackMessageCmp(msg)

    }

    console.log(boards)
    // userService.sendMessageToSlack('yers')

    if (isLoading || !boards) return (
        <div className="loader-container">
            <img className="loader" src={loader} alt="loader" />
        </div>
    )

    return <section className="board-home-grid-container">

        <section className="board-home-list-container">
            <div className="recently-visited-card">
                {screenWidth > 880 && (
                    isCollapsed ?
                        <DropdownChevronRight onClick={() => setIsCollapsed(!isCollapsed)} /> :
                        <DropdownChevronDown onClick={() => setIsCollapsed(!isCollapsed)} />
                )}

                {/* {screenWidth > 880 ? ( */}

                <h2>Recently visited</h2>

            </div>
            {/* <button onClick={() => sendMsgToSlack('Yoyo!!!!!!!')} style={{ background: 'black' }}>
                    Click me!
                </button>             */}
                {/* <div>
            <SlackMessageCmp message="Yoyo!!!!!!!" />
        </div> */}
                

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
                        {/* <Button onClick={sendMessageToSlack('Hello, Slack from my Frontend!')}></Button> */}
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

