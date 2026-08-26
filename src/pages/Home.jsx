import React from 'react'
import NewsSection from '../components/NewsSection'
import BlogSection from '../components/BlogSection';
import CompanyLogo from '../components/CompanyLogo';
import Hero from '../components/Hero'
import HomeProducts from '../components/HomeProducts';

const Home = () => {
  return (
    <>
        <Hero />
        {/* <NewsSection /> */}
        <HomeProducts />
        <BlogSection />
        <CompanyLogo />
    </>
  )
}

export default Home