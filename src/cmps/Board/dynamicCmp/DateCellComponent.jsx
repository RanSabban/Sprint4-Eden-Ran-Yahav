import dayjs from "dayjs";

export function DateCellComponent({clmType,cell}) {
    // console.log(cell);
    function getCellDate(){
        const date = dayjs(cell.date).format('DD MMM');
        return date
    }

    return (
        <span className="dyn-cell date">{getCellDate()}</span>
    )
}