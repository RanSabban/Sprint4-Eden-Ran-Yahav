import React, { useState, useEffect } from "react";
import { AddBtn, TextEditIcon } from "../../../services/svg.service";

export function EditableCell({ txt, onUpdateInput, placeholder }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(txt);

  // Sync external changes to txt with internal state
  useEffect(() => {
    setContent(txt);
  }, [txt]);

  const handleSpanClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = async () => {
    setIsEditing(false);
    if (content !== txt) {
      setContent(content); // Update local state immediately to reflect new content
      try {
        await onUpdateInput(content); // Send update to the server
      } catch (err) {
        console.error('Error updating content:', err);
        setContent(txt); // Revert to previous content on error
      }
    }
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const dynShadow = isEditing ? 'shadow-txt-cell' : '';

  return (
    <div className={`editable-container-cell ${dynShadow}`}>
      {!isEditing ? (
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
  );
}
