import { MenuDivider } from "monday-ui-react-core"
import { EditLabels } from "../services/svg.service"
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { addLabel, removeLabel, updateLabelColor, updateLabelTitle } from "../store/actions/board.actions"
import { useParams } from "react-router"
import { boardService } from "../services/board.service"
import { EditableLabelInput } from "./Board/reusableCmps/EditableLabelInput"
import { Delete } from "monday-ui-react-core/icons"


export function StatusCmp({ clmType, onClickStatus }) {

    const [currClmType, setCurrClmType] = useState(clmType)

    useEffect(() => {
        setCurrClmType(clmType)
    }, [clmType])

    const [isEditMode, setIsEditMode] = useState(false)
    // const [newTitle, setNewTitle] = useState('')
    const [isColorOpen, setIsColorOpen] = useState(false)
    const [colorPickerOpen, setColorPickerOpen] = useState('');
    const [focusedId, setFocusedId] = useState(null)

    const { boardId } = useParams()

    const handleFocus = (id) => {
        setFocusedId(id);
    }

    const handleBlur = () => {
        setFocusedId(null);  // Remove focus when input is blurred
    }

    function onToggleColorPicker(labelId) {
        if (colorPickerOpen) setColorPickerOpen('')
        else setColorPickerOpen(labelId)

    }

    async function onUpdateLabelColor(color, labelId, clmId) {
        try {
            const updatedBoard = await updateLabelColor(color, labelId, clmId, boardId)
            setCurrClmType(prevClmType => {
                const updatedColumn = updatedBoard.clmTypes.find(clm => clm._id === clmId);
                return updatedColumn || prevClmType
            })
        } catch (err) {
            console.log('cannot edit label color', err)
        }
    }

    async function onUpdateLabelTitle(labelId, newTitle) {
        try {
            const updatedBoard = await updateLabelTitle(currClmType._id, labelId, newTitle, boardId)
            setCurrClmType(prevClmType => {
                const updatedColumn = updatedBoard.clmTypes.find(clm => clm._id === currClmType._id);
                return updatedColumn || prevClmType
            })
        } catch (err) {
            console.log('cannot edit label title', err)
        }
    }

    function handleChange({ target }) {
        setNewTitle(target.value)
    }

    async function onAddLabel(clmId) {
        const label = boardService.getEmptyLabel()

        try {
            const updatedBoard = await addLabel(clmId, boardId, label);
            setCurrClmType(prevClmType => {
                const updatedColumn = updatedBoard.clmTypes.find(clm => clm._id === clmId)
                return updatedColumn || prevClmType
            })
        } catch (err) {
            console.log('cannot add label', err)
        }
    }

    async function onRemoveLabel(labelId) {
        try {
            const updatedBoard = await removeLabel(labelId, currClmType._id, boardId)
            setCurrClmType(prevClmType => {
                const updatedColumn = updatedBoard.clmTypes.find(clm => clm._id === currClmType._id)
                return updatedColumn || prevClmType
            })

        } catch (err) {
            console.log('cannot remove label', err)
        }
    }

    // console.log('mnmnmnmnm', clmType, onClickStatus)

    const colorsList = utilService.getColors()

    const toggleColorPicker = (labelId) => {
        setColorPickerOpen(labelId);
    };


    return (
        <>
            <div className="cell-target-indicator" style={{
                height: '20px',
                width: '100%',
                backgroundColor: 'white',
                textAlign: 'center',
                lineHeight: '20px',
                borderTopLeftRadius: '0.6em',
                borderTopRightRadius: '0.6em',
                flexDirection: 'column',
                placeItems: 'center',
            }}>

            </div>
            <div className="label-picker-content">
                {!isEditMode && (
                    <ul>
                        {currClmType.data.map((label) => (
                            <li key={label.id} className="label" onClick={() => onClickStatus(label.id)} style={{
                                backgroundColor: label.color,
                                width: '150px',
                                height: '35px'
                            }}>
                                <span className="label-txt">{label.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
                {isEditMode && (
                    <ul className="label-edit-container">
                        {currClmType.data.map((label) => (
                            <li key={label.id} className={`label-edit ${label.id === focusedId ? 'focus' : ''}`}>
                                <span className="color-picker-label-edit color" onClick={() => onToggleColorPicker(label.id)} style={{ backgroundColor: label.color }}>
                                    {colorPickerOpen === label.id ? (
                                        <div className="color-picker-container-label-edit">
                                            {
                                                colorsList.map((color, index) => (
                                                    <div className='color'
                                                        key={index}
                                                        onClick={(e) => {
                                                            e.stopPropagation() // Prevent click from bubbling to label span
                                                            onUpdateLabelColor(color, label.id, currClmType._id)
                                                        }}
                                                        style={{ backgroundColor: color }}
                                                    ></div>
                                                ))}
                                        </div>
                                    ) : ''}
                                </span>
                                <EditableLabelInput
                                    txt={label.title}
                                    labelId={label.id}
                                    onFocus={handleFocus}
                                    handleBlur={handleBlur}
                                    onUpdateLabelTitle={onUpdateLabelTitle}
                                    setFocusedId={setFocusedId}
                                />
                                <span className="remove-label-picker" onClick={() => onRemoveLabel(label.id)}>
                                    <Delete />
                                </span>
                            </li>
                        ))}
                        <div className="add-label-btn" onClick={() => onAddLabel(currClmType._id)}>
                            <span>+ New Label</span>
                        </div>
                    </ul>
                )}
            </div>

            <MenuDivider />
            <button onClick={() => setIsEditMode(!isEditMode)} style={{ color: '#323338', gap: '0.5em', marginBottom: '0.5em' }} className="btn flex align-center justify-center edit-btn">
                {!isEditMode && (<>
                    <EditLabels />
                    <p style={{ whiteSpace: 'nowrap' }}>Edit Labels</p>
                </>
                )}
                {isEditMode && (<>
                    <p style={{ whiteSpace: 'nowrap' }}>Apply</p>
                </>)

                }

            </button>

        </>
    )

}