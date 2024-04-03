import { Link } from "react-router-dom"
import { BoardList } from "./BoardList"
import { closeSidebar, home, home2, myWork, threePoints } from "../services/svg.service"
import { useState } from "react"
import { useEffect } from "react"


export function BoardSideBar({ boards, onAddBoard, onRemoveBoard, onUpdateBoard }) {
   const [isOpen, setIsOpen] = useState(true)
    const dynClass = isOpen ? 'block' : 'none'

    return <section className="board-sidebar">
        
            {/* <button>puki</button> */}
        <div style={{marginLeft: "1em", display: dynClass}}>
            <div className="board-sidebar-upper">
                <Link className="actions-sidebar-upper" to="/board"> {home()} <div className="home-sidebar">Home</div></Link>
                <Link className="actions-sidebar-upper">{myWork()}<div className="home-sidebar">My work</div></Link>
            </div>
            <hr style={{ width: "100%" }} />
            <section className="sidebar-workspace">
                <div style={{ background: "orange", position: "relative" }}>M {home2()}</div>
                <div className="main-workspace">Main workspace</div>
                <button className="three-points">{threePoints()}</button>
            </section>
            <section className="sidebar-workspace">
                <section className="sidebar-workspace">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z"></path></svg>
                    <input name="title" type="search" placeholder="Search" autocomplete="off" value=""></input>
                    <button className="plus-button"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.75 6C10.75 5.58579 10.4142 5.25 10 5.25C9.58579 5.25 9.25 5.58579 9.25 6V9.25H6C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H9.25V14C9.25 14.4142 9.58579 14.75 10 14.75C10.4142 14.75 10.75 14.4142 10.75 14V10.75H14C14.4142 10.75 14.75 10.4142 14.75 10C14.75 9.58579 14.4142 9.25 14 9.25H10.75V6Z"></path></svg></button>
                </section>
            </section>

            <div className="board-sidebar-lowwer"></div>
        </div>
    </section>
}