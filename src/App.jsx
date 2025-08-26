import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Topbar from './components/Topbar';

function App() {
  return (
    <main className='relative min-h-screen overflow-x-hidden'>
      <div className='overflow-hidden'>
        <Topbar />
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        <Footer />
      </div>
    </main>
  )
}

export default App
