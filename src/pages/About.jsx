import React from 'react'
import ShopHero from '../components/ShopHero'
import AboutUs from '../components/About'
import CompanyLogo from '../components/CompanyLogo';

const About = () => {
  return (
    <>
        <ShopHero />
        <div className="relative z-30 -mt-12 px-4 sm:-mt-20 sm:px-6 md:-mt-40">
          <AboutUs />
        </div>
        <CompanyLogo />
    </>
  )
}

export default About