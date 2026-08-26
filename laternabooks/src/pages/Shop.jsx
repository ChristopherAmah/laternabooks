import React from 'react'
import Products from '../components/Products';
import CompanyLogo from '../components/CompanyLogo';
import ShopHero from '../components/ShopHero'

const Shop = () => {
  return (
    <>
        <ShopHero />
        <div className="relative z-30 -mt-70 px-6">
          <Products />
        </div>
        <CompanyLogo />
    </>
  )
}

export default Shop