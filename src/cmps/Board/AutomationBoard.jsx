import { useSelector } from 'react-redux'
import { socketService } from '../../services/socket.service'
import { automationService } from '../../services/automations.service'
import { Button } from '@mui/material'
import { useParams } from 'react-router'
import { useState } from 'react'
import { DynamicDialogAutomation } from './reusableCmps/DynamicDialogAutomation'
import { StatusAutomation } from './StatusAutomation'
import { ActiveAutomationsList } from './ActiveAutomationsList'
import { Close, NavigationChevronLeft } from 'monday-ui-react-core/icons'
import { TriggerSelect } from './TriggerSelect'

export function AutomationBoard({ setIsAutomateOpen }) {
    const board = useSelector
        (storeState => storeState.boardModule.board)
    const [isAddAutomation, setIsAddAutomation] = useState(false)
    const { boardId } = useParams()

    function onRegisterAutomation(rule) {
        rule.active = true
        automationService.registerAutomation(rule, boardId)
    }

    function getStatusTypes() {
        const filteredClms = board.clmTypes.filter(clmType => (clmType.type === 'status'))
        return filteredClms
    }

    function getActiveAutomationsLength() {
        if (!board.automations) {
            return 'No active automations yet on this board'
        }
        const activeAutomations = board.automations.filter(automation => automation.active)
        if (!activeAutomations.length) {
            return 'No active automations yet on this board'
        }
        if (activeAutomations.length === 1) {
            return '1 active automation on this board'
        }
        if (activeAutomations.length > 1) {
            return `${activeAutomations.length} active automations on this board`
        }
    }

    const filteredClmsStatus = getStatusTypes()
    return (
        <section className='automations-container'>
            <div className='automations-header'>
                {!isAddAutomation && (
                    <h2 className='automations-logo'>Automation Center</h2>
                )}
                {isAddAutomation && (
                    <div className='close-add-automations' onClick={() => setIsAddAutomation(!isAddAutomation)}>
                        <NavigationChevronLeft />
                        <span>Back to board automations</span>
                    </div>
                )}
                <div className='close-automations' onClick={() => (setIsAutomateOpen(open => !open))}>
                    <Close />
                </div>
            </div>
            <div className='automations-main'>
                {!isAddAutomation && (
                    <>
                        <section className='automations-main-upper'>
                            <div className='automations-filter'>
                            </div>
                            <div className='automations-actions'>
                                <div className='create-automation-btn' onClick={() => setIsAddAutomation(!isAddAutomation)}>
                                    + Add Automation
                                </div>
                            </div>
                            <span className='automations-count'>
                                {getActiveAutomationsLength()}
                            </span>
                        </section>

                        {!board.automations || !board.automations.length && (
                            <section className="no-automations-container">
                                <img src="https://res.cloudinary.com/dwutylewo/image/upload/v1713617557/Group_201261155364_xnoqke.png" className='no-automations-img' />
                                <p className='no-automations-first-p'>
                                    No active automations yet on this board 
                                </p>
                                <p className='no-automations-sec-p'>
                                    Save time and reduce manual work by adding automations
                                </p>
                            </section>
                        )}
                        <div className='automations-list'>
                            <ActiveAutomationsList automations={board.automations} clms={board.clmTypes} groups={board.groups} boardId={boardId} />
                        </div>

                    </>)}
                {
                    isAddAutomation && (
                        <TriggerSelect groups={board.groups} clms={board.clmTypes} onRegisterAutomation={onRegisterAutomation} setIsAddAutomation={setIsAddAutomation} />
                        // <section className="add-automations">
                        //     <StatusAutomation filteredClmsStatus={filteredClmsStatus} onRegisterAutomation={onRegisterAutomation} groups={board.groups} setIsAddAutomation={setIsAddAutomation} />
                        // </section>
                    )
                }

            </div>

        </section>
    )
}