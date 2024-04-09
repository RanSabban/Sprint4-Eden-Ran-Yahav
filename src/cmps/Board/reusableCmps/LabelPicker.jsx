import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { onHideModalLabel } from "../../../store/actions/board.actions";

export function LabelPicker() {
    const modalProps = useSelector(storeState => storeState.boardModule.modalProps);
    const { target, clmType, cell, task, isOpen, callBackFunc } = modalProps;

    const pickerRef = useRef(null); 

    useEffect(() => {
        if (!isOpen || !target) return;

        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                onHideModalLabel();
            }
        };


        document.addEventListener('mousedown', handleClickOutside);


        const rect = target.getBoundingClientRect();
        const pickerStyle = document.querySelector(".label-picker-container").style;
        pickerStyle.position = 'absolute';
        pickerStyle.left = `${rect.left + window.scrollX}px`;
        pickerStyle.top = `${rect.bottom + window.scrollY}px`;

 
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, target]); 

    if (!target || !isOpen) return null;

    function onUpdateCell(labelId) {
        console.log(labelId);
        const cellToUpdate = cell;
        cell.dataId = labelId
        callBackFunc(cellToUpdate, task._id);
        onHideModalLabel();
    }

    const { data } = clmType;

    return (
        <div className="label-picker-container" ref={pickerRef} style={{position: 'absolute', left: '50%'}}>
            <div className="label-picker-content">
                <ul>
                    {data.map((label) => (
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