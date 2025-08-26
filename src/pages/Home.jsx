import React from 'react'
import NewsSection from '../components/NewsSection'
import BlogSection from '../components/BlogSection';
import CompanyLogo from '../components/CompanyLogo';
import Hero from '../components/Hero'

const Home = () => {
  return (
    <>
        <Hero />
        <NewsSection />
        <BlogSection />
        <CompanyLogo />
    </>
  )
}

export default Home