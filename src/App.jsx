import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Hero from './components/Hero'
import Footer from './components/Footer'
import NewsSection from './components/NewsSection'
import BlogSection from './components/BlogSection';
import CompanyLogo from './components/CompanyLogo';
import Topbar from './components/Topbar';
// import Tesst from './components/tesst';

function App() {
  return (
    <main className='relative min-h-screen overflow-x-hidden'>
      <div className='overflow-hidden'>
          <Topbar />
          <Navbar />
          {/* <Tesst /> */}
          <Hero />
        <NewsSection />
        <BlogSection />
        <CompanyLogo />
        <Footer />
      </div>
    </main>
  )
}

export default App
