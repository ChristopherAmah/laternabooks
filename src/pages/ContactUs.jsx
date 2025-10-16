import React from 'react'
import ContactUs from '../components/ContactUs';
import CompanyLogo from '../components/CompanyLogo';
import ShopHero from '../components/ShopHero'

const ContactPage = () => {
  return (
    <>
        <ShopHero />
        <div className="relative z-30 -mt-70 px-6">
          <ContactUs />
        </div>
        <CompanyLogo />
    </>
  )
}

export default ContactPage