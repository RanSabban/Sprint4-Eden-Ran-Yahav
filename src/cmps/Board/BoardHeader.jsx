import { Avatar, AvatarGroup, Button, IconButton, Menu, MenuButton, MenuDivider, MenuItem, Tab, TabList, Tooltip, } from "monday-ui-react-core"
import { Home, Favorite, Invite, Integrations, Robot, DropdownChevronUp, DropdownChevronDown, Info, Sun, Moon, MoveArrowLeft } from "monday-ui-react-core/icons"

import { BoardFilter } from "./BoardFilter"
import { boardService } from "../../services/board.service"
import { addGroup, updateBoard } from "../../store/actions/board.actions"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { CustomAdd, MenuDots } from "../../services/svg.service"
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service"
import { AutomationBoard } from "./AutomationBoard"
import { useNavigate } from "react-router"


export function BoardHeader({ isCollapsed, setIsCollapsed, board, isAutomateOpen, setIsAutomateOpen }) {
    const boardTitle = useSelector(storeState => storeState.boardModule.board.title)
    const [initialTitle, setInitialTitle] = useState(boardTitle)
    const [isEditable, setIsEditable] = useState(false)
    const [dynClass, setDynClass] = useState('')
    const navigate = useNavigate();

    const dynCollapseBtn = isCollapsed ? '' : 'collapseBtn'
    const editableTitleRef = useRef(null)


    async function onAddGroup(boardId, isBottom) {
        try {
            console.log('here');
            console.log(boardId, isBottom);
            const group = await addGroup(boardId, isBottom)
            console.log(group)
            // showSuccessMsg('Group added')
        } catch (err) {
            console.log('Err add group', err);
            // showErrorMsg('Nono')
        }
    }

    const setCursorToEnd = (element) => {
        const range = document.createRange()
        const selection = window.getSelection()

        range.selectNodeContents(element)
        range.collapse(false)

        selection.removeAllRanges()
        selection.addRange(range)
    }

    const handleClick = () => {
        console.log(isCollapsed)

        if (!isEditable) {
            setIsEditable(true)
            setDynClass('flex-grow')

            if (editableTitleRef.current) {
                editableTitleRef.current.contentEditable = "true"
                editableTitleRef.current.focus()
                setCursorToEnd(editableTitleRef.current)
            }
        }
    }

    useEffect(() => {
        const handleOutsideClick = (ev) => {
            if (editableTitleRef.current && !editableTitleRef.current.contains(ev.target)) {
                setIsEditable(false)
                const currentText = editableTitleRef.current.innerText
                if (currentText !== initialTitle) {
                    try {
                        board.title = currentText
                        updateBoard(board)
                        setInitialTitle(currentText)
                        showSuccessMsg("Title updated successfully.")
                    } catch (err) {
                        console.error('Error updating title:', err)
                        showErrorMsg("Error updating title.")
                        editableTitleRef.current.innerText = initialTitle
                    }
                }
            }
        }

        const handleKeyDown = (ev) => {
            if (ev.key === 'Enter') {
                ev.preventDefault()
                ev.target.blur()
                setIsEditable(false)
                const newTitle = ev.target.innerText
                if (newTitle !== initialTitle) {
                    try {
                        board.title = newTitle
                        updateBoard(board)
                    } catch (err) {
                        console.error('Error renaming board:', err)
                        editableTitleRef.current.innerText = initialTitle
                    }
                } else {
                    editableTitleRef.current.innerText = initialTitle
                }
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        if (editableTitleRef.current) {
            editableTitleRef.current.addEventListener('keydown', handleKeyDown)
        }
        setInitialTitle(boardTitle)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)

            if (editableTitleRef.current) {
                editableTitleRef.current.removeEventListener('keydown', handleKeyDown)
            }
        }
    }, [initialTitle, isEditable, boardTitle])

    function onRenameBoard(ev) {
        const newTitle = ev.target.innerText
        if (newTitle === boardTitle) return
        try {
            board.title = newTitle
            updateBoard(board)
        } catch (err) {
            console.error('Error renaming board:', err)
        }
        setIsEditable(false)
    }

    return (
        <section className={`board-header-wrapper ${isCollapsed ? 'collapsed' : ''}`}>

            <div className="board-header">

                <div className={`board-header-top flex align-center justify-between ${isCollapsed ? 'collapsed' : ''}`}>

                    <IconButton
                        onClick={() => navigate('/board/')}
                        icon={MoveArrowLeft}
                        kind="tertiary"
                        wrapperClassName="back-btn"
                        iconClassName="back-btn-icon"
                        size="medium">
                    </IconButton >

                    <div className={`board-title-left ${isEditable ? dynClass : ''}`}>
                        <div className={`editable-container flex ${isEditable ? dynClass : ''}`}>
                            <Tooltip
                                zIndex="2000"
                                position="bottom"
                                content='Click to edit'
                                animationType="expand">
                                <div
                                    ref={editableTitleRef}
                                    contentEditable={isEditable}
                                    onClick={handleClick}
                                    className={`editable-title ${isCollapsed ? 'collapsed' : ''}`}
                                    onBlur={onRenameBoard}
                                    suppressContentEditableWarning={true}
                                >
                                    {boardTitle}
                                </div>

                            </Tooltip>
                            {!isCollapsed ? (
                                <>
                                    <Tooltip
                                        zIndex="2000"
                                        content='Show board description'
                                        animationType="expand">
                                        <Button
                                            className="btn-info"
                                            kind="tertiary"
                                            onClick={() => console.log('m-list')}
                                            size="small">
                                            <Info className="icon" />
                                        </Button>
                                    </Tooltip>

                                    <Tooltip
                                        zIndex="2000"
                                        content='Add to favorites'
                                        animationType="expand">
                                        <Button
                                            className="btn-starred"
                                            kind="tertiary"
                                            onClick={() => console.log('m-list')}
                                            size="small">
                                            <Favorite className="icon" />
                                        </Button>
                                    </Tooltip>
                                </>
                            ) : (
                                <div className={`board-header-nav flex align-center ${isCollapsed ? 'collapsed' : ''}`}>
                                    <TabList
                                        style={{ marginBottom: "16px" }}
                                        size="sm">
                                        <Tooltip
                                            content='Main Table'
                                            animationType="expand"
                                            zIndex="999999">
                                            <Tab
                                                className="main-table-tab"
                                                active={true}
                                                iconSide="left"
                                            >
                                                <Home style={{ height: "16px", marginRight: "4px", marginLeft: "-4px", paddingBottom: "0" }} className="main-table-box" />
                                                <span>Main Table</span>
                                            </Tab>
                                        </Tooltip>
                                    </TabList>

                                    <Tooltip content='Add view' animationType="expand" position="right" zIndex="999999">
                                        <Button
                                            className="btn-add"
                                            kind="tertiary"
                                            onClick={() => console.log('m-list')}
                                            style={{}}
                                            size="sm"
                                        >
                                            <CustomAdd />
                                        </Button>
                                    </Tooltip>
                                </div>
                            )}

                        </div>
                    </div>


                    <div className={`board-title-right flex ${isCollapsed ? 'collapsed' : ''}`}>
                        {!isCollapsed && (
                            <>
                                <Button
                                    className="btn-avatars"
                                    kind="tertiary"
                                    onClick={() => console.log('m-list')}
                                    size="small"
                                >
                                    Activity
                                    <AvatarGroup max={2}
                                        size="small"
                                        className="overlap-images-wrapper"

                                    >
                                        <Avatar
                                            className="overlap-image"
                                            ariaLabel="Eden Gilady"
                                            src="https://files.monday.com/euc1/photos/58211317/thumb/58211317-user_photo_2024_04_03_12_43_15.png?1712148195"
                                            type="img"
                                        />
                                        <Avatar
                                            ariaLabel="Yahav Ganon"
                                            src="https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                                            type="img"
                                        />
                                        <Avatar
                                            ariaLabel="Ran Sabban"
                                            src="https://files.monday.com/euc1/photos/58211325/thumb_small/58211325-user_photo_2024_04_03_12_41_20.png?1712148081"
                                            type="img"
                                        />
                                    </AvatarGroup>
                                </Button>
                            </>
                        )}

                        <Tooltip
                            zIndex="999999"
                            content='Add to favorites'
                            animationType="expand">
                            <Button
                                className="btn-starred"
                                kind="secondary"
                                onClick={() => console.log('m-list')}
                                size="small"
                            >
                                <Invite
                                    className="icon"
                                    style={{ marginRight: "8px" }}
                                />Invite
                            </Button>
                        </Tooltip>

                        <Tooltip
                            zIndex="99999999"
                            content='Options'
                            animationType="expand">
                            <MenuButton
                                component={MenuDots}
                                zIndex="999999"
                            >
                                <Menu id="menu" size="large" style={{ height: "30px" }} >
                                    <MenuItem icon={Sun} title="The sun" />
                                    <MenuItem icon={Moon} title="The moon" />
                                    <MenuItem icon={Favorite} title="And the stars" />
                                </Menu>
                            </MenuButton>
                        </Tooltip>

                        {isCollapsed && (
                            <Tooltip content='Expand Header' animationType="expand" position="top" zIndex="999999">

                                <Button
                                    className={"btn-collapse " + dynCollapseBtn}
                                    kind="secondary"
                                    onClick={() => setIsCollapsed(prevIsCollapsed => !prevIsCollapsed)}
                                    style={{ marginLeft: "12px" }}

                                >
                                    {!isCollapsed ? <DropdownChevronUp style={{ height: "16px" }} /> : <DropdownChevronDown style={{ height: "16px" }} />}
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                    <IconButton
                        icon={MenuDots}
                        kind="tertiary"
                        wrapperClassName="menu-btn"
                        iconClassName="menu-btn-icon"
                        size="medium">
                    </IconButton >
                </div>

                {!isCollapsed && (
                    <>
                        <div className="board-header-bottom flex align-center justify-between">
                            <div className="board-header-nav flex align-center">
                                <TabList
                                    style={{ marginBottom: "16px" }}
                                    size="sm">
                                    <Tooltip content='Main Table' animationType="expand" zIndex="9999999">
                                        <Tab
                                            className="main-table-tab"
                                            active={true}
                                            iconSide="left"
                                        >
                                            <Home style={{ height: "16px", marginRight: "4px", marginLeft: "-4px" }} className="main-table-box" />
                                            Main Table
                                        </Tab>
                                    </Tooltip>
                                </TabList>

                                <Tooltip content='Add view'
                                    animationType="expand"
                                    position="rig999ht"
                                    zIndex="999999">
                                    <Button
                                        className="btn-add"
                                        kind="tertiary"
                                        onClick={() => console.log('m-list')}
                                        size="sm"
                                    >
                                        <CustomAdd />
                                    </Button>
                                </Tooltip>
                            </div>

                            <div className="board-header-toolkit flex">
                                <Tooltip
                                    content='Integrate'
                                    animationType="expand"
                                    zIndex="99999999">
                                    <Button
                                        className="btn"
                                        kind="tertiary"
                                        onClick={() => console.log('m-list')}
                                        size="sm"
                                    >
                                        <Integrations
                                            className="icon"
                                            style={{ marginRight: "8px" }} /> Integrate
                                    </Button>
                                </Tooltip>
                                <Tooltip
                                    content='Automate'
                                    animationType="expand"
                                    zIndex="99999999">
                                    <Button
                                        className="btn"
                                        kind="tertiary"
                                        onClick={() => setIsAutomateOpen(!isAutomateOpen)}
                                        size="sm"
                                    >
                                        <Robot
                                            className="icon"
                                            style={{ marginRight: "8px" }} /> Automate
                                    </Button>
                                </Tooltip>

                                <Tooltip content='Collapse Header' animationType="expand" position="top" zIndex="999999">
                                    <Button
                                        className={"btn-collapse " + dynCollapseBtn}
                                        kind="secondary"
                                        onClick={() => setIsCollapsed(prevIsCollapsed => !prevIsCollapsed)}
                                    >
                                        {!isCollapsed ? <DropdownChevronUp style={{ height: "16px" }} /> : <DropdownChevronDown style={{ height: "16px" }} />}
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>
                    </>
                )}
                <BoardFilter onAddGroup={onAddGroup} boardId={board._id} />

            </div>
        </section>
    )
}