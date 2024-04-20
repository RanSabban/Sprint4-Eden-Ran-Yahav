import { useState } from "react";
import { DynamicDialogAutomation } from "./reusableCmps/DynamicDialogAutomation";
import { addColumn } from "../../store/actions/board.actions";
import { MoveArrowDown } from "monday-ui-react-core/icons";
import { useParams } from "react-router";

export function StatusAutomation({ filteredClmsStatus, groups, onRegisterAutomation }) {

    const [selectedClm, setSelectedClm] = useState('')
    const [selectedLabel, setSelectedLabel] = useState('')
    const [isSelected, setIsSelected] = useState(false)
    const [selectedGroup, setSelctedGroup] = useState('')
    // const [selectedClmData, setSelectedClmData] = useState([])

    const { boardId } = useParams()

    function setClmStatus(clmId) {
        setSelectedClm(getClmData(clmId))
        setIsSelected(true)
    }

    function getClmData(clmId) {
        const clm = filteredClmsStatus.find(clm => clm._id === clmId)
        return clm
    }

    function onSelectLabel(labelId) {
        setSelectedLabel(labelId)
    }

    function onSelectGroup(groupId) {
        setSelctedGroup(groupId)
    }

    function onCreateAutomation() {
        const newRule = {
            id: new Date().getTime(),
            trigger: 'STATUS_CHANGE',
            action: 'MOVE_TO_GROUP',
            condition: { [selectedClm._id]: selectedLabel },
            // taskId: 'c101',
            target: selectedGroup
        }
        onRegisterAutomation(newRule)
    }

    async function onAddColumn(type) {
        try {
            addColumn(type, boardId)
            // setIsOpen(false)
        } catch (err) {
            console.log('cannot add column', err);
        }
    }


    return (
        <div className="status-automation-container">
            <div className="trigger-container-automation">
                <span className="when-automation-span">When</span>
                <DynamicDialogAutomation itemsToRender={filteredClmsStatus} callBack={setClmStatus} placeHolder={'status'} addFunc={onAddColumn} type={'status'} />

                <span>changes to</span>
                {isSelected && (
                    <DynamicDialogAutomation itemsToRender={selectedClm.data} callBack={onSelectLabel} placeHolder={'Label'} />
                )
                }
            </div>
            <span className="arrow-down-automation">
                <MoveArrowDown />
            </span>
            <div className="action-container-automation">
                <span className="move-automation-span">Move Item To</span>
                {selectedLabel && (
                    <DynamicDialogAutomation itemsToRender={groups} callBack={onSelectGroup} placeHolder={'Group'} />
                )}
            </div>

            <div className="create-automation-btn">
                    <div onClick={onCreateAutomation}>Create automation</div>
            </div>
        </div>
    )
}