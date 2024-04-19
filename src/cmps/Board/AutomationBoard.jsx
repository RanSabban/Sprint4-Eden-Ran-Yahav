import { useSelector } from 'react-redux'
import { socketService } from '../../services/socket.service'
import { automationService } from '../../services/automations.service'
import { Button } from '@mui/material'
import { useParams } from 'react-router'
import { useState } from 'react'
import { DynamicDialogAutomation } from './reusableCmps/DynamicDialogAutomation'
import { StatusAutomation } from './StatusAutomation'

export function AutomationBoard({setIsAutomateOpen}) {
    const board = useSelector
        (storeState => storeState.boardModule.board)
    const [isSelected, setIsSelected] = useState(false)
    const { boardId } = useParams()
    function onRegisterAutomation(rule) {
        // const newRule = {
        //     id: new Date().getTime(),
        //     trigger: 'STATUS_CHANGE',
        //     action: 'MOVE_TO_GROUP',
        //     condition: { c111: 'l101' },
        //     // taskId: 'c101',
        //     target: 'g102'
        // }
        automationService.registerAutomation(rule, boardId)
    }

    function getStatusTypes() {
        const filteredClms = board.clmTypes.filter(clmType => (clmType.type === 'status'))
        return filteredClms
    }

    const filteredClmsStatus = getStatusTypes()
    return (
        <section className='automations-container'>
            <div className='automations-header'>
                <h2 className='automations-logo'>Automation Center</h2>
                <Button onClick={() => (setIsAutomateOpen(open => !open))}>Exit</Button>
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
                    <StatusAutomation filteredClmsStatus={filteredClmsStatus} onRegisterAutomation={onRegisterAutomation} groups={board.groups}/>
                </div>
            </div>
        </section>
    )
}