export function PriorityCellComponent({clmType, cell}) {
    // console.log(ClmType, cell);
    const { data } = clmType

    function getCellTxt() {
        // console.log(data);
        const item = data.find(item => item.id === cell.dataId)
        // console.log(item,data);
        if (!item) return 'data prob?'
        const title = item.title
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
        <div style={{backgroundColor: getCellColor(),height: '2.25em', width: '100%'}} className="dyn-cell priority">
        <span className="priority-txt">{getCellTxt()}</span>
    </div>    )
}

