import React, { useState, useEffect } from 'react';
import { uploadService } from '../../../services/upload.service';
import { AddBtn } from '../../../services/svg.service';

export function FilesComponent({ cell, onUpdateCell, taskId }) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(cell?.url || null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    // Effect to update preview if cell.url changes externally
    useEffect(() => {
        if (cell?.url) {
            setPreviewUrl(cell.url);
        }
    }, [cell?.url]);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image')) {
            setFile(file);
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                setPreviewUrl(loadEvent.target.result);  // Update preview to the new image
            };
            reader.readAsDataURL(file);

            // Start upload
            setUploading(true);
            setUploadSuccess(false);  // Reset success state for new upload
            try {
                const uploaded = await uploadService.uploadImg({ target: { files: [file] } });
                console.log('Upload successful:', uploaded);
                if (uploaded.url) {
                    console.log(cell);
                    const updatedCell = {...cell, url: uploaded.url}
                    onUpdateCell(updatedCell, taskId)
                    setUploadSuccess(true);
                }
            } catch (error) {
                console.error('Upload failed:', error);
                alert('Upload failed!');
            } finally {
                setUploading(false);
                setFile(null)
            }
        } else {
            setFile(null);
            setPreviewUrl(null);
            alert('Please select an image file.');
        }
    };

    const inputId = `file-input-${taskId || 'default'}`; // Unique ID for each input

    return (
        <div className="upload-container dyn-cell files dyn-cell-flexy">
            <label htmlFor={inputId} className="file-input-label">
                {/* {uploadSuccess ? 'Replace Image' : 'Upload Image'} */}
            </label>
            <input type="file" id={inputId} style={{ display: 'none' }} onChange={handleFileChange} />
            {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '20px', height: '20px' }} />}
            {!previewUrl &&
                <section className="empty-file-icons-container">
                    <AddBtn />
                    <img className="empty-file-icon" style={{ maxWidth: '20px', height: '20px' }} src="https://cdn.monday.com/images/file-types/empty.svg" alt="No File" />
                </section>}
        </div>
    );
}




// import React, { useState } from 'react';

// export function FilesComponent() {
//     const [file, setFile] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState(null);

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file && file.type.startsWith('image')) {
//             setFile(file);
//             const reader = new FileReader();
//             reader.onload = function (loadEvent) {
//                 setPreviewUrl(loadEvent.target.result);
//             };
//             reader.readAsDataURL(file);
//         } else {
//             setFile(null);
//             setPreviewUrl(null);
//             alert('Please select an image file.');
//         }
//     };

//     return (
//         <div className="upload-container">
//             <label htmlFor='file-input' className="dyn-cell files dyn-cell-flexy">file</label>
//             <input type="file" id='file-input' style={{display: 'none'}} onChange={handleFileChange} />
//             {/* {previewUrl && <img src={previewUrl} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%', height: 'auto' }} />} */}
//         </div>
//     );
// }
