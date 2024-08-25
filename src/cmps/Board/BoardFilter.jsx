import { Avatar, Button, MenuItem, SearchComponent, SplitButton, SplitButtonMenu, Tooltip, TextField, IconButton } from "monday-ui-react-core";
import { Filter, PersonRound, Sort, Search, Table, DropdownChevronDown } from "monday-ui-react-core/icons";
import { useEffect, useState } from "react";
import { addTask, updateFilterBy } from "../../store/actions/board.actions";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { boardService } from "../../services/board.service";
import { MondaySearchIcon } from "../../services/svg.service";
import { userService } from "../../services/user.service";
import { AvatarGroupAng } from "./reusableCmps/AvatarGroupAang";

export function BoardFilter({ onAddGroup, boardId }) {

    const [isSearch, setIsSearch] = useState(false)
    const [filterByToUpdate, setFilterByToUpdate] = useState(boardService.getEmptyFilterBy)
    const [isPersonFilterOpen, setIsPersonFilterOpen] = useState(false)
    const [users, setUsers] = useState([])

    const dynSearchBtn = isSearch ? '' : 'searchBtn'

    useEffect(() => {
        setIsSearch(false)
        getAllUsers()
    }, [])

    function toggleIsSearch() {
        setIsSearch(!isSearch)
    }

    async function onAddTask() {
        try {
            // console.log(groupId);
            await addTask('abc', boardId)
        }
        catch (err) {
            console.log('err adding task', err);
            showErrorMsg('Cannot add task')
        }
    }

    // async function updateFilterBy(filterBy) {

    // }

    async function handleChangeFilter(value) {
        try {
            updateFilterBy({ ...filterByToUpdate, title: value }, boardId)
        } catch (err) {
            console.log('cannot filter board', err);
            throw err
        }
    }

    const getAllUsers = async () => {
        try {
            const users = await userService.getUsers()
            console.log('users', users);
            setUsers(users)
            // return users
        } catch (err) {
            console.log('cannot get users', err);
            throw err
        }
    }

    const handleChangeMember = (user) => {
        console.log(user._id);
        if (user) {
            updateFilterBy({ ...filterByToUpdate, userId: user._id }, boardId)
        }
    }

    console.log(users);

    return (

        <div className="board-filter-wrapper">
            <section className="board-filter flex">

                <SplitButton
                    shouldCloseOnClickInsideDialog
                    onClick={onAddTask}
                    size="small"

                    secondaryDialogContent={
                        <SplitButtonMenu _id="split-menu">
                            <MenuItem
                                onClick={() => onAddGroup(boardId, false)}
                                title="New group of tasks"
                            />
                        </SplitButtonMenu>}>New Item

                </SplitButton>

                {!isSearch ? (
                    <Button
                        className="search-btn"
                        onBlur={() => toggleIsSearch()}
                        leftIcon={MondaySearchIcon}
                        kind="tertiary"
                        style={{ marginRight: "6px", marginLeft: "6px" }}
                        size="small">
                        <span style={{ marginLeft: "2px" }}>Search</span>
                    </Button>
                ) : (
                    <TextField
                        id="search-input-focused"
                        size={TextField.sizes.SMALL}
                        onBlur={() => toggleIsSearch()}
                        iconName={MondaySearchIcon}
                        data-testid="search-input-icon"
                        autoFocus
                        debounceRate={200}
                        placeholder="Search this board"
                        wrapperClassName="dyn-search"
                        onChange={(value) => handleChangeFilter(value)}
                    />)
                }


                <Tooltip content='Filter board by person' animationType="expand">
                    <Button
                        className="icon person-filter-container"
                        leftIcon={PersonRound}
                        kind="tertiary"
                        size="small"
                        style={{ marginRight: "6px" }}
                        onClick={() => setIsPersonFilterOpen(!isPersonFilterOpen)}
                    >
                        {isPersonFilterOpen && (
                            <section className="open-filter-person">
                                <div className="open-filter-person-title">Filter this board by Person</div>
                                <div className="open-filter-person-subtitle">And find items they're working on.</div>
                                <AvatarGroupAng users={users} maxUsers={users.length} userSize="medium"
                                    handleChangeMember={handleChangeMember}
                                />
                            </section>
                        )}
                        <span >Person

                        </span>

                    </Button>
                </Tooltip>

                <Tooltip content='Filter board by anything' animationType="expand">
                    <Button
                        className="icon"
                        leftIcon={Filter}
                        kind="tertiary"
                        style={{ marginRight: "6px" }}
                        size="small">
                        <span>Filter</span>
                    </Button>
                </Tooltip>


                <Tooltip content='Sort board by any column' animationType="expand">
                    <Button
                        className="icon"
                        leftIcon={Sort}
                        kind="tertiary"
                        style={{ marginRight: "6px" }}
                        size="small">
                        <span>Sort</span>
                    </Button>

                </Tooltip>
            </section>

            <section className="mobile-filter">
                <div className="filter-wrapper">
                    <Button
                        kind="tertiary"
                        className='table-btn mobileBtn'
                        // wrapperClassName="table-btn mobileBtn"
                        leftIcon={Table}
                        rightIcon={DropdownChevronDown}
                    >
                        <span>Main Table</span>
                    </Button>
                    <Button
                        kind="tertiary"
                        className='filter-btn mobileBtn'
                        leftIcon={Filter}
                    >
                        <span>Filter</span>
                    </Button>
                </div>

                <IconButton
                    onBlur={() => toggleIsSearch()}
                    icon={MondaySearchIcon}
                    kind="tertiary"
                    wrapperClassName="search-btn mobileBtn"
                    size="medium">
                    <span style={{ marginLeft: "2px" }}></span>
                </IconButton >
            </section>
        </div >
    )
}