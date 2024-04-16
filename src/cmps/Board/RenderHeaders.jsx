import { Menu, MenuButton, MenuItem } from 'monday-ui-react-core';
import { ColumnsEdit } from './ColumnsEdit';
import { Delete } from 'monday-ui-react-core/icons';
import { removeColumn, updateClmTitle } from '../../store/actions/board.actions';
import { useParams } from 'react-router';
import { EditableHeaderTitle } from './reusableCmps/EditableHeaderTitle';
import { useState } from 'react';

export function RenderHeaders({ clmTypes, isCollapsed }) {

    const [isEditMode, setIsEditMode] = useState(false)

    const { boardId } = useParams()

    function onRemoveColumn(clmTypeId) {
        try {
            removeColumn(clmTypeId, boardId)
        } catch (err) {
            console.log('cannot add column', err);
        }
    }

    function onUpdateClmTitle(txt,clmId) {
        try {
            updateClmTitle(txt,clmId,boardId)
        } catch (err) {
            console.log('cannot edit clm title', err)
        }
    }


    return (
        <>
            {isCollapsed ? (
                clmTypes.map((clmType, idx) => {
                    // console.log(clmType);
                    if (clmType.type !== "files" &&
                        clmType.type !== "members" &&
                        clmType.type !== "txt" &&
                        clmType.type !== "files" &&
                        clmType.type !== "updates" &&
                        clmType.type !== "timelines") {
                        return <span className='dyn-cell header-item' style={{ fontSize: '14px' }} key={idx}>{clmType.title}</span>
                    }
                    return null
                })
            ) : (
                <>
                    {clmTypes.map((clmType, idx) => (
                        <span className='dyn-cell header-item' style={{ fontSize: '14px' }} key={idx}>
                            <EditableHeaderTitle txt={clmType.title} setIsEditMode={setIsEditMode} onUpdateInput={onUpdateClmTitle} clmId={clmType._id} />
                            {!isEditMode &&
                                <div className="column-actions">
                                    <MenuButton size='XS' >
                                        <Menu id={`menu-${clmType._id}`} size={Menu.sizes.SMALL} style={{ zIndex: '999999' }}>
                                            <MenuItem icon={Delete} title="Delete" onClick={() => onRemoveColumn(clmType._id)} />
                                        </Menu>
                                    </MenuButton>
                                </div>
                            }
                        </span>
                    ))}
                    <div className='dyn-cell infinity add-column'>

                        <ColumnsEdit clmTypes={clmTypes} />

                    </div>
                </>
            )}
        </>
    );
}
