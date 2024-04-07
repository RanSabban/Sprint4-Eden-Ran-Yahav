import { useState } from "react"

export function StatusCellComponent({ clmType, cell }) {

    const [isOpen, setIsOpen] = useState(false)
    // console.log(clmType, cell);
    const { data } = clmType

    function getCellTxt() {
        const item = data.find(item => item.id === cell.dataId)
        if (!item) return 'puki wrongico'
        const title = item.title || 'puki wrongico'
        return title
    }

    function getCellColor() {
        const item = data.find(item => item.id === cell.dataId)
        if (!item) return 'red'
        const color = item.color
        // console.log(color);
        return color
    }

    function openLabelPicker() {
        setIsOpen(!isOpen)
        console.log("isOpen", isOpen);
    }

    return (
        <div style={{ backgroundColor: getCellColor(), height: '2.25em', width: '100%' }} className="dyn-cell status">
            <span className="status-txt"
                onClick={openLabelPicker}
            >{getCellTxt()}</span>
            <div className="label-picker"></div>
        </div>
    )
}