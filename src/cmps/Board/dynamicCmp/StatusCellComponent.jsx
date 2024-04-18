import { useRef, useState } from "react"
import { LabelPicker } from "../reusableCmps/LabelPicker"
import { useEffect } from "react"
import { utilService } from "../../../services/util.service"

export function StatusCellComponent({ clmType, cell, onChange, onClickLabel, isEditing, setIsEditing }) {
    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState({ color: '', title: '' })
    const [animation, setAnimation] = useState('')
    const animations = ['confetti', 'balloon', 'crazy_balls']
    const prevTitle = useRef('')

    useEffect(() => {
        if (!clmType) return
        setTimeout(() => isEditing = true, 500);  // Clear animation after it plays
        const item = clmType.data.find(item => item.id === cell.dataId)
        if (item) {
            setStatus({ color: item.color, title: item.title })
            if (item.title === 'Done' && prevTitle.current !== 'Done' && isEditing === false) {
                setAnimation(animations[utilService.getRandomIntInclusive(0, animations.length - 1)])
            } else {
                setAnimation('')
            }
        }
        prevTitle.current = item.title
    }, [isEditing])


    return (
        <>
            <div style={{ backgroundColor: status.color, width: '100%', cursor: 'pointer' }} className={`dyn-cell status dyn-cell-flexy ${animation ? animation : ''}`}
                onClick={(ev) => onClickLabel(ev.target, clmType, cell)}
            >
                <div className="label-fold">
                    <div className="half first-half"></div>
                    <div className="half second-half"></div>
                </div>
                {status.title}
            </div>
        </>
    )
}