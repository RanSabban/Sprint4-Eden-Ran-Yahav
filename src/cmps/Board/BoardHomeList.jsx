import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { loadBoards } from "../../store/actions/board.actions"
import { useEffect } from "react"
import { Board } from "monday-ui-react-core/icons"
import { Link } from "react-router-dom"

export function BoardHomeList() {


    const boards = useSelector(storeState => storeState.boardModule.boards)

    const { boardId } = useParams()

    useEffect(() => {
        loadBoards()
    }, [])

    console.log(boards);


    if (!boards) return
    return <section className="board-home-list">

        {boards.map(board => (
            <Link to={`/board/${board._id}`}
                className="board-home-card-container"
                key={board._id}
            >
                <img class="quick-search-item-image" src="https://cdn.monday.com/images/quick_search_recent_board.svg" />
            <section className="board-home-card-title">
                    <Board />
                    <span>{board.title}</span>
                </section>
            </Link>
        ))}


    </section>
}

