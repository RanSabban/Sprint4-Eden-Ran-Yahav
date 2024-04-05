import { TableHeader, TableHeaderCell, Table, TableBody, TableRow, TableCell, TableAvatar, Label } from "monday-ui-react-core";
import { TableContext } from "monday-ui-react-core/dist/types/components/Table/Table/Table";

export function TableS() {
    const [tableData, setTableData] = useState(emailTableData);
    const [sorting, setSorting] = useState({});
    const onSort = (columnId, sortState) => {
        setSorting({
            [columnId]: sortState
        });
        setTableData(sort(columnId, sortState, tableData));
    };
    return <Table columns={emailColumns}>
        <TableHeader>
            {emailColumns.map((headerCell, index) => <TableHeaderCell key={index} title={headerCell.title} icon={headerCell.icon} infoContent={headerCell.infoContent} onSortClicked={sortState => onSort(headerCell.id, sortState)} sortState={sorting[headerCell.id]} />)}
        </TableHeader>
        <TableBody>
            {tableData.map(rowItem => <TableRow key={rowItem.id}>
                <TableCell>{rowItem.sentOn}</TableCell>
                <TableCell>{rowItem.subject}</TableCell>
                <TableCell>
                    <TableAvatar text={rowItem.sentBy} />
                </TableCell>
                <TableCell>
                    <Label text={rowItem.status} isAnimationDisabled color="positive" />
                </TableCell>
                <TableCell>{rowItem.emailsSent}</TableCell>
            </TableRow>)}
        </TableBody>
    </Table>;
}