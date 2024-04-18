import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, signup } from '../store/actions/user.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function LoginSignup() {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [isSignup, setIsSignup] = useState(false)

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
            } else {
                login(credentials)
                showSuccessMsg('Logged in successfully')
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
            <button className="btn-link" onClick={toggleSignup}>
                {isSignup ? 'Already a member? Log In' : 'Need an account? Sign Up'}
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="fullname"
                    value={credentials.fullname}
                    placeholder="Israel Israeli"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
            </form>
        </div>
    )
}
