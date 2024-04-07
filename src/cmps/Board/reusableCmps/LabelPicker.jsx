import { useSelector } from "react-redux";


export function LabelPicker({data}) {

    const labels = data

    const dynLabels = 0
    console.log("labels", labels);
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

    return (
        <div className="label-picker-container" >
            <div className="label-picker-dialog-container">
                <div className="label-picker-content">

                    {
                        
                    }
                    <div className="label">

                    </div>
                </div>
            </div>
        </div>
    )
}