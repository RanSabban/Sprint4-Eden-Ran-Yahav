import React, { useState } from "react";

export function EditableCmp({ txt, onUpdateInput }) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(txt);

  const handleSpanClick = () => {
    setContent('')
    setIsEditing(true);
  };

  const handleInputBlur = async () => {
    setIsEditing(false);
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
      {!isEditing ? (
        <span onClick={handleSpanClick} className="editable-title-cell-cmp-span" style={{paddingInlineStart: '10px',
        paddingBlockStart: '2px', paddingBlockEnd: '3px'}}>
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
          style={{paddingInlineStart: '10px', paddingBlockStart: '2px', paddingBlockEnd: '3px'}}
        />
      )}
    </div>
  );
}