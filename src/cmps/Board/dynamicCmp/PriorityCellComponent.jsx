import { useState } from "react"
import { LabelPicker } from "../reusableCmps/LabelPicker"
import { useEffect } from "react"

export function PriorityCellComponent({ clmType, cell, onChange, onClickLabel, setSelectedCell }) {


    const [isOpen, setIsOpen] = useState(false)
    const [status, setStatus] = useState({ color: '', title: '' })

    // console.log(clmType, cell)
    // const { data } = clmType

    useEffect(() => {
        const item = clmType.data.find(item => item.id === cell.dataId)
        if (item) {
            setStatus({ color: item.color, title: item.title })
        }
    }, [clmType, cell])

    return (
        <>
            <div style={{ backgroundColor: status.color, width: '100%', cursor: 'pointer' }} className="dyn-cell priority dyn-cell-flexy"
                onClick={(ev) => onClickLabel(ev.target, clmType, cell)}
            >
                <div className="label-fold">
                    <div class="half first-half"></div>
                    <div class="half second-half"></div>
                </div>
                {status.title}
            </div>
        </>
    )
}
