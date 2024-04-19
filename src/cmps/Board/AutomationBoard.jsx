import { useSelector } from 'react-redux'
import { socketService } from '../../services/socket.service'
import { automationService } from '../../services/automations.service'
import { Button } from '@mui/material'
import { useParams } from 'react-router'
import { useState } from 'react'
import { DynamicDialogAutomation } from './reusableCmps/DynamicDialogAutomation'
import { StatusAutomation } from './StatusAutomation'
import { ActiveAutomationsList } from './ActiveAutomationsList'

export function AutomationBoard({ setIsAutomateOpen }) {
    const board = useSelector
        (storeState => storeState.boardModule.board)
    const [isSelected, setIsSelected] = useState(false)
    const { boardId } = useParams()
    function onRegisterAutomation(rule) {
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

                    </div>
                    <span className='automations-count'>
                    </span>
                </section>
                <div className='automations-list'>
                    <section className="add-automations">
                        <StatusAutomation filteredClmsStatus={filteredClmsStatus} onRegisterAutomation={onRegisterAutomation} groups={board.groups} />
                    </section>
              
                        <ActiveAutomationsList automations={board.automations} clms={board.clmTypes} groups={board.groups} boardId={boardId} />
               
                </div>
            </div>
        </section>
    )
}