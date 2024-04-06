export function StatusCellComponent({ ClmType, cell }) {

    // console.log(ClmType, cell);
    const { data } = ClmType[0]

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
        <span className="dyn-cell status" style={{backgroundColor: getCellColor(),height: '2.25em'}}>{getCellTxt()}</span>
    )
}