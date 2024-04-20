import { Delete, MoveArrowRight, Status } from "monday-ui-react-core/icons"
import { automationService } from "../../services/automations.service"
import { Toggle } from "monday-ui-react-core"


export function ActiveAutomationsList({ automations, groups, clms, boardId }) {

    async function onRemoveAutomation(automationId) {
        try {
            await automationService.removeAutomation(automationId, boardId)
        } catch (err) {
            console.log('cannot remove automation', err)
        }
    }

    async function onToggleAutomation(automationId) {
        try {
            await automationService.toggleAutomationActive(automationId, boardId)
        } catch (err) {
            console.log('cannot toggle automation', err)
        }
    }

    function getAutomationTrigger(automation) {
        if (automation.trigger === 'STATUS_CHANGE') return 'change'
    }

    function getAutomationAction(automation) {
        if (automation.action === 'MOVE_TO_GROUP') return 'move item to '
    }

    function getAutomationCondition(automation) {
        // const key = Object.keys(automation.condition)[0];
        // return `${key}: ${automation.condition[key]}`;
        if (automation.trigger === 'STATUS_CHANGE') {
            const { condition } = automation
            const columnId = Object.keys(condition)[0]
            const labelId = condition[columnId]
            const column = clms.find(clm => clm._id === columnId)
            if (!column) return ''
            const label = column.data.find(label => label.id === labelId)
            return `${column.title} changes to ${label.title}`
        }
    }

    function getAutomationDestiny(automation) {
        if (automation.action === 'MOVE_TO_GROUP') {
            const group = groups.find(g => g._id === automation.target)
            return group.title
        }
    }


    return (
        <section className="active-automations-container">
            {automations.map(automation => (
                <div key={automation.id} className="automation-item">
                    <div className="automations-icons-list-container">
                        <Status />
                        <MoveArrowRight />
                    </div>
                    <div className="automation-details">
                        <span>When</span>
                        <span>{getAutomationCondition(automation)}</span>
                        <span>{getAutomationAction(automation)}</span>
                        <span>{getAutomationDestiny(automation)}</span>
                    </div>
                    <div className="automation-list-actions">
                        <Toggle isSelected={automation.active} onChange={() => onToggleAutomation(automation.id)} />
                        <div className="remove-automation-icon" onClick={() => onRemoveAutomation(automation.id)} >
                            <Delete/>
                        </div>
                    </div>
                </div>
            ))}

        </section>
    )
}