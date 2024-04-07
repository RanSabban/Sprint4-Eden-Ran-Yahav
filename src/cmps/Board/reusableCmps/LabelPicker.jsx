import { useSelector } from "react-redux";


export function LabelPicker({ labels }) {

    // const labels = data

    const dynLabels = 0
    console.log("labels", labels)
    // clmTypes: [
    //     {
    //         _id: "c111",
    //         type: "status",
    //         title: "Status",
    //         data: [
    //             {
    //                 id: "l102",
    //                 title: "Working on it",
    //                 color: "#fdab3d"
    //             },

    if (!labels) return null

    return (
        <div className="label-picker-container">
            {/* <div className="label-picker-dialog-container"> */}
                <div className="label-picker-content">
                    <ul>
                    { 
                        labels.map((label, idx) => {
                            return (
                                <li key={label.id} className="label" style={{ backgroundColor: label.color }}>
                                    {label.title}
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
            {/* </div> */}
        </div>
    )
}