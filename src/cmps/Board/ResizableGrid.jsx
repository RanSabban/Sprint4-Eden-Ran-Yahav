import { useState } from "react"
import { ResizableColumn } from "./ResizableColumn"

export function ResizableGrid() {
    const [columnWidths, setColumnWidths] = useState([350, 200, 200, 200])

    const resizeColumn = (index, newWidth) => {
        setColumnWidths(currentWidths =>
            currentWidths.map((width, i) => (i === index ? newWidth : width))
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            {columnWidths.map((width, index) => (
                <ResizableColumn
                    key={index}
                    index={index}
                    width={width}
                    resizeColumn={resizeColumn}
                />
            ))}
        </div>
    )
}