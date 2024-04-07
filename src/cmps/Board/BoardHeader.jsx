import { Avatar, AvatarGroup, Button, EditableHeading, Menu, MenuButton, MenuDivider, MenuItem, Tab, TabList, Tooltip, } from "monday-ui-react-core";
import { Home, Favorite, Invite, AddSmall, Integrations, Robot, DropdownChevronUp, DropdownChevronDown, Info, Sun, Moon } from "monday-ui-react-core/icons";
import { BoardFilter } from "./BoardFilter";
import { boardService } from "../../services/board.service.local";
import { updateBoard } from "../../store/board.actions";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export function BoardHeader({ isCollapsed, setIsCollapsed, onAddGroup, board }) {
    // const [boardTitle, setBoardTitle] = useState(board.title)
    const boardTitle = useSelector(storeState => storeState.boardModule.board.title)

    const dynCollapseBtn = isCollapsed ? '' : 'collapseBtn'

    // const board = boardService.getById(boardId)
    console.log("$$$$$$$$$", boardTitle);

    function onRenameBoard(newTitle) {
        try {
            board.title = newTitle
            updateBoard(board)
        }
        catch (err) {

        }
    }

    return (
        <section className="board-header-wrapper">
            <div className="board-header">
                <div className="board-header-top flex align-center justify-between">
                    <div className="board-title-left">
                        <div className="editable-container flex">
                            <Tooltip
                                position="bottom"
                                content='Click to edit'
                                animationType="expand">

                                <EditableHeading
                                    type={EditableHeading.types.h1}
                                    value={boardTitle}
                                    isEditMode={"true"}
                                    onFinishEditing={onRenameBoard}
                                />
                            </Tooltip>

                            <Tooltip
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

                        </div>
                    </div>

                    <div className="board-title-right flex">

                        <Button
                            className="btn-avatars"
                            kind="tertiary"
                            onClick={() => console.log('m-list')}
                            size="small"
                        >
                            Activity
                            <AvatarGroup max={2} size="small" className="overlap-images-wrapper">
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

                        <Tooltip
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
                            content='Options'
                            animationType="expand">
                            <MenuButton
                            // kind="tertiary"
                            // size={"large"} 
                            >
                                <Menu id="menu" size={Menu.sizes.LARGE}>
                                    <MenuItem icon={Sun} title="The sun" />
                                    <MenuItem icon={Moon} title="The moon" />
                                    <MenuItem icon={Favorite} title="And the stars" />
                                </Menu>
                            </MenuButton>
                        </Tooltip>
                    </div>
                </div>

                <div className="board-header-bottom flex align-center justify-between">
                    <div className="board-header-nav flex">
                        <TabList
                            style={{ marginBottom: "16px" }}
                            size="sm">
                            <Tooltip content='Main Table' animationType="expand">
                                <Tab
                                    className="main-table-tab"
                                    active={true}
                                    iconSide="left"
                                // size={}
                                >
                                    <Home style={{ height: "16px", marginRight: "4px", marginLeft: "-4px" }} className="main-table-box" />
                                    Main Table
                                </Tab>
                            </Tooltip>
                        </TabList>

                        <Tooltip content='Add view' animationType="expand" position="right">
                            <Button
                                className="btn-add"
                                kind="tertiary"
                                onClick={() => console.log('m-list')}
                                size="sm"
                            >
                                <AddSmall />
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="board-header-toolkit flex">
                        <Tooltip content='Integrate' animationType="expand">
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
                        <Tooltip content='Automate' animationType="expand">
                            <Button
                                className="btn"
                                kind="tertiary"
                                onClick={() => console.log('m-list')}
                                size="sm"
                            >
                                <Robot
                                    className="icon"
                                    style={{ marginRight: "8px" }} /> Automate
                            </Button>
                        </Tooltip>

                        <Button
                            className={"btn-collapse " + dynCollapseBtn}
                            kind="secondary"
                            onClick={() => setIsCollapsed(prevIsCollapsed => !prevIsCollapsed)}
                        >
                            {!dynCollapseBtn ? <DropdownChevronUp style={{ height: "16px" }} /> : <DropdownChevronDown style={{ height: "16px" }} />}
                        </Button>
                    </div>

                </div>
                <BoardFilter onAddGroup={onAddGroup} board={board} />

            </div>
        </section>
    )
}