import { useSelector } from 'react-redux'
import { socketService } from '../../services/socket.service'
import { automationService } from '../../services/automations.service'
import { Button } from '@mui/material'
import { useParams } from 'react-router'
import { useState } from 'react'

export function AutomationBoard() {
    const board = useSelector
        (storeState => storeState.boardModule.board)
    const [isSelected, setIsSelected] = useState(false)
    const { boardId } = useParams()
    function onRegisterAutomation() {
        const newRule = {
            id: new Date().getTime(),
            trigger: 'STATUS_CHANGE',
            action: 'MOVE_TO_GROUP',
            condition: { c111: 'l101' },
            // taskId: 'c101',
            target: 'g102'
        }
        automationService.registerAutomation(newRule, boardId)
    }
    function getStatusTypes() {
        const filteredClms = board.clmTypes.filter(clmType => (clmType.type === 'status'))
        return filteredClms
    }
    function setClmStatus(ev) {
        console.log(ev.target.value);

    }
    const filteredClmsStatus = getStatusTypes()
    return (
        <section className='automations-container'>
            <div className='automations-header'>
                <h2 className='automations-logo'>Automation Center</h2>
            </div>
            <div className='automations-main'>
                <section className='automations-main-upper'>
                    <div className='automations-filter'>
                    </div>
                    <div className='automations-actions'>
                        <Button onClick={onRegisterAutomation}>Register Automation</Button>
                    </div>
                    <span className='automations-count'>
                    </span>
                </section>
                <div className='automations-list'>
                    <span>When</span>
                    <DynamicDialogAutomation filteredClmsStatus={filteredClmsStatus} callBack={setClmStatus}/>
                    <select name='status-picker' id='status-picker'>
                        {
                            filteredClmsStatus.map(clm => (
                                <option value={clm._id} key={clm._id} onClick={setClmStatus}>{clm.title}</option>
                            ))
                        }
                    </select>
                    <span>Changes To</span>
                    {isSelected && (
                        <select name='status-list-automation' id='status-list-automation'>
                        </select>
                    )
                    }
                </div>
            </div>
        </section>
    )
}