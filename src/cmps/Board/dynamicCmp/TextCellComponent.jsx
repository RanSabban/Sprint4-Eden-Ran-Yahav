export function TextCellComponent({clmType,cell}) {
    console.log(clmType,cell);

    return <span>{cell.txt}</span>
}