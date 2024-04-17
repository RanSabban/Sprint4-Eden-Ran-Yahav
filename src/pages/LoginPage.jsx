import { Link, NavLink } from 'react-router-dom';
import loginImage from '../../src/assets/img/login.png';
import { LoginSignup } from '../cmps/LoginSignup';

export function LoginPage() {
    return (
        <section className="login-page">
            <div className='login-signup-container'>
                <section className='login-signup'>
                    <article>
                        <h1>Welcome to oneday.com</h1>
                        <p>Get started - it's free. No credit card needed</p>
                    </article>
                    <button className='google-login rect white'>
                        <img src="https://dapulse-res.cloudinary.com/image/upload/remote_logos/995426/google-icon.svg" alt="Continue with your Google work account" />
                        <p>Continue with your Google work account</p>
                    </button>
                    <div className="separator-box">
                        <div className="separator-line"></div>
                        Or
                        <div className="separator-line"></div>
                    </div>
                        <LoginSignup/>
                    <section className='work-email'>
                        <span>Work email</span>
                        <input className='work-email-input rect' type="email" required placeholder='name@company.com' />
                        <Link to='/board'>
                        <button className='rect'>Continue</button>
                        </Link>
                    </section>
                    <div className="terms">
                        <p>By proceeding, you agree to the</p>
                        <div className='terms-links-wrapper'>
                        <a href="#">Terms of Service</a>
                        <p> and </p>
                        <a href="#">Privacy Policy</a>
                        </div>
                    </div>
                </section>

                <footer>
                    <p>Already have an account?</p>
                    <a href="#">Log in</a>
                </footer>
            </div>

            <aside className='img-container' >
                <img src={loginImage} alt="loginImage" />
            </aside>
        </section>
    )
}