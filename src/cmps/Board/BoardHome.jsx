import { useSelector } from "react-redux";
import { RangePicker } from "./reusableCmps/RangePicker";
import { BoardHomeHeader } from "./BoardHomeHeader";
import { BoardHomeList } from "./BoardHomeList";

export function BoardHome() {
    
    const boards = useSelector(storeState => storeState.boardModule.boards)

    return (
    <section className="board-home">
        <BoardHomeHeader />
        <BoardHomeList />
        {/* <RangePicker/> */}
    </section>
    )
}