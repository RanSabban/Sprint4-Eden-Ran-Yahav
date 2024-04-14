import React from 'react'
import logo from '../assets/img/oneday-logo.png'
import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'



export function HomePage() {
    

    return (
        <section className='home-page'>
            <header className='home-header'>
                <div className='logo'>
                    <img alt="oneday.com logo" src={logo}></img>
                </div>
                <div className="home-actions">
                    <button className='login-btn'>Login</button>
                   <Link to={'/board'}> <button className='cta-btn'>Get Started</button> </Link>
                </div>
            </header>
            <section className='hero-header'>
                <h1>Your go-to work platform</h1>
                <sub>
                    <h2>Run all your work on one platform with customizable</h2>
                    <h2>products that scale with your needs.</h2>
                </sub>
                <img src="../assets/img/home/wm-dark.png" alt="" srcset="" />
            </section>




            {/* <ResizableGrid/> */}
            {/* <TimelinePicker/> */}
            {/* <LoginSignup/> */}
        </section >
    )
}