import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { CloseSidebar, Home, Home2, MyWork, OpenSidebar, PlusTool, SearchTool, ThreePoints } from "../../services/svg.service"
import { BoardList } from "./BoardList"


export function BoardSideBar({ boards, onAddBoard, onRemoveBoard, onUpdateBoard }) {
    const [isOpen, setIsOpen] = useState(true)
    const [isOpen2, setIsOpen2] = useState(true)
    const dynClass = isOpen ? 'block' : 'none'
    const isBtnShow = isOpen ? 'none': 'block'
    const dynPad = isOpen ? '270px' : '38px'

    const handleMouseEnter = () => {
        setIsOpen(true)
    }

    const handleMouseLeave = () => {
        if (isOpen2) return
        setIsOpen(false)
    }

    return (<section style={{ width: dynPad, }} className="board-sidebar" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

        <button  style={{ transform: !isOpen ? 'rotate(180deg)' : ''}} className={`close-sidebar-btn ${isOpen && isOpen2 ? 'show' : 'hide'}`} onClick={() => setIsOpen2(!isOpen2)}><OpenSidebar /></button>
        <div style={{ marginLeft: "1em", display: dynClass }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="board-sidebar-upper">
                    <Link className="actions-sidebar-upper" to="/board"> <Home /> <div className="home-sidebar">Home</div></Link>
                    <Link className="actions-sidebar-upper"><MyWork /><div className="home-sidebar">My work</div></Link>
                </div>
                <hr style={{ width: "100%" }} />
                <section className="sidebar-workspace">
                    <div className="main-back">M <Home2 /></div>
                    <div className="main-workspace">Main workspace
                    </div>
                    <button className="three-points"><ThreePoints /></button>
                </section>
                <section className="sidebar-workspace">
                    <section style={{marginBottom: "0"}} className="sidebar-workspace">
                        <div style={{ position: "absolute", top: "165px", right: "231px"}}>
                            <SearchTool />
                        </div>
                        <input className="input-sidebar" name="title" type="search" placeholder="      Search" autoComplete="off"></input>
                        <button className="plus-button"><PlusTool /></button>
                    </section>
                </section>

                <div className="board-sidebar-lowwer">
                    <BoardList boards={boards} onAddBoard={onAddBoard} onRemoveBoard={onRemoveBoard} onUpdateBoard={onUpdateBoard} />
                </div>
            </div>
        </div>
    </section>
    )
}