import React from 'react'
import NavbarLandingPage from '../components/NavbarLandingPage'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import About from '../components/About'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'

const Landing = () => {
  return (
     <div className="min-h-screen bg-white">
    
    <NavbarLandingPage />
    <HeroSection />
    <Features />
    <About />
    <Pricing />
    <Contact />
  
  </div>
  )
}

export default Landing