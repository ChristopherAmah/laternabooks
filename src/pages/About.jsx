import React from 'react'
import ShopHero from '../components/ShopHero'
import AboutUs from '../components/About'
import CompanyLogo from '../components/CompanyLogo';

const About = () => {
  return (
    <>
        <ShopHero />
        <div className="relative z-30 -mt-70 px-6">
          <AboutUs />
        </div>
        <CompanyLogo />
    </>
  )
}

export default About