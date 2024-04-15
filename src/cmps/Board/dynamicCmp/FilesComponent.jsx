import React, { useState } from 'react';

export function FilesComponent() {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image')) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = function (loadEvent) {
                setPreviewUrl(loadEvent.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFile(null);
            setPreviewUrl(null);
            alert('Please select an image file.');
        }
    };

    return (
        <div className="upload-container">
            <label htmlFor='file-input' className="dyn-cell files dyn-cell-flexy">file</label>
            <input type="file" id='file-input' style={{display: 'none'}} onChange={handleFileChange} />
            {/* {previewUrl && <img src={previewUrl} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }} />} */}
        </div>
    );
}
