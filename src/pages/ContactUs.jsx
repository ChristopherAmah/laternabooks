import React from 'react'
import ContactUs from '../components/ContactUs';
import CompanyLogo from '../components/CompanyLogo';
import ShopHero from '../components/ShopHero'

const ContactPage = () => {
  return (
    <>
        <ShopHero />
        <div className="relative z-30 -mt-12 px-4 sm:-mt-20 sm:px-6 md:-mt-40">
          <ContactUs />
        </div>
        <CompanyLogo />
    </>
  )
}

export default ContactPage