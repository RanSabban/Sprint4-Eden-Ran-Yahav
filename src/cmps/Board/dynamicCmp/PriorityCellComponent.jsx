export function PriorityCellComponent({ClmType, cell}) {
    console.log(ClmType, cell);
    const { data } = ClmType[0]

    function getCellTxt() {
        // console.log(data);
        const item = data.find(item => item.id === cell.dataId)
        console.log(item,data);
        if (!item) return 'data prob?'
        const title = item.title
        console.log(title);
        return title
    }

    function getCellColor() {
        const item = data.find(item => item.id === cell.dataId)
        if (!item) return 'red'
        const color = item.color
        console.log(color);
        return color
        
    }

    return (
        <span className="dyn-cell priority" style={{backgroundColor: getCellColor()}}>{getCellTxt()}</span>
    )
}

