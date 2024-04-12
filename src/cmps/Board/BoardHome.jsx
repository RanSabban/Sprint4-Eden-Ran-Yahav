import { useSelector } from "react-redux";
import { RangePicker } from "./reusableCmps/RangePicker";

export function BoardHome() {
    
    const boards = useSelector(storeState => storeState.boardModule.boards)

    return (
    <section className="board-home">
        <h2>Hello from Board Home!</h2>
        {/* <BoardHomeHeader /> */}
        {/* <RangePicker/> */}
    </section>
    )
}