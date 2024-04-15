import React, { useState } from "react";

export function EditableCmp({ txt, onUpdateInput, placeholder }) {
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
    finally {
        setContent(placeholder)
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
    <div className="editable-container-cmp dyn cell txt">
      {!isEditing ? (
        <span onClick={handleSpanClick} className="editable-title-dyn-cmp" style={{paddingInlineStart: '10px',
        paddingBlockStart: '2px', paddingBlockEnd: '3px'}}>
          {content || placeholder}
        </span>
      ) : (
        <input
          type="text"
          className="editable-title-dyn-cmp-input"
          value={content}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          autoFocus
          style={{paddingInlineStart: '10px', paddingBlockStart: '2px', paddingBlockEnd: '3px'}}
        />
      )}
    </div>
  );
}