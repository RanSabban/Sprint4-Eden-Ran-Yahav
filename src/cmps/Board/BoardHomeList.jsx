import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { loadBoards } from "../../store/actions/board.actions"
import { useEffect } from "react"

export function BoardHomeList() {


    const boards = useSelector(storeState => storeState.boardModule.boards)

    const { boardId } = useParams()

    useEffect(() => {
        loadBoards()
    }, [])

    console.log(boards);

    

    return <section className="board-home-list">

        
        
    </section>
}