import { useSelector } from "react-redux"
import { socketService } from "../../services/socket.service"
import { automationService } from "../../services/automations.service"
import { Button } from "@mui/material"
import { useParams } from "react-router"


export function AutomationBoard() {
    const board = useSelector
        (storeState => storeState.boardModule.board)

    const { boardId } = useParams()

    function onRegisterAutomation() {
        const newRule = {
            id: new Date().getTime(),
            trigger: 'STATUS_CHANGE',
            action: 'MOVE_TO_GROUP',
            condition: { c111: 'l101' },
            taskId: 'c101',
            target: 'g101'
        }
        automationService.registerAutomation(newRule,boardId )
    }




    return (
        <section className="automations-container">
            <div className="automations-header">
                <h2 className="automations-logo">Automation Center</h2>
            </div>
            <div className="automations-main">
                <div className="automations-filter">

                </div>
                <div className="automations-actions">
                    <Button onClick={onRegisterAutomation}>Register Automation</Button>
                </div>

                <span className="automations-count">

                </span>
                <div className="automations-list">

                </div>
            </div>

        </section>
    )

}