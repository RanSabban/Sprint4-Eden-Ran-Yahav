import React, { useState, useEffect } from "react"
import { AddBtn, TextEditIcon } from "../../../services/svg.service"

export function EditableCell({ txt, onUpdateInput, placeholder, isEditing, setIsEditing }) {
  const [isEditingTxt, setIsEditingTxt] = useState(false)
  const [content, setContent] = useState(txt)

  useEffect(() => {
    setContent(txt)
    if(isEditingTxt){
      setIsEditing(true)
    } else{
      setIsEditing(false)
    }

  }, [txt,isEditingTxt])

  const handleSpanClick = () => {
    setIsEditingTxt(true)
  }

  const handleInputBlur = async () => {
    setIsEditingTxt(false)
    
    if (content !== txt) {
      setContent(content) 
      try {
        await onUpdateInput(content)
      } catch (err) {
        console.error('Error updating content:', err)
        setContent(txt) 
      }
    }
  }

  const handleInputChange = (e) => {
    setContent(e.target.value)
  }

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur()
    }
  }

  const dynShadow = isEditingTxt ? 'shadow-txt-cell' : ''

  return (
    <div className={`editable-container-cell ${dynShadow}`}>
      {!isEditingTxt ? (
        <span onClick={handleSpanClick} className="editable-title-cell">
          {content || placeholder}
          {
            !txt && (
              <div className="empty-text-container">
                <AddBtn />
                <TextEditIcon />
              </div>
            )
          }
        </span>
      ) : (
        <input
          type="text"
          className="editable-title-dyn-cell-input"
          value={content}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          autoFocus
        />
      )}
    </div>
  )
}
