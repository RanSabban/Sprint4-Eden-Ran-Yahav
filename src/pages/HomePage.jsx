import React from 'react'
// import logo from '../assets/img/oneday-logo.png'
import logo from '/img/oneday-logov2.png'
import workflows from '/img/MoreWorkflowsImg.png'
import OperationsImg from '/img/OperationsImg.png'
import CreativeDesignImg from '/img/CreativeDesignImg.png'
import MarketingImg from '/img/MarketingImg.png'
import ProjectManagementImg from '/img/ProjectManagementImg.png'
import TaskManagementImg from '/img/TaskManagementImg.png'
import HRImg from '/img/HRImg.png'
import ITImg from '/img/ITImg.png'
import BdImg from '/img/BdImg.png'
import CanvaImg from '/img/CanvaImg.png'
import CarrefourImg from '/img/CarrefourImg.png'
import CocaColaImg from '/img/CocaColaImg.png'
import GlossierImg from '/img/GlossierImg.png'
import OxyImg from '/img/OxyImg.png'
import UniversalImg from '/img/UniversalImg.png'
import HoltCatImg from '/img/HoltCatImg.jpg'
import LionsgateImg from '/img/LionsgateImg.png'
import HomeAppPreviewImg from '/img/HomeAppPreviewImg.jpg'
// import HomeAppPreviewImg from '/img/HomeAppPreviewImg.jpg'


// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ArrowRightHome } from '../services/svg.service'



export function HomePage() {


    return (
        <section className='home-page'>
            <header className='home-header'>
                <div className='logo'>
                    <img alt="oneday.com logo" src={logo}></img>
                </div>
                <div className="home-actions">
                    <Link to={'/user'}>  <button className='login-btn'>Login</button> </Link>
                    <Link to={'/board'}>  <button className='cta-button'>Get Started  <ArrowRightHome className='arrow-icon' /></button> </Link>
                </div>
            </header>
            <section className='hero-header'>
                <h1>Your go-to work platform</h1>
                <sub>
                    <h2>Run all your work on one platform with customizable</h2>
                    <h2>products that scale with your needs.</h2>
                </sub>
            </section>
            <section className='welcome-section'>

                <article className="card card1"><img className='img-welcome' src={CreativeDesignImg} alt="" /><span>Creative &amp; design</span></article>
                <article className="card card2"><img className='img-welcome' src={OperationsImg} alt="" /><span>Operations</span></article>
                <article className="card card3"><img className='img-welcome' src={MarketingImg} alt="" /><span>Marketing</span></article>
                <article className="card card1"><img className='img-welcome' src={ProjectManagementImg} alt="" /><span>Project management</span></article>
                <article className="card card2"><img className='img-welcome' src={TaskManagementImg} alt="" /><span>Task management</span></article>
                <article className="card card3"><img className='img-welcome' src={HRImg} alt="" /><span>HR</span></article>
                <article className="card card1"><img className='img-welcome' src={ITImg} alt="" /><span>IT</span></article>
                <article className="card card2"><img className='img-welcome' src={workflows} alt="" /><span>More workflows</span></article>

            </section>
            <section className='btn-container'>

                <Link to={'/board'}> <button style={{ marginBottom: '1em', width: '150px', height: '50px' }} className='cta-button'>Get Started  <ArrowRightHome className='arrow-icon' /></button> </Link>

                <p className="no-credit-card-txt">No credit card needed<span> ✦ </span>Unlimited time on Free plan</p>

            </section>
            <img src={HomeAppPreviewImg} alt="" />
            <section className="sponsers-section">
                <div className="sponsers-imgs-container">
                    <img style={{ width: '6.875em' }} src={BdImg} alt="BdImg" />
                    <img style={{ width: '6.875em' }} src={CanvaImg} alt="CanvaImg" />
                    <img style={{ width: '6.875em' }} src={CocaColaImg} alt="CocaColaImg" />
                    <img style={{ width: '4.375em' }} className="oxy-img" src={OxyImg} alt="OxyImg" />
                    <img style={{ width: '6.875em' }} src={GlossierImg} alt="GlossierImg" />
                    <img style={{ width: '4.375em' }} className="carrefour-img" src={CarrefourImg} alt="CarrefourImg" />
                    <img style={{ width: '6.875em' }} src={UniversalImg} alt="UniversalImg" />
                    <img style={{ width: '6.875em' }} src={LionsgateImg} alt="LionsgateImg" />
                    <img style={{ width: '6.875em' }} src={HoltCatImg} alt="HoltCatImg" />
                </div>
            </section>

            <section className="boost-your-team ">
                <div className="flex justify-center align-center column">
                    <h2 className='h2-welcome'>The Work OS that lets you shape workflows, your way</h2>
                    <div className="boost-your-team-cta ">
                        <span className='span'>Boost your team’s alignment, efficiency, and productivity by customizing any workflow to fit your needs.</span>
                        <Link to={'/board'} className='cta-button'><button className="cta-button justify-center">Get Started  <ArrowRightHome className='arrow-icon' /></button> </Link>
                    </div>
                </div>
            </section>

            <div className="full-paragraph align-items-center css-1dkjmkt eo3on790" style={{ textAlign: "center" }}><div className="title-wrapper" style={{ marginTop: "0px" }}><div className="core-title-container css-18anjwe e168hrcx0"><h2 className="monday-markup-language-component core-title lg"><b>Everything you need for any workflow</b></h2></div></div><div className="paragraph-body-wrapper"><div className="paragraph-wrapper css-1id7hrb ehzaxgp0"><div style={{ fontSize: '1.125rem', lineHeight: '32px' }}>Easily build your ideal workflow with monday.com building blocks.</div></div></div></div>

            <section className='video-sec'>

                <video
                    src="https://dapulse-res.cloudinary.com/video/upload/q_auto,f_auto,cs_copy/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/tabs/final-videos-tabs/7_status.mp4"
                    autoPlay
                    muted
                    loop
                    className='home-video'
                >
                    Your browser does not support the video tag.
                </video>

                <div className="full-paragraph align-items-left css-1dkjmkt eo3on790" style={{ textAlign: 'left' }}><div className="title-wrapper" style={{ marginTop: "0px" }}><div className="core-title-container css-18anjwe e168hrcx0"><span className="title-and-icon-wrapper"><div className="icon-wrapper sm"><picture className="picture-component picture-icon-wrapper css-1x9jymf e1ujfqv60"><img style={{ width: '1.5em' }} alt="board icon" className="title-icon" src="https://dapulse-res.cloudinary.com/image/upload/e_colorize,co_rgb:6161FF/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/tabs/board_icon.svg" /></picture></div><h2 className="title-video-section">Boards</h2></span></div></div><div className="paragraph-body-wrapper"><div className="paragraph-wrapper css-1id7hrb ehzaxgp0"><div className="monday-markup-language">Everything starts with a visual board — the core of monday.com Work OS. Tailor it your way and manage anything from projects to departments.</div></div></div></div>

            </section>
            <section className="footer-section-full"><h2>Deliver your best work <span>with oneday.com</span></h2><p className='p-home'>No credit card needed   <span>✦</span>   Unlimited time on Free plan</p>  <Link to={'/board'}> <button className='cta-button'>Get Started <svg className="arrow-icon" width="14" height="10" viewBox="0 0 9 7" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4.628.616a.5.5 0 1 0-.64.768L6.203 3.23H.5a.5.5 0 0 0 0 1h5.612L3.988 6a.5.5 0 1 0 .64.769l3.23-2.693a.5.5 0 0 0 0-.768L4.628.616z" fill="#FFFFFF"></path></svg></button> </Link></section>

        </section >
    )
}