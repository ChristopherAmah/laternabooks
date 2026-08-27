import React from 'react'
import Category from '../components/Categories';
import CompanyLogo from '../components/CompanyLogo';
import ShopHero from '../components/ShopHero'

const Categories = () => {
  return (
    <>
        <ShopHero />
        <div className="relative z-30 -mt-12 px-4 sm:-mt-20 sm:px-6 md:-mt-40">
          <Category />
        </div>
        <CompanyLogo />
    </>
  )
}

export default Categories