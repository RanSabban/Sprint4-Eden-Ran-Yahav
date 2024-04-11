import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onHideModalLabel } from "../../../store/actions/board.actions";

export function LabelPicker() {
    const modalProps = useSelector(storeState => storeState.boardModule.modalProps);
    const { target, clmType, cell, task, isOpen, callBackFunc } = modalProps;
    const dispatch = useDispatch();

    const pickerRef = useRef(null);

    useEffect(() => {
        if (!isOpen || !target) return;

        const updatePosition = () => {
            const rect = target.getBoundingClientRect();
            const picker = pickerRef.current;
            if (!picker) return;

            // Force layout to calculate picker height
            picker.style.visibility = 'hidden';
            picker.style.display = 'block';
            const pickerHeight = picker.offsetHeight;

            // Calculate available space above and below target
            const spaceAbove = rect.top;
            const spaceBelow = window.innerHeight - rect.bottom;

            console.log(spaceAbove,spaceBelow);

            // Determine opening side based on available space and picker height
            let topPosition;
            if (spaceBelow > pickerHeight || spaceBelow > spaceAbove) {
                topPosition = rect.bottom + window.scrollY;
                if (topPosition + pickerHeight > window.innerHeight) {
                    topPosition = window.innerHeight - pickerHeight;
                }
            } else {
                topPosition = rect.top - pickerHeight + window.scrollY;
                if (topPosition < 0) {
                    topPosition = 0;
                }
            }

            // Apply calculated position
            picker.style.position = 'fixed';
            picker.style.left = `${rect.left + window.scrollX}px`;
            picker.style.top = `${topPosition}px`;

            // Restore visibility
            picker.style.visibility = 'visible';
        };

        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                dispatch(onHideModalLabel());
            }
        };

        const handleScroll = () => {
            const rect = target.getBoundingClientRect();
            const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;
            if (!isInViewport) {
                dispatch(onHideModalLabel());
            } else {
                updatePosition();
            }
        };

        updatePosition(); // Update position initially and on every scroll
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll, true);

        return () => { // Cleanup
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [isOpen, target, dispatch]);

    if (!isOpen || !target) return null;

    function onUpdateCell(labelId) {
        const cellToUpdate = { ...cell, dataId: labelId };
        callBackFunc(cellToUpdate, task._id);
        dispatch(onHideModalLabel());
    }

    return (
        <div className="label-picker-container" ref={pickerRef}>
            <div className="cell-target-indicator" style={{ 
                height: '20px', 
                width: '100%', 
                backgroundColor: '#f0f0f0', 
                textAlign: 'center', 
                lineHeight: '20px', 
                borderTopLeftRadius: '0.6em', 
                borderTopRightRadius: '0.6em' 
            }}>
                Targeted Cell Indicator
            </div>

            <div className="label-picker-content">
                <ul>
                    {clmType.data.map((label) => (
                        <li key={label.id} className="label" onClick={() => onUpdateCell(label.id)} style={{
                            backgroundColor: label.color,
                            width: '130px',
                            height: '35px'
                        }}>
                            <span className="label-txt">{label.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
