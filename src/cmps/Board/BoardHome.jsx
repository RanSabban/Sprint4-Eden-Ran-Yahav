import { useSelector } from "react-redux";
import { RangePicker } from "./reusableCmps/RangePicker";
import { BoardHomeHeader } from "./BoardHomeHeader";
import { BoardHomeList } from "./BoardHomeList";
import { useEffect, useState } from "react";

export function BoardHome() {
    
    const boards = useSelector(storeState => storeState.boardModule.boards)

    function useScreenWidth() {
        const [width, setWidth] = useState(window.innerWidth)

        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth)
            window.addEventListener('resize', handleResize)
            console.log(screenWidth)
            return () => window.removeEventListener('resize', handleResize)

        }, [window.innerWidth])

        return width
    }

    const screenWidth = useScreenWidth()

    return (
    <section className="board-home">
        <BoardHomeHeader screenWidth={screenWidth}/>
        <BoardHomeList screenWidth={screenWidth} />
        {/* <RangePicker/> */}
    </section>
    )
}