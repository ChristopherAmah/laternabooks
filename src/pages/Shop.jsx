import React from 'react'
import Products from '../components/Products';
import CompanyLogo from '../components/CompanyLogo';
import ShopHero from '../components/ShopHero'

const Shop = () => {
  return (
    <>
        <ShopHero />
        <div className="relative z-30 -mt-12 px-4 sm:-mt-20 sm:px-6 md:-mt-40">
          <Products />
        </div>
        <CompanyLogo />
    </>
  )
}

export default Shop