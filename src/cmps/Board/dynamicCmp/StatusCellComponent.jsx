export function StatusCellComponent({ clmType, cell }) {

    // console.log(clmType, cell);
    const { data } = clmType[0]

    function getCellTxt() {
        // console.log(data);
        const item = data.find(item => item.id === cell.dataId)
        if (!item) return 'puki wrongico'
        const title = item.title || 'puki wrongico'
        // console.log(title);
        return title


    }

    function getCellColor() {
        const item = data.find(item => item.id === cell.dataId)
        if (!item) return 'red'
        const color = item.color
        // console.log(color);
        return color
        
    }

    return (
        <div style={{backgroundColor: getCellColor(),height: '2.25em', width: '100%'}} className="dyn-cell status">
            <span className="status-txt">{getCellTxt()}</span>
        </div>
    )
}