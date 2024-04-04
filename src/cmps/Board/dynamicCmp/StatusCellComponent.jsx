export function StatusCellComponent({ ClmType, cell }) {

    console.log(ClmType, cell);

    function getCellTxt() {
        const { data } = ClmType[0]
        // console.log(data);
        const item = data.find(item => item.id === cell.dataId)
        if (!item) return 'puki wrongico'
        const title = item.title || 'puki wrongico'
        console.log(title);
        return title


    }

    return (
        <span className="status-cell">{getCellTxt()}</span>
    )
}