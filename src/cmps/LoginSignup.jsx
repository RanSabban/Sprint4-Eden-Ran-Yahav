import { useState, useEffect } from 'react'
import { login, signup } from '../store/actions/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { Link, useNavigate } from 'react-router-dom'
export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '', avatar: null })
    const [isSignup, setIsSignup] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState('https://res.cloudinary.com/dkvliixzt/image/upload/v1704358773/person-empty_zckbtr_wrffbw.svg')
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
                            <img src={avatarPreview} alt="Avatar Preview" className="avatar-image" style={{ cursor: 'pointer' }} />

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


                    <button type="submit">Sign Up</button>
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
