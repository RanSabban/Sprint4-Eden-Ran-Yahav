
export function ResizableColumn({ index, width, resizeColumn }) {
    
    const handleMouseDown = (e) => {
        const startX = e.clientX
        const startWidth = width

        const doDrag = (e) => {
            const newWidth = startWidth + e.clientX - startX
            resizeColumn(index, newWidth)
        }

        const stopDrag = () => {
            document.documentElement.removeEventListener('mousemove', doDrag, false)
            document.documentElement.removeEventListener('mouseup', stopDrag, false)
        }

        document.documentElement.addEventListener('mousemove', doDrag, false)
        document.documentElement.addEventListener('mouseup', stopDrag, false)
    }

    return (
        <div style={{ width: `${width}px`, padding: '10px', border: '1px solid black', position: 'relative' }}>
            {`Column ${index + 1}`}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '5px',
                    cursor: 'ew-resize',
                    backgroundColor: 'grey',
                }}
                onMouseDown={handleMouseDown}
            ></div>
        </div>
    )
}