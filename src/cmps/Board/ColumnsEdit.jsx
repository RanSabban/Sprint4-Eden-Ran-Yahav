import { Add } from "monday-ui-react-core/icons";
import { useState } from "react";

export function ColumnsEdit({ clmTypes }) {

    const [isOpen, setIsOpen] = useState(false)
    getClmTypes()

    function getClmTypes() {
        const clmTypesToReturn = clmTypes.map((clmType) => ({ _id: clmType._id, type: clmType.type }))
        console.log(clmTypesToReturn);

    }

    return <section className="columns-edit-container" style={{ position: 'relative' }}>

        <Add onClick={() => setIsOpen(!isOpen)} />
        {isOpen && (
            <div className="columns-list-container" style={{ position: 'absolute' }}>
                <ul>
                    {clmTypes.map(clmType => (
                        <li key={clmType._id}>{clmType.type}</li>
                ))}
                </ul>
            </div>
        )}
    </section>
}