import React, { useEffect, useRef, useState } from "react";

export function EditableCmp({ txt, onUpdateInput, placeholder }) {
  const [content, setContent] = useState(txt);
  const [isEditable, setIsEditable] = useState(false);
  const editableTitleRef = useRef(null);

  async function handleClick() {
    if (!isEditable) {
      setIsEditable(true);
      if (editableTitleRef.current) {
        editableTitleRef.current.contentEditable = "true";
        editableTitleRef.current.focus();
      }
    }
  }

  function handleKeyDown(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      ev.target.blur();
      setIsEditable(false);
      const newTxt = ev.target.innerText;
      if (newTxt !== txt) {
        try {
        onFinishRename(newTxt);
          setContent(newTxt);
        } catch (err) {
          console.error('Error:', err);
          setContent(txt); // Reset to initial text on error
        }
      }
    }
  }

  console.log(placeholder);

  async function onFinishRename(ev) {
    const newTitle = ev.target.innerText;
    if (!newTitle) return setIsEditable(false)
    if (newTitle !== txt) {
      try {
        await onUpdateInput(newTitle);
        // setContent(newTitle);
        // setContent(editableTitleRef)
      } catch (err) {
        console.error('Error:', err);
        setContent(txt); // Reset to initial text on error
      }
      finally {
        setContent('')
      }
    }
    setIsEditable(false);
  }

  return (
    <div className={`editable-container-cmp ${isEditable ? "is-editable" : ""}`}>
      <div className="editable-container-dyn-cmp flex">
        <div
          ref={editableTitleRef}
          contentEditable={isEditable}
          onClick={handleClick}
          onKeyDown={handleKeyDown} // Attach the event handler here
          onBlur={onFinishRename}
          className="editable-title-dyn-cmp"
          suppressContentEditableWarning={true}
          data-placeholder={placeholder || ''}
        >
          {isEditable ? content : placeholder}
        </div>
      </div>
    </div>
  );
}




// import React, { useEffect, useRef, useState } from "react";

// export function EditableCmp({ txt, onUpdateInput, placeholder }) {
//   const [content, setContent] = useState(txt);
//   const [isEditable, setIsEditable] = useState(false);
//   const editableTitleRef = useRef(null);

//   async function handleClick() {
//     if (!isEditable) {
//       setIsEditable(true);
//       if (editableTitleRef.current) {
//         editableTitleRef.current.contentEditable = "true";
//         editableTitleRef.current.focus();
//       }
//     }
//   }

//   useEffect(() => {
//     const handleOutsideClick = (ev) => {
//       if (editableTitleRef.current && !editableTitleRef.current.contains(ev.target)) {
//         setIsEditable(false);
//         if (content.trim() === "") {
//           setContent(txt); // Reset to initial text if empty
//         }
//       }
//     };

//     const handleKeyDown = (ev) => {
//       if (ev.key === 'Enter') {
//         ev.preventDefault();
//         ev.target.blur();
//         setIsEditable(false);
//         const newTxt = ev.target.innerText;
//         if (newTxt !== txt) {
//           try {
//             onUpdateInput(newTxt);
//             setContent(newTxt);
//           } catch (err) {
//             console.error('Error:', err);
//             setContent(txt); // Reset to initial text on error
//           }
//         }
//       }
//     };

//     document.addEventListener('mousedown', handleOutsideClick);
//     editableTitleRef.current && editableTitleRef.current.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//       editableTitleRef.current && editableTitleRef.current.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [txt, onUpdateInput]); // Removed isEditable from dependencies to avoid unnecessary re-renders

//   function onFinishRename(ev) {
//     const newTitle = ev.target.innerText;
//     if (newTitle !== txt) {
//       try {
//         onUpdateInput(newTitle);
//         setContent(newTitle);
//       } catch (err) {
//         console.error('Error:', err);
//         setContent(txt); // Reset to initial text on error
//       }
//     }
//     setIsEditable(false);
//   }

//   return (
//     <div className={`editable-container-cmp ${isEditable ? "is-editable" : ""}`}>
//       <div className="editable-container-dyn-cmp flex">
//         <div
//           ref={editableTitleRef}
//           contentEditable={isEditable}
//           onClick={handleClick}
//           className="editable-title-dyn-cmp"
//           onBlur={onFinishRename}
//           suppressContentEditableWarning={true}
//           data-placeholder={placeholder || ''}
//         >
//           {content || (isEditable ? '' : placeholder)}
//         </div>
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useRef, useState } from "react"


// export function EditableCmp({ txt, onUpdateInput }) {

//     const [initialTitle, setInitialTitle] = useState(txt)
//     const [isEditable, setIsEditable] = useState(false)
//     const [dynClass, setDynClass] = useState('')
//     const editableTitleRef = useRef(null)
//     // const [onClickTxt, setOnClickTxt] = useState(false)

//     async function handleClick() {

//         if (!isEditable) {
//             setInitialTitle(txt)
//             setIsEditable(true)

//             if (editableTitleRef.current) {
//                 setDynClass('flex-grow')
//                 editableTitleRef.current.contentEditable = "true"
//                 editableTitleRef.current.focus()
//             }
//         }

//     }

//     useEffect(() => {
//         const handleOutsideClick = (ev) => {
//             if (editableTitleRef.current && !editableTitleRef.current.contains(ev.target)) {
//                 setIsEditable(false)
//                 if (isEditable) {
//                     editableTitleRef.current.innerText = initialTitle
//                 }
//             }
//         }

//         const handleKeyDown = (ev) => {
//             if (ev.key === 'Enter') {
//                 ev.preventDefault()
//                 ev.target.blur()
//                 setIsEditable(false)
//                 const newTxt = ev.target.innerText
//                 if (newTxt !== initialTitle) {
//                     try {
//                         onUpdateInput(txt)
//                     } catch (err) {
//                         console.error('Error renaming board:', err)
//                         editableTitleRef.current.innerText = initialTitle
//                     }
//                 } else {
//                     editableTitleRef.current.innerText = initialTitle
//                 }
//             }
//         }

//         document.addEventListener('mousedown', handleOutsideClick)
//         editableTitleRef.current && editableTitleRef.current.addEventListener('keydown', handleKeyDown)
//         setInitialTitle(txt)

//         return () => {
//             document.removeEventListener('mousedown', handleOutsideClick)
//             editableTitleRef.current && editableTitleRef.current.removeEventListener('keydown', handleKeyDown)
//         }
//     }, [initialTitle, isEditable, txt])

//     console.log(isEditable);


//     function onRenameBoard(ev) {
//         const newTitle = ev.target.innerText
//         if (newTitle === txt) return
//         try {
//             onUpdateInput(txt)
//         } catch (err) {
//             console.error('Error renaming editablecmp:', err)
//         }
//         setIsEditable(false)
//     }

    
//     return (
//         <div className={`editable-container-cmp ${isEditable ? dynClass : ''}`} >

//             <div className="editable-container-dyn-cmp flex">
//                 <div
//                     ref={editableTitleRef}
//                     contentEditable={isEditable}
//                     onClick={handleClick}
//                     className="editable-title-dyn-cmp"
//                     onBlur={onRenameBoard}
//                     suppressContentEditableWarning={true}
//                     data-placeholder="Enter text here..."
//                 >

//                     {txt}
//                 </div>

//             </div>
//         </div>
//     )
// }