import { useSelector } from "react-redux";
import { RangePicker } from "./reusableCmps/RangePicker";
import { BoardHomeHeader } from "./BoardHomeHeader";
import { BoardHomeList } from "./BoardHomeList";
import { useEffect, useState } from "react";
import { useScreenWidth } from "../../customHooks/useScreenWidth";

export function BoardHome() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const screenWidth = useScreenWidth()

    return (
        <section className="board-home">
            <BoardHomeHeader screenWidth={screenWidth} />
            <BoardHomeList screenWidth={screenWidth} />
            {/* <RangePicker/> */}
        </section>
    )
}