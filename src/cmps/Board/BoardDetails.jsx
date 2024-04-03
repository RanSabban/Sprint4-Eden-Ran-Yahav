import { useEffect } from "react";
import { useParams } from "react-router";
import { BoardHeader } from "./BoardHeader";

export function BoardDetails() {

    
    const {boardId} = useParams()
    const board = useSelector(storeState => storeState.boardModule.board)

    useEffect(() => {
        if (boardId) loadBoard()
    },[])

    function loadBoard() {

    }

    return (
        <section className="board-preview">
            <BoardHeader/>
            <h2>Hello from board preview</h2>
        </section>
    )
}