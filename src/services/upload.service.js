export const uploadService = {
    uploadImg
  }
  
  async function uploadImg(ev) {
    const CLOUD_NAME = "dwutylewo"
    const UPLOAD_PRESET = "cp1nwnqb"
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
  
    try {
      const formData = new FormData()
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('file', ev.target.files[0])
  
      const res = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
      })
      
      // Log response status and text for debugging
      const resText = await res.text()
    //   console.log('Response Status:', res.status)
    //   console.log('Response Text:', resText)
  
      if (!res.ok) {
        throw new Error(`Upload failed with status ${res.status}: ${resText}`)
      }
  
      // Parse JSON response
      const imgUrl = JSON.parse(resText)
      return imgUrl
    } catch (err) {
      console.error('Failed to upload', err)
      throw err
    }
  }
  