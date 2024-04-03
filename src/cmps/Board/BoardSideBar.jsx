import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { CloseSidebar, Home, Home2, MyWork, ThreePoints } from "../../services/svg.service"


export function BoardSideBar({ boards, onAddBoard, onRemoveBoard, onUpdateBoard }) {
    const [isOpen, setIsOpen] = useState(true)
    const dynClass = isOpen ? 'block' : 'none'
    const dynPad = isOpen ? '5px 10px' : '2em'

    return (<section className="board-sidebar">

        <button style={{ padding: dynPad }} className="close-sidebar-btn" onClick={() => setIsOpen(!isOpen)}><CloseSidebar /></button>
        <div style={{ marginLeft: "1em", display: dynClass }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div className="board-sidebar-upper">
                    <Link className="actions-sidebar-upper" to="/board"> <Home /> <div className="home-sidebar">Home</div></Link>
                    <Link className="actions-sidebar-upper"><MyWork /><div className="home-sidebar">My work</div></Link>

                </div>
                <hr style={{ width: "100%" }} />
                <section className="sidebar-workspace">
                    <div style={{ background: "orange", position: "relative" }}>M <Home2 /></div>
                    <div className="main-workspace">Main workspace</div>
                    <button className="three-points"><ThreePoints /></button>
                </section>
                <section className="sidebar-workspace">
                    <section className="sidebar-workspace">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z"></path></svg>
                        <input name="title" type="search" placeholder="Search" autoComplete="off"></input>
                        <button className="plus-button"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.75 6C10.75 5.58579 10.4142 5.25 10 5.25C9.58579 5.25 9.25 5.58579 9.25 6V9.25H6C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H9.25V14C9.25 14.4142 9.58579 14.75 10 14.75C10.4142 14.75 10.75 14.4142 10.75 14V10.75H14C14.4142 10.75 14.75 10.4142 14.75 10C14.75 9.58579 14.4142 9.25 14 9.25H10.75V6Z"></path></svg></button>
                    </section>
                </section>

                <div className="board-sidebar-lowwer"></div>
            </div>
        </div>
<<<<<<< HEAD
        <hr style={{ width: "100%" }} />
        <section className="sidebar-workspace">
            <div style={{ background: "orange", position: "relative" }}>M <svg position="absolute" width="20" height="20" viewBox="0 0 20 20" fill="black" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11 5.94634C11 5.88904 10.9868 5.83251 10.9615 5.78109C10.9362 5.72967 10.8995 5.68473 10.8541 5.64972L6.72913 2.46222C6.66342 2.41138 6.5827 2.38379 6.49962 2.38379C6.41655 2.38379 6.33583 2.41138 6.27012 2.46222L2.14513 5.64972C2.0999 5.68481 2.06331 5.72978 2.03815 5.7812C2.013 5.83261 1.99995 5.8891 2 5.94634V12.0088C2 12.1083 2.03951 12.2037 2.10984 12.274C2.18016 12.3443 2.27554 12.3838 2.375 12.3838H5.375C5.42473 12.3838 5.47242 12.3641 5.50758 12.3289C5.54275 12.2938 5.5625 12.2461 5.5625 12.1963V9.50884C5.5625 9.2602 5.66127 9.02175 5.83709 8.84593C6.0129 8.67011 6.25136 8.57134 6.5 8.57134C6.74864 8.57134 6.9871 8.67011 7.16291 8.84593C7.33873 9.02175 7.4375 9.2602 7.4375 9.50884V12.1963C7.4375 12.2461 7.45725 12.2938 7.49242 12.3289C7.52758 12.3641 7.57527 12.3838 7.625 12.3838H10.625C10.7245 12.3838 10.8198 12.3443 10.8902 12.274C10.9605 12.2037 11 12.1083 11 12.0088V5.94634Z" fill="black"></path></svg></div>
            <div className="main-workspace">Main workspace</div>
            <button className="three-points"><svg className="relative" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 10.5C6 11.3284 5.32843 12 4.5 12C3.67157 12 3 11.3284 3 10.5C3 9.67157 3.67157 9 4.5 9C5.32843 9 6 9.67157 6 10.5Z"></path><path d="M11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12C9.50492 12 8.83334 11.3284 8.83334 10.5C8.83334 9.67157 9.50492 9 10.3333 9C11.1618 9 11.8333 9.67157 11.8333 10.5Z"></path><path d="M17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12C15.3383 12 14.6667 11.3284 14.6667 10.5C14.6667 9.67157 15.3383 9 16.1667 9C16.9951 9 17.6667 9.67157 17.6667 10.5Z"></path></svg></button>
        </section>
        <section className="sidebar-workspace">
            <section className="sidebar-workspace">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z"></path></svg>
            <input name="title" type="search" placeholder="Search" autoComplete="off"></input>
            <button className="plus-button"><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.75 6C10.75 5.58579 10.4142 5.25 10 5.25C9.58579 5.25 9.25 5.58579 9.25 6V9.25H6C5.58579 9.25 5.25 9.58579 5.25 10C5.25 10.4142 5.58579 10.75 6 10.75H9.25V14C9.25 14.4142 9.58579 14.75 10 14.75C10.4142 14.75 10.75 14.4142 10.75 14V10.75H14C14.4142 10.75 14.75 10.4142 14.75 10C14.75 9.58579 14.4142 9.25 14 9.25H10.75V6Z"></path></svg></button>
            </section>
        </section>
        <div className="board-sidebar-lowwer"></div>

=======
>>>>>>> ed45636b9cd664d3d09db7ea93a42a2b0b735442
    </section>
    )
}