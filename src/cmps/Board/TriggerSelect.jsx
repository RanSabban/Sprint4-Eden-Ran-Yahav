import { useState } from "react"
import { PriorityAutomation } from "./PriorityAutomation"
import { StatusAutomation } from "./StatusAutomation"
import { DynamicDialogAutomation } from "./reusableCmps/DynamicDialogAutomation"

export function TriggerSelect({ clms, onRegisterAutomation, groups, setIsAddAutomation }) {

    const [selectedTrigger, setSelectedTrigger] = useState('')

    const data = [{
        id: 1, title: 'status changes to something'
    },
    {
        id: 2, title: 'priority changes to something'
    }]

    function getStatusTypes() {
        const filteredClms = clms.filter(clmType => (clmType.type === 'status'))
        return filteredClms
    }

    function getPriorityTypes() {
        const filteredClms = clms.filter(clmType => (clmType.type === 'priority'))
        return filteredClms
    }


    return (
        <section className="trigger-select">
            <div className="select-trigger-modal-container">
                {
                    !selectedTrigger && <DynamicDialogAutomation itemsToRender={data} callBack={setSelectedTrigger} placeHolder={'When this happens'} />

                }
                {selectedTrigger === 1 ? (
                    <StatusAutomation filteredClmsStatus={getStatusTypes()} groups={groups} onRegisterAutomation={onRegisterAutomation} setIsAddAutomation={setIsAddAutomation}  />
                ) : ''}
                {selectedTrigger === 2 ? (
                    <PriorityAutomation filteredClmsPriority={getPriorityTypes()} groups={groups} onRegisterAutomation={onRegisterAutomation} setIsAddAutomation={setIsAddAutomation}  />
                ) : ''}
            </div>
        </section>
    )
}