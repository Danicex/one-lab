import React from 'react'
import { Link } from 'react-router-dom'
import logo from  './assets/417284f8-4190-4100-b644-290850ea0742.png'
import './App.css';
import hero from  './assets/2024080111143211.png'

export default function LandingPage() {
  return (
    <div className="landing-page">
    <header className="header">
      <img className="logo" src={logo}/>
      <nav className="nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    
    <section className="hero">
      
      <div className="hero-text">
        <h1>Welcome to <span style={{color:'#ea2340'}}>
        OneLab </span> fashion hub</h1>
        <p>Buying and Selling of Fashion wears made easy, get started now to be  part  of the Biggest P2P fashion market</p>
        <div className="hero-buttons">
          <Link to={'/login_buyer'}><button className='home-btn-auth'>Buy</button></Link>
          <Link to={'/login_seller'}><button className='home-btn-auth'>Sell</button></Link>
          
        </div>
      </div>
      <div className="hero-placeholder"></div>
       
    </section>

    <section className="features" id='section2-home'>
      <h2>Features</h2>
      <div className="wrap-section2">
      <div className="feature-item">
        <p>Get outfits of any niche, you will always find what you are looking for</p>
      </div>
      <div className="feature-item">
        <p> Pay with ease and rate your exprerience</p>
       </div>
      <div className="feature-item">
        <p>Reach out to thousands of customers from all over the globe</p>
      </div>

      </div>
    </section>
    <section className="benefits" id='section2-home'>
      <h2>Special Benefits For You</h2>
      <ul className='benefits-ul'>
        <li><p>use  onelab as a fashion protfolio to show your authenticity to the world</p>  </li>
        <li> <p>reach out to designers to create your splending outfits</p></li>
        <li><p>get clients from all over the world</p> </li>
        <li> <p>enjoy the best business transaction with the best P2P fashion market</p></li>
      </ul>

     
      <button className='get-started'>Get Started</button>
    </section>
    <section className="information" id='section2-home'>
      <h2>Information</h2>
      <p>here is a quick guide on how to use the app as a seller</p>
    </section>
  </div>
     )
}
