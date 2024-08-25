import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, signup } from '../store/actions/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { Link, useNavigate } from 'react-router-dom'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '', avatar: null })
    const [isSignup, setIsSignup] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState(null)
    const navigate = useNavigate()

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    function handleFileChange(ev) {
        const file = ev.target.files[0]
        setCredentials(prev => ({ ...prev, avatar: file }))
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    async function handleSubmit(ev) {
        ev.preventDefault()

        if (!credentials.username || !credentials.password || (isSignup && !credentials.fullname)) {
            console.log("Required fields are empty")
            return
        }

        try {
            if (isSignup) {
                signup(credentials)
                showSuccessMsg('Signed up successfully')
                navigate('/board')
            } else {
                login(credentials)
                showSuccessMsg('Logged in successfully')
                navigate('/board')
            }
        } catch (err) {
            showErrorMsg(err.message)
            console.error(err)
        } finally {
            clearState()
        }
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', avatar: null })
        setAvatarPreview(null)
    }

    return (
        <div className="login-signup">
            {isSignup &&
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

                    <section className="avatar-upload">
                        <label htmlFor="avatar-upload" className="avatar-label">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar Preview" className="avatar-image" />
                            ) : (
                                <div className="avatar-placeholder">Upload Avatar</div>
                            )}
                        </label>
                        <input
                            type="file"
                            id="avatar-upload"
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </section>

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

                    <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
                </form>
            }

            {/* The rest of the form for login/signup toggling */}
        </div>
    )
}
