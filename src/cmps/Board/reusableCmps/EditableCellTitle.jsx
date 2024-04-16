import React, { useState } from "react";

export function EditableCellTitle({ txt, onUpdateInput, isEditing, setIsEditing }) {
  const [isEditingTxt, setIsEditingTxt] = useState(false);
  const [content, setContent] = useState(txt);

  const handleSpanClick = () => {
    setIsEditingTxt(true)
    setIsEditing(true);
  };

  const handleInputBlur = async () => {
    setIsEditing(false)
    setIsEditingTxt(false)

    if (content)
      try {
        await onUpdateInput(content);
      } catch (err) {
        console.error('Error updating content:', err);
      }
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(); // This triggers handleInputBlur
    }
  };

  return (
    <div className="editable-container-title-cell">
      {!isEditingTxt ? (
        <span onClick={handleSpanClick} className="editable-title-cell-cmp-span">
          {content}
        </span>
      ) : (
        <input
          type="text"
          className="editable-title-cell-input"
          value={content}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          autoFocus
        />
      )}
    </div>
  );
}