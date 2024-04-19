import { useState } from "react";
import { DynamicDialogAutomation } from "./reusableCmps/DynamicDialogAutomation";
import { addColumn } from "../../store/actions/board.actions";

export function StatusAutomation({ filteredClmsStatus, groups , onRegisterAutomation}) {

    const [selectedClm, setSelectedClm] = useState('')
    const [selectedLabel, setSelectedLabel] = useState('')
    const [isSelected, setIsSelected] = useState(false)
    // const [selectedClmData, setSelectedClmData] = useState([])

    function setClmStatus(clmId) {
        setSelectedClm(getClmData(clmId))
        setIsSelected(true)
    }

    function getClmData(clmId) {
        const clm = filteredClmsStatus.find(clm => clm._id === clmId)
        return clm
    }

    function onSelectLabel(labelId){
        setSelectedLabel(labelId)
    }

    function onSelectGroup(groupId) {
        console.log(selectedClm);
        const newRule = {
            id: new Date().getTime(),
            trigger: 'STATUS_CHANGE',
            action: 'MOVE_TO_GROUP',
            condition: { [selectedClm._id]: selectedLabel },
            // taskId: 'c101',
            target: groupId
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
            <span className="when-automation-span">When</span>
            <DynamicDialogAutomation itemsToRender={filteredClmsStatus} callBack={setClmStatus} placeHolder={'status'} addFunc={onAddColumn} type={'status'} />
            
            <span>changes to</span>
            {isSelected && (
            <DynamicDialogAutomation itemsToRender={selectedClm.data} callBack={onSelectLabel} placeHolder={'Label'}/>
            )
            }
            <span className="move-automation-span">Move Item To Group</span>
            {selectedLabel && (
                <DynamicDialogAutomation itemsToRender={groups} callBack={onSelectGroup} placeHolder={'Group'}/>
            )}
        </div>
    )
}