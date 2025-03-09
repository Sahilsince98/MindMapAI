
import NavbarLandingPage from '../components/NavbarLandingPage'
import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import About from '../components/About'


const Landing = () => {
  return (
     <div className="min-h-screen bg-white">
    
    <NavbarLandingPage />
    <HeroSection />
    <Features />
    <About />
  
  </div>
  )
}

export default Landing