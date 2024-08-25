import axios from 'axios'
import { useState } from 'react'
import { login, signup } from '../store/actions/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { useNavigate } from 'react-router-dom'
import { uploadService } from '../services/upload.service'
import Compressor from 'compressorjs'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '', imgUrl: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [file, setFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg')
    const [uploading, setUploading] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const navigate = useNavigate()

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file && file.type.startsWith('image')) {
            if (file.size > MAX_FILE_SIZE) {
                showErrorMsg('File size exceeds the maximum limit of 5 MB.')
                return
            }
    
            new Compressor(file, {
                quality: 0.6,
                success(result) {
                    setFile(result)
                    const reader = new FileReader()
                    reader.onload = (loadEvent) => {
                        setPreviewUrl(loadEvent.target.result)
                        setCredentials(prev => ({ ...prev, imgUrl: loadEvent.target.result })) // Set base64 URL for preview
                    }
                    reader.readAsDataURL(result)
                },
                error(err) {
                    console.error('Compression error:', err)
                }
            })
        } else {
            setFile(null)
            setPreviewUrl('https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg')
            showErrorMsg('Please select a valid image file.')
        }
    }

    async function handleSubmit(ev) {
    ev.preventDefault()

    if (!credentials.username || !credentials.password || (isSignup && !credentials.fullname)) {
        showErrorMsg("Required fields are empty")
        return
    }

    try {
        let finalCredentials = { ...credentials }
        if (file) {
            // Upload image to Cloudinary
            setUploading(true)
            setUploadSuccess(false)
            const uploaded = await uploadService.uploadImg({ target: { files: [file] } })
            console.log('Upload successful:', uploaded)
            if (uploaded.secure_url) {
                finalCredentials.imgUrl = uploaded.secure_url // Set secure URL for submission
                setPreviewUrl(uploaded.secure_url)
                setUploadSuccess(true)
            } else {
                showErrorMsg('Image upload failed. Please try again.')
                return
            }
        }

        console.log('Final credentials:', finalCredentials) // Verify that imgUrl is correct
        // Proceed with signup or login
        if (isSignup) {
            try {
                await signup(finalCredentials)
                showSuccessMsg('Signed up successfully')
                navigate('/board')
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error === 'Username taken') {
                    showErrorMsg('Username is already taken. Please choose a different username.')
                } else {
                    showErrorMsg('An error occurred. Please try again.')
                }
                console.error(error)
            }
        } else {
            await login(finalCredentials)
            showSuccessMsg('Logged in successfully')
            navigate('/board')
        }
    } catch (err) {
        showErrorMsg(err.message)
        console.error(err)
    } finally {
        setUploading(false)
        clearState()
    }
}


    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setPreviewUrl('https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg')
        setFile(null)
    }

    return (
        <div className="login-signup">
            {isSignup ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor='fullname'>Full Name</label>
                    <input
                        className='input-login'
                        type="text"
                        name="fullname"
                        id='fullname'
                        value={credentials.fullname}
                        placeholder="Israel Israeli"
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor='username'>Username</label>
                    <input
                        className='input-login'
                        type="text"
                        name="username"
                        id='username'
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        className='input-login'
                        type="password"
                        name="password"
                        id='password'
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <section className="avatar-upload" style={{ cursor: 'pointer' }}>
                        <label htmlFor="avatar-upload" className="avatar-label" style={{ cursor: 'pointer' }}>
                            <img src={previewUrl} alt="Avatar Preview" className="avatar-image" style={{ cursor: 'pointer' }} />
                            <div className="avatar-placeholder" style={{ cursor: 'pointer' }}>Upload Avatar</div>
                        </label>
                        <input
                            type="file"
                            id="avatar-upload"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </section>

                    <button type="submit" disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Sign Up'}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username</label>
                    <input
                        className='input-login'
                        type="text"
                        name="username"
                        id='username'
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor='password'>Password</label>
                    <input
                        className='input-login'
                        type="password"
                        name="password"
                        id='password'
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Log In</button>
                </form>
            )}

            <div className="terms">
                <p>By proceeding, you agree to the</p>
                <div className='terms-links-wrapper'>
                    <a href="#">Terms of Service</a>
                    <p> and </p>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
            {isSignup ? (
                <p>Already have an account? <span className='signup-option' style={{ color: '#1f76c2' }} onClick={() => setIsSignup(false)}>Login</span></p>
            ) : (
                <p>Don't have an account yet? <span className='signup-option' style={{ color: '#1f76c2' }} onClick={() => setIsSignup(true)}>Sign up</span></p>
            )}
        </div>
    )
}
