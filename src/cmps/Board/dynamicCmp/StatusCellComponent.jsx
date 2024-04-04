export function StatusCellComponent({ clmTypesFiltered, cell }) {

    console.log(clmTypesFiltered, cell);

    function getCellTxt() {
        const clmType = clmTypesFiltered.find(clmType => clmType._id === cell._id)
        if (!clmType) return
        const { data } = clmType
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