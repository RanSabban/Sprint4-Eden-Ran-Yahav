import { utilService } from "../../../services/util.service"
import { updateGroup } from "../../../store/actions/board.actions";

export function ColorPicker({ group, onUpdateGroupData }) {
    const colorsList = utilService.getColors()

    return (
        <div className='color-picker-modal'>
            {colorsList.map((color, index) => (
                <div className='color'
                    key={index}
                    onClick={() => onUpdateGroupData(group, "groupColor", color)}
                    style={{ backgroundColor: color }}
                ></div>
            ))}
        </div>
    )
}