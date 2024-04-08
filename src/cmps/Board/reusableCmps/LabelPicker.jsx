import { useSelector } from "react-redux";


export function LabelPicker() {

    const modalProps = useSelector(storeState => storeState.boardModule.modalProps)

    // const rect = ev.currentTarget.getBoundingClientRect()

    // console.log(rect);

    const {ev, clmType, cell, isModalLabelOpen, task} = modalProps

    console.log(ev, clmType, cell, isModalLabelOpen, task);


    if (!clmType) return ''

    const { data } = clmType


    // if (!labels) return null

    return (
        modalProps.isModalLabelOpen ? (
            <div className="label-picker-container" style={{}}>
                <div className="label-picker-content">
                    <ul>
                        {data.map((label, idx) => (
                            <li key={label.id} className="label" style={{
                                backgroundColor: label.color,
                                width: '150px',
                                height: '35px'
                            }}>
                                <span className="label-txt">{label.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        ) : (<div></div>))
}
