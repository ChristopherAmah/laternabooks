import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Topbar from './components/Topbar';
import CategoriesPage from "./pages/CategoriesPage";
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <main className='relative min-h-screen overflow-x-hidden'>
      <div>
        <Topbar />
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/productdetail" element={<ProductDetails />} />
          </Routes>
        <Footer />
      </div>
    </main>
  )
}

export default App
