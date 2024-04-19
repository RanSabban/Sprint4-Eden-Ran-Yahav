import { Lines } from "monday-ui-react-core/icons";
import { useState } from "react";

export function DynamicDialogAutomation({ itemsToRender, callBack, placeHolder, addFunc, type }) {

    const [isOpen, setIsOpen] = useState(false)

    console.log(itemsToRender);



    const isActiveClass = isOpen ? 'active' : ''


    return (
        <span className={`dynamic-dialog-automation-placeholder ${isActiveClass}`} onClick={() => setIsOpen(open => !open)}>{placeHolder}
            
                {isOpen && (<div className="dynamic-dialog-automation-container"> 
                {
                    itemsToRender.map(item => {
                        if (item._id) {
                            return (
                                <div value={item._id} key={item._id} onClick={() => callBack(item._id)} className="list-item-dialog-automation">
                                    <span>
                                    <Lines />
                                    </span>
                                    <span>
                                        {item.title}
                                    </span>
                                </div>
                            )
                        } else {
                            return (
                                <div value={item.id} key={item.id} onClick={() => callBack(item.id)} className="list-item-dialog-automation">
                                    <span>
                                        {item.title}
                                    </span>
                                </div>
                            )
                        }
                    }
                    )}
                    {addFunc ? <span className="add-listed-automation" onClick={() => addFunc(type)}>+ Add {type}</span> : ''}
                    </div>)
                }
            
        </span>)


}