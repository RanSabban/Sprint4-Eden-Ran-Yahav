import { useState } from "react"
import { LabelPicker } from "../reusableCmps/LabelPicker"

export function StatusCellComponent({ clmType, cell, onUpdateTask, onChange, cellToEdit, labels }) {
    const [isOpen, setIsOpen] = useState(false)
    // console.log(clmType, cell);
    const { data } = clmType

    

    function getCellTxt() {
        const item = data.find(item => item.id === cell.dataId)
        if (!item) return 'puki wrongico'
        const title = item.title || 'puki wrongico'
        return title
    }

    // const cellTxt = getCellTxt(cellToEdit)
    // console.log("cellTXT", cellTxt);

    // const currType = clmType.find(clmType._id === cell._id)
    // console.log("clmType", currType)
    // console.log("cell", cell);
    // console.log("clmType", clmType);

    function getCellColor() {
        const item = data.find(item => item.id === cell.dataId)
        if (!item) return 'red'
        const color = item.color
        return color
    }

    function toggleLabelPicker() {
        setIsOpen(!isOpen)
        console.log("isOpen", isOpen);
    }

    return (
        <>
            <div style={{ backgroundColor: getCellColor(), height: '2.25em', width: '100%' }} className="dyn-cell status">
                <span className="status-txt"
                    onClick={() => { onChange(cell); setIsOpen(!isOpen) }}
                >{getCellTxt()}</span>





            </div>
        </>
    )
}