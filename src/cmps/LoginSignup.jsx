import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, signup } from '../store/actions/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { Link, useNavigate } from 'react-router-dom'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [isSignup, setIsSignup] = useState(false)
    const navigate = useNavigate()

    // useEffect(() => {
    //     console.log("Current credentials:", credentials)
    // }, [credentials])

    function handleChange(ev) {
        const { name, value } = ev.target
        setCredentials(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        console.log(`${isSignup ? "Signup" : "Login"} attempt with:`, credentials)

        if (!credentials.username || !credentials.password) {
            console.log("Required fields are empty")
            return
        }

        try {
            if (isSignup) {
                signup(credentials)
                showSuccessMsg('Signed up successfully')
                navigate('/board')
            } else {
                console.log('this is the credentials : ', credentials)
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
        setCredentials({ username: '', password: '' })
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    return (
        <div className="login-signup">
            {/* <button className="btn-link" onClick={toggleSignup}>
                {isSignup ? 'Already a member? Log In' : 'Need an account? Sign Up'}
            </button> */}
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
                    // required
                    />

                    <section className='work-email'>
                        <label>Work email</label>
                        <input className='work-email-input rect' type="email" required placeholder='name@company.com' />
                        {/* <Link to='/board'>
                        <button className='rect'>Continue</button>
                    </Link> */}
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
                </form>}

            {!isSignup &&
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
                    <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
                </form>}

            <div className="terms">
                <p>By proceeding, you agree to the</p>
                <div className='terms-links-wrapper'>
                    <a href="#">Terms of Service</a>
                    <p> and </p>
                    <a href="#">Privacy Policy</a>
                </div>
            </div>
            {isSignup && <p>Already have an account?  <span className='signup-option' style={{ color: '#1f76c2' }} onClick={() => setIsSignup(!isSignup)}>Login</span></p>}
            {!isSignup && <p>Don't have an account yet? <span className='signup-option' style={{ color: '#1f76c2' }} onClick={() => setIsSignup(!isSignup)}>Sign up</span></p>}

        </div>
    )
}
