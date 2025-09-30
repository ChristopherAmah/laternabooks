import React from 'react'
import Category from '../components/Categories';
import CompanyLogo from '../components/CompanyLogo';
import ShopHero from '../components/ShopHero'

const Categories = () => {
  return (
    <>
        <ShopHero />
        <div className="relative z-30 -mt-70 px-6">
          <Category />
        </div>
        <CompanyLogo />
    </>
  )
}

export default Categories