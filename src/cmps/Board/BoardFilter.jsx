import { Avatar, Button, MenuItem, SearchComponent, SplitButton, SplitButtonMenu, Tooltip, TextField } from "monday-ui-react-core";
import { Filter, PersonRound,  Sort, Search } from "monday-ui-react-core/icons";
import { useEffect, useState } from "react";
import { addTask, updateFilterBy } from "../../store/actions/board.actions";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { boardService } from "../../services/board.service";
import { MondaySearchIcon } from "../../services/svg.service";

export function BoardFilter({ onAddGroup, boardId }) {

    const [isSearch, setIsSearch] = useState(false)
    const [filterByToUpdate, setFilterByToUpdate] = useState(boardService.getEmptyFilterBy)

    const dynSearchBtn = isSearch ? '' : 'searchBtn'

    useEffect(()=>{
        setIsSearch(false)
    },[])

    function toggleIsSearch() {
        setIsSearch(!isSearch)
    }

    async function onAddTask() {
        try {
            // console.log(groupId);
            await addTask('abc', boardId)
            showSuccessMsg('Task Added')
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
        updateFilterBy({title:value}, boardId)
       } catch (err) {

       }
    }

    return (
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


            <Tooltip content='Sort board by person' animationType="expand">
                <Button
                    className="icon"
                    leftIcon={PersonRound}
                    kind="tertiary"
                    size="small"
                    style={{ marginRight: "6px" }}
                >
                    <span>Person</span>
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
    )
}